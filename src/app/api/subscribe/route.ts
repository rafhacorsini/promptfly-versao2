import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE, subscribeToNewsletter } from "@/lib/beehiiv";

export async function POST(request: NextRequest) {
  const { email, utm_source, utm_campaign } = await request.json();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const result = await subscribeToNewsletter(email, {
    source: utm_source,
    campaign: utm_campaign,
    medium: "site",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ success: true });
}
