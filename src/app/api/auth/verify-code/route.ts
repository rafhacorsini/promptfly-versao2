import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";

export async function POST(req: NextRequest) {
  let email: string, code: string;
  try {
    ({ email, code } = await req.json());
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const normalized = (email ?? "").trim().toLowerCase();
  const clean = (code ?? "").trim();

  if (!normalized || !/^\d{6}$/.test(clean)) {
    return NextResponse.json({ error: "Código inválido." }, { status: 400 });
  }

  const stored = await redis.get<string>(`code:${normalized}`);
  if (!stored || String(stored) !== clean) {
    return NextResponse.json(
      { error: "Código incorreto ou expirado." },
      { status: 401 }
    );
  }

  // Código de uso único.
  await redis.del(`code:${normalized}`);

  const jwt = await createSessionToken(normalized);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
