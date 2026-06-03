import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { redis } from "@/lib/redis";
import { getPurchasedProducts } from "@/lib/access";

const TOKEN_TTL = 60 * 15; // 15 minutos

export async function POST(req: NextRequest) {
  let email: string;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;
  if (!apiKey || !from) {
    return NextResponse.json({ error: "Login não configurado." }, { status: 500 });
  }

  const normalized = email.trim().toLowerCase();

  // Só envia o link para quem tem alguma compra registrada.
  const purchased = await getPurchasedProducts(normalized);
  if (purchased.length === 0) {
    return NextResponse.json(
      {
        error:
          "Não encontramos uma compra com esse e-mail. Confira se você usou o mesmo e-mail da compra.",
      },
      { status: 404 }
    );
  }

  const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, "");
  await redis.set(`magic:${token}`, normalized, { ex: TOKEN_TTL });

  // Código de 6 dígitos (alternativa ao link).
  const code = String(Math.floor(100000 + Math.random() * 900000));
  await redis.set(`code:${normalized}`, code, { ex: TOKEN_TTL });

  const link = `${new URL(req.url).origin}/api/auth/verify?token=${token}`;

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
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
  } catch (err) {
    console.error("Erro ao enviar e-mail de login:", err);
    return NextResponse.json({ error: "Não foi possível enviar o e-mail." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
