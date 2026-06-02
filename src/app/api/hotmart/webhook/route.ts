import { NextRequest, NextResponse } from "next/server";
import { grantAccess, revokeAccess } from "@/lib/access";

// Eventos que LIBERAM acesso
const GRANT_EVENTS = new Set([
  "PURCHASE_APPROVED",
  "PURCHASE_COMPLETE",
  "PURCHASE_PROTEST", // protesto resolvido em alguns fluxos — tratamos como ativo
]);

// Eventos que REVOGAM acesso
const REVOKE_EVENTS = new Set([
  "PURCHASE_REFUNDED",
  "PURCHASE_CHARGEBACK",
  "PURCHASE_CANCELED",
  "PURCHASE_EXPIRED",
  "SUBSCRIPTION_CANCELLATION",
]);

// Health check — o Hotmart valida a URL ao salvar a configuração.
export async function GET() {
  return NextResponse.json({ ok: true, service: "hotmart-webhook" });
}

export async function POST(req: NextRequest) {
  const expected = process.env.HOTMART_HOTTOK;
  if (!expected) {
    return NextResponse.json({ error: "HOTMART_HOTTOK não configurado." }, { status: 500 });
  }

  // O Hotmart envia o token no header (2.0) ou no corpo (1.0).
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const headerToken =
    req.headers.get("x-hotmart-hottok") ?? req.headers.get("X-HOTMART-HOTTOK");
  const bodyToken = typeof body.hottok === "string" ? body.hottok : undefined;
  const token = headerToken ?? bodyToken;

  if (token !== expected) {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }

  // Extrai evento, e-mail do comprador e ID do produto (formato 2.0 do Hotmart).
  const event = String(body.event ?? "");
  const data = (body.data ?? {}) as {
    buyer?: { email?: string };
    product?: { id?: number | string };
  };
  const email = data.buyer?.email;
  const productId = data.product?.id != null ? String(data.product.id) : undefined;

  if (!email || !productId) {
    // Não é um evento de compra que conseguimos processar — confirma recebimento.
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    if (GRANT_EVENTS.has(event)) {
      await grantAccess(email, productId);
    } else if (REVOKE_EVENTS.has(event)) {
      await revokeAccess(email, productId);
    }
  } catch (err) {
    console.error("Hotmart webhook — erro ao gravar acesso:", err);
    return NextResponse.json({ error: "Erro ao processar." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
