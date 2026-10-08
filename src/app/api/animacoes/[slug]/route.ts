import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/session";
import { hasAccess } from "@/lib/access";
import { premium } from "@/lib/premium";
import { getAnimacao } from "@/content/animacoes";
import { getAnimacaoConteudo } from "@/lib/animacoes";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const animacao = getAnimacao(slug);
  const conteudo = getAnimacaoConteudo(slug);
  if (!animacao || !conteudo) {
    return NextResponse.json({ error: "Animação não encontrada." }, { status: 404 });
  }

  // Animação grátis: prompt e código são públicos.
  if (animacao.access === "free") return NextResponse.json(conteudo);

  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ error: "Faça login para acessar." }, { status: 401 });
  }
  if (!(await hasAccess(email, premium.productId))) {
    return NextResponse.json({ error: "Essa animação faz parte do Premium." }, { status: 403 });
  }
  return NextResponse.json(conteudo);
}
