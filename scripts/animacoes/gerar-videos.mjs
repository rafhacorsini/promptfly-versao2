// Gera os vídeos das animações de scroll, sem ffmpeg: o próprio Chrome grava e codifica.
//
// Rode na raiz do projeto:
//   node scripts/animacoes/gerar-videos.mjs                  -> vídeos dos cards de todas
//   node scripts/animacoes/gerar-videos.mjs hero-vira-card   -> só uma (ou várias)
//   node scripts/animacoes/gerar-videos.mjs --reel           -> + vídeos pra edição (reel)
//
// 1. Abre cada demo num Chrome headless e grava a tela (screencast) enquanto a
//    página rola suave, em tempo real: animações por tempo e por scroll saem
//    na velocidade certa.
// 2. Reamostra os frames a 30fps.
// 3. Codifica em MP4 (H.264) no Chrome via WebCodecs + mp4-muxer (encoder.html).
//
// Saídas:
//   public/animacoes/<slug>.mp4 e <slug>-poster.jpg  (cards do site, 960x600, loop vai e volta)
//   com --reel, em ~/Desktop/promptfly-animacoes/:
//     animacoes-horizontal.mp4 (1280x800), animacoes-vertical.mp4 (1080x1920, com nomes)
//     clipes/NN-<slug>.mp4 (1280x800, uma animação por arquivo)
//
// Precisa do Google Chrome (caminho em CHROME) e internet (fontes, imagens e o mp4-muxer).

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { animacoes } from "../../src/content/animacoes.ts";

const ROOT = process.cwd();
const DEMOS = path.join(ROOT, "src/content/animacoes");
const PUBLIC = path.join(ROOT, "public/animacoes");
const TMP = path.join(os.tmpdir(), "promptfly-animacoes");
const REEL_OUT = path.join(os.homedir(), "Desktop", "promptfly-animacoes");
const CHROME = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const args = process.argv.slice(2);
const REEL = args.includes("--reel");
const pedidos = args.filter((a) => !a.startsWith("--"));
const lista = pedidos.length ? animacoes.filter((a) => pedidos.includes(a.slug)) : animacoes;

// Captura em 1280x800. O screencast do Chrome entrega frames no tamanho CSS da
// tela (ignora o DPR), então os vídeos horizontais saem nesse tamanho nativo.
const VW = 1280, VH = 800, DPR = 1, FPS = 30;
const HOLD_START = 0.5, SCROLL = 4.5, HOLD_END = 0.8;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Servidor local: entrega o encoder, os frames e recebe os arquivos prontos ──
const destinos = new Map();
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  if (req.method === "POST" && url.startsWith("/out/")) {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const file = destinos.get(url.slice(5));
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, Buffer.concat(chunks));
      res.end("ok");
    });
    return;
  }
  const file = url === "/encoder.html"
    ? path.join(path.dirname(fileURLToPath(import.meta.url)), "encoder.html")
    : path.join(TMP, url);
  if (!file.startsWith(TMP) && !file.endsWith("encoder.html")) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404).end(); return; }
    res.writeHead(200, { "Content-Type": file.endsWith(".html") ? "text/html" : "image/jpeg" });
    res.end(data);
  });
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const ORIGIN = `http://127.0.0.1:${server.address().port}`;

// ── Chrome via DevTools Protocol ──
const chrome = spawn(CHROME, [
  "--headless=new", "--hide-scrollbars", "--remote-debugging-port=9336",
  `--user-data-dir=${path.join(os.tmpdir(), "promptfly-animacoes-chrome")}`, "about:blank",
]);
let alvos;
for (let i = 0; i < 40 && !alvos; i++) {
  try { alvos = await (await fetch("http://127.0.0.1:9336/json")).json(); } catch { await sleep(250); }
}
const ws = new WebSocket(alvos.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let seq = 0;
const pendentes = new Map();
const ouvintes = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pendentes.has(m.id)) { pendentes.get(m.id)(m); pendentes.delete(m.id); }
  else if (m.method) ouvintes.get(m.method)?.(m.params);
});
const send = (method, params = {}) => new Promise((r) => {
  const id = ++seq; pendentes.set(id, r); ws.send(JSON.stringify({ id, method, params }));
});
async function js(expression) {
  const m = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (m.result?.exceptionDetails) throw new Error(m.result.exceptionDetails.exception?.description ?? "erro no Chrome");
  return m.result?.result?.value;
}

await send("Page.enable");

