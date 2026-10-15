import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { EMAIL_RE, subscribeToNewsletter } from "@/lib/beehiiv";
import { buildZip, isStyleChoice } from "@/lib/design-pack";
import { recordEvent } from "@/lib/stats";

export const dynamic = "force-dynamic";

const LIMIT_PER_HOUR = 10;

/**
 * Entrega do Design Pack: só devolve o .zip depois de inscrever o e-mail na
 * newsletter (Beehiiv, com a origem da visita). O arquivo nunca fica em /public.
 */
export async function POST(req: NextRequest) {
  let body: { email?: unknown; name?: unknown; style?: unknown; utm_source?: unknown; utm_campaign?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }
  if (!isStyleChoice(body.style)) {
    return NextResponse.json({ error: "Escolha um estilo." }, { status: 400 });
  }

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anon";
    const bucket = `rl:dp:${ip}:${Math.floor(Date.now() / 3600000)}`;
    const n = await redis.incr(bucket);
    if (n === 1) await redis.expire(bucket, 3600);
    if (n > LIMIT_PER_HOUR) {
      return NextResponse.json({ error: "Muitas tentativas. Tente de novo mais tarde." }, { status: 429 });
    }
  } catch (err) {
    console.error("design-pack: limite:", err);
  }

  // Só em desenvolvimento: e-mails @example.com pulam o Beehiiv, pra testar sem inscrever ninguém.
  const modoTeste = process.env.NODE_ENV !== "production" && email.endsWith("@example.com");
  if (!modoTeste) {
    const result = await subscribeToNewsletter(email, {
      source: body.utm_source,
      campaign: body.utm_campaign,
      medium: "design-pack",
      page: "https://promptfly.com.br/design-pack",
    }, { firstName: body.name, style: body.style });
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  }

  try {
    await recordEvent("design_pack_download", {
      source: body.utm_source,
      campaign: body.utm_campaign,
      data: { style: body.style },
    });
  } catch (err) {
    console.error("design-pack: evento:", err);
  }

  const zip = buildZip(body.style);
  return new NextResponse(Buffer.from(zip), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="promptfly-design-pack-${body.style}.zip"`,
      "Cache-Control": "no-store",
    },
  });
}
