import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO ?? "rafhacorsini/promptfly-versao2";
const FILE_PATH = "src/content/template-product.json";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  const { password, data } = await req.json();

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: "GITHUB_TOKEN não configurado." }, { status: 500 });
  }

  const apiBase = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  // Get current file SHA (required for update)
  const getRes = await fetch(apiBase, { headers });
  if (!getRes.ok) {
    return NextResponse.json({ error: "Não foi possível ler o arquivo no GitHub." }, { status: 500 });
  }
  const { sha } = await getRes.json();

  // Commit updated file
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
  const putRes = await fetch(apiBase, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "admin: atualiza template-product.json",
      content,
      sha,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json();
    return NextResponse.json({ error: err.message ?? "Erro ao salvar." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
