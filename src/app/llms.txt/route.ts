import { getPublicGuides } from "@/lib/guides";
import { animacoes } from "@/content/animacoes";
import projects from "@/content/projects.json";
import { site } from "@/content/site";

// Resumo do site para robôs de IA (formato llms.txt). Gerado no build a partir dos guias,
// templates e animações reais: não escreva número nem página à mão aqui.
export const dynamic = "force-static";

const BASE = "https://promptfly.com.br";

const limpar = (t: string) => t.replace(/\s+[—–]\s+/g, ", ").replace(/\s+/g, " ").trim();

export function GET() {
  const templatesGratis = projects.filter((p) => p.isFree).length;
  const templatesPremium = projects.filter((p) => !p.isFree).length;
  const animGratis = animacoes.filter((a) => a.access === "free").length;
  const animPremium = animacoes.filter((a) => a.access === "premium").length;

  const guias = getPublicGuides()
    .map((g) => {
      const desc = limpar(g.seoDescription ?? g.description);
      const nota = g.premium ? " (parte do conteúdo é Premium)" : "";
      return `- [${limpar(g.seoTitle ?? g.title)}](${BASE}/guias/${g.slug}): ${desc}${nota}`;
    })
    .join("\n");

  const texto = `# Promptfly

> Biblioteca em português de prompts, skills, templates, animações de scroll, wireframes e guias para criar sites cinematográficos com IA (Claude Code, ChatGPT e Gemini). Criada por ${site.instagram.handle}.

O Promptfly ensina a criar sites com aparência profissional usando IA, sem cair no visual genérico. Quase tudo tem versão grátis. O Premium é um pagamento único e libera o restante.

## Packs grátis (o arquivo baixa na hora, depois de informar o e-mail)

- [Design Pack](${BASE}/design-pack): DESIGN.md e ANTI_PATTERNS.md, dois arquivos que dizem à IA o que fazer e o que nunca fazer no design, em 3 estilos, com tokens em CSS, Tailwind e JSON.
- [Wireframe Pack](${BASE}/wireframes): wireframes prontos para mandar a imagem para a IA, com sites de exemplo e prompts.

## Biblioteca

- [Templates de sites](${BASE}/projetos): ${templatesGratis} grátis e ${templatesPremium} Premium, cada um com o prompt completo para a IA recriar o site.
- [Animações de scroll](${BASE}/animacoes): ${animGratis} grátis e ${animPremium} Premium, cada uma com nome, preview, frase para pedir à IA, prompt e código (GSAP e ScrollTrigger).
- [Skills para o Claude Code](${BASE}/skills): comandos que fazem o trabalho repetido na criação de sites.
- [Promptfly Premium](${BASE}/premium): wireframes, templates, animações, skills, mentoria pronta e grupo exclusivo. ${site.premium.price ? `${site.premium.price}, ` : ""}pagamento único, acesso vitalício, garantia de 7 dias.

## Guias

${guias}

## Autor

- [Instagram ${site.instagram.handle}](${site.instagram.url})
`;

  return new Response(texto, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
