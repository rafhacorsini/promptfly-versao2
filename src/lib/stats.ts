import { redis } from "./redis";
import { cleanTag } from "./attribution-core";

/** Eventos aceitos pelo contador. Qualquer outro nome é descartado. */
export const TRACKED_EVENTS = [
  "premium_cta_click",
  "prompt_copy",
  "free_template_click",
  "newsletter_signup",
  "animacao_copy",
  "anchor_cta_click",
  "design_pack_download",
] as const;
export type TrackedEvent = (typeof TRACKED_EVENTS)[number];

export const isTrackedEvent = (v: unknown): v is TrackedEvent =>
  typeof v === "string" && (TRACKED_EVENTS as readonly string[]).includes(v);

const eventKey = (event: string) => `track:${event}`;

/** Dia no fuso de São Paulo (AAAA-MM-DD). */
export function today(now = new Date()): string {
  return now.toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
}

/**
 * Soma 1 no contador do evento: total, por dia, por origem, por campanha e
 * por valor de cada propriedade (até 3). Só contagem, nada que identifique alguém.
 */
export async function recordEvent(
  event: TrackedEvent,
  opts: { source?: unknown; campaign?: unknown; data?: unknown } = {},
) {
  const source = cleanTag(opts.source) || "direct";
  const campaign = cleanTag(opts.campaign);
  const p = redis.pipeline();
  const key = eventKey(event);
  p.hincrby(key, "total", 1);
  p.hincrby(key, `day:${today()}`, 1);
  p.hincrby(key, `src:${source}`, 1);
  if (campaign) p.hincrby(key, `camp:${campaign}`, 1);

  if (opts.data && typeof opts.data === "object") {
    for (const [k, v] of Object.entries(opts.data as Record<string, unknown>).slice(0, 3)) {
      const name = cleanTag(k, 24);
      const value = cleanTag(v, 40);
      if (name && value) p.hincrby(key, `val:${name}:${value}`, 1);
    }
  }
  await p.exec();
}

export interface EventSummary {
  total: number;
  bySource: Record<string, number>;
  byCampaign: Record<string, number>;
  byValue: Record<string, number>;
  last14Days: Record<string, number>;
}

function summarize(h: Record<string, unknown> | null): EventSummary {
  const out: EventSummary = { total: 0, bySource: {}, byCampaign: {}, byValue: {}, last14Days: {} };
  if (!h) return out;
  const cutoff = today(new Date(Date.now() - 13 * 86400000));
  for (const [k, raw] of Object.entries(h)) {
    const n = Number(raw);
    if (k === "total") out.total = n;
    else if (k.startsWith("src:")) out.bySource[k.slice(4)] = n;
    else if (k.startsWith("camp:")) out.byCampaign[k.slice(5)] = n;
    else if (k.startsWith("val:")) out.byValue[k.slice(4)] = n;
    else if (k.startsWith("day:") && k.slice(4) >= cutoff) out.last14Days[k.slice(4)] = n;
  }
  return out;
}

export async function readEvents(): Promise<Record<string, EventSummary>> {
  const p = redis.pipeline();
  for (const e of TRACKED_EVENTS) p.hgetall(eventKey(e));
  const res = (await p.exec()) as (Record<string, unknown> | null)[];
  return Object.fromEntries(TRACKED_EVENTS.map((e, i) => [e, summarize(res[i])]));
}

/* ---------- vendas por origem (webhook do Hotmart) ---------- */

export interface SaleInfo {
  transaction?: string;
  code?: string;
  value?: number;
}

/** Registra uma venda aprovada por origem. Ignora transação repetida (o Hotmart reenvia eventos). */
export async function recordSale({ transaction, code, value }: SaleInfo) {
  if (transaction) {
    const novo = await redis.set(`sale:${transaction}`, "1", { nx: true });
    if (!novo) return false;
  }
  const origem = cleanTag(code) || "sem-origem";
  const p = redis.pipeline();
  p.hincrby("sales:count", origem, 1);
  if (typeof value === "number" && Number.isFinite(value)) p.hincrbyfloat("sales:value", origem, value);
  await p.exec();
  return true;
}

export async function recordRefund({ code }: SaleInfo) {
  await redis.hincrby("sales:refunded", cleanTag(code) || "sem-origem", 1);
}

export async function readSales() {
  const [count, value, refunded] = await Promise.all([
    redis.hgetall("sales:count"),
    redis.hgetall("sales:value"),
    redis.hgetall("sales:refunded"),
  ]);
  return { count: count ?? {}, value: value ?? {}, refunded: refunded ?? {} };
}
