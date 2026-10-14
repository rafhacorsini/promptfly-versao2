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

/** Pares texto/fundo que cada estilo precisa passar. Mínimo 4.5 = WCAG AA para texto normal. */
export const PAIRS = [
  ["color-ink", "color-canvas", "Texto principal sobre o fundo"],
  ["color-ink", "color-band", "Texto principal sobre faixas e cartões"],
  ["color-muted", "color-canvas", "Texto secundário sobre o fundo"],
  ["color-muted", "color-band", "Texto secundário sobre faixas e cartões"],
  ["color-link", "color-canvas", "Link sobre o fundo"],
  ["color-link", "color-band", "Link sobre faixas e cartões"],
  ["color-cta-ink", "color-cta", "Texto do botão de conversão"],
  ["color-status", "color-canvas", "Texto de status sobre o fundo"],
  ["color-status", "color-band", "Texto de status sobre faixas e cartões"],
];
export const MIN_RATIO = 4.5;

export function contrastRows(style) {
  return PAIRS.map(([fg, bg, label]) => {
    const r = ratio(style.tokens[fg], style.tokens[bg]);
    return { fg, bg, label, ratio: Math.round(r * 100) / 100, min: MIN_RATIO, pass: r >= MIN_RATIO };
  });
}

/* ---------- descrições (uso) de cada token ---------- */

const USO = {
  "color-canvas": "Fundo padrão de todas as seções.",
  "color-band": "Faixas de largura total que alternam com o fundo, cartões e rodapé.",
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
  "spacing-section": "Distância entre seções grandes.",
  "spacing-gap": "Distância entre elementos relacionados.",
  "spacing-card": "Respiro interno dos cartões.",
};
const TEXTOS = {
  hero: "Frase de impacto do hero.",
  heading: "Título de seção.",
  body: "Parágrafos e navegação.",
  small: "Texto de apoio.",
  caption: "Legenda, rótulo e texto de botão pequeno.",
};
const PROPS = {
  "": "tamanho",
  "--line-height": "altura da linha",
  "--letter-spacing": "espaçamento entre letras",
  "--font-weight": "peso",
};

export function uso(token) {
  if (USO[token]) return USO[token];
  const m = /^text-(hero|heading|body|small|caption)(--[a-z-]+)?$/.exec(token);
  if (m) return `${TEXTOS[m[1]]} (${PROPS[m[2] ?? ""]})`;
  throw new Error(`Token sem descrição: ${token}`);
}

/* ---------- geradores ---------- */

const GRUPOS = [
  ["Cores", (t) => t.startsWith("color-")],
  ["Fontes", (t) => t.startsWith("font-")],
  ["Tipografia", (t) => t.startsWith("text-")],
  ["Raio e espaço", (t) => t.startsWith("radius-") || t.startsWith("spacing-")],
];

function lines(style, indent) {
  return Object.entries(style.tokens)
    .map(([k, v]) => `${indent}--${k}: ${v};`)
    .join("\n");
}

export function genCss(style) {
  return `/* ${style.name} · tokens.css · Promptfly Design Pack (promptfly.com.br)
   Importe uma vez no CSS global. Os mesmos valores estão em theme.tailwind.css, tokens.json e DESIGN.md. */
:root {
${lines(style, "  ")}
}
`;
}

export function genTailwind(style) {
  return `/* ${style.name} · theme.tailwind.css · Promptfly Design Pack (promptfly.com.br)
   Tailwind v4. No CSS global: @import "tailwindcss"; @import "./theme.tailwind.css";
   Gera classes como bg-canvas, text-ink, rounded-card, p-section e text-hero. */
@theme {
${lines(style, "  ")}
}
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

export function genDesignMd(style) {
  const tabelas = GRUPOS.map(([titulo, filtro]) => {
    const rows = Object.entries(style.tokens)
      .filter(([k]) => filtro(k))
      .map(([k, v]) => `| \`${k}\` | \`${v.replace(/\|/g, "\\|")}\` | ${uso(k)} |`)
      .join("\n");
    return `### ${titulo}\n\n| Token | Valor | Uso |\n|---|---|---|\n${rows}`;
  }).join("\n\n");

  const contraste = contrastRows(style)
    .map((r) => `| ${r.fg} | ${r.bg} | ${r.ratio.toFixed(2)}:1 | ${r.min}:1 | ${r.pass ? "Passa" : "Falha"} |`)
    .join("\n");

  return `# DESIGN.md: ${style.name}

${style.summary}

> **Como usar:** salve este arquivo na raiz do projeto. No CLAUDE.md, escreva: "Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md". Os valores abaixo são a lei. Se precisar de um valor que não está aqui, pergunte antes de inventar.

## Tokens

Os mesmos valores estão em tokens.css, theme.tailwind.css e tokens.json. Cor, fonte, raio e espaçamento só podem vir desta lista.

${tabelas}

## Contraste (WCAG AA)

Razão de contraste de cada par de texto e fundo. O mínimo para texto normal é 4.5:1.

| Texto | Fundo | Razão | Mínimo | Resultado |
|---|---|---|---|---|
${contraste}

## Faça

${style.do.map((d) => `- ${d}`).join("\n")}

## Não faça

${style.dont.map((d) => `- ${d}`).join("\n")}

## Antes de entregar

- Revise a tela contra cada item de Faça e Não faça e diga quais você conferiu.
- Confirme que nenhuma cor, fonte, raio ou espaçamento fora da tabela de tokens foi usado.
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
