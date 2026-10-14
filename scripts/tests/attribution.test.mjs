import { test } from "node:test";
import assert from "node:assert/strict";
import {
  cleanTag,
  parseAttribution,
  mergeAttribution,
  hasExplicitUtm,
  hotmartCode,
  decorateHotmartHref,
} from "../../src/lib/attribution-core.ts";

const CHECKOUT = "https://pay.hotmart.com/Q106100409T";

test("cleanTag: minúsculo, sem espaço e sem caractere perigoso", () => {
  assert.equal(cleanTag("  LinkedIn Post!! "), "linkedin-post");
  assert.equal(cleanTag("<script>x</script>"), "scriptxscript");
  assert.equal(cleanTag("a".repeat(100), 10), "aaaaaaaaaa");
  assert.equal(cleanTag(undefined), "");
});

test("parseAttribution: lê utm_source, utm_medium e utm_campaign", () => {
  const a = parseAttribution("?utm_source=LinkedIn&utm_campaign=preloader_parede&utm_medium=post", "", "promptfly.com.br");
  assert.deepEqual(a, { utm_source: "linkedin", utm_medium: "post", utm_campaign: "preloader_parede" });
});

test("parseAttribution: sem utm usa o site de origem, menos o próprio site", () => {
  assert.deepEqual(parseAttribution("", "https://l.instagram.com/?u=x", "promptfly.com.br"), {
    utm_source: "instagram.com",
    utm_medium: "referral",
  });
  assert.deepEqual(parseAttribution("", "https://www.promptfly.com.br/guias", "www.promptfly.com.br"), {});
  assert.deepEqual(parseAttribution("", "", "promptfly.com.br"), {});
  assert.deepEqual(parseAttribution("", "isso-nao-e-url", "promptfly.com.br"), {});
});

test("mergeAttribution: utm explícito vence, senão mantém o que já estava salvo", () => {
  const stored = { utm_source: "linkedin", utm_campaign: "preloader" };
  assert.deepEqual(mergeAttribution(stored, { utm_source: "instagram" }, true), { utm_source: "instagram" });
  assert.deepEqual(mergeAttribution(stored, { utm_source: "google.com" }, false), stored);
  assert.deepEqual(mergeAttribution({}, { utm_source: "google.com" }, false), { utm_source: "google.com" });
});

test("hasExplicitUtm", () => {
  assert.equal(hasExplicitUtm("?utm_source=x"), true);
  assert.equal(hasExplicitUtm("?a=1"), false);
});

test("hotmartCode: campanha primeiro, sem underscore, no máximo 30 caracteres", () => {
  assert.equal(hotmartCode({ utm_source: "linkedin", utm_campaign: "preloader_parede" }), "preloader-parede");
  assert.equal(hotmartCode({ utm_source: "linkedin" }), "linkedin");
  assert.equal(hotmartCode({}), "");
  const longo = hotmartCode({ utm_campaign: "uma-campanha-com-nome-muito-muito-comprido" });
  assert.ok(longo.length <= 30 && !longo.includes("_"));
});

test("decorateHotmartHref: acrescenta sck e src no checkout", () => {
  const out = decorateHotmartHref(CHECKOUT, "preloader-parede");
  assert.ok(out);
  const u = new URL(out);
  assert.equal(u.searchParams.get("sck"), "preloader-parede");
  assert.equal(u.searchParams.get("src"), "preloader-parede");
  assert.equal(u.pathname, "/Q106100409T");
});

test("decorateHotmartHref: preserva parâmetros que já existem", () => {
  const out = decorateHotmartHref(`${CHECKOUT}?checkoutMode=2`, "linkedin");
  assert.equal(new URL(out).searchParams.get("checkoutMode"), "2");
});

test("decorateHotmartHref: ignora links de outros sites, sem código ou já marcados", () => {
  assert.equal(decorateHotmartHref("https://example.com/x", "linkedin"), null);
  assert.equal(decorateHotmartHref("/guias", "linkedin"), null);
  assert.equal(decorateHotmartHref(CHECKOUT, ""), null);
  assert.equal(decorateHotmartHref(`${CHECKOUT}?sck=afiliado`, "linkedin"), null);
  assert.equal(decorateHotmartHref("not a url ::", "linkedin"), null);
});
