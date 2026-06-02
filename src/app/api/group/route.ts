import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/session";
import { hasAccess } from "@/lib/access";
import { premium } from "@/lib/premium";

export async function GET() {
  if (!premium.productId || !premium.groupUrl) {
    return NextResponse.json({ url: null });
  }
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ url: null });
  }
  const allowed = await hasAccess(email, premium.productId);
  return NextResponse.json({
    url: allowed ? premium.groupUrl : null,
    label: premium.groupLabel,
  });
}
