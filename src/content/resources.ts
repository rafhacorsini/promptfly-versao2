/**
 * Biblioteca de recursos do Promptfly.
 *
 * Pra adicionar um recurso novo: crie um objeto em `resources` e, se ele tiver
 * texto pra copiar, salve o texto em src/content/recursos/ e aponte `contentFile`.
 * O card na home e a página /r/<slug> (o link da DM) saem sozinhos.
 *
 * Templates de site NÃO entram aqui: eles já vêm de projects.json
 * automaticamente, com o slug igual ao id do projeto.
 */

export type ResourceCategory =
  | "prompts"
  | "skills"
  | "templates"
  | "snippets"
  | "workflows"
  | "contexto";

export interface Resource {
  /** Vira o link /r/<slug>. */
  slug: string;
  title: string;
  description: string;
  category: ResourceCategory;
  /** Onde roda: "Claude Code", "ChatGPT", "Gemini", "Next.js + GSAP"... */
  tools: string[];
  access: "free" | "premium";
  /** Arquivo em src/content/recursos/ com o texto que o botão Copiar copia. */
  contentFile?: string;
  /** Nome mostrado no topo do bloco de código (ex: "ANTI_PATTERNS.md"). */
  contentLabel?: string;
  /** Guia relacionado em /guias/<guideSlug>. */
  guideSlug?: string;
  /** Link próprio, quando o recurso vive fora do /r (ex: página de vendas). */
  href?: string;
  /** Passo a passo curto mostrado na página /r. */
  howTo?: string[];
}

export const CATEGORIES: Record<ResourceCategory, { label: string; line: string }> = {
  prompts: {
    label: "Prompts",
    line: "Cola na IA e ela cria, critica ou corrige o seu site.",
  },
  skills: {
    label: "Skills",
    line: "Comandos pro Claude Code que fazem o trabalho repetido por você.",
  },
  templates: {
    label: "Templates",
    line: "O site inteiro documentado num prompt. Você troca a marca e entrega.",
  },
  snippets: {
    label: "Snippets",
    line: "Animações de GSAP, ScrollTrigger e Lenis pra colar no projeto.",
  },
  workflows: {
    label: "Workflows",
    line: "O caminho da referência ao site pronto, passo a passo.",
  },
  contexto: {
    label: "Contexto",
    line: "Arquivos como CLAUDE.md e ANTI_PATTERNS.md que ensinam a IA a não fazer site genérico.",
  },
};

