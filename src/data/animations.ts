export interface AnimationData {
  id: string;
  number: string;
  title: string;
  description: string;
  tech: string;
  prompt: string;
  htmlPath: string;
  previewHeight: number;
}

export const animations: AnimationData[] = [
  {
    id: "gallery-3d",
    number: "01",
    title: "3D Infinite Gallery",
    description: "Galeria 3D infinita com fotos avançando no eixo Z em loop. Blur direcional por velocidade de scroll, fade de opacidade por profundidade e título com mix-blend-mode: difference.",
    tech: "Three.js · ShaderMaterial · WebGL",
    prompt: `Crie uma galeria 3D infinita com Three.js (UMD CDN):
— 8 PlaneGeometry com ShaderMaterial e textura do picsum.photos.
— As fotos avançam no eixo Z em loop. Quando uma sai pelo front, recicla atrás com nova imagem.
— Fragment shader: blur direcional por scrollForce (uniform), fade de opacity por profundidade.
— Distribuição espacial em golden-angle: alguns planos passam pelo centro da tela.
— Canvas inserido diretamente no body (insertBefore) — crítico para mix-blend-mode: difference funcionar no título overlay.
— Título "Cinematográfico" + "@handle" em overlay com mix-blend-mode: difference no container.
— Autoplay suave (0.3 delta/s), pausa por 3s após interação do usuário, retoma sozinho.`,
    htmlPath: "/animations/gallery-3d.html",
    previewHeight: 480,
  },
  {
    id: "mouse-reveal",
    number: "02",
    title: "Mouse Reveal Effect",
    description: "Dois layers sobrepostos — fundo escuro na frente, imagem atrás. A imagem é revelada por um radial-gradient que segue o cursor: efeito de lanterna de cinema com falloff longo e suave.",
    tech: "CSS mask-image · Custom Properties · Vanilla JS",
    prompt: `Crie um efeito de mouse reveal em HTML/CSS/JS puro:
— Dois layers sobrepostos: um escuro com texto na frente e uma imagem de fundo atrás.
— A imagem é revelada por uma mask-image: radial-gradient() que segue o mouse.
— Use CSS custom properties --mx e --my atualizadas no evento mousemove.
— Gradiente com falloff longo e suave: 0px(0.9) → 80px(0.75) → 200px(0.45) → 340px(0.15) → 480px(0) — efeito de lanterna de cinema.
— Cursor customizado: anel fino de 28px com opacity 0.35, aparece só dentro do elemento.
— Imagem: use picsum.photos para teste. Opacity da imagem: 0.55.`,
    htmlPath: "/animations/mouse-reveal.html",
    previewHeight: 640,
  },
  {
    id: "text-reveal",
    number: "03",
    title: "Text Reveal by Word",
    description: "Palavras reveladas uma a uma pelo scroll. Cada palavra tem um ghost (opacity 0.15) e uma camada de reveal (opacity 0→1). GSAP ScrollTrigger mapeia a timeline ao scroll de uma zona de 300vh.",
    tech: "GSAP · ScrollTrigger · CSS position: sticky",
    prompt: `Crie um efeito de text reveal por palavra via scroll com GSAP ScrollTrigger:
— Para cada palavra: .word-wrap com dois spans: .word-ghost (opacity:0.15) e .word-reveal (opacity:0, position:absolute).
— GSAP timeline: para cada palavra, tl.to(revealEl, {opacity:1, ease:'none', duration:1}, i) onde i é o índice.
— ScrollTrigger com scrub:1 mapeia a timeline ao scroll de uma .scroll-zone de 300vh.
— O painel de texto fica com position:sticky dentro da zone, top:0, height:100vh.
— Cada seção tem uma barra "Exemplo N" com position:sticky; top:0 dentro da section.
— Adicionar: barra de progresso 1px na base + contador palavras reveladas (XX / YY).`,
    htmlPath: "/animations/text-reveal.html",
    previewHeight: 520,
  },
];

export function getAnimation(id: string): AnimationData | undefined {
  return animations.find((a) => a.id === id);
}
