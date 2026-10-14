import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { PACK_DIR, STYLE_IDS, PAIRS, MIN_RATIO, loadStyle, outputs, ratio, contrastRows } from "../design-pack/lib.mjs";

const read = (...p) => fs.readFileSync(path.join(PACK_DIR, ...p), "utf8");

/** Lê `--nome: valor;` de dentro do bloco `:root { }` ou `@theme { }`. */
function parseCssVars(css, block) {
  const m = new RegExp(`${block}\\s*\\{([\\s\\S]*?)\\n\\}`).exec(css);
  assert.ok(m, `bloco ${block} não encontrado`);
  const out = {};
  for (const line of m[1].split("\n")) {
    const mm = /^\s*--([a-z0-9-]+):\s*(.+);\s*$/.exec(line);
    if (mm) out[mm[1]] = mm[2];
  }
  return out;
}

/** Lê as linhas | `token` | `valor` | uso | das tabelas da seção "## Tokens". */
function parseDesignMdTokens(md) {
  const section = md.split("\n## Contraste")[0].split("\n## Tokens")[1];
  assert.ok(section, "seção Tokens não encontrada no DESIGN.md");
  const out = {};
  for (const line of section.split("\n")) {
    const m = /^\| `([a-z0-9-]+)` \| `(.+)` \| .+ \|$/.exec(line);
    if (m) out[m[1]] = m[2].replace(/\\\|/g, "|");
  }
  return out;
}

for (const id of STYLE_IDS) {
  const style = loadStyle(id);

  test(`${id}: tokens.css, theme.tailwind.css, tokens.json e DESIGN.md têm exatamente os mesmos valores`, () => {
    const fonte = style.tokens;
    const css = parseCssVars(read(id, "tokens.css"), ":root");
    const tailwind = parseCssVars(read(id, "theme.tailwind.css"), "@theme");
    const json = JSON.parse(read(id, "tokens.json")).tokens;
    const md = parseDesignMdTokens(read(id, "DESIGN.md"));

    assert.deepEqual(css, fonte, "tokens.css difere da fonte");
    assert.deepEqual(tailwind, fonte, "theme.tailwind.css difere da fonte");
    assert.deepEqual(json, fonte, "tokens.json difere da fonte");
    assert.deepEqual(md, fonte, "DESIGN.md difere da fonte");
    // as quatro entre si
    assert.deepEqual(css, tailwind);
    assert.deepEqual(css, json);
    assert.deepEqual(css, md);
  });

  test(`${id}: arquivos gerados estão em dia com a fonte (rode npm run design-pack:build)`, () => {
    for (const [name, content] of Object.entries(outputs(style))) {
      assert.equal(read(id, name), content, `${id}/${name} está desatualizado`);
    }
  });

  test(`${id}: todos os pares de texto e fundo passam no contraste WCAG AA`, () => {
    for (const [fg, bg] of PAIRS) {
      const r = ratio(style.tokens[fg], style.tokens[bg]);
      assert.ok(r >= MIN_RATIO, `${id}: ${fg} sobre ${bg} = ${r.toFixed(2)}:1 (mínimo ${MIN_RATIO}:1)`);
    }
  });

  test(`${id}: a tabela de contraste do DESIGN.md bate com o cálculo`, () => {
    const md = read(id, "DESIGN.md");
    for (const row of contrastRows(style)) {
      assert.ok(
        md.includes(`| ${row.fg} | ${row.bg} | ${row.ratio.toFixed(2)}:1 |`),
        `linha de contraste ausente ou errada: ${row.fg} sobre ${row.bg}`,
      );
    }
  });

  test(`${id}: tem os 37 tokens esperados e 7 itens em Faça e Não faça`, () => {
    assert.equal(Object.keys(style.tokens).length, 37);
    assert.equal(style.do.length, 7);
    assert.equal(style.dont.length, 7);
  });
}

test("os três estilos têm exatamente o mesmo conjunto de tokens", () => {
  const [a, ...resto] = STYLE_IDS.map((id) => Object.keys(loadStyle(id).tokens).sort());
  for (const r of resto) assert.deepEqual(r, a);
});

test("nenhum arquivo do pacote usa travessão (regra de copy do site)", () => {
  const files = [];
  for (const id of STYLE_IDS) for (const f of fs.readdirSync(path.join(PACK_DIR, id))) files.push(path.join(id, f));
  files.push("shared/ANTI_PATTERNS.md", "shared/LEIA-ME.md");
  for (const f of files) assert.ok(!read(f).includes("—"), `${f} tem travessão`);
});

test("shared/ANTI_PATTERNS.md e shared/LEIA-ME.md existem e não estão vazios", () => {
  assert.ok(read("shared", "ANTI_PATTERNS.md").includes("# ANTI_PATTERNS.md"));
  assert.ok(read("shared", "LEIA-ME.md").includes("DESIGN.md"));
});
