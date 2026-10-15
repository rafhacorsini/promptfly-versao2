// Gera o ebook em PDF do Design Pack: src/content/design-pack/shared/Guia-Design-Pack.pdf
// Uso: npm run design-pack:ebook   (precisa do Google Chrome instalado)
//
// O HTML é montado aqui a partir dos dados reais (estilos, projects.json, ANTI_PATTERNS.md)
// e o Chrome imprime em PDF. Se alguma página estourar, o script avisa e falha.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { PACK_DIR, ROOT, STYLE_IDS, loadStyle, contrastRows } from "./lib.mjs";

const OUT = path.join(PACK_DIR, "shared", "Guia-Design-Pack.pdf");
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const SITE = "https://promptfly.com.br";
const CHECKOUT = "https://pay.hotmart.com/Q106100409T?sck=ebook-design-pack&src=ebook-design-pack";
const PREMIUM_URL = `${SITE}/premium?utm_source=ebook&utm_campaign=design-pack`;
const PACK_URL = `${SITE}/design-pack?utm_source=ebook&utm_campaign=design-pack`;
const GUIDE_URL = `${SITE}/guias/os-2-arquivos-mais-importantes-para-sites-com-ia?utm_source=ebook&utm_campaign=design-pack`;
const PRICE = "R$ 129,90";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---------- dados reais ---------- */
const projects = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/projects.json"), "utf8"));
const premiumTemplates = projects.filter((p) => !p.isFree);
const styles = Object.fromEntries(STYLE_IDS.map((id) => [id, loadStyle(id)]));
const antiPatterns = fs.readFileSync(path.join(PACK_DIR, "shared", "ANTI_PATTERNS.md"), "utf8");

const nameOf = (t) => t.split(" — ")[0];
const descOf = (t) => t.split(" — ").slice(1).join(": ");

/* ---------- peças ---------- */
let pageNo = 0;
const page = (cls, inner, { footer = true } = {}) => {
  pageNo += 1;
  const foot = footer
    ? `<div class="foot"><span>Promptfly · Design Pack</span><span>${pageNo}</span></div>`
    : "";
  return `<section class="page ${cls}">${inner}${foot}</section>`;
};

const tag = (t) => `<span class="tag">[ ${esc(t)} ]</span>`;

function mock(s) {
  const t = s.tokens;
  return `<div class="mock" style="background:${t["color-canvas"]}">
    <div class="m-nav" style="border-bottom:1px solid ${t["color-line"]}"><i style="background:${t["color-ink"]}"></i><b style="background:${t["color-muted"]}"></b><u style="background:${t["color-cta"]};border-radius:${t["radius-pill"]}"></u></div>
    <div class="m-hero" style="color:${t["color-ink"]};font-weight:${t["text-hero--font-weight"]}">Seu site,<br>sem cara de IA.</div>
    <div class="m-line" style="background:${t["color-muted"]}"></div><div class="m-line s" style="background:${t["color-muted"]}"></div>
    <div class="m-cta" style="background:${t["color-cta"]};color:${t["color-cta-ink"]};border-radius:${t["radius-pill"]}">Comprar</div>
    <div class="m-band" style="background:${t["color-band"]}"><span style="background:${t["color-paper"]};border:1px solid ${t["color-line"]}"></span><span style="background:${t["color-paper"]};border:1px solid ${t["color-line"]}"></span></div>
  </div>`;
}

function swatches(s) {
  const t = s.tokens;
  const items = [
    ["Fundo", "color-canvas"],
    ["Faixa", "color-band"],
    ["Texto", "color-ink"],
    ["Link", "color-link"],
    ["Botão", "color-cta"],
  ];
  return `<div class="sw">${items
    .map(([l, k]) => `<span><i style="background:${t[k]}"></i>${l}<small>${t[k]}</small></span>`)
    .join("")}</div>`;
}

const li = (arr) => `<ul class="chk">${arr.map((x) => `<li>${x}</li>`).join("")}</ul>`;

/* ---------- páginas ---------- */
const pages = [];

// 1. Capa
pages.push(
  page(
    "dark cover",
    `
  <div class="cover-top"><span class="brand">Promptfly</span><span class="brand-sub">@rafha.gpt</span></div>
  <div class="cover-main">
    <span class="tag tag-dark">[ GUIA COMPLETO · GRÁTIS ]</span>
    <h1 class="cover-title">Os 2 arquivos que impedem a IA de fazer <em>site feio.</em></h1>
    <p class="cover-sub">O guia completo de <b>DESIGN.md</b> e <b>ANTI_PATTERNS.md</b>: o que são, como usar e como fazer a IA seguir as suas regras. Sem precisar saber programar.</p>
  </div>
  <div class="cover-art">
    <div class="win win-d"><div class="bar"><span class="dots"><i></i><i></i><i></i></span>DESIGN.md<em>o que fazer</em></div>
      <div class="code"><span><b>color-canvas</b>#ffffff</span><span><b>color-cta</b>#0071e3</span><span><b>text-hero</b>80px / 600</span><span><b>radius-card</b>28px</span></div></div>
    <div class="win win-l"><div class="bar"><span class="dots"><i></i><i></i><i></i></span>ANTI_PATTERNS.md<em class="no">o que nunca fazer</em></div>
      <div class="rules"><span>✕ Hero centralizado com 3 cards</span><span>✕ Gradiente roxo e azul</span><span>✕ Sombra borrada em tudo</span></div></div>
  </div>`,
    { footer: false },
  ),
);

