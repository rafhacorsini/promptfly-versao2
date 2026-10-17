import { NextRequest, NextResponse } from "next/server";
import { processAllDue } from "@/lib/drip";

// Chamado uma vez por dia pelo Vercel Cron (vercel.json): manda os e-mails da sequência
// que estão na vez e tenta de novo os que falharam.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  // Se CRON_SECRET existir na Vercel, o cron manda "Authorization: Bearer <segredo>".
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const resumo = await processAllDue();
  return NextResponse.json({ ok: true, resumo });
}
