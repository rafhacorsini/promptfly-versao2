import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

// Chamado uma vez por dia pelo Vercel Cron (vercel.json).
// O plano grátis do Upstash apaga o banco depois de 14 dias sem nenhum comando:
// um PING por dia mantém o banco ativo mesmo sem login nem venda no período.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Se CRON_SECRET existir na Vercel, o cron manda "Authorization: Bearer <segredo>".
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const pong = await redis.ping();
  return NextResponse.json({ ok: pong === "PONG" });
}
