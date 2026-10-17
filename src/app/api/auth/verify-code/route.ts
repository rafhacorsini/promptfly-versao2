import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";
import { clientIp, safeEqual } from "@/lib/security-core";
import { recordFailure, withinLimit } from "@/lib/rate-limit";

const MAX_GUESSES = 5; // depois disso o código é apagado e precisa pedir outro
const PER_IP_PER_HOUR = 30;

export async function POST(req: NextRequest) {
  let email: string, code: string;
  try {
    ({ email, code } = await req.json());
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const normalized = (typeof email === "string" ? email : "").trim().toLowerCase();
  const clean = (typeof code === "string" ? code : "").trim();

  if (!normalized || !/^\d{6}$/.test(clean)) {
    return NextResponse.json({ error: "Código inválido." }, { status: 400 });
  }

  if (!(await withinLimit("code-ip", clientIp(req.headers), PER_IP_PER_HOUR, 3600))) {
    return NextResponse.json({ error: "Muitas tentativas. Tente de novo mais tarde." }, { status: 429 });
  }

  const stored = await redis.get<string | number>(`code:${normalized}`);
  // O Redis pode devolver o código como número (perde o zero da frente).
  const expected = stored == null ? "" : String(stored).padStart(6, "0");
  if (!safeEqual(clean, expected)) {
    if (expected) {
      const n = await recordFailure(`codefail:${normalized}`, 60 * 15);
      if (n >= MAX_GUESSES) {
        await redis.del(`code:${normalized}`, `codefail:${normalized}`);
        return NextResponse.json(
          { error: "Muitas tentativas erradas. Peça um novo código." },
          { status: 429 }
        );
      }
    }
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