// 2. Sumário
pages.push(
  page(
    "",
    `
  ${tag("COMECE AQUI")}
  <h2>O que tem neste guia</h2>
  <p class="lead">Este guia explica, do zero, os 2 arquivos que mais mudam o resultado de um site feito com IA. Leia na ordem ou pule direto para o que precisa.</p>
  <div class="toc">
    <div><b>1</b><span>O problema: por que a IA faz site feio</span><i>3</i></div>
    <div><b>2</b><span>Os 2 arquivos: o mapa e o freio</span><i>4</i></div>
    <div><b>3</b><span>DESIGN.md explicado, parte por parte</span><i>5</i></div>
    <div><b>4</b><span>Um DESIGN.md anotado linha por linha</span><i>6</i></div>
    <div><b>5</b><span>ANTI_PATTERNS.md explicado</span><i>7</i></div>
    <div><b>6</b><span>Como usar em 3 passos (qualquer ferramenta)</span><i>8</i></div>
    <div><b>7</b><span>Os 3 estilos prontos: Vitrine, Noite e Editorial</span><i>9</i></div>
    <div><b>8</b><span>Como personalizar sem quebrar nada</span><i>10</i></div>
    <div><b>9</b><span>Checklist final e mini glossário</span><i>11</i></div>
    <div><b>10</b><span>Apêndice: o ANTI_PATTERNS.md completo</span><i>12</i></div>
    <div><b>11</b><span>Próximo passo: Premium, mentoria e templates</span><i>13</i></div>
  </div>
  <div class="note"><b>Antes de começar:</b> o .zip que você baixou tem os arquivos prontos de cada estilo. Este PDF é o manual. Use os dois juntos.</div>`,
  ),
);

// 3. Problema
pages.push(
  page(
    "",
    `
  ${tag("1 · O PROBLEMA")}
  <h2>Por que a IA faz site feio</h2>
  <p class="lead">A IA aprendeu olhando milhões de sites. Quando você pede "faz um site bonito" e não dá nenhuma regra, ela entrega a média de todos eles: o caminho mais comum. É por isso que tanto site feito com IA parece igual.</p>
  <p>Ela não erra por falta de capacidade. Ela erra porque ninguém disse <b>o que é bonito</b> e <b>o que é proibido</b>. Dois arquivos de texto resolvem isso.</p>
  <table class="cmp">
    <tr><th></th><th>Sem os 2 arquivos</th><th class="on">Com os 2 arquivos</th></tr>
    <tr><td>Cor</td><td>Escolhe roxo e azul, porque é o que mais aparece na internet.</td><td class="on">Usa só as cores do DESIGN.md, cada uma no lugar certo.</td></tr>
    <tr><td>Letra</td><td>Tamanho médio, um peso só, cara de modelo pronto.</td><td class="on">Tamanho, peso e espaçamento exatos, iguais em todas as telas.</td></tr>
    <tr><td>Layout</td><td>Título no meio, dois botões e três cards iguais embaixo.</td><td class="on">O layout descrito no arquivo, sem os vícios da lista proibida.</td></tr>
    <tr><td>Correção</td><td>Você pede "deixa mais bonito" e ela chuta outra coisa.</td><td class="on">Você manda revisar contra os 2 arquivos e ela acha o erro sozinha.</td></tr>
  </table>
  <div class="callout"><b>A ideia central:</b> em vez de pedir "bonito", você entrega regras que a IA consegue seguir e conferir. Regra clara dá resultado repetível.</div>`,
  ),
);

// 4. Os 2 arquivos
pages.push(
  page(
    "",
    `
  ${tag("2 · A DUPLA")}
  <h2>Um é o mapa. O outro é o freio.</h2>
  <div class="two">
    <div class="card light"><small>ARQUIVO 1</small><h3 class="mono">DESIGN.md</h3><p class="role">Diz o que fazer</p>
      ${li(["Quais cores o site usa e onde cada uma entra", "O tamanho, o peso e o espaçamento de cada letra", "Os cantos, os espaços e as sombras", "Como é cada peça: botão, cartão, hero, menu"])}
      <p class="foot-note">É a receita do visual do seu site.</p></div>
    <div class="card darkc"><small>ARQUIVO 2</small><h3 class="mono">ANTI_PATTERNS.md</h3><p class="role">Diz o que nunca fazer</p>
      ${li(["Título centralizado com 2 botões e 3 cards iguais", "Gradiente roxo e azul", "Sombra borrada em todo cartão", "Animação rápida e sempre igual"]).replace(/<ul class="chk">/, '<ul class="chk no">')}
      <p class="foot-note">É a lista dos vícios que a IA repete.</p></div>
  </div>
  <h3 class="h3">Por que precisa dos dois?</h3>
  <p>Pense numa obra. O DESIGN.md é a <b>planta</b>: diz o que construir. O ANTI_PATTERNS.md é a <b>lista de erros</b> que o pedreiro já cometeu antes: diz o que não repetir.</p>
  <p>Só com a planta, a IA ainda escorrega nos vícios. Só com a lista de erros, ela sabe o que evitar, mas não sabe aonde ir. Juntos, ela tem <b>direção e freio</b>.</p>
  <div class="steps3">
    <div><b>1</b><span>Você escreve (ou baixa) as regras uma vez.</span></div>
    <div><b>2</b><span>A IA lê as regras antes de criar cada tela.</span></div>
    <div><b>3</b><span>No fim, ela confere o próprio trabalho contra as listas.</span></div>
  </div>`,
  ),
);

// 5. DESIGN.md partes
pages.push(
  page(
    "",
    `
  ${tag("3 · DESIGN.md")}
  <h2>As 6 partes de um DESIGN.md</h2>
  <p class="lead">Um DESIGN.md completo é um documento de texto com seis blocos. Cada um responde a uma pergunta que a IA faria se pudesse.</p>
  <div class="grid3">
    <div class="pt"><small>01</small><b>Tokens</b><span><em>"Quais valores posso usar?"</em> As cores, fontes, tamanhos, cantos, sombras e espaços, cada um com nome e número exato.</span></div>
    <div class="pt"><small>02</small><b>Contraste</b><span><em>"Dá pra ler?"</em> A prova de que todo texto fica legível em cima do fundo onde ele aparece.</span></div>
    <div class="pt"><small>03</small><b>Componentes</b><span><em>"Como é cada peça?"</em> Menu, botão, hero, cartão, campo de e-mail: como cada um se monta usando os tokens.</span></div>
    <div class="pt"><small>04</small><b>Faça e não faça</b><span><em>"Onde cada coisa entra?"</em> As regras de uso: onde cada cor vale e o que nunca combinar.</span></div>
    <div class="pt"><small>05</small><b>Imagens e layout</b><span><em>"Como a página se organiza?"</em> Que tipo de foto usar e como as seções se distribuem de cima a baixo.</span></div>
    <div class="pt"><small>06</small><b>Guia pra IA</b><span><em>"O que eu peço?"</em> Pedidos prontos para colar e os tokens em CSS e Tailwind, prontos para importar.</span></div>
  </div>
  <h3 class="h3">O que é um "token"?</h3>
  <p>Token é um valor com nome. Em vez de escrever <span class="m">#0071e3</span> em cem lugares, você dá o nome <span class="m">color-cta</span> a essa cor e usa o nome. Se um dia a cor mudar, você muda em um lugar só. Para a IA, o nome também carrega o <b>papel</b>: "cta" quer dizer botão de conversão, não é uma cor qualquer.</p>
  <div class="callout"><b>Por que 4 arquivos com os mesmos valores?</b> O DESIGN.md é para a IA ler. O tokens.css, o theme.tailwind.css e o tokens.json são os mesmos valores em formato de código, para importar direto no projeto. Eles sempre batem entre si.</div>`,
  ),
);