// ── 1 e 2: grava cada demo rolando e reamostra a 30fps ──
async function capturar(slug) {
  await send("Emulation.setDeviceMetricsOverride", { width: VW, height: VH, deviceScaleFactor: DPR, mobile: false });
  await send("Page.navigate", { url: "file:///" + path.join(DEMOS, `${slug}.html`).replace(/\\/g, "/") });
  await sleep(1500);
  await js(`(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); return true; })()`);
  await sleep(800);

  const frames = [];
  ouvintes.set("Page.screencastFrame", (p) => {
    frames.push({ t: p.metadata.timestamp, data: p.data });
    send("Page.screencastFrameAck", { sessionId: p.sessionId });
  });
  // O screencast só manda frame quando a tela muda: um print inicial garante o primeiro.
  const inicio = Date.now() / 1000;
  const primeiro = await send("Page.captureScreenshot", { format: "jpeg", quality: 88 });
  frames.push({ t: inicio, data: primeiro.result.data });
  await send("Page.startScreencast", { format: "jpeg", quality: 88, maxWidth: VW * DPR, maxHeight: VH * DPR, everyNthFrame: 1 });

  await sleep(HOLD_START * 1000);
  if (slug === "scroll-snap-secoes") {
    // Snap: rolagem suave até cada seção, como alguém usando a roda do mouse.
    for (let s = 1; s < 4; s++) { await js(`window.scrollTo({ top: ${s} * innerHeight, behavior: "smooth" }); true`); await sleep(1300); }
  } else {
    await js(`new Promise((done) => {
      // Para quando o efeito termina (logo antes do rodapé do demo), não no fim da página.
      const outro = document.querySelector(".outro");
      const max = Math.min(document.documentElement.scrollHeight - innerHeight, outro ? outro.offsetTop - innerHeight : Infinity);
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / ${SCROLL * 1000});
        window.scrollTo(0, Math.round(max * ease(p)));
        p < 1 ? requestAnimationFrame(step) : done(true);
      };
      requestAnimationFrame(step);
    })`);
  }
  await sleep(HOLD_END * 1000);
  await send("Page.stopScreencast");
  ouvintes.delete("Page.screencastFrame");
  const duracao = Date.now() / 1000 - inicio;

  // Reamostra: pra cada instante de 1/30s, o último frame recebido até ali.
  const dir = path.join(TMP, "frames", slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  frames.sort((a, b) => a.t - b.t);
  const total = Math.round(duracao * FPS);
  let j = 0;
  for (let i = 0; i < total; i++) {
    const alvo = inicio + i / FPS;
    while (j + 1 < frames.length && frames[j + 1].t <= alvo) j++;
    fs.writeFileSync(path.join(dir, `${String(i).padStart(4, "0")}.jpg`), Buffer.from(frames[j].data, "base64"));
  }
  return { slug, count: total, recebidos: frames.length };
}

const capturas = [];
for (const a of lista) {
  const c = await capturar(a.slug);
  capturas.push(c);
  console.log(`capturado ${a.slug}: ${c.count} frames (${c.recebidos} do Chrome)`);
}

// ── 3: codifica no Chrome ──
await send("Emulation.clearDeviceMetricsOverride");
await send("Page.navigate", { url: `${ORIGIN}/encoder.html` });
await sleep(1500);
await js(`window.pronto`);

async function codificar(nome, destino, job) {
  destinos.set(nome, destino);
  const r = await js(`encodeVideo(${JSON.stringify({ ...job, nome })})`);
  console.log(`${path.relative(ROOT, destino) || destino}: ${r.frames} frames, ${Math.round(r.bytes / 1024)} KB`);
}

for (const c of capturas) {
  await codificar(`card-${c.slug}`, path.join(PUBLIC, `${c.slug}.mp4`), {
    width: 960, height: 600, fps: FPS, bitrate: 800_000, layout: "fill",
    clips: [{ dir: c.slug, count: c.count, pingpong: true }],
  });
  destinos.set(`poster-${c.slug}`, path.join(PUBLIC, `${c.slug}-poster.jpg`));
  await js(`poster(${JSON.stringify({ nome: `poster-${c.slug}`, dir: c.slug, frame: Math.round(c.count * 0.6), width: 960, height: 600 })})`);
}
// Sprites antigas (antes dos vídeos) não são mais usadas.
for (const c of capturas) fs.rmSync(path.join(PUBLIC, `${c.slug}.jpg`), { force: true });

if (REEL) {
  const todas = animacoes.map((a, i) => ({ a, i, c: capturas.find((c) => c.slug === a.slug) })).filter((x) => x.c);
  for (const { a, i, c } of todas) {
    await codificar(`clip-${a.slug}`, path.join(REEL_OUT, "clipes", `${String(i + 1).padStart(2, "0")}-${a.slug}.mp4`), {
      width: 1280, height: 800, fps: FPS, bitrate: 8_000_000, layout: "fill",
      clips: [{ dir: c.slug, count: c.count }],
    });
  }
  await codificar("horizontal", path.join(REEL_OUT, "animacoes-horizontal.mp4"), {
    width: 1280, height: 800, fps: FPS, bitrate: 8_000_000, layout: "fill",
    clips: todas.map(({ c }) => ({ dir: c.slug, count: c.count })),
  });
  await codificar("vertical", path.join(REEL_OUT, "animacoes-vertical.mp4"), {
    width: 1080, height: 1920, fps: FPS, bitrate: 9_000_000, layout: "reel",
    clips: todas.map(({ a, i, c }) => ({
      dir: c.slug, count: c.count,
      kicker: `${String(i + 1).padStart(2, "0")} · ${a.tipo}`,
      title: a.nome,
    })),
  });
}

ws.close();
chrome.kill();
server.close();
console.log("pronto");
