import { NextRequest, NextResponse } from "next/server";
import { grantAccess } from "@/lib/access";
import { premium } from "@/lib/premium";
import { checkAdminPassword } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { password, emails } = await req.json().catch(() => ({}));

  const denied = await checkAdminPassword(req, password);
  if (denied) return denied;

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
