import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const PACK = path.join(ROOT, "src/content/wireframe-pack");
const PUBLIC = path.join(ROOT, "public/wireframes");
const manifest = JSON.parse(fs.readFileSync(path.join(PACK, "manifest.json"), "utf8"));

const listFiles = (dir) => fs.readdirSync(dir).filter((f) => !fs.statSync(path.join(dir, f)).isDirectory());

test("manifesto: ids únicos e todos os campos preenchidos", () => {
  assert.ok(manifest.length >= 1);
  const ids = new Set();
  for (const m of manifest) {
    assert.ok(!ids.has(m.id), `id repetido: ${m.id}`);
    ids.add(m.id);
    for (const k of ["id", "title", "niche", "notes", "wireframe", "example"]) {
      assert.ok(typeof m[k] === "string" && m[k].trim().length > 0, `${m.id}: campo vazio: ${k}`);
    }
    assert.match(m.id, /^wireframe-\d{2}$/, "id deve ser wireframe-NN (a página monta os caminhos por ele)");
  }
});

test("cada item do manifesto tem o wireframe e o exemplo dentro do pack", () => {
  for (const m of manifest) {
    assert.ok(fs.existsSync(path.join(PACK, m.wireframe)), `falta ${m.wireframe}`);
    assert.ok(fs.existsSync(path.join(PACK, m.example)), `falta ${m.example}`);
  }
});

test("nenhuma imagem do pack ficou fora do manifesto", () => {
  const listadas = new Set(manifest.flatMap((m) => [m.wireframe, m.example]));
  for (const pasta of ["wireframes", "exemplos"]) {
    for (const f of listFiles(path.join(PACK, pasta))) {
      assert.ok(listadas.has(`${pasta}/${f}`), `${pasta}/${f} não está no manifest.json`);
    }
  }
});

test("as miniaturas públicas (/public/wireframes) existem e são iguais às do pack", () => {
  for (const m of manifest) {
    const n = m.id.replace("wireframe-", "");
    const pares = [
      [m.wireframe, `wireframe-${n}.png`],
      [m.example, `site-${n}.jpg`],
    ];
    for (const [dentro, publica] of pares) {
      const a = path.join(PACK, dentro);
      const b = path.join(PUBLIC, publica);
      assert.ok(fs.existsSync(b), `falta public/wireframes/${publica}`);
      assert.ok(fs.readFileSync(a).equals(fs.readFileSync(b)), `${dentro} difere de public/wireframes/${publica}`);
    }
  }
});

test("LEIA-ME.md e PROMPTS.md existem, citam o essencial e não têm travessão", () => {
  const leia = fs.readFileSync(path.join(PACK, "LEIA-ME.md"), "utf8");
  const prompts = fs.readFileSync(path.join(PACK, "PROMPTS.md"), "utf8");
  assert.ok(leia.includes("PROMPTS.md") && leia.includes("wireframes/") && leia.includes("exemplos/"));
  assert.ok(prompts.includes("[DESCREVA O SEU PROJETO]"), "o pedido básico precisa do espaço pro tema");
  assert.ok(prompts.includes("DESIGN.md") && prompts.includes("ANTI_PATTERNS.md"));
  for (const [nome, txt] of [["LEIA-ME.md", leia], ["PROMPTS.md", prompts], ["manifest.json", JSON.stringify(manifest)]]) {
    assert.ok(!txt.includes("—"), `${nome} tem travessão`);
  }
});

test("o guia e a página usam só imagens que existem", () => {
  const guia = fs.readFileSync(path.join(ROOT, "src/content/guias/como-criar-sites-com-wireframes.mdx"), "utf8");
  const usados = [...guia.matchAll(/<WireframePair id="(wireframe-\d{2})"/g)].map((m) => m[1]);
  assert.ok(usados.length >= 1);
  const ids = new Set(manifest.map((m) => m.id));
  for (const id of usados) assert.ok(ids.has(id), `guia usa ${id}, que não está no manifest`);
  assert.ok(!guia.includes("—"), "o guia tem travessão");
});
