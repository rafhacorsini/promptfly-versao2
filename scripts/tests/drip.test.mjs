import { test } from "node:test";
import assert from "node:assert/strict";
import {
  dayIndex,
  isDue,
  unsubscribeToken,
  verifyUnsubscribeToken,
  unsubscribePageUrl,
  unsubscribeApiUrl,
  greeting,
  markupToHtml,
  renderEmail,
} from "../../src/lib/drip-core.ts";
import { designPackSequence } from "../../src/content/drip/design-pack.ts";

const SECRET = "segredo-de-teste-com-tamanho-razoavel";
const ctxBase = { name: "Maria", styleId: "vitrine", styleLabel: "Vitrine", price: "R$ 129,90", animationsPremium: 10 };
const UNSUB = "https://promptfly.com.br/emails/sair?e=a%40b.com&t=abc";
// 14/10/2026 10:00 em Brasília (UTC-3)
const at = (day, hourBrt) => Date.UTC(2026, 9, day, hourBrt + 3, 0, 0);

test("dayIndex: o dia vira à meia-noite de Brasília, não à do UTC", () => {
  assert.equal(dayIndex(at(14, 23)), dayIndex(at(14, 0)));
  assert.equal(dayIndex(at(15, 0)), dayIndex(at(14, 0)) + 1);
  // 23h em Brasília já é o dia seguinte em UTC, mas ainda é o mesmo dia de calendário aqui
  assert.equal(dayIndex(Date.UTC(2026, 9, 15, 2, 30)), dayIndex(at(14, 23)));
});

test("isDue: e-mail 1 sai na hora; os outros esperam os dias de calendário", () => {
  const novo = { startedAt: at(14, 14), sent: 0, lastSentAt: 0 };
  assert.equal(isDue(novo, { delayDays: 0 }, at(14, 14)), true);

  const depoisDoE1 = { startedAt: at(14, 14), sent: 1, lastSentAt: at(14, 14) };
  assert.equal(isDue(depoisDoE1, { delayDays: 2 }, at(15, 13)), false, "dia 1: ainda não");
  assert.equal(isDue(depoisDoE1, { delayDays: 2 }, at(16, 10)), true, "dia 2 de manhã (menos de 48h depois): já pode");
});

test("isDue: cron atrasado manda um por vez e nunca dois no mesmo dia", () => {
  const estado = { startedAt: at(14, 10), sent: 1, lastSentAt: at(16, 10) };
  assert.equal(isDue(estado, { delayDays: 5 }, at(16, 18)), false, "já saiu um hoje");
  assert.equal(isDue(estado, { delayDays: 5 }, at(19, 13)), true);
});

test("token de descadastro: só vale para o e-mail e o segredo certos", () => {
  const t = unsubscribeToken("pessoa@exemplo.com", SECRET);
  assert.ok(verifyUnsubscribeToken("pessoa@exemplo.com", t, SECRET));
  assert.ok(verifyUnsubscribeToken("  PESSOA@exemplo.com ", t, SECRET), "ignora maiúscula e espaço");
  assert.ok(!verifyUnsubscribeToken("outra@exemplo.com", t, SECRET), "token de um e-mail não serve para outro");
  assert.ok(!verifyUnsubscribeToken("pessoa@exemplo.com", t, "outro-segredo"));
  assert.ok(!verifyUnsubscribeToken("pessoa@exemplo.com", "", SECRET));
  assert.ok(!verifyUnsubscribeToken("pessoa@exemplo.com", undefined, SECRET));
  assert.ok(!verifyUnsubscribeToken("pessoa@exemplo.com", t, ""), "sem segredo configurado nada vale");
});

test("links de descadastro: carregam o e-mail codificado e o token", () => {
  const page = unsubscribePageUrl("a+b@exemplo.com", SECRET);
  assert.ok(page.startsWith("https://promptfly.com.br/emails/sair?e=a%2Bb%40exemplo.com&t="));
  const api = unsubscribeApiUrl("a+b@exemplo.com", SECRET);
  assert.ok(api.startsWith("https://promptfly.com.br/api/drip/unsubscribe?e=a%2Bb%40exemplo.com&t="));
});

test("greeting: com e sem nome", () => {
  assert.equal(greeting({ name: "Maria" }), "Oi, Maria!");
  assert.equal(greeting({ name: "" }), "Oi!");
});

test("HTML: tudo que vem de fora é escapado (nome malicioso não vira tag)", () => {
  const html = markupToHtml(`Oi, <img src=x onerror=alert(1)>!\n\n- <b>item</b>\n\n> a & b "c"`);
  assert.ok(!html.includes("<img"), "tag injetada");
  assert.ok(!html.includes("<b>item"), "tag injetada na lista");
  assert.ok(html.includes("&lt;img"), "deveria aparecer como texto");
  assert.ok(html.includes("a &amp; b &quot;c&quot;"));
});

