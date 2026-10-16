import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { priceToDecimal, faqJsonLd, productJsonLd } from "../../src/lib/jsonld.ts";

const GUIAS = path.resolve(import.meta.dirname, "../../src/content/guias");
const guias = fs
  .readdirSync(GUIAS)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => ({ slug: f.replace(".mdx", ""), data: matter(fs.readFileSync(path.join(GUIAS, f), "utf8")).data }));

test("seoTitle: até 55 caracteres e sem travessão", () => {
  for (const { slug, data } of guias) {
    if (data.seoTitle === undefined) continue;
    assert.ok(typeof data.seoTitle === "string" && data.seoTitle.length > 0, `${slug}: seoTitle vazio`);
    assert.ok(data.seoTitle.length <= 55, `${slug}: seoTitle com ${data.seoTitle.length} caracteres (máximo 55)`);
    assert.ok(!data.seoTitle.includes("—"), `${slug}: seoTitle com travessão`);
  }
});

test("seoDescription: entre 90 e 160 caracteres, sem travessão", () => {
  for (const { slug, data } of guias) {
    if (data.seoDescription === undefined) continue;
    const n = data.seoDescription.length;
    assert.ok(n >= 90 && n <= 160, `${slug}: seoDescription com ${n} caracteres (esperado 90 a 160)`);
    assert.ok(!data.seoDescription.includes("—"), `${slug}: seoDescription com travessão`);
  }
});

test("seoDescription sem número solto de resultado (regra de copy: nada de número inventado)", () => {
  for (const { slug, data } of guias) {
    if (!data.seoDescription) continue;
    assert.ok(!/\b\d+\s?%/.test(data.seoDescription), `${slug}: seoDescription com porcentagem`);
    assert.ok(!/\b\d+x\b/i.test(data.seoDescription), `${slug}: seoDescription com multiplicador (4x etc.)`);
  }
});

test("os guias principais têm seoTitle e seoDescription", () => {
  const esperados = [
    "como-criar-sites-com-wireframes",
    "os-2-arquivos-mais-importantes-para-sites-com-ia",
    "preloader-personagem-empurrando-parede",
    "nomes-das-animacoes-de-scroll",
  ];
  for (const slug of esperados) {
    const g = guias.find((x) => x.slug === slug);
    assert.ok(g?.data.seoTitle && g?.data.seoDescription, `${slug} sem seoTitle/seoDescription`);
  }
});

test("priceToDecimal: formatos de preço em reais", () => {
  assert.equal(priceToDecimal("R$ 129,90"), "129.90");
  assert.equal(priceToDecimal("R$ 37"), "37.00");
  assert.equal(priceToDecimal("R$ 1.299,90"), "1299.90");
  assert.equal(priceToDecimal(null), null);
  assert.equal(priceToDecimal("grátis"), null);
});

test("productJsonLd: oferta em BRL com o preço certo e sem avaliação inventada", () => {
  const p = productJsonLd({ name: "X", description: "Y", path: "/premium", price: "R$ 129,90" });
  assert.equal(p["@type"], "Product");
  assert.equal(p.offers.price, "129.90");
  assert.equal(p.offers.priceCurrency, "BRL");
  assert.ok(!("aggregateRating" in p) && !("review" in p), "não pode ter nota nem avaliação");
  assert.ok(!("offers" in productJsonLd({ name: "X", description: "Y", path: "/p", price: null })), "sem preço, sem offers");
});

test("faqJsonLd: uma pergunta por item, com resposta", () => {
  const f = faqJsonLd([{ q: "A?", a: "B." }, { q: "C?", a: "D." }]);
  assert.equal(f["@type"], "FAQPage");
  assert.equal(f.mainEntity.length, 2);
  assert.equal(f.mainEntity[0].acceptedAnswer.text, "B.");
});
