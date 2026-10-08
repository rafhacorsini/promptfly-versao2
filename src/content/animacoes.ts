/**
 * Biblioteca de Animações de Scroll (/animacoes).
 *
 * Cada animação tem:
 * - src/content/animacoes/<slug>.html: o demo, que é também o código entregue
 * - um prompt em src/content/animacoes/prompts.ts (só no servidor)
 * - public/animacoes/<slug>.mp4 (preview em loop) e <slug>-poster.jpg
 *
 * Os previews são gravados do demo rolando num Chrome headless:
 * node scripts/animacoes/gerar-videos.mjs <slug>. Mudou o demo, gere de novo.
 *
 * Este arquivo pode ir pro navegador: não tem prompt nem código.
 */

export type TipoAnimacao =
  | "Scroll-triggered"
  | "Scroll-linked"
  | "Parallax"
  | "Sticky"
  | "Scroll snap"
  | "Horizontal scroll"
  | "Velocidade do scroll";

export interface Animacao {
  slug: string;
  nome: string;
  tipo: TipoAnimacao;
  descricao: string;
  /** A frase pra colar no pedido pra IA. */
  frase: string;
  access: "free" | "premium";
}

export const animacoes: Animacao[] = [
  {
    slug: "reveal-ao-entrar",
    nome: "Cards que entram na hora certa",
    tipo: "Scroll-triggered",
    descricao: "Cada card aparece quando chega na tela, um depois do outro. Rolando pra cima, eles saem do mesmo jeito.",
    frase: "Usa scroll-triggered nos cards: cada um entra de baixo (y 60 → 0, opacity 0 → 1) quando chega a 88% da tela, com stagger de 0.08s e power3.out.",
    access: "free",
  },
  {
    slug: "imagem-cresce",
    nome: "Imagem que cresce com a rolagem",
    tipo: "Scroll-linked",
    descricao: "A seção trava e a imagem vai de card pequeno até a tela cheia, acompanhando o scroll quadro a quadro.",
    frase: "Usa scroll-linked com a seção presa: a imagem começa em scale 0.5 com cantos de 28px e chega à tela cheia acompanhando a rolagem (scrub 0.6).",
    access: "free",
  },
  {
    slug: "parallax-camadas",
    nome: "Parallax em três camadas",
    tipo: "Parallax",
    descricao: "Fundo, título e fotos andando em velocidades diferentes no mesmo trecho de scroll. É isso que cria profundidade.",
    frase: "Usa parallax com 3 camadas no mesmo trecho de scroll: o fundo anda 16%, o título 120% e as fotos da frente até 320%.",
    access: "free",
  },
  {
    slug: "sticky-etapas",
    nome: "Título fixo, etapas passando",
    tipo: "Sticky",
    descricao: "O título da esquerda fica parado enquanto as etapas da direita rolam. A etapa ativa acende e o contador muda.",
    frase: "Usa sticky no título da esquerda enquanto as etapas da direita passam; a etapa que cruza 55% da tela fica ativa e atualiza o contador.",
    access: "free",
  },
  {
    slug: "scroll-horizontal",
    nome: "Galeria que anda pro lado",
    tipo: "Horizontal scroll",
    descricao: "A seção trava e a rolagem vertical vira deslocamento lateral da galeria. Acabou a galeria, a página volta ao normal.",
    frase: "Usa horizontal scroll: prende a seção e converte a rolagem vertical em translateX da fileira, com o curso do pin igual à largura que sobra.",
    access: "free",
  },
  {
    slug: "scroll-snap-secoes",
    nome: "Cenas que encaixam",
    tipo: "Scroll snap",
    descricao: "Cada rolagem termina no começo de uma cena de tela cheia. O texto entra depois do encaixe e os pontos mostram onde você está.",
    frase: "Usa scroll snap (scroll-snap-type: y mandatory) em seções de 100vh; o texto de cada cena entra só depois do encaixe e a foto faz um zoom-out ligado ao scroll.",
    access: "premium",
  },
  {
    slug: "texto-linhas-mascara",
    nome: "Texto revelado linha por linha",
    tipo: "Scroll-triggered",
    descricao: "Cada linha sobe de trás de uma máscara, uma de cada vez, com uma leve rotação que endireita no caminho.",
    frase: "Usa scroll-triggered com máscara por linha: cada linha sobe de yPercent 115 dentro de um overflow hidden, com expo.out em 1.1s e stagger de 0.09s.",
    access: "premium",
  },
  {
    slug: "imagem-clip-path",
    nome: "Janela que abre com clip-path",
    tipo: "Scroll-linked",
    descricao: "A imagem fica presa e uma janela recortada se abre até a tela cheia, enquanto a foto assenta do zoom.",
    frase: "Usa scroll-linked com clip-path: a imagem fica sticky e abre de inset(32% 38% round 20px) até a tela cheia, com a foto indo de scale 1.4 pra 1.",
    access: "premium",
  },
  {
    slug: "cards-empilhados",
    nome: "Cards empilhados",
    tipo: "Sticky",
    descricao: "Um card gruda por cima do outro como um baralho. O de baixo encolhe e escurece quando o próximo chega.",
    frase: "Usa stacking cards: cada card é sticky com 18px a mais de offset e, quando o próximo sobe, o de baixo vai pra scale 0.92 e brightness 0.45.",
    access: "premium",
  },
  {
    slug: "hero-vira-card",
    nome: "Hero que vira card",
    tipo: "Scroll-linked",
    descricao: "A foto em tela cheia do hero fecha até virar um card no meio da tela, enquanto o título some e os textos laterais aparecem.",
    frase: "Usa scroll-linked com o hero preso: a foto em tela cheia fecha num card central via clip-path inset(22% 34% round 24px) enquanto o título some.",
    access: "premium",
  },
  {
    slug: "texto-preenche",
    nome: "Texto que acende palavra por palavra",
    tipo: "Scroll-linked",
    descricao: "O parágrafo fica parado e cada palavra acende no ritmo da rolagem. Uma palavra-chave acende na cor de destaque.",
    frase: "Usa text fill scroll-linked: quebra o parágrafo em palavras e acende cada uma de opacity 0.14 pra 1 em sequência, com a seção sticky.",
    access: "premium",
  },
  {
    slug: "marquee-velocidade",
    nome: "Marquee que acelera com o scroll",
    tipo: "Velocidade do scroll",
    descricao: "Três faixas de texto em loop que aceleram e inclinam quanto mais rápido você rola, e voltam ao normal quando você para.",
    frase: "Usa marquee com a velocidade do scroll: o loop acelera até 6x conforme o getVelocity() e inclina até 10° em skewX, voltando ao normal quando a rolagem para.",
    access: "premium",
  },
  {
    slug: "contador-scroll",
    nome: "Números que sobem com a rolagem",
    tipo: "Scroll-linked",
    descricao: "Os números contam de zero até o valor e as barras enchem junto, tudo amarrado ao scroll. Volta, e eles descem.",
    frase: "Usa um contador scroll-linked: os números sobem de 0 até o valor e as barras enchem junto, tudo numa timeline com scrub e a seção presa.",
    access: "premium",
  },
  {
    slug: "cortina-entre-secoes",
    nome: "Cortina entre seções",
    tipo: "Sticky",
    descricao: "Cada seção trava e a próxima sobe por cima dela como uma cortina, com cantos arredondados e sombra.",
    frase: "Usa cortina entre seções: cada seção trava com pinSpacing false e a próxima sobe por cima; a de baixo vai pra scale 0.88 e opacity 0.3.",
    access: "premium",
  },
  {
    slug: "split-screen-sticky",
    nome: "Tela dividida com imagem fixa",
    tipo: "Sticky",
    descricao: "A imagem da esquerda fica presa e troca por cross-fade a cada bloco de texto que passa à direita.",
    frase: "Usa split screen sticky: imagem presa à esquerda, textos passando à direita, e cross-fade ligado ao scroll entre as imagens a cada bloco.",
    access: "premium",
  },
];

export function getAnimacao(slug: string): Animacao | undefined {
  return animacoes.find((a) => a.slug === slug);
}
