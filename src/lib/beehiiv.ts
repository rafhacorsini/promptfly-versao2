import { cleanTag } from "./attribution-core";
import { buildCustomFields } from "./subscriber-core";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeResult = { ok: true } | { ok: false; status: number; error: string };

/**
 * Inscreve o e-mail na newsletter (Beehiiv) registrando de onde a pessoa veio.
 * `source` e `campaign` vêm do navegador (utm_*) e são limpos antes de ir pro Beehiiv.
 */
export async function subscribeToNewsletter(
  email: string,
  origin: { source?: unknown; campaign?: unknown; medium: string; page?: string },
  extra: { firstName?: unknown; style?: unknown } = {},
): Promise<SubscribeResult> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) return { ok: false, status: 500, error: "Configuração ausente." };

  const source = cleanTag(origin.source);
  const campaign = cleanTag(origin.campaign);
  const customFields = buildCustomFields(extra);

  const res = await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: source || "direct",
      utm_medium: origin.medium,
      ...(campaign ? { utm_campaign: campaign } : {}),
      ...(origin.page ? { referring_site: origin.page } : {}),
      ...(customFields.length ? { custom_fields: customFields } : {}),
    }),
  });

  if (!res.ok) {
    console.error("Beehiiv error:", res.status, await res.text());
    return { ok: false, status: 502, error: "Não foi possível inscrever. Tente novamente." };
  }
  return { ok: true };
}
