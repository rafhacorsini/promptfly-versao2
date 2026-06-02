import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/session";
import { getPurchasedProducts } from "@/lib/access";

export async function GET() {
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ email: null, purchased: [] });
  }
  const purchased = await getPurchasedProducts(email);
  return NextResponse.json({ email, purchased });
}