// 6. DESIGN.md anotado
const v = styles.vitrine.tokens;
pages.push(
  page(
    "",
    `
  ${tag("4 · NA PRÁTICA")}
  <h2>Um DESIGN.md anotado</h2>
  <p class="lead">Trecho real do estilo <b>Vitrine</b>. Do lado direito, o que cada linha ensina à IA.</p>
  <div class="anno">
    <div class="codeblock"><pre>## Tokens
color-canvas   ${v["color-canvas"]}   fundo de todas as seções
color-band     ${v["color-band"]}   faixas de borda a borda
color-ink      ${v["color-ink"]}   títulos e texto principal
color-cta      ${v["color-cta"]}   só no botão de comprar
text-hero      ${v["text-hero"]}, peso ${v["text-hero--font-weight"]}
radius-card    ${v["radius-card"]}, sem sombra
spacing-section ${v["spacing-section"]}

## Faça
- Cartões com ${v["radius-card"]} de raio, sem sombra.
- Separe as seções grandes por ${v["spacing-section"]}.

## Não faça
- Não use gradiente.
- Não use color-cta como fundo grande.</pre></div>
    <div class="notes">
      <p><b>Nome + valor + função.</b> Cada linha diz o que é, quanto vale e onde usar. A IA não precisa adivinhar.</p>
      <p><b>Cor com papel.</b> O azul só aparece no botão de comprar. Por isso ele destaca: não está espalhado.</p>
      <p><b>Números, não adjetivos.</b> "${v["text-hero"]}, peso ${v["text-hero--font-weight"]}" é uma ordem. "Título grande e forte" é um palpite.</p>
      <p><b>"Faça" e "não faça" juntos.</b> Dizer o que evitar é tão importante quanto dizer o que usar.</p>
    </div>
  </div>
  <h3 class="h3">E os componentes?</h3>
  <p>Cada peça tem uma ficha curta. Exemplo, o <b>botão de conversão</b> do estilo Vitrine:</p>
  <div class="codeblock small"><pre>Preenchimento color-cta, texto color-cta-ink em text-caption
e radius-pill. Fica pequeno, dentro da barra do produto
ou da cápsula de preço.</pre></div>
  <p>Repare que a ficha só usa nomes de token. Nunca um valor solto. É isso que mantém o site consistente da primeira à última tela.</p>`,
  ),
);

// 7. ANTI_PATTERNS
pages.push(
  page(
    "",
    `
  ${tag("5 · ANTI_PATTERNS.md")}
  <h2>O que nunca fazer</h2>
  <p class="lead">O DESIGN.md dá a direção. Mas a IA tem vícios, e vício não se corrige só com direção: você precisa de uma lista de proibições. É isso que o ANTI_PATTERNS.md faz.</p>
  <div class="grid2">
    <div class="ap"><b>Layout</b><span>Proibido hero centralizado com título médio, subtítulo, 2 botões e 3 cards. Proibido alinhar tudo ao centro.</span></div>
    <div class="ap"><b>Tipografia</b><span>Proibido um peso de fonte só. Proibido título grande com espaçamento padrão. Proibido mais de 2 famílias.</span></div>
    <div class="ap"><b>Cor e superfície</b><span>Proibido gradiente roxo e azul. Proibido sombra grande e borrada em todo cartão. Proibido mais de 1 cor de destaque.</span></div>
    <div class="ap"><b>Motion</b><span>Proibido animar a seção inteira de uma vez. Proibido o mesmo fade em tudo. Proibido ignorar prefers-reduced-motion.</span></div>
    <div class="ap"><b>Tokens</b><span>Proibido usar cor, fonte, raio ou espaço que não esteja no DESIGN.md. Proibido criar token novo sem avisar.</span></div>
    <div class="ap"><b>Acessibilidade</b><span>Proibido texto abaixo de 4.5:1 de contraste. Proibido botão que não funcione só com o teclado.</span></div>
  </div>
  <div class="callout dark-callout"><b>A linha mais importante do arquivo inteiro:</b><br>"Antes de entregar, revise a tela contra esta lista e diga quais itens você conferiu."<br><span>Ela obriga a IA a se revisar antes de te entregar, e é aí que ela pega os próprios erros.</span></div>
  <h3 class="h3">Como escrever uma boa proibição</h3>
  <ul class="chk">
    <li><b>Seja específico.</b> "Proibido gradiente roxo e azul" funciona. "Não faça nada feio" não funciona.</li>
    <li><b>Comece com "Proibido".</b> A palavra é direta e a IA trata como regra, não como sugestão.</li>
    <li><b>Dê o substituto quando puder.</b> "Proibido alinhar tudo ao centro. Use alinhamento à esquerda."</li>
  </ul>
  <p class="small">O arquivo completo, com todas as regras, está no apêndice (página 12) e no .zip.</p>`,
  ),
);

