import fs from "fs";
import path from "path";
import { animacoes, getAnimacao, type Animacao } from "@/content/animacoes";
import { prompts } from "@/content/animacoes/prompts";

/**
 * Só no servidor. Lê o código (o próprio demo) e o prompt de cada animação.
 * O que vai pro navegador é AnimacaoView: conteúdo só nas grátis.
 */
export type AnimacaoConteudo = { prompt: string; code: string };
export type AnimacaoView = Animacao & Partial<AnimacaoConteudo>;

const DIR = path.join(process.cwd(), "src/content/animacoes");

export function getAnimacaoConteudo(slug: string): AnimacaoConteudo | null {
  if (!getAnimacao(slug)) return null;
  const code = fs.readFileSync(path.join(DIR, `${slug}.html`), "utf8").trimEnd();
  return { prompt: prompts[slug] ?? "", code };
}

export function getAnimacoesView(): AnimacaoView[] {
  return animacoes.map((a) =>
    a.access === "free" ? { ...a, ...getAnimacaoConteudo(a.slug)! } : a
  );
}

/** Prompt + código num texto só, pra quem quer colar tudo de uma vez na IA. */
export function promptComCodigo({ prompt, code }: AnimacaoConteudo): string {
  return `${prompt}\n\nCÓDIGO DE REFERÊNCIA\n\n${code}`;
}
