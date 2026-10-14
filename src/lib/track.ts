import { track as vercelTrack } from "@vercel/analytics";
import { getAttribution } from "./attribution";

/**
 * Registra um evento de clique/ação.
 *
 * O Vercel Analytics grátis não guarda eventos personalizados (só o Pro), então
 * o evento também vai pro nosso contador no Redis (/api/track): só contagens por
 * evento, origem e dia, sem IP, sem cookie e sem identificar ninguém.
 */
export function track(event: string, data?: Record<string, string>) {
  vercelTrack(event, data);
  try {
    const { utm_source, utm_campaign } = getAttribution();
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, data, source: utm_source, campaign: utm_campaign }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* rastreamento nunca pode quebrar a página */
  }
}
