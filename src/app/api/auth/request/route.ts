import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { redis } from "@/lib/redis";
import { getPurchasedProducts } from "@/lib/access";
import { clientIp, generateLoginCode } from "@/lib/security-core";
import { withinLimit } from "@/lib/rate-limit";

const TOKEN_TTL = 60 * 15; // 15 minutos
const PER_EMAIL_PER_HOUR = 5; // evita encher a caixa de um cliente e gerar código novo sem parar
const PER_IP_PER_HOUR = 20;

export async function POST(req: NextRequest) {
  let email: string;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;
  if (!apiKey || !from) {
    return NextResponse.json({ error: "Login não configurado." }, { status: 500 });
  }

  const normalized = email.trim().toLowerCase();

  const okIp = await withinLimit("login-ip", clientIp(req.headers), PER_IP_PER_HOUR, 3600);
  const okEmail = await withinLimit("login-email", normalized, PER_EMAIL_PER_HOUR, 3600);
  if (!okIp || !okEmail) {
    return NextResponse.json(
      { error: "Muitos pedidos de acesso. Espere um pouco e tente de novo." },
      { status: 429 }
    );
  }

  // Só envia o link para quem tem alguma compra registrada. A resposta é a mesma
  // nos dois casos, pra ninguém descobrir pelo site quem é cliente.
  const purchased = await getPurchasedProducts(normalized);
  if (purchased.length === 0) {
    return NextResponse.json({ ok: true });
  }

  const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, "");
  await redis.set(`magic:${token}`, normalized, { ex: TOKEN_TTL });

  // Código de 6 dígitos (alternativa ao link).
  const code = generateLoginCode();
  await redis.set(`code:${normalized}`, code, { ex: TOKEN_TTL });
  await redis.del(`codefail:${normalized}`);

  const link = `${new URL(req.url).origin}/api/auth/verify?token=${token}`;

  const resend = new Resend(apiKey);
  try {
    const { error: sendError } = await resend.emails.send({
      from,
      to: normalized,
      subject: "Seu acesso à Promptfly",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1A1A1A">
          <h2 style="margin:0 0 12px">Entrar na Promptfly</h2>
          <p style="color:#2B2B2B;line-height:1.6">Clique no botão abaixo para acessar seus projetos. O link vale por 15 minutos.</p>
          <a href="${link}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#1A1A1A;color:#fff;text-decoration:none;border-radius:10px;font-weight:500">Acessar meus projetos →</a>
          <p style="color:#2B2B2B;line-height:1.6;margin-top:20px">Ou digite este código no site:</p>
          <div style="font-size:30px;font-weight:700;letter-spacing:8px;color:#1A1A1A;background:#F3F3F3;border-radius:10px;padding:14px 0;text-align:center;max-width:240px">${code}</div>
          <p style="color:#888;font-size:13px;line-height:1.6;margin-top:20px">Se você não solicitou este acesso, ignore este e-mail.</p>
        </div>
      `,
    });
    // O Resend não lança erro quando recusa o envio: devolve { error }.
    if (sendError) throw new Error(`${sendError.name}: ${sendError.message}`);
  } catch (err) {
    console.error("Erro ao enviar e-mail de login:", err);
    return NextResponse.json({ error: "Não foi possível enviar o e-mail." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
