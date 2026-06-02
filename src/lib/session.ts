import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "promptfly_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

function secret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET!);
}

/** Gera o token JWT da sessão para um e-mail. */
export async function createSessionToken(email: string): Promise<string> {
  return await new SignJWT({ email: email.trim().toLowerCase() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());
}

/** Lê o e-mail logado a partir do cookie (ou null se não houver/expirou). */
export async function getSessionEmail(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = MAX_AGE;
