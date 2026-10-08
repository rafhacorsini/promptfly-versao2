// Captura frames de cada demo de animação rolando a página, via Chrome DevTools Protocol.
// Rode na raiz do projeto: node scripts/animacoes/capture.mjs [slug ...]   (sem args = todos)
// Depois junte os frames: powershell -File scripts/animacoes/stitch.ps1
// Precisa do Google Chrome instalado (caminho em CHROME abaixo).
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const DEMOS = path.join(process.cwd(), "src/content/animacoes");
const OUT = path.join(os.tmpdir(), "promptfly-animacoes-frames");
const CHROME = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const W = 800, H = 500, SCALE = 0.6;
const MOVE = 36, HOLD = 4;

const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(DEMOS).filter((f) => f.endsWith(".html")).map((f) => f.replace(/\.html$/, ""));

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--remote-debugging-port=9334",
  `--user-data-dir=${process.env.TEMP}/cdp-anim-prof`, "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 40; i++) {
  try { targets = await (await fetch("http://127.0.0.1:9334/json")).json(); break; } catch { await sleep(250); }
}
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m.result ?? m.error); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evalJs = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.value;

await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send("Page.enable");

// O clip do CDP usa coordenadas do documento: precisa somar a rolagem atual.
async function shot(dir, n) {
  const y = await evalJs("window.scrollY");
  const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 72, clip: { x: 0, y, width: W, height: H, scale: SCALE } });
  fs.writeFileSync(path.join(dir, `f${String(n).padStart(2, "0")}.jpg`), Buffer.from(data, "base64"));
}

for (const slug of slugs) {
  const dir = path.join(OUT, slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  await send("Page.navigate", { url: "file:///" + path.join(DEMOS, slug + ".html").replace(/\\/g, "/") });
  await sleep(1500);
  // Espera fontes e todas as imagens decodificarem antes de começar.
  await evalJs(`(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); return true; })()`);
  await sleep(1200);

  let n = 0;
  if (slug === "scroll-snap-secoes") {
    // Snap: rolagem suave até cada seção, capturando a transição no tempo.
    for (let s = 0; s < 4; s++) {
      await evalJs(`window.scrollTo({ top: ${s} * innerHeight, behavior: "smooth" }); true`);
      for (let k = 0; k < (MOVE + HOLD) / 4; k++) { await sleep(110); await shot(dir, n++); }
    }
  } else {
    const max = await evalJs(`document.documentElement.scrollHeight - innerHeight`);
    for (let k = 0; k < MOVE; k++) {
      const y = Math.round((k / (MOVE - 1)) * max);
      await evalJs(`window.scrollTo(0, ${y}); true`);
      await sleep(150);
      await shot(dir, n++);
    }
    for (let k = 0; k < HOLD; k++) { await sleep(180); await shot(dir, n++); }
  }
  console.log(slug, n, "frames");
}

ws.close();
chrome.kill();
