// Gera src/content/design-pack/<estilo>/{DESIGN.md,tokens.css,theme.tailwind.css,tokens.json}
// a partir de src/content/design-pack/source/<estilo>.json.  Uso: npm run design-pack:build
import fs from "node:fs";
import path from "node:path";
import { PACK_DIR, STYLE_IDS, loadStyle, outputs, contrastRows } from "./lib.mjs";

for (const id of STYLE_IDS) {
  const style = loadStyle(id);
  const dir = path.join(PACK_DIR, id);
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, content] of Object.entries(outputs(style))) {
    fs.writeFileSync(path.join(dir, name), content);
  }
  const rows = contrastRows(style);
  console.log(`\n${style.name}: ${Object.keys(style.tokens).length} tokens`);
  for (const r of rows) {
    console.log(`  ${r.pass ? "ok " : "ERRO"} ${r.ratio.toFixed(2).padStart(5)}:1  ${r.fg} sobre ${r.bg}`);
  }
}
