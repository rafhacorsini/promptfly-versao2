import fs from "fs";
import path from "path";
import projects from "@/content/projects.json";
import { resources, featuredSlugs, heroSlugs, type Resource } from "@/content/resources";
import { toThumb, type Thumb } from "@/lib/media";
import { animacoes, type Animacao } from "@/content/animacoes";
import { getAnimacaoConteudo, promptComCodigo } from "@/lib/animacoes";

/**
 * Recurso pronto pra renderizar. Só roda no servidor: lê os arquivos de
 * conteúdo e o projects.json (que tem os prompts pagos). O que vai pro
 * navegador é só isto aqui, e `content` só existe em recurso grátis.
 */
export type ResourceView = Omit<Resource, "contentFile"> & {
  content?: string;
  thumb?: Thumb;
  projectId?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/recursos");

function readContent(file?: string): string | undefined {
  if (!file) return undefined;
  return fs.readFileSync(path.join(CONTENT_DIR, file), "utf8").trimEnd();
}

function fromResource(r: Resource): ResourceView {
  const { contentFile, ...rest } = r;
  return { ...rest, content: r.access === "free" ? readContent(contentFile) : undefined };
}

function fromProject(p: (typeof projects)[number]): ResourceView {
  const [name, ...subtitle] = p.title.split(" — ");
  return {
    slug: p.id,
    title: `Template ${name}`,
    description: subtitle.join(" ") || p.description,
    category: "templates",
    tools: ["Claude Code"],
    access: p.isFree ? "free" : "premium",
    thumb: toThumb(p.previewUrl, "thumbnailUrl" in p ? p.thumbnailUrl : undefined),
    projectId: p.id,
  };
}

// Cada animação da /animacoes também é um recurso (categoria Snippets), com /r/<slug> próprio.
function fromAnimacao(a: Animacao): ResourceView {
  const conteudo = a.access === "free" ? getAnimacaoConteudo(a.slug) : null;
  return {
    slug: a.slug,
    title: `Animação: ${a.nome}`,
    description: `${a.tipo}. ${a.descricao}`,
    category: "snippets",
    tools: ["GSAP", "ScrollTrigger"],
    access: a.access,
    content: conteudo ? promptComCodigo(conteudo) : undefined,
    contentLabel: "Prompt + código",
    guideSlug: "nomes-das-animacoes-de-scroll",
    href: `/animacoes#${a.slug}`,
    howTo: conteudo
      ? [
          "Copia o prompt com o código e cola no Claude Code, no ChatGPT ou no Gemini.",
          "Pede pra adaptar textos, imagens e cores ao seu projeto.",
          "Testa no celular e no desktop antes de entregar.",
        ]
      : undefined,
    thumb: { src: `/animacoes/${a.slug}-poster.jpg`, isVideo: false },
  };
}

export function getAllResources(): ResourceView[] {
  return [...resources.map(fromResource), ...projects.map(fromProject), ...animacoes.map(fromAnimacao)];
}

export function getResource(slug: string): ResourceView | undefined {
  return getAllResources().find((r) => r.slug === slug);
}

function pick(slugs: string[]): ResourceView[] {
  const all = getAllResources();
  return slugs
    .map((s) => all.find((r) => r.slug === s))
    .filter((r): r is ResourceView => Boolean(r));
}

export const getFeaturedResources = () => pick(featuredSlugs);
export const getHeroResources = () => pick(heroSlugs);

export function getPremiumTemplateCount(): number {
  return projects.filter((p) => !p.isFree).length;
}
