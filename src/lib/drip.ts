import { Resend } from "resend";
import { redis } from "./redis";
import { hasAccess } from "./access";
import { premium } from "./premium";
import { STYLE_LABELS, cleanFirstName } from "./subscriber-core";
import { site } from "@/content/site";
import { animacoes } from "@/content/animacoes";
import { designPackSequence } from "@/content/drip/design-pack";
import {
  isDue,
  renderEmail,
  unsubscribeApiUrl,
  unsubscribePageUrl,
  type DripContext,
  type DripSequence,
  type DripState,
} from "./drip-core";

// Sequências de e-mail automáticas (boas-vindas). Só servidor.
//
// Redis:
//   drip:{seq}:{email}        hash  startedAt, sent, lastSentAt, name, style, source, campaign
//   drip:active:{seq}         set   e-mails que ainda têm e-mail a receber
//   drip:stop:{email}         "1"   pediu pra parar (vale para todas as sequências, não expira)
//   drip:lock:{seq}:{email}:{n}     trava de 1h pra o mesmo e-mail não sair duas vezes
//
// O e-mail 1 sai na hora da inscrição (after() no route handler); os demais saem na rodada
// diária do cron /api/cron/drip. O cron também tenta de novo o que falhou.

const SEQUENCES: DripSequence[] = [designPackSequence];

const MAX_SENDS_PER_RUN = 80; // o plano grátis do Resend limita o envio diário
const PAUSE_MS = 600; // o Resend aceita ~2 envios por segundo

const stateKey = (seq: string, email: string) => `drip:${seq}:${email}`;
const activeKey = (seq: string) => `drip:active:${seq}`;
const stopKey = (email: string) => `drip:stop:${email}`;

const normalize = (email: string) => email.trim().toLowerCase();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type StepResult = "sent" | "not-due" | "done" | "stopped" | "buyer" | "missing" | "error";

