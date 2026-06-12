import { NextRequest, NextResponse } from "next/server";
import { grantAccess } from "@/lib/access";
import { premium } from "@/lib/premium";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  const { password, emails } = await req.json();

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  if (!Array.isArray(emails) || emails.length === 0) {
    return NextResponse.json({ error: "Nenhum e-mail informado." }, { status: 400 });
  }

  const normalized = emails
    .map((e) => String(e).trim().toLowerCase())
    .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

  if (normalized.length === 0) {
    return NextResponse.json({ error: "Nenhum e-mail válido." }, { status: 400 });
  }

  await Promise.all(normalized.map((email) => grantAccess(email, premium.productId)));

  return NextResponse.json({ ok: true, granted: normalized });
}
