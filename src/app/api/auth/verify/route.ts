import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const projetosUrl = new URL("/projetos", req.url);

  if (!token) {
    projetosUrl.searchParams.set("erro", "token");
    return NextResponse.redirect(projetosUrl);
  }

  // Consome o token (uso único).
  const email = await redis.getdel<string>(`magic:${token}`);
  if (!email) {
    projetosUrl.searchParams.set("erro", "expirado");
    return NextResponse.redirect(projetosUrl);
  }

  const jwt = await createSessionToken(email);
  projetosUrl.searchParams.set("logado", "1");

  const res = NextResponse.redirect(projetosUrl);
  res.cookies.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