// 8. Como usar
pages.push(
  page(
    "",
    `
  ${tag("6 · COMO USAR")}
  <h2>Em 3 passos, em qualquer ferramenta</h2>
  <div class="steps">
    <div class="st"><b>1</b><div><h3>Coloque os 2 arquivos na pasta do projeto</h3><p>Descompacte o .zip, escolha a pasta do estilo e copie o <span class="m">DESIGN.md</span> e o <span class="m">ANTI_PATTERNS.md</span> para a pasta principal do seu site, a mesma onde a IA trabalha.</p></div></div>
    <div class="st"><b>2</b><div><h3>Avise a IA com uma frase</h3><p>Cole esta frase no arquivo <span class="m">CLAUDE.md</span> do projeto (ou no começo da conversa):</p></div></div>
  </div>
  <div class="codeblock"><pre>Antes de criar ou alterar qualquer tela, leia DESIGN.md
e ANTI_PATTERNS.md.
Use só os tokens do DESIGN.md. Se faltar um valor,
pergunte antes de inventar.
Ao entregar, diga quais itens das duas listas
você conferiu.</pre></div>
  <div class="steps">
    <div class="st"><b>3</b><div><h3>Peça o site normalmente</h3><p>Agora é só pedir. A IA vai ler os arquivos, seguir as regras e, no fim, dizer o que conferiu.</p></div></div>
  </div>
  <h3 class="h3">Onde colar, em cada ferramenta</h3>
  <table class="cmp tools">
    <tr><th>Ferramenta</th><th>Como fazer</th></tr>
    <tr><td><b>Claude Code</b></td><td>Salve os arquivos na raiz do projeto e escreva a frase no CLAUDE.md. Ele lê sozinho a cada tarefa.</td></tr>
    <tr><td><b>Cursor</b></td><td>Salve os arquivos na raiz e cole a frase nas regras do projeto.</td></tr>
    <tr><td><b>ChatGPT e Gemini</b></td><td>Anexe os 2 arquivos (ou cole o texto) no começo da conversa e escreva a frase junto.</td></tr>
  </table>
  <div class="callout"><b>Se a IA errar:</b> não peça "deixa mais bonito". Peça assim: <i>"revise esta tela contra o DESIGN.md e o ANTI_PATTERNS.md e corrija o que estiver fora."</i></div>`,
  ),
);

// 9. Os 3 estilos
const stylePage = (id, desc) => {
  const s = styles[id];
  const rows = contrastRows(s);
  const minR = Math.min(...rows.filter((r) => r.min === 4.5).map((r) => r.ratio)).toFixed(1);
  return `<div class="style">
    ${mock(s)}
    <div class="sbody"><h3>${esc(s.name)} <small>${esc(s.mode)}</small></h3>
    <p>${esc(desc)}</p>
    ${swatches(s)}
    <p class="small"><b>Bom para:</b> ${esc(s.bestFor)} · Texto com contraste de pelo menos ${minR}:1 (padrão WCAG AA pede 4.5:1)</p></div></div>`;
};
pages.push(
  page(
    "",
    `
  ${tag("7 · OS 3 ESTILOS")}
  <h2>3 estilos prontos para usar</h2>
  <p class="lead">Cada estilo já vem com DESIGN.md, tokens em CSS, Tailwind e JSON. Escolha pelo tipo de site que você vai criar.</p>
  ${stylePage("vitrine", "Fundo branco, faixas cinza-claro e um único azul para conversão. A imagem do produto é a estrela. Sem sombra e sem gradiente.")}
  ${stylePage("noite", "A versão escura: fundo preto, faixas em grafite e o mesmo azul de conversão. A imagem brilha, a interface some.")}
  ${stylePage("editorial", "Fundo cinza muito claro, letra enorme e apertada, uma única cor de destaque (laranja) só em preenchimento. Estilo de revista.")}
  <p class="small">Na dúvida, comece pelo Vitrine. Ele é o mais fácil de adaptar.</p>`,
  ),
);

// 10. Personalizar + erros
pages.push(
  page(
    "",
    `
  ${tag("8 · PERSONALIZAR")}
  <h2>Como mudar sem quebrar nada</h2>
  <p class="lead">Os estilos são um ponto de partida. Você pode trocar cores e tamanhos para combinar com a sua marca. Só siga a ordem:</p>
  <div class="steps3 v">
    <div><b>1</b><span><b>Mude o valor no DESIGN.md.</b> É ele que a IA lê. Por exemplo, troque o valor de <span class="m">color-cta</span> pela cor da sua marca.</span></div>
    <div><b>2</b><span><b>Mude o mesmo valor nos arquivos de tokens.</b> Em <span class="m">tokens.css</span>, <span class="m">theme.tailwind.css</span> e <span class="m">tokens.json</span>. Os quatro precisam continuar iguais.</span></div>
    <div><b>3</b><span><b>Confira o contraste.</b> O texto precisa ser fácil de ler em cima do fundo. O mínimo é 4.5:1 (padrão WCAG AA). Procure "verificador de contraste" na internet e teste o par.</span></div>
    <div><b>4</b><span><b>Peça à IA para revisar o site</b> contra o DESIGN.md atualizado.</span></div>
  </div>
  <h3 class="h3">Erros comuns</h3>
  <table class="cmp tools">
    <tr><th>Erro</th><th>O que acontece</th><th>Como evitar</th></tr>
    <tr><td>Mudar só um dos 4 arquivos</td><td>A IA usa um valor e o código usa outro.</td><td>Mude sempre nos 4.</td></tr>
    <tr><td>Esquecer o aviso no CLAUDE.md</td><td>A IA nem lê os arquivos.</td><td>Cole a frase do passo 2.</td></tr>
    <tr><td>Deixar texto claro em fundo claro</td><td>Ninguém consegue ler.</td><td>Teste o contraste de cada par.</td></tr>
    <tr><td>Usar 3 cores de destaque</td><td>O site vira um carnaval.</td><td>Uma cor de destaque só.</td></tr>
    <tr><td>Pedir "mais bonito"</td><td>A IA chuta e muda o que estava certo.</td><td>Peça para revisar contra os arquivos.</td></tr>
  </table>
  <div class="callout"><b>Regra de ouro:</b> se a IA pedir um valor que não existe no DESIGN.md, deixe ela perguntar. Um token novo, criado com intenção, é melhor que um valor inventado no meio do código.</div>`,
  ),
);

