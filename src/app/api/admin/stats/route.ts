import { NextRequest, NextResponse } from "next/server";
import { readEvents, readSales } from "@/lib/stats";
import { checkAdminPassword } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** Inscritos ativos da newsletter agrupados por origem (utm_source), direto do Beehiiv. */
async function newsletterBySource() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) return null;

  const bySource: Record<string, number> = {};
  let total = 0;
  let cursor: string | undefined;
  for (let page = 0; page < 20; page++) {
    const url = new URL(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`);
    url.searchParams.set("limit", "100");
    url.searchParams.set("status", "active");
    if (cursor) url.searchParams.set("cursor", cursor);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` }, cache: "no-store" });
    if (!res.ok) break;
    const json = await res.json();
    for (const s of json.data ?? []) {
      const k = String(s.utm_source || "sem origem");
      bySource[k] = (bySource[k] ?? 0) + 1;
      total++;
    }
    if (!json.has_more || !json.next_cursor) break;
    cursor = json.next_cursor;
  }
  return { total, bySource };
}

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}));
  const denied = await checkAdminPassword(req, password);
  if (denied) return denied;

  const [events, sales, newsletter] = await Promise.all([readEvents(), readSales(), newsletterBySource()]);
  return NextResponse.json({ events, sales, newsletter });
}
