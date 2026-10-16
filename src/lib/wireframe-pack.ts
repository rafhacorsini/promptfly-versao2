import fs from "node:fs";
import path from "node:path";
import { zipSync } from "fflate";

// Igual ao Design Pack: os arquivos ficam fora de /public e só saem pelo
// /api/wireframe-pack, depois de informar o e-mail. (As miniaturas de exemplo da
// página ficam em /public/wireframes e são só uma amostra.)
const PACK_DIR = path.join(process.cwd(), "src/content/wireframe-pack");
const ROOT = "promptfly-wireframe-pack";

function walk(dir: string, base = ""): string[] {
  return fs.readdirSync(path.join(dir, base), { withFileTypes: true }).flatMap((e) => {
    const rel = base ? `${base}/${e.name}` : e.name;
    return e.isDirectory() ? walk(dir, rel) : [rel];
  });
}

/** Monta o .zip com tudo que está em src/content/wireframe-pack, menos o manifest.json. */
export function buildWireframeZip(): Uint8Array {
  const files: Record<string, Uint8Array> = {};
  for (const rel of walk(PACK_DIR)) {
    if (rel === "manifest.json") continue;
    files[`${ROOT}/${rel}`] = new Uint8Array(fs.readFileSync(path.join(PACK_DIR, rel)));
  }
  return zipSync(files, { level: 9 });
}