// 11. Checklist + glossário
pages.push(
  page(
    "",
    `
  ${tag("9 · CHECKLIST")}
  <h2>Antes de entregar qualquer site</h2>
  <div class="check2">
    <div class="ckc"><h3>A IA conferiu?</h3>
      <p>☐ Leu o DESIGN.md e o ANTI_PATTERNS.md</p><p>☐ Usou só tokens da tabela</p><p>☐ Não usou nada da lista proibida</p><p>☐ Disse quais itens conferiu</p></div>
    <div class="ckc"><h3>Você conferiu?</h3>
      <p>☐ Funciona em 360px, 768px e 1280px</p><p>☐ Sem rolagem horizontal</p><p>☐ Dá pra navegar só com o teclado</p><p>☐ Texto legível em todo fundo</p></div>
  </div>
  <h3 class="h3">Mini glossário</h3>
  <div class="gl">
    <div><b>Token</b><span>Um valor com nome, como <span class="m">color-cta</span>. Mudou o valor, mudou o site inteiro.</span></div>
    <div><b>Hero</b><span>A primeira tela do site, a que a pessoa vê antes de rolar.</span></div>
    <div><b>Tracking</b><span>O espaço entre as letras. Em título grande, valor negativo deixa a letra mais junta e mais elegante.</span></div>
    <div><b>Raio (radius)</b><span>O arredondamento dos cantos de cartões e botões.</span></div>
    <div><b>Contraste</b><span>A diferença entre a cor do texto e a do fundo. Pouca diferença, texto difícil de ler.</span></div>
    <div><b>WCAG AA</b><span>Padrão internacional de acessibilidade. Pede contraste de pelo menos 4.5:1 em texto normal.</span></div>
    <div><b>CTA (botão de conversão)</b><span>O botão principal, o que leva a pessoa a comprar ou se inscrever.</span></div>
    <div><b>Faixa (band)</b><span>Uma seção de borda a borda em cor diferente, para quebrar o ritmo da página.</span></div>
  </div>`,
  ),
);

// 12. Apêndice ANTI_PATTERNS
pages.push(
  page(
    "",
    `
  ${tag("APÊNDICE")}
  <h2 class="h2s">O ANTI_PATTERNS.md completo</h2>
  <p class="small">Esta é a mesma lista que vai no .zip. Copie daqui ou use o arquivo pronto.</p>
  <pre class="ap-full">${esc(antiPatterns.replace(/^# ANTI_PATTERNS\.md\n\n/, ""))}</pre>`,
  ),
);

// 13 e 14. Premium
const tplCols = premiumTemplates
  .map((t) => `<div class="tpl"><b>${esc(nameOf(t.title))}</b><span>${esc(descOf(t.title))}</span></div>`)
  .join("");

pages.push(
  page(
    "dark",
    `
  <span class="tag tag-dark">[ PRÓXIMO PASSO · PREMIUM ]</span>
  <h2 class="w">Você já sabe dar regras pra IA. Agora tenha o resto pronto.</h2>
  <p class="lead w">Os 2 arquivos organizam o visual. O <b>Promptfly Premium</b> entrega o caminho inteiro: o método, os templates e as ferramentas para criar sites cinematográficos com IA e vender para clientes.</p>
  <div class="pcards">
    <div class="pc big"><small>MENTORIA PRONTA</small><h3>Do primeiro site ao primeiro cliente</h3>
      <p>O método que eu uso, em guias exclusivos: como eu crio os sites cinematográficos com IA, o sistema de animação que deixa tudo coerente e o playbook para achar, abordar e fechar cliente.</p>
      <p class="sm">Não tem encontros marcados. As dúvidas você tira no grupo exclusivo.</p></div>
    <div class="pc"><small>TEMPLATES</small><h3>${premiumTemplates.length} templates premium</h3><p>Os prompts completos de todos os sites cinematográficos do catálogo. Você copia, troca a marca e entrega. Todo template novo entra sem custo extra.</p></div>
    <div class="pc"><small>ANIMAÇÕES</small><h3>10 animações de scroll</h3><p>Com nome, prompt e código para cada uma. Além das 5 gratuitas que já estão no site.</p></div>
    <div class="pc"><small>SKILLS</small><h3>Skills para o Claude Code</h3><p>As skills cinematográficas que fazem o trabalho repetido por você.</p></div>
    <div class="pc"><small>GRUPO</small><h3>Discord exclusivo</h3><p>Converse com quem já está construindo com IA. Troque prompts e veja o que está funcionando agora.</p></div>
  </div>
  <div class="why">
    <b>Como o Design Pack se encaixa:</b> o DESIGN.md e o ANTI_PATTERNS.md garantem que o site tenha cara de profissional. Os templates Premium dão a estrutura pronta. A mentoria mostra como transformar isso em cliente.
  </div>`,
  ),
);

pages.push(
  page(
    "dark",
    `
  <span class="tag tag-dark">[ O QUE TEM NO PREMIUM ]</span>
  <h2 class="w">Os templates que você recebe</h2>
  <p class="lead w small-lead">Prompts completos, testados, prontos para colar no Claude Code, no ChatGPT ou no Gemini. Esta é a lista de hoje.</p>
  <div class="tpls">${tplCols}</div>
  <div class="offer">
    <div class="price"><small>Pagamento único · acesso vitalício</small><b>${PRICE}</b><span>Sem mensalidade. Garantia de 7 dias pela Hotmart.</span></div>
    <a class="cta" href="${CHECKOUT}">Quero o Premium →</a>
  </div>
  <p class="links w">Ver tudo antes de decidir: <a href="${PREMIUM_URL}">promptfly.com.br/premium</a></p>`,
  ),
);

// 15. Contracapa
pages.push(
  page(
    "dark end",
    `
  <div class="end-top"><span class="brand">Promptfly</span></div>
  <div class="end-main">
    <h2 class="w endtitle">Agora é com você.</h2>
    <p class="lead w">Coloque os 2 arquivos na pasta do projeto, cole a frase no CLAUDE.md e peça o site. Se travar em algum ponto, o guia online e a comunidade estão aí.</p>
    <div class="endlinks">
      <a href="${GUIDE_URL}"><b>Guia online</b><span>promptfly.com.br/guias</span></a>
      <a href="${PACK_URL}"><b>Baixar de novo</b><span>promptfly.com.br/design-pack</span></a>
      <a href="${PREMIUM_URL}"><b>Promptfly Premium</b><span>${PRICE} · pagamento único</span></a>
      <a href="https://www.instagram.com/rafha.gpt/"><b>Instagram</b><span>@rafha.gpt</span></a>
    </div>
  </div>
  <p class="legal">Promptfly · promptfly.com.br · Guia gratuito. Os valores dos estilos Vitrine e Noite citam a fonte SF Pro, que pertence à Apple e não é distribuída aqui: sem ela, o navegador usa a Inter.</p>`,
    { footer: false },
  ),
);

