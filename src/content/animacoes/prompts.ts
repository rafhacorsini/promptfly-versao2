/**
 * Prompts da Biblioteca de Animações. SÓ NO SERVIDOR: importado por
 * src/lib/animacoes.ts. Os das animações Premium não podem ir pro navegador.
 */

const REGRAS = `REGRAS
- Use GSAP + ScrollTrigger. Anime só transform, opacity, filter e clip-path: nunca width, height, top ou left.
- Respeite prefers-reduced-motion: sem animação, mostre o estado final.
- Nenhum ancestral de elemento sticky pode ter overflow: hidden. No body, use overflow-x: clip.
- Se o projeto usa Lenis, sincronize: lenis.on("scroll", ScrollTrigger.update) e gsap.ticker.add((t) => lenis.raf(t * 1000)).
- Em React ou Next.js, crie as animações dentro de gsap.context() e chame ctx.revert() no cleanup do useEffect.
- Teste no celular (375px) e no desktop.

Use o código de referência abaixo como base e adapte textos, imagens e cores ao meu projeto.`;

const p = (pedido: string, oQue: string, valores: string) =>
  `${pedido}\n\nO QUE ACONTECE\n${oQue}\n\nVALORES\n${valores}\n\n${REGRAS}`;

export const prompts: Record<string, string> = {
  "reveal-ao-entrar": p(
    "Quero uma grade de cards com animação scroll-triggered: cada card entra quando chega na tela.",
    `- Os cards começam 60px abaixo e invisíveis.
- Quando um card chega a 88% da altura da tela, ele sobe e aparece.
- Cards que entram juntos animam em sequência, não todos ao mesmo tempo (use ScrollTrigger.batch).
- Rolando pra cima, eles saem do mesmo jeito.`,
    `- Entrada: y 60 → 0, opacity 0 → 1, duration 0.9s, ease power3.out, stagger 0.08s
- Saída (onLeaveBack): y 0 → 60, opacity 1 → 0, duration 0.5s, ease power2.in, stagger 0.04s
- start: "top 88%"`
  ),
  "imagem-cresce": p(
    "Quero uma seção com animação scroll-linked: a imagem cresce de card pequeno até a tela cheia acompanhando a rolagem.",
    `- A seção tem 300vh de altura e uma "câmera" sticky de 100vh dentro.
- A imagem ocupa a tela toda, mas começa reduzida pela metade, com cantos arredondados.
- Conforme a pessoa rola, ela cresce até a tela cheia e os cantos zeram. Rolando pra cima, desfaz.
- A foto dentro começa ampliada e assenta, pra dar profundidade.
- Uma barra fina no topo mostra o progresso da página inteira.`,
    `- Imagem: scale 0.5 → 1, borderRadius 28px → 0
- Foto interna: scale 1.35 → 1
- scrub: 0.6, start "top top", end "bottom bottom" da seção
- Barra de progresso: scaleX 0 → 1 na página toda, scrub 0.3`
  ),
  "parallax-camadas": p(
    "Quero uma cena com parallax de três camadas andando em velocidades diferentes.",
    `- Uma seção de 180vh com três camadas sobrepostas: foto de fundo, um título enorme e duas fotos pequenas na frente.
- Todas as camadas usam o mesmo trecho de scroll (a cena passando pela tela inteira). O que muda é quanto cada uma anda.
- Quanto mais "perto" a camada, mais ela se move.
- A foto de fundo é 30% maior que a seção, pra nunca mostrar borda enquanto anda.`,
    `- start: "top bottom", end: "bottom top", scrub: true em todas
- Fundo: yPercent -8 → 8
- Título: yPercent 60 → -60
- Foto 1: yPercent 80 → -120
- Foto 2: yPercent 120 → -200`
  ),
  "sticky-etapas": p(
    "Quero uma seção sticky: o título fica parado à esquerda enquanto as etapas passam à direita.",
    `- Duas colunas. A da esquerda tem o título e um contador grande (01 / 04) com position: sticky.
- A da direita tem 4 etapas, cada uma com uns 90vh de altura, número, título, texto e imagem.
- A etapa que cruza a linha de 55% da tela fica ativa (opacidade total); as outras ficam apagadas.
- O contador da esquerda mostra o número da etapa ativa.
- No celular, vira uma coluna só e o título gruda no topo com fundo.`,
    `- Sticky: top 12vh (CSS puro, sem pin do GSAP)
- Etapa inativa: opacity 0.2, transição de 0.5s em CSS
- ScrollTrigger por etapa: start "top 55%", end "bottom 55%", onToggle ativa a etapa`
  ),
  "scroll-horizontal": p(
    "Quero uma galeria com horizontal scroll: a rolagem vertical vira deslocamento lateral.",
    `- A seção trava na tela (pin) e a fileira de painéis anda pra esquerda conforme a pessoa rola pra baixo.
- O primeiro painel é um texto; os outros são fotos grandes com legenda.
- O curso do pin é exatamente a largura que sobra da fileira: 1px de scroll = 1px de deslocamento.
- Quando o último painel chega, a página volta a rolar normal.
- Recalcule a distância quando a tela muda de tamanho.`,
    `- x: -(track.scrollWidth - innerWidth), ease "none"
- pin: true, start "top top", end "+=" + distância, scrub 0.6, invalidateOnRefresh: true
- Painéis: 56vw x 68vh no desktop, 80vw no celular, gap 2.5vw`
  ),
  "scroll-snap-secoes": p(
    "Quero seções de tela cheia com scroll snap: cada rolagem termina encaixada no começo de uma cena.",
    `- 4 seções de 100vh, cada uma com foto de fundo, número da cena, título e uma frase.
- O encaixe é CSS puro (scroll-snap-type: y mandatory no html, scroll-snap-align: start nas seções).
- O texto de cada cena entra depois que ela encaixa e sai se a pessoa voltar.
- A foto faz um zoom-out sutil ligado ao scroll enquanto a cena sobe.
- Pontos fixos na lateral mostram em que cena a pessoa está.`,
    `- Texto: y 50 → 0, opacity 0 → 1, duration 0.9s, power3.out, stagger 0.08s, start "top 60%", toggleActions "play none none reverse"
- Foto: scale 1.15 → 1, scrub, start "top bottom", end "top top"
- Pontos: ScrollTrigger com start "top center", end "bottom center"`
  ),
  "texto-linhas-mascara": p(
    "Quero títulos que aparecem linha por linha, cada linha subindo de trás de uma máscara (scroll-triggered).",
    `- Cada linha do título fica num span com overflow: hidden (a máscara) e o texto dentro dele começa escondido embaixo.
- Quando o bloco chega a 70% da tela, primeiro aparece o rótulo e depois as linhas sobem uma de cada vez.
- As linhas sobem com uma leve rotação que endireita no caminho.
- Rolando pra cima, desfaz.
- Compense letras com perna (g, p, ç) com padding-bottom na máscara pra não cortar.
- Sem SplitText: as linhas já vêm separadas no HTML.`,
    `- Linhas: yPercent 115 → 0, rotate 4 → 0, transformOrigin "0% 100%", duration 1.1s, ease expo.out, stagger 0.09s
- Rótulo: opacity 0 → 1, y 20 → 0, 0.6s, entrando 0.35s antes das linhas
- start "top 70%", toggleActions "play none none reverse"`
  ),
  "imagem-clip-path": p(
    "Quero uma imagem que se revela com clip-path ligado ao scroll, como uma janela que abre.",
    `- Seção de 260vh com uma câmera sticky de 100vh.
- A imagem ocupa a tela toda desde o início; o clip-path decide quanto dela aparece.
- Começa como uma janela pequena com cantos arredondados no centro e abre até a tela cheia.
- Ao mesmo tempo, a foto dentro sai do zoom.
- Perto do fim, uma legenda grande aparece por cima.`,
    `- clip-path: inset(32% 38% 32% 38% round 20px) → inset(0% 0% 0% 0% round 0px) (os dois com a mesma forma, pra interpolar)
- Foto: scale 1.4 → 1
- Legenda: opacity 0 → 1, y 40 → 0, entrando aos 70% da timeline
- scrub 0.6, start "top top", end "bottom bottom"`
  ),
  "cards-empilhados": p(
    "Quero cards empilhados no scroll (stacking cards).",
    `- 4 cards grandes em sequência, cada um com texto à esquerda e imagem à direita.
- Cada card é position: sticky e gruda um pouco mais abaixo do anterior, formando uma pilha visível pelas bordas.
- Enquanto o próximo card sobe, o card de baixo encolhe e escurece.
- O último card não encolhe.`,
    `- top do sticky: calc(8vh + índice * 18px)
- Card de baixo: scale 1 → 0.92, filter brightness(1) → brightness(0.45), transformOrigin "50% 0%"
- ScrollTrigger no próximo card: start "top bottom", end "top 12%", scrub: true`
  ),
  "hero-vira-card": p(
    "Quero um hero em tela cheia que vira um card no meio da tela conforme a pessoa rola.",
    `- Seção de 300vh com câmera sticky de 100vh.
- A foto começa ocupando a tela toda, com o título grande embaixo à esquerda.
- Rolando, a foto fecha num card central com cantos arredondados (via clip-path, não scale).
- Enquanto fecha, a foto dentro amplia e desce um pouco pra o assunto terminar no centro do card.
- O título sobe e some; dois textos curtos aparecem nas laterais do card.
- No celular o card final é mais alto que largo.`,
    `- Desktop: clip-path inset(0% round 0px) → inset(22% 34% 22% 34% round 24px)
- Celular (gsap.matchMedia): → inset(24% 12% 24% 12% round 20px)
- Foto: scale 1 → 1.2, yPercent 0 → 16
- Título: y 0 → -80, opacity 1 → 0 na primeira metade
- Textos laterais: opacity 0 → 1 a partir de 65%
- scrub 0.6, start "top top", end "bottom bottom"`
  ),
  "texto-preenche": p(
    "Quero um parágrafo que acende palavra por palavra conforme a rolagem (text fill scroll-linked).",
    `- Seção de 260vh com o parágrafo grande numa câmera sticky de 100vh.
- O parágrafo é quebrado em spans por palavra com JavaScript (createElement + textContent, sem innerHTML).
- Todas as palavras começam apagadas e acendem em sequência, amarradas ao scroll.
- Uma palavra-chave (definida num data-attribute) acende na cor de destaque.
- Rolando pra cima, apagam na ordem inversa.`,
    `- Palavras: opacity 0.14 → 1, ease "none", stagger 0.1 numa timeline
- scrub 0.5, start "top top", end "bottom bottom"
- Tipografia: clamp(30px, 5.2vw, 72px), peso 700, letter-spacing -0.035em`
  ),
  "marquee-velocidade": p(
    "Quero faixas de texto em loop (marquee) que aceleram e inclinam conforme a velocidade da rolagem.",
    `- 3 faixas de texto grande rodando em loop infinito; as faixas pares andam no sentido contrário.
- O texto de cada faixa vem duplicado, pra o loop não ter emenda.
- Quanto mais rápido a pessoa rola, mais rápido o loop gira e mais as faixas inclinam.
- Rolando pra cima, o sentido inverte.
- Quando a rolagem para, tudo volta à velocidade e inclinação normais suavemente.
- A faixa do meio tem só o contorno das letras.`,
    `- Loop: xPercent 0 → -50, duration 22s, ease "none", repeat -1
- Multiplicador: 1 + |getVelocity()| / 400, limitado a 6, vezes self.direction
- Inclinação: skewX = getVelocity() / -250, limitada a ±10°, com gsap.quickTo (0.5s, power3)
- Volta ao normal: 150ms depois da última rolagem, timeScale em 1.2s`
  ),
  "contador-scroll": p(
    "Quero números que sobem junto com a rolagem, com barras que enchem (contador scroll-linked).",
    `- Seção de 280vh com câmera sticky de 100vh, título e 3 métricas em colunas.
- Cada número conta de 0 até o valor final amarrado ao scroll; rolando pra cima, ele desce.
- Embaixo de cada número, uma barra fina enche até a porcentagem definida.
- Números com casa decimal usam vírgula.
- O valor animado é uma variável comum; o texto só é reescrito no onUpdate.
- Os números são de exemplo: deixe um aviso pra trocar pelos dados reais do cliente.`,
    `- Uma timeline com scrub 0.6, start "top top", end "bottom bottom"
- Cada número: de 0 até data-to, ease "none", todos começando no tempo 0
- Barras: scaleX 0 → data-w (0 a 1), transformOrigin "0 50%"`
  ),
  "cortina-entre-secoes": p(
    "Quero transições de cortina entre seções: a próxima sobe por cima da anterior.",
    `- 3 seções de 100vh com foto de fundo, número da cena, título e frase.
- Cada seção (menos a última) trava no topo com pinSpacing: false, então a próxima rola por cima dela.
- Enquanto a próxima sobe, a de baixo encolhe e escurece.
- A seção que chega por cima tem cantos superiores arredondados e sombra.`,
    `- Pin: start "top top", pin: true, pinSpacing: false
- Seção de baixo: scale 1 → 0.88, opacity 1 → 0.3, transformOrigin "50% 0%"
- ScrollTrigger na próxima seção: start "top bottom", end "top top", scrub: true
- Cantos: border-radius 24px 24px 0 0`
  ),
  "split-screen-sticky": p(
    "Quero uma tela dividida: imagem presa à esquerda trocando por cross-fade, textos passando à direita.",
    `- Duas colunas. A esquerda é uma câmera sticky de 100vh com 4 imagens empilhadas; só a primeira aparece no início.
- A direita tem 4 blocos de texto de 100vh cada.
- Quando cada bloco sobe, a imagem correspondente aparece por cima da anterior, ligada ao scroll.
- Um número no canto da imagem mostra o capítulo ativo (01 / 04).
- No celular, a imagem gruda no topo ocupando metade da tela e os textos passam por baixo.`,
    `- Cross-fade: opacity 0 → 1 e scale 1.08 → 1, scrub, start "top 80%", end "top 30%" do bloco
- Capítulo ativo: ScrollTrigger com start "top 50%", end "bottom 50%"`
  ),
};
