import { test } from "node:test";
import assert from "node:assert/strict";
import { safeEqual, generateLoginCode, clientIp } from "../../src/lib/security-core.ts";

test("safeEqual: confere só o segredo exato", () => {
  assert.equal(safeEqual("senha-certa", "senha-certa"), true);
  assert.equal(safeEqual("senha-certa", "senha-errada"), false);
  assert.equal(safeEqual("senha", "senha-mais-longa"), false);
});

test("safeEqual: vazio, undefined e não-texto nunca conferem", () => {
  // Sem ADMIN_PASSWORD configurada, nenhuma senha pode entrar (nem a vazia).
  assert.equal(safeEqual("", ""), false);
  assert.equal(safeEqual(undefined, undefined), false);
  assert.equal(safeEqual("x", undefined), false);
  assert.equal(safeEqual(123456, "123456"), false);
  assert.equal(safeEqual(["a"], "a"), false);
});

test("generateLoginCode: sempre 6 dígitos, inclusive com zero na frente", () => {
  const vistos = new Set();
  for (let i = 0; i < 2000; i++) {
    const c = generateLoginCode();
    assert.match(c, /^\d{6}$/);
    vistos.add(c);
  }
  assert.ok(vistos.size > 1900, "códigos repetindo demais");
});

test("clientIp: prefere x-real-ip, depois o primeiro x-forwarded-for", () => {
  assert.equal(clientIp(new Headers({ "x-real-ip": "1.1.1.1", "x-forwarded-for": "2.2.2.2" })), "1.1.1.1");
  assert.equal(clientIp(new Headers({ "x-forwarded-for": "3.3.3.3, 10.0.0.1" })), "3.3.3.3");
  assert.equal(clientIp(new Headers()), "anon");
});