export const resources: Resource[] = [
  {
    slug: "jurado",
    title: "IA critica seu layout como jurado do Awwwards",
    description:
      "Cola um print do seu site junto com esse prompt e recebe nota de 0 a 10 e a correção exata de cada problema.",
    category: "prompts",
    tools: ["Claude", "ChatGPT", "Gemini"],
    access: "free",
    contentFile: "jurado-awwwards.txt",
    contentLabel: "Prompt do jurado",
    guideSlug: "jurado-awwwards",
    howTo: [
      "Tira um print do seu site ou do seu Figma. Comece pelo hero.",
      "Cola o print e o prompt no Claude, no ChatGPT ou no Gemini.",
      "Manda a resposta pro Claude Code: \"aplica essas correções sem mudar a estrutura\".",
    ],
  },
  {
    slug: "app-jurado",
    title: "Prompt: crie seu próprio app jurado do Awwwards",
    description:
      "Um prompt que cria um app completo: você manda vídeo de tela, prints ou o link do site, e ele devolve nota por critério e a correção exata, usando a visão do Claude.",
    category: "prompts",
    tools: ["Claude Code", "Claude API"],
    access: "free",
    contentFile: "app-jurado.txt",
    contentLabel: "Prompt do app jurado",
    guideSlug: "app-jurado-awwwards",
    howTo: [
      "Cria uma pasta vazia, abre o Claude Code nela e cola o prompt.",
      "Cria uma chave em platform.claude.com e coloca no .env.local como ANTHROPIC_API_KEY.",
      "Roda npm run dev, joga um vídeo de tela do seu site e clica em Julgar.",
    ],
  },
  {
    slug: "5-prompts",
    title: "5 prompts pra site cinematográfico no Claude Code",
    description:
      "Os 5 prompts que eu uso pra criar um site cinematográfico, com o porquê de cada instrução.",
    category: "prompts",
    tools: ["Claude Code"],
    access: "free",
    guideSlug: "prompts-sites-cinematograficos-claude-code",
  },
  {
    slug: "anti-patterns",
    title: "ANTI_PATTERNS.md: proíbe a IA de gerar site genérico",
    description:
      "Um arquivo de regras pra raiz do projeto. A IA lê antes de mexer na tela e para de repetir os vícios de template.",
    category: "contexto",
    tools: ["Claude Code"],
    access: "free",
    contentFile: "anti-patterns.md",
    contentLabel: "ANTI_PATTERNS.md",
    howTo: [
      "Salva o texto como ANTI_PATTERNS.md na raiz do projeto.",
      "No seu CLAUDE.md, adiciona a linha: \"Antes de criar ou alterar qualquer tela, leia ANTI_PATTERNS.md\".",
      "Pede o site normalmente. Se a IA quebrar uma regra, manda ela revisar a tela contra o arquivo.",
    ],
  },
  {
    slug: "scroll-sequence",
    title: "Snippet: objeto que gira com o scroll",
    description:
      "Componente React com GSAP que desenha uma sequência de frames num canvas. É o scroll que gira o objeto. Já vem com os frames do anel do VYTAL pra testar.",
    category: "snippets",
    tools: ["Next.js", "GSAP"],
    access: "free",
    contentFile: "scroll-sequence.tsx.txt",
    contentLabel: "ScrollSequence.tsx",
    guideSlug: "prompts-holofote-scroll-vytal",
    howTo: [
      "Roda npm i gsap no seu projeto Next.js.",
      "Cria o arquivo ScrollSequence.tsx e cola o código.",
      "Coloca o componente na página com conteúdo antes e depois, pra ter por onde rolar.",
    ],
  },
  {
    slug: "prompt-scroll",
    title: "Prompt: animação controlada pelo scroll",
    description:
      "O prompt que gerou o scrubber do VYTAL. A seção trava na tela e o scroll vira o timeline da animação.",
    category: "prompts",
    tools: ["Claude Code"],
    access: "free",
    contentFile: "prompt-scroll.txt",
    contentLabel: "Prompt de scroll",
    guideSlug: "prompts-holofote-scroll-vytal",
    howTo: [
      "Troca [SEÇÃO] pela parte do site que vai animar.",
      "Troca [DESCREVA O QUE MUDA] pelo que acontece enquanto a pessoa rola.",
      "Cola no Claude Code com o projeto aberto.",
    ],
  },
  {
    slug: "good-burguer",
    title: "2 prompts pra site não ter cara de IA",
    description:
      "Testados no GOOD Burguer: um de motion, que anima cada elemento por conta própria, e um de composição, que quebra o grid genérico.",
    category: "prompts",
    tools: ["Claude Code"],
    access: "free",
    guideSlug: "2-prompts-good-burguer-nao-parece-ia",
  },
  {
    slug: "animacoes",
    title: "3 animações: galeria 3D, mouse reveal e text reveal",
    description:
      "Os três efeitos que aparecem em quase todos os meus projetos, com preview ao vivo, prompt e código.",
    category: "snippets",
    tools: ["Three.js", "GSAP"],
    access: "free",
    guideSlug: "animacoes-cinematograficas",
  },
  {
    slug: "generico-para-cinematografico",
    title: "De site genérico a cinematográfico: 2 comandos e 1 prompt",
    description:
      "O passo a passo pra dar à IA a documentação certa, instalar a direção e aplicar o prompt cinematográfico.",
    category: "workflows",
    tools: ["Claude Code"],
    access: "free",
    guideSlug: "sites-genericos-em-cinematograficos-2-comandos-1-prompt",
  },
  {
    slug: "clonar-secao",
    title: "Engenharia reversa: clonar uma seção cinematográfica",
    description:
      "Mede o movimento de um site de referência com o Claude no Chrome e reconstrói com o Claude Code. Os dois prompts estão no guia.",
    category: "workflows",
    tools: ["Claude Code", "Claude no Chrome"],
    access: "free",
    guideSlug: "clonar-sites-cinematograficos-extensao-claude",
  },
  {
    slug: "skills-gratis",
    title: "As skills gratuitas que eu uso no Claude Code",
    description:
      "As skills que aceleram meus sites cinematográficos e como instalar cada uma.",
    category: "skills",
    tools: ["Claude Code"],
    access: "free",
    guideSlug: "skills-gratuitas-claude-code-cinematografico",
  },
  {
    slug: "skills-cinematograficas",
    title: "5 skills cinematográficas pro Claude Code",
    description:
      "/section-hero, /gsap-component, /palette, /perf-audit e /responsive-fix. Instala em 2 minutos e usa em todo projeto.",
    category: "skills",
    tools: ["Claude Code"],
    access: "premium",
    href: "/skills",
  },
];

/** Ordem dos cards em "Recursos em destaque". Aceita slugs daqui e ids de projects.json. */
export const featuredSlugs = [
  "jurado",
  "app-jurado",
  "anti-patterns",
  "scroll-sequence",
  "gluco-flow-numa-bomba-insulina",
  "skills-cinematograficas",
  "alba-residencia-imovel-luxo",
  "5-prompts",
];

/** Os 3 cards que aparecem no hero. */
export const heroSlugs = ["jurado", "vytal-anel-inteligente", "anti-patterns"];
