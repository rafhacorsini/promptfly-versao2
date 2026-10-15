import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { unzipSync } from "fflate";
import { PACK_DIR } from "../design-pack/lib.mjs";
import { buildZip, STYLE_IDS } from "../../src/lib/design-pack.ts";

const PDF = path.join(PACK_DIR, "shared", "Guia-Design-Pack.pdf");

test("o ebook em PDF existe, é um PDF de verdade e tem tamanho de ebook", () => {
  assert.ok(fs.existsSync(PDF), "rode npm run design-pack:ebook");
  const buf = fs.readFileSync(PDF);
  assert.equal(buf.subarray(0, 5).toString("latin1"), "%PDF-");
  assert.ok(buf.length > 200 * 1024, "PDF pequeno demais: provavelmente sem fontes ou sem páginas");
  assert.ok(buf.length < 8 * 1024 * 1024, "PDF grande demais pro download");
});

test("o ebook tem os links de venda certos (checkout com origem válida pro Hotmart)", () => {
  const raw = fs.readFileSync(PDF).toString("latin1");
  const uris = [...raw.matchAll(/\/URI \(([^)]+)\)/g)].map((m) => m[1]);
  assert.ok(uris.length >= 4, "poucos links no PDF");

  const checkout = uris.find((u) => u.startsWith("https://pay.hotmart.com/"));
  assert.ok(checkout, "falta o link do checkout do Hotmart");
  const url = new URL(checkout);
  const sck = url.searchParams.get("sck");
  assert.equal(sck, "ebook-design-pack");
  assert.equal(url.searchParams.get("src"), sck);
  assert.ok(sck.length <= 30 && !sck.includes("_"), "código de origem fora da regra do Hotmart (30 caracteres, sem underscore)");

  assert.ok(uris.some((u) => u.startsWith("https://promptfly.com.br/premium?utm_source=ebook")), "falta o link do /premium");
});

test("o ebook usa o mesmo link de checkout do site", () => {
  const premium = JSON.parse(fs.readFileSync(path.join(PACK_DIR, "..", "premium.json"), "utf8"));
  const raw = fs.readFileSync(PDF).toString("latin1");
  assert.ok(raw.includes(premium.purchaseUrl), "o checkout do PDF não bate com premium.json: gere o ebook de novo");
});

for (const choice of ["todos", ...STYLE_IDS]) {
  test(`zip (${choice}): leva o ebook, o LEIA-ME e o ANTI_PATTERNS na raiz`, () => {
    const files = unzipSync(buildZip(choice));
    const names = Object.keys(files);
    for (const f of ["Guia-Design-Pack.pdf", "LEIA-ME.md", "ANTI_PATTERNS.md"]) {
      assert.ok(names.includes(`promptfly-design-pack/${f}`), `falta ${f} no zip`);
    }
    assert.deepEqual(
      Buffer.from(files["promptfly-design-pack/Guia-Design-Pack.pdf"]),
      fs.readFileSync(PDF),
      "o PDF do zip difere do arquivo do repositório",
    );
    const styles = choice === "todos" ? STYLE_IDS : [choice];
    for (const id of styles) {
      for (const f of ["DESIGN.md", "tokens.css", "theme.tailwind.css", "tokens.json"]) {
        assert.ok(names.includes(`promptfly-design-pack/${id}/${f}`), `falta ${id}/${f}`);
      }
    }
    assert.equal(names.length, 3 + styles.length * 4);
  });
}

test("o LEIA-ME manda começar pelo ebook", () => {
  const leia = fs.readFileSync(path.join(PACK_DIR, "shared", "LEIA-ME.md"), "utf8");
  assert.ok(leia.includes("Comece pelo Guia-Design-Pack.pdf"));
});
