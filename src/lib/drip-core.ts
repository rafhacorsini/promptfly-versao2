import { createHmac, timingSafeEqual } from "crypto";

// Funções puras da sequência de e-mails (sem Redis e sem Resend): rodam no servidor e nos testes.
// Sem imports locais de propósito, pra o `npm test` carregar este arquivo direto.

export const SITE_URL = "https://promptfly.com.br";

export interface DripContext {
  /** Primeiro nome já limpo ("" se a pessoa não informou). */
  name: string;
  /** vitrine | noite | editorial | todos | "" */
  styleId: string;
  styleLabel: string;
  /** Preço do Premium vindo de site.ts (null = não citar valor). */
  price: string | null;
  /** Quantas animações Premium existem hoje (contadas, nunca digitadas na mão). */
  animationsPremium: number;
}

export interface DripStep {
  id: string;
  /** Dias de calendário (fuso de Brasília) depois da inscrição. 0 = na hora. */
  delayDays: number;
  subject: (c: DripContext) => string;
  preview: string;
  /** Texto do e-mail em mini-markdown: parágrafos, "- " lista, "1. " lista numerada, "> " destaque. */
  body: (c: DripContext) => string;
}

export interface DripSequence {
  id: string;
  /** Por que a pessoa está recebendo (vai no rodapé do e-mail). */
  reason: string;
  steps: DripStep[];
}

export interface DripState {
  startedAt: number;
  sent: number;
  lastSentAt: number;
}

// ── Calendário ──────────────────────────────────────────────────────────────

const DAY = 24 * 60 * 60 * 1000;
const BRT_OFFSET = 3 * 60 * 60 * 1000; // Brasília é UTC-3 o ano todo (sem horário de verão)

/** Número do dia de calendário em Brasília. */
export function dayIndex(ms: number): number {
  return Math.floor((ms - BRT_OFFSET) / DAY);
}

/**
 * Diz se o próximo e-mail já pode sair. Conta dias de calendário em Brasília, então o
 * e-mail do "dia 2" sai na rodada diária do cron daquele dia, não 48h exatas depois.
 * Nunca manda dois e-mails no mesmo dia.
 */
export function isDue(state: DripState, step: Pick<DripStep, "delayDays">, now: number): boolean {
  if (dayIndex(now) - dayIndex(state.startedAt) < step.delayDays) return false;
  if (state.sent > 0 && dayIndex(now) === dayIndex(state.lastSentAt)) return false;
  return true;
}

// ── Link de descadastro (assinado, sem login) ───────────────────────────────

function sign(email: string, secret: string): string {
  return createHmac("sha256", secret).update(`drip-unsub:${email.trim().toLowerCase()}`).digest("base64url").slice(0, 32);
}

export function unsubscribeToken(email: string, secret: string): string {
  return sign(email, secret);
}

export function verifyUnsubscribeToken(email: string, token: unknown, secret: string): boolean {
  if (typeof token !== "string" || !secret || !email) return false;
  const a = Buffer.from(sign(email, secret));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function unsubscribePageUrl(email: string, secret: string): string {
  const e = email.trim().toLowerCase();
  return `${SITE_URL}/emails/sair?e=${encodeURIComponent(e)}&t=${unsubscribeToken(e, secret)}`;
}

/** Endereço do descadastro com um clique (cabeçalho List-Unsubscribe). */
export function unsubscribeApiUrl(email: string, secret: string): string {
  const e = email.trim().toLowerCase();
  return `${SITE_URL}/api/drip/unsubscribe?e=${encodeURIComponent(e)}&t=${unsubscribeToken(e, secret)}`;
}

// ── Montagem do e-mail ──────────────────────────────────────────────────────

/** "Oi, Maria!" ou só "Oi!" quando não temos o nome. */
export function greeting(c: Pick<DripContext, "name">): string {
  return c.name ? `Oi, ${c.name}!` : "Oi!";
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Escapa o texto e transforma endereços https:// em links. */
function inline(s: string): string {
  return esc(s).replace(
    /(https?:\/\/[^\s<]*[^\s<.,;:!?)])/g,
    (u) => `<a href="${u}" style="color:#FF4C00;text-decoration:underline">${u}</a>`,
  );
}

const P = "margin:0 0 16px;font-size:16px;line-height:1.65;color:#2B2B2B";

function blockHtml(block: string): string {
  const lines = block.split("\n");
  if (lines.every((l) => l.startsWith("- "))) {
    return `<ul style="${P};padding-left:22px">${lines.map((l) => `<li style="margin:0 0 6px">${inline(l.slice(2))}</li>`).join("")}</ul>`;
  }
  if (lines.every((l) => /^\d+\.\s/.test(l))) {
    return `<ol style="${P};padding-left:22px">${lines.map((l) => `<li style="margin:0 0 6px">${inline(l.replace(/^\d+\.\s/, ""))}</li>`).join("")}</ol>`;
  }
  if (lines.every((l) => l.startsWith("> "))) {
    return `<blockquote style="margin:0 0 16px;padding:14px 16px;background:#F3F3F3;border-left:3px solid #FF4C00;border-radius:8px;font-size:15px;line-height:1.6;color:#1A1A1A">${lines.map((l) => inline(l.slice(2))).join("<br>")}</blockquote>`;
  }
  return `<p style="${P}">${lines.map(inline).join("<br>")}</p>`;
}

export function markupToHtml(markup: string): string {
  return markup
    .trim()
    .split(/\n{2,}/)
    .map(blockHtml)
    .join("\n");
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

/** Monta assunto, HTML (carta simples, sem imagem) e texto puro do mesmo e-mail. */
export function renderEmail(
  seq: Pick<DripSequence, "reason">,
  step: DripStep,
  ctx: DripContext,
  unsubUrl: string,
): RenderedEmail {
  const body = step.body(ctx);
  const footerText = `${seq.reason}\nParar de receber estes e-mails: ${unsubUrl}`;
  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#FFFFFF">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(step.preview)}</div>
<div style="max-width:560px;margin:0 auto;padding:28px 20px;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif">
${markupToHtml(body)}
<hr style="border:none;border-top:1px solid #E5E5E5;margin:28px 0 16px">
<p style="margin:0;font-size:12.5px;line-height:1.6;color:#888888">${esc(seq.reason)}<br><a href="${esc(unsubUrl)}" style="color:#888888;text-decoration:underline">Parar de receber estes e-mails</a></p>
</div>
</body></html>`;
  return { subject: step.subject(ctx), html, text: `${body.trim()}\n\n--\n${footerText}\n` };
}
