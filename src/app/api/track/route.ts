import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { clientIp } from "@/lib/security-core";
import { isTrackedEvent, recordEvent } from "@/lib/stats";

export const dynamic = "force-dynamic";

const LIMIT_PER_MINUTE = 60;

// Contador de eventos (cliques e ações). Guarda só contagens, sem IP nem cookie.
export async function POST(req: NextRequest) {
  let body: { event?: unknown; data?: unknown; source?: unknown; campaign?: unknown };
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (!isTrackedEvent(body.event)) return new NextResponse(null, { status: 400 });

  try {
    // Limite simples por IP e por minuto: o IP só vira chave temporária do limite e expira em 60s.
    const ip = clientIp(req.headers);
    const bucket = `rl:track:${ip}:${Math.floor(Date.now() / 60000)}`;
    const n = await redis.incr(bucket);
    if (n === 1) await redis.expire(bucket, 60);
    if (n > LIMIT_PER_MINUTE) return new NextResponse(null, { status: 429 });

    await recordEvent(body.event, { source: body.source, campaign: body.campaign, data: body.data });
  } catch (err) {
    console.error("track:", err);
    return new NextResponse(null, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
