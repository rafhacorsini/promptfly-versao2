import { test } from "node:test";
import assert from "node:assert/strict";
import { cleanFirstName, buildCustomFields, STYLE_LABELS } from "../../src/lib/subscriber-core.ts";

test("cleanFirstName: pega só o primeiro nome, com a primeira letra maiúscula", () => {
  assert.equal(cleanFirstName("maria"), "Maria");
  assert.equal(cleanFirstName("  JOÃO  da Silva "), "João");
  assert.equal(cleanFirstName("ana-clara souza"), "Ana-clara");
  assert.equal(cleanFirstName("D'Ávila"), "D'ávila");
});

test("cleanFirstName: tira número, símbolo e tentativa de injeção", () => {
  assert.equal(cleanFirstName("<script>alert(1)</script>"), "Scriptalertscript");
  assert.equal(cleanFirstName("Rafa123"), "Rafa");
  assert.equal(cleanFirstName("{{ first_name }}"), "");
  assert.equal(cleanFirstName("😀😀"), "");
});

test("cleanFirstName: vazio, ausente ou gigante", () => {
  assert.equal(cleanFirstName(""), "");
  assert.equal(cleanFirstName(undefined), "");
  assert.equal(cleanFirstName(null), "");
  assert.equal(cleanFirstName(42), "");
  assert.equal(cleanFirstName("a".repeat(100)).length, 30);
});

test("buildCustomFields: nome e estilo viram os campos do Beehiiv", () => {
  assert.deepEqual(buildCustomFields({ firstName: "maria", style: "noite" }), [
    { name: "First Name", value: "Maria" },
    { name: "Design Pack Style", value: "Noite" },
  ]);
});

test("buildCustomFields: sem nome, só o estilo; estilo inválido é ignorado", () => {
  assert.deepEqual(buildCustomFields({ style: "todos" }), [{ name: "Design Pack Style", value: "Todos" }]);
  assert.deepEqual(buildCustomFields({ firstName: "Leo", style: "inventado" }), [{ name: "First Name", value: "Leo" }]);
  assert.deepEqual(buildCustomFields({}), []);
});

test("STYLE_LABELS cobre os 3 estilos e a opção todos", () => {
  assert.deepEqual(Object.keys(STYLE_LABELS).sort(), ["editorial", "noite", "todos", "vitrine"]);
});
