// Fonte única do pacote de design: cada estilo vive em src/content/design-pack/source/<id>.json
// e daqui saem os 4 arquivos (DESIGN.md, tokens.css, theme.tailwind.css, tokens.json).
// O teste (design-pack.test.mjs) lê os arquivos gerados de volta e compara com a fonte.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, "../..");
export const PACK_DIR = path.join(ROOT, "src/content/design-pack");
export const SOURCE_DIR = path.join(PACK_DIR, "source");

export const STYLE_IDS = ["vitrine", "noite", "editorial"];
export const TOKEN_COUNT = 52;

export function loadStyle(id) {
  return JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, `${id}.json`), "utf8"));
}

/* ---------- contraste WCAG ---------- */

function channel(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`Cor inválida: ${hex}`);
  const n = parseInt(m[1], 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

export function ratio(fg, bg) {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Pares que cada estilo precisa passar. Texto normal: 4.5:1 (WCAG AA).
 * Contorno de controle (campo, botão contornado): 3:1 (WCAG 1.4.11, componentes de interface).
 */
export const PAIRS = [
  ["color-ink", "color-canvas", "Texto principal sobre o fundo", 4.5],
  ["color-ink", "color-band", "Texto principal sobre faixas", 4.5],
  ["color-ink", "color-paper", "Texto principal sobre cartões e menus", 4.5],
  ["color-muted", "color-canvas", "Texto secundário sobre o fundo", 4.5],
  ["color-muted", "color-band", "Texto secundário sobre faixas", 4.5],
  ["color-link", "color-canvas", "Link sobre o fundo", 4.5],
  ["color-link", "color-band", "Link sobre faixas", 4.5],
  ["color-cta-ink", "color-cta", "Texto do botão de conversão", 4.5],
  ["color-status", "color-canvas", "Texto de status sobre o fundo", 4.5],
  ["color-status", "color-band", "Texto de status sobre faixas", 4.5],
  ["color-outline", "color-canvas", "Contorno de campo sobre o fundo", 3],
  ["color-outline", "color-band", "Contorno de campo sobre faixas", 3],
];

export function contrastRows(style) {
  return PAIRS.map(([fg, bg, label, min]) => {
    const r = ratio(style.tokens[fg], style.tokens[bg]);
    return { fg, bg, label, ratio: Math.round(r * 100) / 100, min, pass: r >= min };
  });
}

/* ---------- descrições (uso) de cada token ---------- */

const USO = {
  "color-canvas": "Fundo padrão de todas as seções.",
  "color-band": "Faixas de largura total que alternam com o fundo e o rodapé.",
  "color-paper": "Menu aberto, cartões sobre faixa e preenchimentos secundários.",
  "color-control": "Controles desativados, trilhas e superfícies discretas.",
  "color-outline": "Contorno de campos e botões contornados, indicadores inativos.",
  "color-ink": "Títulos e texto principal.",
  "color-muted": "Texto secundário, legendas e textos legais.",
  "color-line": "Divisórias de 1px e contornos discretos. Nunca como cor de texto.",
  "color-link": "Links dentro de texto e links de seção.",
  "color-cta": "Fundo do botão de conversão. Só em botões pequenos.",
  "color-cta-ink": "Texto por cima do botão de conversão.",
  "color-status": "Texto simples de status (ex: Novo). Sem fundo e sem pílula.",
  "font-display": "Família dos títulos e frases de impacto.",
  "font-text": "Família de navegação, parágrafos, links e botões.",
  "radius-card": "Cartões e mídias contidas.",
  "radius-pill": "Botões e pílulas.",
  "radius-input": "Campos de formulário.",
  "radius-nav": "Barra de navegação flutuante.",
  "radius-link": "Links com área de toque e tags pequenas.",
  "shadow-ring": "Anel de 1px discreto. Não é elevação.",
  "shadow-ring-strong": "Anel de 1px para controle selecionado ou contornado.",
  "spacing-section": "Distância entre seções grandes.",
  "spacing-gap": "Distância entre elementos relacionados.",
  "spacing-card": "Respiro interno dos cartões.",
};
const TEXTOS = {
  hero: "Frase de impacto do hero.",
  heading: "Título de seção e frase de recurso.",
  title: "Nome do produto na barra e títulos pequenos.",
  kicker: "Rótulo curto acima de uma frase.",
  body: "Parágrafos e navegação de seção.",
  small: "Texto de apoio e preços.",
  caption: "Legenda, rótulo e texto de botão pequeno.",
};
const PROPS = {
  "": "tamanho",
  "--line-height": "altura da linha",
  "--letter-spacing": "espaçamento entre letras",
  "--font-weight": "peso",
};
const TEXT_ORDER = ["hero", "heading", "title", "kicker", "body", "small", "caption"];

export function uso(token) {
  if (USO[token]) return USO[token];
  const m = /^text-(hero|heading|title|kicker|body|small|caption)(--[a-z-]+)?$/.exec(token);
  if (m) return `${TEXTOS[m[1]]} (${PROPS[m[2] ?? ""]})`;
  throw new Error(`Token sem descrição: ${token}`);
}

/* ---------- geradores ---------- */

const GRUPOS = [
  ["Cores", (t) => t.startsWith("color-")],
  ["Fontes", (t) => t.startsWith("font-")],
  ["Tipografia", (t) => t.startsWith("text-")],
  ["Raio e espaço", (t) => t.startsWith("radius-") || t.startsWith("spacing-")],
  ["Sombras", (t) => t.startsWith("shadow-")],
];

function lines(style, indent) {
  return Object.entries(style.tokens)
    .map(([k, v]) => `${indent}--${k}: ${v};`)
    .join("\n");
}

export function cssBlock(style) {
  return `:root {\n${lines(style, "  ")}\n}`;
}
export function tailwindBlock(style) {
  return `@theme {\n${lines(style, "  ")}\n}`;
}

export function genCss(style) {
  return `/* ${style.name} · tokens.css · Promptfly Design Pack (promptfly.com.br)
   Importe uma vez no CSS global. Os mesmos valores estão em theme.tailwind.css, tokens.json e DESIGN.md. */
${cssBlock(style)}
`;
}

export function genTailwind(style) {
  return `/* ${style.name} · theme.tailwind.css · Promptfly Design Pack (promptfly.com.br)
   Tailwind v4. No CSS global: @import "tailwindcss"; @import "./theme.tailwind.css";
   Gera classes como bg-canvas, text-ink, rounded-card, p-section e text-hero. */
${tailwindBlock(style)}
`;
}

export function genJson(style) {
  const out = {
    id: style.id,
    name: style.name,
    mode: style.mode,
    tokens: style.tokens,
    contrast: contrastRows(style).map(({ fg, bg, ratio: r, min }) => ({ text: fg, background: bg, ratio: r, min })),
  };
  return JSON.stringify(out, null, 2) + "\n";
}

function scaleTable(style) {
  const t = style.tokens;
  const rows = TEXT_ORDER.map((r) => {
    const fam = r === "hero" || r === "heading" || r === "title" || r === "kicker" ? "font-display" : "font-text";
    return `| ${r} | ${fam} | ${t[`text-${r}--font-weight`]} | ${t[`text-${r}`]} | ${t[`text-${r}--line-height`]} | ${t[`text-${r}--letter-spacing`]} |`;
  }).join("\n");
  return `### Escala tipográfica\n\n| Papel | Família | Peso | Tamanho | Altura da linha | Espaçamento |\n|---|---|---|---|---|---|\n${rows}`;
}

const SURFACES = [
  ["color-canvas", "Fundo padrão, hero, navegação do produto e cartões sobre faixa."],
  ["color-band", "Faixa de largura total, palco de carrossel, área muda e rodapé."],
  ["color-paper", "Camada do menu aberto e preenchimento secundário."],
  ["color-control", "Preenchimento de controle desativado ou discreto e borda fina de navegação."],
];

export function genDesignMd(style) {
  const t = style.tokens;
  const tabelas = GRUPOS.map(([titulo, filtro]) => {
    const rows = Object.entries(t)
      .filter(([k]) => filtro(k))
      .map(([k, v]) => `| \`${k}\` | \`${v.replace(/\|/g, "\\|")}\` | ${uso(k)} |`)
      .join("\n");
    const extra = titulo === "Tipografia" ? `\n\n${scaleTable(style)}` : "";
    return `### ${titulo}\n\n| Token | Valor | Uso |\n|---|---|---|\n${rows}${extra}`;
  }).join("\n\n");

  const contraste = contrastRows(style)
    .map((r) => `| ${r.fg} | ${r.bg} | ${r.ratio.toFixed(2)}:1 | ${r.min}:1 | ${r.pass ? "Passa" : "Falha"} |`)
    .join("\n");

  const componentes = style.components
    .map((c) => `### ${c.name}\n**Papel:** ${c.role}\n\n${c.spec}`)
    .join("\n\n");

  const superficies = SURFACES.map(([k, p], i) => `| ${i} | \`${k}\` | \`${t[k]}\` | ${p} |`).join("\n");

  const cores = Object.entries(t)
    .filter(([k]) => k.startsWith("color-"))
    .map(([k, v]) => `- \`${k}\`: ${v}. ${uso(k)}`)
    .join("\n");

  return `# DESIGN.md: ${style.name}

> ${style.tagline}

**Tema:** ${style.mode}

${style.summary}

> **Como usar:** salve este arquivo na raiz do projeto. No CLAUDE.md, escreva: "Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md". Os valores abaixo são a lei. Se precisar de um valor que não está aqui, pergunte antes de inventar.

## Tokens

Os mesmos valores estão em tokens.css, theme.tailwind.css e tokens.json. Cor, fonte, raio, sombra e espaçamento só podem vir desta lista.

${tabelas}

## Contraste (WCAG AA)

Razão de contraste de cada par. O mínimo é 4.5:1 para texto normal e 3:1 para contornos de controles.

| Texto ou contorno | Fundo | Razão | Mínimo | Resultado |
|---|---|---|---|---|
${contraste}

## Componentes

${componentes}

## Faça

${style.do.map((d) => `- ${d}`).join("\n")}

## Não faça

${style.dont.map((d) => `- ${d}`).join("\n")}

## Superfícies

| Nível | Token | Valor | Uso |
|---|---|---|---|
${superficies}

## Elevação

${style.elevation}

## Imagens

${style.imagery}

## Layout

${style.layout}

## Guia para a IA

Referência rápida de cores:

${cores}

Pedidos prontos (cole no Claude Code, no ChatGPT ou no Gemini):

${style.prompts.map((p) => `- ${p}`).join("\n")}

## Início rápido

### Variáveis CSS

\`\`\`css
${cssBlock(style)}
\`\`\`

### Tailwind v4

\`\`\`css
${tailwindBlock(style)}
\`\`\`

## Antes de entregar

- Revise a tela contra cada item de Faça e Não faça e diga quais você conferiu.
- Confirme que nenhuma cor, fonte, raio, sombra ou espaçamento fora da tabela de tokens foi usado.
- Teste em 360px, 768px e 1280px, sem rolagem horizontal e com navegação por teclado.
`;
}

export function outputs(style) {
  return {
    "DESIGN.md": genDesignMd(style),
    "tokens.css": genCss(style),
    "theme.tailwind.css": genTailwind(style),
    "tokens.json": genJson(style),
  };
}