async function sendMail(to: string, mail: { subject: string; html: string; text: string }, unsubApi: string) {
  // E-mails de teste nunca saem de verdade.
  if (to.endsWith("@example.com")) return true;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DRIP_EMAIL_FROM || process.env.AUTH_EMAIL_FROM;
  if (!apiKey || !from) {
    console.error("drip: RESEND_API_KEY ou remetente não configurado.");
    return false;
  }
  // O Resend não lança erro quando falha: devolve { error }.
  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    replyTo: process.env.DRIP_REPLY_TO || undefined,
    headers: {
      "List-Unsubscribe": `<${unsubApi}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
  if (error) {
    console.error("drip: Resend recusou o envio:", error.name, error.message);
    return false;
  }
  return true;
}

/** Manda o próximo e-mail da sequência para este inscrito, se já for a vez dele. */
export async function processSubscriber(seq: DripSequence, email: string, now = Date.now()): Promise<StepResult> {
  const to = normalize(email);

  if (await redis.get(stopKey(to))) {
    await redis.srem(activeKey(seq.id), to);
    return "stopped";
  }

  const raw = await redis.hgetall<Record<string, string | number>>(stateKey(seq.id, to));
  if (!raw || Object.keys(raw).length === 0) {
    await redis.srem(activeKey(seq.id), to);
    return "missing";
  }

  const state: DripState = {
    startedAt: Number(raw.startedAt ?? 0),
    sent: Number(raw.sent ?? 0),
    lastSentAt: Number(raw.lastSentAt ?? 0),
  };
  if (state.sent >= seq.steps.length) {
    await redis.srem(activeKey(seq.id), to);
    return "done";
  }

  const step = seq.steps[state.sent];
  if (!isDue(state, step, now)) return "not-due";

  // Quem já comprou o Premium não recebe mais a sequência (a oferta não faz sentido).
  try {
    if (await hasAccess(to, premium.productId)) {
      await redis.srem(activeKey(seq.id), to);
      await redis.hset(stateKey(seq.id, to), { stoppedBy: "buyer" });
      return "buyer";
    }
  } catch {
    /* sem Redis pra conferir: segue, o pior caso é um e-mail a mais */
  }

  const lock = `drip:lock:${seq.id}:${to}:${state.sent}`;
  if (!(await redis.set(lock, "1", { nx: true, ex: 3600 }))) return "not-due";

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    console.error("drip: AUTH_SECRET ausente, não dá pra assinar o link de descadastro.");
    await redis.del(lock);
    return "error";
  }

  const styleId = typeof raw.style === "string" ? raw.style : "";
  const ctx: DripContext = {
    name: cleanFirstName(raw.name),
    styleId,
    styleLabel: STYLE_LABELS[styleId] ?? "",
    price: site.premium.price,
    animationsPremium: animacoes.filter((a) => a.access === "premium").length,
  };

  const mail = renderEmail(seq, step, ctx, unsubscribePageUrl(to, secret));
  const ok = await sendMail(to, mail, unsubscribeApiUrl(to, secret));
  if (!ok) {
    await redis.del(lock);
    return "error";
  }

  await redis.hset(stateKey(seq.id, to), { sent: state.sent + 1, lastSentAt: now });
  if (state.sent + 1 >= seq.steps.length) await redis.srem(activeKey(seq.id), to);
  return "sent";
}

/**
 * Coloca o e-mail na sequência e já tenta mandar o primeiro. Quem já entrou antes não
 * reinicia (baixar o pack de novo não repete os e-mails) e quem pediu pra parar nunca entra.
 * Nunca lança erro: a inscrição não pode falhar por causa disso.
 */
export async function enrollInDrip(
  seqId: string,
  rawEmail: string,
  info: { name?: unknown; style?: unknown; source?: unknown; campaign?: unknown },
): Promise<void> {
  try {
    const seq = SEQUENCES.find((s) => s.id === seqId);
    if (!seq) return;
    const email = normalize(rawEmail);
    if (await redis.get(stopKey(email))) return;

    const now = Date.now();
    const isNew = await redis.hsetnx(stateKey(seq.id, email), "startedAt", now);
    if (!isNew) return;

    await redis.hset(stateKey(seq.id, email), {
      sent: 0,
      lastSentAt: 0,
      name: cleanFirstName(info.name),
      style: typeof info.style === "string" ? info.style : "",
      source: typeof info.source === "string" ? info.source.slice(0, 40) : "",
      campaign: typeof info.campaign === "string" ? info.campaign.slice(0, 40) : "",
    });
    await redis.sadd(activeKey(seq.id), email);
    await processSubscriber(seq, email, now);
  } catch (err) {
    console.error("drip: erro ao inscrever:", err);
  }
}

/** Rodada do cron: manda o que está na vez (e refaz o que falhou). */
export async function processAllDue(now = Date.now()) {
  const summary: Record<string, number> = {};
  let sends = 0;
  for (const seq of SEQUENCES) {
    const members = (await redis.smembers(activeKey(seq.id))) as string[];
    for (const email of members) {
      if (sends >= MAX_SENDS_PER_RUN) {
        summary["adiados"] = (summary["adiados"] ?? 0) + 1;
        continue;
      }
      let result: StepResult;
      try {
        result = await processSubscriber(seq, email, now);
      } catch (err) {
        console.error("drip: erro ao processar um inscrito:", err);
        result = "error";
      }
      summary[result] = (summary[result] ?? 0) + 1;
      if (result === "sent") {
        sends++;
        await sleep(PAUSE_MS);
      }
    }
  }
  return summary;
}

/** Para todas as sequências deste e-mail, hoje e no futuro. */
export async function stopDrip(rawEmail: string): Promise<void> {
  const email = normalize(rawEmail);
  await redis.set(stopKey(email), "1");
  await Promise.all(SEQUENCES.map((s) => redis.srem(activeKey(s.id), email)));
}