test("HTML: links viram <a> sem engolir a pontuação final", () => {
  const html = markupToHtml("Veja https://promptfly.com.br/premium?utm_source=email&utm_campaign=x.");
  assert.match(html, /<a href="https:\/\/promptfly\.com\.br\/premium\?utm_source=email&amp;utm_campaign=x"/);
  assert.ok(html.includes("</a>."), "o ponto final fica fora do link");
});

test("HTML: lista, lista numerada e destaque", () => {
  const html = markupToHtml("- a\n- b\n\n1. um\n2. dois\n\n> frase");
  assert.match(html, /<ul[^>]*>.*<li[^>]*>a<\/li>.*<li[^>]*>b<\/li>.*<\/ul>/s);
  assert.match(html, /<ol[^>]*>.*<li[^>]*>um<\/li>.*<\/ol>/s);
  assert.match(html, /<blockquote[^>]*>frase<\/blockquote>/);
});

test("sequência do Design Pack: 3 e-mails, e-mail 1 na hora, dias crescentes", () => {
  const steps = designPackSequence.steps;
  assert.equal(steps.length, 3);
  assert.equal(steps[0].delayDays, 0);
  assert.deepEqual(steps.map((s) => s.delayDays), [...steps.map((s) => s.delayDays)].sort((a, b) => a - b));
  assert.equal(new Set(steps.map((s) => s.id)).size, 3, "ids repetidos");
});

test("cada e-mail renderiza com e sem nome/estilo, sem sobra de marcador nem travessão", () => {
  const contextos = [
    ctxBase,
    { ...ctxBase, name: "", styleId: "", styleLabel: "" },
    { ...ctxBase, styleId: "todos", styleLabel: "Todos" },
    { ...ctxBase, price: null, animationsPremium: 0 },
  ];
  for (const ctx of contextos) {
    for (const step of designPackSequence.steps) {
      const m = renderEmail(designPackSequence, step, ctx, UNSUB);
      const tudo = `${m.subject}\n${m.text}\n${m.html}`;
      assert.ok(m.subject.length > 0 && m.subject.length <= 70, `${step.id}: assunto com ${m.subject.length} caracteres`);
      assert.ok(!tudo.includes("—"), `${step.id}: travessão`);
      assert.ok(!/\{\{|undefined|null|NaN/.test(tudo), `${step.id}: marcador sobrando`);
      assert.ok(m.html.includes(UNSUB.replace(/&/g, "&amp;")), `${step.id}: sem link de descadastro no HTML`);
      assert.ok(m.text.includes(UNSUB), `${step.id}: sem link de descadastro no texto`);
    }
  }
});

test("personalização: nome, estilo e preço aparecem quando existem", () => {
  const [e1, , e3] = designPackSequence.steps;
  const m1 = renderEmail(designPackSequence, e1, ctxBase, UNSUB);
  assert.ok(m1.text.startsWith("Oi, Maria!"));
  assert.ok(m1.text.includes("estilo Vitrine"));
  assert.ok(m1.text.includes("DESIGN.md da pasta vitrine"));
  const m1b = renderEmail(designPackSequence, e1, { ...ctxBase, name: "", styleId: "", styleLabel: "" }, UNSUB);
  assert.ok(m1b.text.startsWith("Oi!\n"));
  const m3 = renderEmail(designPackSequence, e3, ctxBase, UNSUB);
  assert.ok(m3.text.includes("R$ 129,90") && m3.text.includes("As 10 animações"));
  const m3b = renderEmail(designPackSequence, e3, { ...ctxBase, price: null, animationsPremium: 0 }, UNSUB);
  assert.ok(!/R\$/.test(m3b.text), "sem preço configurado, não cita valor");
});

test("links dos e-mails: só do site, cada um com a campanha do próprio e-mail", () => {
  for (const step of designPackSequence.steps) {
    const urls = step.body(ctxBase).match(/https?:\/\/\S+/g) ?? [];
    assert.ok(urls.length > 0, `${step.id}: sem link`);
    for (const u of urls) {
      assert.ok(u.startsWith("https://promptfly.com.br/"), `${step.id}: link fora do site: ${u}`);
      assert.ok(u.includes("utm_source=email"), `${step.id}: sem utm_source: ${u}`);
      assert.ok(u.includes(`utm_campaign=design-pack-${step.id}`), `${step.id}: campanha errada: ${u}`);
    }
  }
});

test("o rodapé diz por que a pessoa recebe e como sair", () => {
  const m = renderEmail(designPackSequence, designPackSequence.steps[0], ctxBase, UNSUB);
  assert.ok(m.text.includes(designPackSequence.reason));
  assert.match(m.html, /Parar de receber estes e-mails/);
});
