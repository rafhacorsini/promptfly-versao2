import { NextRequest, NextResponse } from "next/server";
import { stopDrip } from "@/lib/drip";
import { verifyUnsubscribeToken } from "@/lib/drip-core";
import { clientIp } from "@/lib/security-core";
import { withinLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * Descadastro das sequências de e-mail. Só aceita POST de propósito: programas de
 * segurança de e-mail abrem links (GET) sozinhos e descadastrariam a pessoa sem ela querer.
 * Dois jeitos de chegar aqui:
 *  - botão da página /emails/sair (formulário, campos e, t e from=page);
 *  - "um clique" do Gmail/Apple Mail (cabeçalho List-Unsubscribe-Post), com e e t na URL.
 */
export async function POST(req: NextRequest) {
  let email = req.nextUrl.searchParams.get("e") ?? "";
  let token: string = req.nextUrl.searchParams.get("t") ?? "";
  let fromPage = false;

  const type = req.headers.get("content-type") ?? "";
  if (type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data")) {
    const form = await req.formData().catch(() => null);
    if (form) {
      email = String(form.get("e") ?? email);
      token = String(form.get("t") ?? token);
      fromPage = form.get("from") === "page";
    }
  }

  if (!(await withinLimit("unsub", clientIp(req.headers), 30, 3600))) {
    return NextResponse.json({ error: "Muitas tentativas." }, { status: 429 });
  }

  const secret = process.env.AUTH_SECRET ?? "";
  if (!email || email.length > 254 || !verifyUnsubscribeToken(email, token, secret)) {
    return NextResponse.json({ error: "Link inválido." }, { status: 400 });
  }

  await stopDrip(email);

  if (fromPage) return NextResponse.redirect(new URL("/emails/sair?feito=1", req.url), 303);
  return NextResponse.json({ ok: true });
}
