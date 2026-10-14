import fs from "node:fs";
import path from "node:path";
import { strToU8, zipSync } from "fflate";

// O pacote só é lido no servidor: os arquivos não ficam em /public, então a única
// forma de baixar é pelo /api/design-pack, depois de informar o e-mail.
const PACK_DIR = path.join(process.cwd(), "src/content/design-pack");
const STYLE_FILES = ["DESIGN.md", "tokens.css", "theme.tailwind.css", "tokens.json"] as const;

export const STYLE_IDS = ["vitrine", "noite", "editorial"] as const;
export type StyleId = (typeof STYLE_IDS)[number];

/** Valores dos tokens usados só para desenhar a miniatura do estilo na página. */
export interface StylePreview {
  canvas: string;
  band: string;
  paper: string;
  ink: string;
  muted: string;
  line: string;
  cta: string;
  ctaInk: string;
  radiusCard: string;
  radiusPill: string;
  heroWeight: string;
}

export interface StyleSummary {
  id: StyleId;
  name: string;
  mode: string;
  tagline: string;
  bestFor: string;
  preview: StylePreview;
}

const readText = (...p: string[]) => fs.readFileSync(path.join(PACK_DIR, ...p), "utf8");

export function isStyleChoice(v: unknown): v is StyleId | "todos" {
  return v === "todos" || (STYLE_IDS as readonly string[]).includes(v as string);
}

export function listStyles(): StyleSummary[] {
  return STYLE_IDS.map((id) => {
    const s = JSON.parse(readText("source", `${id}.json`));
    const t = s.tokens as Record<string, string>;
    return {
      id,
      name: s.name,
      mode: s.mode,
      tagline: s.tagline,
      bestFor: s.bestFor,
      preview: {
        canvas: t["color-canvas"],
        band: t["color-band"],
        paper: t["color-paper"],
        ink: t["color-ink"],
        muted: t["color-muted"],
        line: t["color-line"],
        cta: t["color-cta"],
        ctaInk: t["color-cta-ink"],
        radiusCard: t["radius-card"],
        radiusPill: t["radius-pill"],
        heroWeight: t["text-hero--font-weight"],
      },
    };
  });
}

/** Monta o .zip: LEIA-ME e ANTI_PATTERNS na raiz e uma pasta por estilo escolhido. */
export function buildZip(choice: StyleId | "todos"): Uint8Array {
  const ids = choice === "todos" ? [...STYLE_IDS] : [choice];
  const root = "promptfly-design-pack";
  const files: Record<string, Uint8Array> = {
    [`${root}/LEIA-ME.md`]: strToU8(readText("shared", "LEIA-ME.md")),
    [`${root}/ANTI_PATTERNS.md`]: strToU8(readText("shared", "ANTI_PATTERNS.md")),
  };
  for (const id of ids) {
    for (const f of STYLE_FILES) files[`${root}/${id}/${f}`] = strToU8(readText(id, f));
  }
  return zipSync(files, { level: 9 });
}
