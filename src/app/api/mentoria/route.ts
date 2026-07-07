import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/html";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const {
    nome,
    email,
    whatsapp,
    ferramentasIA,
    usaClaude,
    nivel,
    creditos,
    objetivo,
    projetoAtual,
    dataPreferida,
    horario,
    observacoes,
  } = body as Record<string, string | string[] | undefined>;

  if (!nome || !email || !whatsapp || !objetivo || !projetoAtual || !dataPreferida) {
    return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email as string)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;
  const to = process.env.MENTORIA_NOTIFY_EMAIL || "rafhaelcorsini@gmail.com";

  if (!apiKey || !from) {
    return NextResponse.json({ error: "Envio não configurado." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const dataFormatada = new Date(`${dataPreferida}T00:00:00`).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const ferramentas = Array.isArray(ferramentasIA) && ferramentasIA.length
    ? ferramentasIA.map(escapeHtml).join(", ")
    : "Nenhuma informada";

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1A1A1A">
      <h2 style="margin:0 0 16px">Novo pedido de mentoria</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
      <p><strong>Data preferida:</strong> ${escapeHtml(dataFormatada)} às ${escapeHtml(horario)}</p>
      <p><strong>IAs usadas no dia a dia:</strong> ${ferramentas}</p>
      <p><strong>Usa Claude:</strong> ${escapeHtml(usaClaude)}</p>
      <p><strong>Nível de experiência:</strong> ${escapeHtml(nivel)}</p>
      <p><strong>Pode aumentar créditos de IA para a sessão:</strong> ${escapeHtml(creditos)}</p>
      <p><strong>Objetivo da mentoria:</strong><br/>${escapeHtml(objetivo)}</p>
      <p><strong>Projeto atual / o que já tentou:</strong><br/>${escapeHtml(projetoAtual)}</p>
      ${observacoes ? `<p><strong>Observações:</strong><br/>${escapeHtml(observacoes)}</p>` : ""}
    </div>
  `;

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email as string,
      subject: `Pedido de mentoria — ${nome}`,
      html,
    });
  } catch (err) {
    console.error("Erro ao enviar e-mail de mentoria:", err);
    return NextResponse.json({ error: "Não foi possível enviar. Tente novamente." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