/* ---------- CSS ---------- */
const css = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "Inter", "Helvetica Neue", Arial, sans-serif; font-size: 11pt; line-height: 1.55; color: #2b2b2b; background: #f5f5f5; }
a { color: inherit; text-decoration: none; }
.page { width: 210mm; height: 297mm; padding: 20mm 18mm 24mm; position: relative; overflow: hidden; page-break-after: always; break-after: page; background: #f5f5f5; display: flex; flex-direction: column; gap: 5.2mm; }
.page.dark { background: #1a1a1a; color: #f2f2f2; }
.foot { position: absolute; left: 18mm; right: 18mm; bottom: 10mm; display: flex; justify-content: space-between; font-size: 8pt; letter-spacing: .04em; color: #5f5f5f; border-top: 1px dashed rgba(0,0,0,.2); padding-top: 3mm; }
.dark .foot { color: #bdbdbd; border-top-color: rgba(255,255,255,.25); }
.tag { align-self: flex-start; font-size: 7.5pt; font-weight: 700; letter-spacing: .06em; color: #1a1a1a; border: 1px solid #bdbdbd; border-radius: 4px; padding: 1mm 2.4mm; }
.tag-dark { color: #ffffff; border-color: rgba(255,255,255,.5); }
h2 { font-size: 27pt; font-weight: 800; line-height: 1.02; letter-spacing: -0.045em; color: #1a1a1a; text-wrap: balance; }
h2.w, .w { color: #ffffff; }
h2.h2s { font-size: 20pt; }
h3 { font-size: 12.5pt; font-weight: 800; letter-spacing: -0.02em; color: #1a1a1a; line-height: 1.2; }
.h3 { margin-top: 2mm; }
.lead { font-size: 12.2pt; line-height: 1.55; color: #2b2b2b; text-wrap: pretty; }
.lead.w { color: #e6e6e6; }
.small { font-size: 8.8pt; color: #3a3a3a; }
p { text-wrap: pretty; }
b { font-weight: 700; color: #1a1a1a; }
.dark b { color: #ffffff; }
.m, .mono { font-family: "SF Mono", "Fira Code", Consolas, monospace; }
.m { font-size: .88em; background: rgba(0,0,0,.07); padding: .2mm 1.2mm; border-radius: 3px; }
.callout { background: #fff; border-left: 1.4mm solid #ff4c00; border-radius: 3mm; padding: 4mm 5mm; font-size: 10pt; border-top: 1px solid rgba(0,0,0,.06); border-right: 1px solid rgba(0,0,0,.06); border-bottom: 1px solid rgba(0,0,0,.06); }
.dark-callout { background: #1a1a1a; color: #f2f2f2; border-left-color: #ff4c00; }
.dark-callout b { color: #fff; } .dark-callout span { color: #d6d6d6; font-size: 9.5pt; }
.note { background: #fff; border: 1px dashed rgba(0,0,0,.25); border-radius: 3mm; padding: 4mm 5mm; font-size: 10pt; }

/* capa */
.cover { justify-content: space-between; padding: 18mm; }
.cover-top { display: flex; justify-content: space-between; align-items: center; }
.brand { font-weight: 800; font-size: 14pt; letter-spacing: -.02em; color: #fff; }
.brand-sub { font-size: 9pt; color: #d6d6d6; }
.cover-main { display: flex; flex-direction: column; gap: 6mm; margin-top: 8mm; }
.cover-title { font-size: 44pt; font-weight: 800; line-height: .98; letter-spacing: -0.05em; color: #fff; text-wrap: balance; }
.cover-title em { font-style: normal; color: #ff4c00; }
.cover-sub { font-size: 12.5pt; line-height: 1.55; color: #e6e6e6; max-width: 150mm; }
.cover-sub b { color: #fff; }
.cover-art { position: relative; height: 82mm; }
.win { border-radius: 3.5mm; overflow: hidden; font-size: 9pt; position: absolute; }
.win .bar { display: flex; align-items: center; gap: 2.5mm; padding: 2.6mm 3.5mm; border-bottom: 1px solid rgba(128,128,128,.35); font-family: "SF Mono", Consolas, monospace; font-weight: 700; }
.win .bar em { margin-left: auto; font-style: normal; font-family: "Inter", sans-serif; font-size: 7pt; letter-spacing: .05em; text-transform: uppercase; background: #fff; color: #1a1a1a; padding: .4mm 2mm; border-radius: 999px; }
.win .bar em.no { background: #ff4c00; }
.dots { display: flex; gap: 1.2mm; } .dots i { width: 2mm; height: 2mm; border-radius: 50%; background: currentColor; opacity: .3; display: block; }
.win-d { left: 0; top: 0; width: 112mm; background: #2a2a2a; color: #f5f5f5; transform: rotate(-1deg); border: 1px solid rgba(255,255,255,.12); }
.win-l { right: 0; bottom: 0; width: 100mm; background: #fff; color: #1a1a1a; transform: rotate(1deg); }
.code { display: flex; flex-direction: column; gap: 1.6mm; padding: 4mm; font-family: "SF Mono", Consolas, monospace; font-size: 8.5pt; color: #d6d6d6; }
.code span { display: flex; justify-content: space-between; } .code b { color: #ff4c00; font-weight: 600; }
.rules { display: flex; flex-direction: column; gap: 1.8mm; padding: 4mm; font-weight: 600; }

/* sumário */
.toc { display: flex; flex-direction: column; background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 3mm; }
.toc div { display: flex; align-items: center; gap: 4mm; padding: 3mm 5mm; border-bottom: 1px dashed rgba(0,0,0,.15); }
.toc div:last-child { border-bottom: 0; }
.toc b { width: 6.5mm; height: 6.5mm; border-radius: 50%; background: #1a1a1a; color: #fff; display: grid; place-items: center; font-size: 8pt; flex-shrink: 0; }
.toc span { flex: 1; font-weight: 600; color: #1a1a1a; } .toc i { font-style: normal; color: #5f5f5f; font-size: 9pt; }

/* tabelas */
table.cmp { width: 100%; border-collapse: separate; border-spacing: 0 1.6mm; font-size: 9.6pt; }
table.cmp th { text-align: left; font-size: 8pt; letter-spacing: .06em; text-transform: uppercase; color: #1a1a1a; padding: 0 3mm; }
table.cmp td { background: #fff; padding: 2.4mm 3.5mm; vertical-align: top; }
table.cmp td:first-child { font-weight: 800; color: #1a1a1a; border-radius: 3mm 0 0 3mm; }
table.cmp td:last-child { border-radius: 0 3mm 3mm 0; }
table.cmp td.on { background: #1a1a1a; color: #fff; }
table.cmp th.on { color: #1a1a1a; }
table.tools td:first-child { width: 32%; }

/* cartões */
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
.card { border-radius: 4mm; padding: 6mm; display: flex; flex-direction: column; gap: 2mm; }
.card small { font-size: 7.5pt; font-weight: 700; letter-spacing: .08em; opacity: .75; }
.card h3.mono { font-size: 15pt; letter-spacing: -.02em; }
.card .role { font-weight: 800; font-size: 11pt; letter-spacing: -.02em; margin-bottom: 1.5mm; }
.card.light { background: #fff; border: 1px solid rgba(0,0,0,.08); color: #1a1a1a; }
.card.darkc { background: #1a1a1a; color: #fff; } .card.darkc h3, .card.darkc b { color: #fff; }
.foot-note { margin-top: auto; padding-top: 2.5mm; border-top: 1px dashed rgba(128,128,128,.5); font-size: 9pt; }
ul.chk { list-style: none; display: flex; flex-direction: column; gap: 1.8mm; font-size: 9.6pt; }
ul.chk li { padding-left: 5.5mm; position: relative; }
ul.chk li::before { content: "✓"; position: absolute; left: 0; font-weight: 800; }
ul.chk.no li::before { content: "✕"; color: #ff4c00; }
.steps3 { display: flex; gap: 3mm; } .steps3.v { flex-direction: column; }
.steps3 > div { flex: 1; display: flex; gap: 3mm; align-items: flex-start; background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 3mm; padding: 3.5mm 4mm; font-size: 9.6pt; }
.steps3 > div > b { flex-shrink: 0; width: 6.5mm; height: 6.5mm; border-radius: 50%; background: #ff4c00; color: #1a1a1a; display: grid; place-items: center; font-size: 8.5pt; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3mm; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
.pt, .ap { background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 3mm; padding: 4mm; display: flex; flex-direction: column; gap: 1.2mm; font-size: 9.2pt; }
.pt small { font-family: "SF Mono", Consolas, monospace; font-size: 8pt; font-weight: 700; opacity: .6; }
.pt b, .ap b { font-size: 11pt; letter-spacing: -.02em; }
.pt em { font-style: normal; font-weight: 700; color: #1a1a1a; }

/* código */
.codeblock { background: #1a1a1a; border-radius: 3mm; padding: 4.5mm 5mm; }
.codeblock pre { font-family: "SF Mono", "Fira Code", Consolas, monospace; font-size: 8.3pt; line-height: 1.65; color: #e4e4e4; white-space: pre-wrap; }
.codeblock.small pre { font-size: 8.6pt; }
.anno { display: grid; grid-template-columns: 1.15fr 1fr; gap: 4mm; align-items: start; }
.notes { display: flex; flex-direction: column; gap: 2.4mm; font-size: 9.2pt; }
.notes p { background: #fff; border-left: 1.2mm solid #ff4c00; padding: 2.4mm 3.2mm; border-radius: 0 2.5mm 2.5mm 0; }

/* passos */
.steps { display: flex; flex-direction: column; gap: 3mm; }
.st { display: flex; gap: 4mm; align-items: flex-start; }
.st > b { flex-shrink: 0; width: 8mm; height: 8mm; border-radius: 50%; background: #ff4c00; color: #1a1a1a; display: grid; place-items: center; font-size: 10pt; }
.st h3 { margin-bottom: 1mm; } .st p { font-size: 9.8pt; }

/* estilos */
.style { display: grid; grid-template-columns: 62mm 1fr; gap: 5mm; background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 4mm; padding: 4mm; align-items: center; }
.sbody { display: flex; flex-direction: column; gap: 1.8mm; font-size: 9.4pt; }
.sbody h3 small { font-size: 7.5pt; letter-spacing: .05em; text-transform: uppercase; border: 1px solid rgba(0,0,0,.25); border-radius: 3px; padding: 0 1.6mm; margin-left: 1.5mm; vertical-align: middle; }
.sw { display: flex; gap: 2mm; flex-wrap: wrap; }
.sw span { display: flex; flex-direction: column; align-items: center; gap: .4mm; font-size: 7pt; font-weight: 600; color: #1a1a1a; }
.sw i { width: 9mm; height: 9mm; border-radius: 50%; border: 1px solid rgba(0,0,0,.25); display: block; }
.sw small { font-size: 6.2pt; font-family: Consolas, monospace; color: #5f5f5f; }
.mock { position: relative; height: 40mm; border-radius: 2.5mm; overflow: hidden; border: 1px solid rgba(0,0,0,.2); padding: 2.4mm 3mm 0; display: flex; flex-direction: column; gap: 1.3mm; }
.m-nav { display: flex; align-items: center; gap: 2mm; padding-bottom: 1.4mm; }
.m-nav i { width: 2.2mm; height: 2.2mm; border-radius: 50%; display: block; } .m-nav b { width: 9mm; height: .8mm; margin: 0 auto; opacity: .6; display: block; } .m-nav u { width: 6mm; height: 2.2mm; display: block; }
.m-hero { font-size: 10.5pt; line-height: 1.02; letter-spacing: -.035em; }
.m-line { width: 70%; height: 1mm; opacity: .5; border-radius: 1px; } .m-line.s { width: 46%; }
.m-cta { align-self: flex-start; font-size: 5.6pt; font-weight: 600; padding: .5mm 2.2mm; }
.m-band { position: absolute; left: 0; right: 0; bottom: 0; height: 9mm; display: flex; gap: 1.6mm; padding: 1.8mm 3mm 0; }
.m-band span { flex: 1; height: 10mm; border-radius: 2.4mm; display: block; }

/* checklist e glossário */
.check2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
.ckc { background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 3mm; padding: 4.5mm; display: flex; flex-direction: column; gap: 1.8mm; font-size: 9.8pt; }
.gl { display: grid; grid-template-columns: 1fr 1fr; gap: 2.4mm; }
.gl > div { background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 3mm; padding: 3mm 3.6mm; font-size: 9pt; display: flex; flex-direction: column; gap: .6mm; }

/* apêndice */
.ap-full { font-family: "SF Mono", "Fira Code", Consolas, monospace; font-size: 7.4pt; line-height: 1.5; background: #1a1a1a; color: #e4e4e4; border-radius: 3mm; padding: 5mm 6mm; white-space: pre-wrap; columns: 2; column-gap: 8mm; }

/* premium */
.pcards { display: grid; grid-template-columns: 1fr 1fr; gap: 3.2mm; }
.pc { background: #262626; border: 1px solid rgba(255,255,255,.1); border-radius: 3.5mm; padding: 4.6mm; display: flex; flex-direction: column; gap: 1.4mm; font-size: 9.2pt; color: #e0e0e0; }
.pc.big { grid-column: 1 / -1; background: #ff4c00; color: #1a1a1a; border: 0; }
.pc.big h3, .pc.big small, .pc.big b { color: #1a1a1a; } .pc.big h3 { font-size: 15pt; }
.pc.big .sm { font-size: 8.6pt; opacity: .85; }
.pc small { font-size: 7.4pt; font-weight: 700; letter-spacing: .08em; opacity: .8; }
.pc h3 { color: #fff; font-size: 12pt; }
.why { background: rgba(255,255,255,.08); border-radius: 3mm; padding: 4mm 5mm; font-size: 9.8pt; color: #e6e6e6; }
.small-lead { font-size: 10.5pt; }
.tpls { display: grid; grid-template-columns: 1fr 1fr; gap: 2.2mm; }
.tpl { background: #262626; border: 1px solid rgba(255,255,255,.1); border-radius: 2.6mm; padding: 2.6mm 3.4mm; display: flex; flex-direction: column; gap: .4mm; font-size: 8.2pt; color: #cfcfcf; line-height: 1.35; }
.tpl b { font-size: 9.6pt; color: #fff; }
.offer { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 6mm; background: #fff; color: #1a1a1a; border-radius: 4mm; padding: 5mm 6mm; }
.price { display: flex; flex-direction: column; gap: .6mm; } .price small { font-size: 8pt; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: #3a3a3a; }
.price b { font-size: 26pt; letter-spacing: -.04em; line-height: 1; color: #1a1a1a; } .price span { font-size: 8.6pt; color: #3a3a3a; }
.cta { background: #ff4c00; color: #1a1a1a; font-weight: 800; font-size: 11pt; padding: 4mm 7mm; border-radius: 3mm; white-space: nowrap; }
.links { font-size: 9pt; } .links a { text-decoration: underline; color: #fff; font-weight: 700; }

/* contracapa */
.end { justify-content: space-between; padding: 18mm; }
.end-main { display: flex; flex-direction: column; gap: 6mm; }
.endtitle { font-size: 42pt; }
.endlinks { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; margin-top: 4mm; }
.endlinks a { background: #262626; border: 1px solid rgba(255,255,255,.12); border-radius: 3.5mm; padding: 5mm; display: flex; flex-direction: column; gap: 1mm; }
.endlinks b { font-size: 12pt; color: #fff; } .endlinks span { font-size: 9pt; color: #d0d0d0; }
.legal { font-size: 7.4pt; color: #bdbdbd; line-height: 1.5; }
`;

/* ---------- script de conferência de estouro ---------- */
const checkScript = `
<script>
document.fonts.ready.then(() => {
  const over = [];
  document.querySelectorAll('.page').forEach((p, i) => {
    const kids = [...p.children].filter(c => !c.classList.contains('foot'));
    const last = kids[kids.length - 1];
    const limit = p.getBoundingClientRect().bottom - (p.classList.contains('cover') || p.classList.contains('end') ? 0 : 24 * 3.78);
    const bottom = last ? last.getBoundingClientRect().bottom : 0;
    if (p.scrollHeight > p.clientHeight + 1 || (!p.classList.contains('cover') && !p.classList.contains('end') && bottom > limit + 2)) over.push({ page: i + 1, over: Math.round(bottom - limit) });
  });
  document.documentElement.setAttribute('data-overflow', JSON.stringify(over));
  document.documentElement.setAttribute('data-pages', String(document.querySelectorAll('.page').length));
});
</script>`;

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Guia: Os 2 arquivos que impedem a IA de fazer site feio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>${css}</style></head><body>${pages.join("\n")}${checkScript}</body></html>`;

/* ---------- Chrome ---------- */
if (!fs.existsSync(CHROME)) {
  console.error("Chrome não encontrado em", CHROME, "(use CHROME_PATH)");
  process.exit(1);
}
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pf-ebook-"));
const htmlFile = path.join(tmp, "ebook.html");
fs.writeFileSync(htmlFile, html);
const url = "file:///" + htmlFile.replace(/\\/g, "/");
const base = ["--headless=new", "--disable-gpu", `--user-data-dir=${path.join(tmp, "profile")}`, "--virtual-time-budget=25000"];

// 1) conferência de estouro de página
const dom = spawnSync(CHROME, [...base, "--dump-dom", url], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const m = /data-overflow="([^"]*)"/.exec(dom.stdout || "");
const pagesCount = /data-pages="(\d+)"/.exec(dom.stdout || "")?.[1];
if (!m) {
  console.error("Não consegui medir as páginas (fontes não carregaram?).");
  process.exit(1);
}
const overflow = JSON.parse(m[1].replace(/&quot;/g, '"'));
console.log(`páginas: ${pagesCount}`);
if (overflow.length) {
  console.error("Páginas que estouram:", JSON.stringify(overflow));
  if (!process.env.FORCE) process.exit(1);
}

// 2) PDF
const r = spawnSync(CHROME, [...base, "--no-pdf-header-footer", `--print-to-pdf=${OUT}`, url], { encoding: "utf8" });
if (!fs.existsSync(OUT)) {
  console.error("Falhou ao gerar o PDF.", r.stderr);
  process.exit(1);
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log("PDF:", OUT, Math.round(fs.statSync(OUT).size / 1024) + " KB");
