import fs from "fs";
import path from "path";
import matter from "gray-matter";

const GUIDES_DIR = path.join(process.cwd(), "src/content/guias");

export interface GuideFrontmatter {
  title: string;
  description: string;
  /** Título curto (até ~55 caracteres) só pro <title> do Google e das IAs. Sem ele, usa o title. */
  seoTitle?: string;
  /** Descrição de até 160 caracteres só pro Google e pras IAs. Sem ela, usa a description. */
  seoDescription?: string;
  date: string;
  tags: string[];
  readTime: string;
  category: string;
  featured?: boolean;
  premium?: boolean;
  /** Conteúdo exclusivo de membros: some das listagens/sitemap e fica bloqueado por completo (sem prévia) pra quem não tem acesso. */
  membersOnly?: boolean;
}

export interface Guide extends GuideFrontmatter {
  slug: string;
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];

  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".mdx"));

  const guides = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(GUIDES_DIR, filename), "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      date: data.date ?? "",
      tags: data.tags ?? [],
      readTime: data.readTime ?? "5 min",
      category: data.category ?? "fundamentos",
      featured: data.featured ?? false,
      premium: data.premium ?? false,
      membersOnly: data.membersOnly ?? false,
    } as Guide;
  });

  return guides.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Guias visíveis ao público (exclui os exclusivos de membros). Use em listagens e sitemap. */
export function getPublicGuides(): Guide[] {
  return getAllGuides().filter((g) => !g.membersOnly);
}

export function getGuidesByCategory(category: string): Guide[] {
  return getPublicGuides().filter((g) => g.category === category);
}

export function getGuideSource(slug: string): string | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}
