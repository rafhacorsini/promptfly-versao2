# Prompt para Manus.ai — Promptfly

---

## Contexto do projeto

Você vai trabalhar no **Promptfly** — uma plataforma editorial de conteúdo sobre engenharia de prompt e IA em português. É uma newsletter gratuita monetizada por patrocínios, com um site que serve como vitrine e biblioteca de guias.

**Repositório:** https://github.com/rafhacorsini/promptfly-versao2  
**Deploy:** Vercel (deploy automático no push para `main`)  
**Domínio:** https://promptfly.com.br  

---

## Stack técnica

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** CSS Modules (sem Tailwind inline — toda regra vai no `.module.css`)
- **Tipografia:** Inter via `next/font/google` (variável `--font-inter`)
- **Conteúdo:** MDX local em `src/content/guias/*.mdx`
- **Newsletter:** Beehiiv via API própria em `/api/subscribe`
- **Deploy:** Vercel conectado ao GitHub

---

## Design System — variáveis CSS obrigatórias

```css
--color-bg: #F5F5F5;
--color-title: #1A1A1A;
--color-subtitle: #888888;
--color-text: #2B2B2B;
--color-accent: #FF4C00;
--gradient-border: conic-gradient(from 0deg, #7B7B7B, #FF4C00, #656565, #7B7B7B);
--font-primary: var(--font-inter), sans-serif;
--radius-lg: 14px;
```

**Regras de ouro:**
- NUNCA usar Tailwind inline
- NUNCA inventar cores fora do design system
- NUNCA usar outras fontes além de Inter
- CSS mobile-first, media queries para desktop
- `text-wrap: balance` em todos os títulos

---

## O que já foi construído

### Landing page (`src/app/page.tsx`)
Seções em ordem:
1. `Hero` — vídeo 3D + Navbar flutuante com backdrop blur
2. `ValueProposition` — headline + 2 CTAs apontando para `#newsletter`
3. `SocialProofBar` — avatares + estrelas + marquee de marcas
4. `Reality` — Sem Promptfly vs Com Promptfly (2 cards + citação)
5. `Outcome` — 4 métricas com contador animado e mini gráficos SVG
6. `Process` — slider com 3 passos e barra de progresso animada
7. `Reviews` — card preto estático + 2 colunas de depoimentos com marquee (sobe/desce)
8. `Faq` — accordion com 5 perguntas
9. `Newsletter` — formulário de captura integrado ao Beehiiv
10. `Footer`

### Seção de guias (`src/app/guias/`)
- `/guias` — lista todos os guias com CategoryNav horizontal
- `/guias/[slug]` — artigo individual em MDX com JSON-LD Article + Breadcrumb
- `/guias/categoria/[category]` — lista filtrada por categoria
- `opengraph-image.tsx` — OG image dinâmica por guia (título + tags + tempo)

### Sistema de conteúdo
- Guias em `src/content/guias/*.mdx` com frontmatter
- `src/lib/guides.ts` — lê e ordena guias por data
- `src/lib/categories.ts` — 7 categorias: fundamentos, tecnicas, prompts, modelos, llms, agentes, ferramentas

### SEO implementado
- `src/app/sitemap.ts` — dinâmico, inclui home + /guias + todas as categorias + todos os guias
- `src/app/robots.ts` — Next.js nativo
- JSON-LD: WebSite (layout raiz), Article + BreadcrumbList (cada guia), Breadcrumb (categoria)
- Canonical URL por página
- Metadata completo: title template, description, OG, Twitter Card
- OG image dinâmica por guia via `ImageResponse`

### Newsletter
- Formulário próprio na landing page (sem redirecionar para Beehiiv)
- API Route: `src/app/api/subscribe/route.ts` → chama Beehiiv API
- Variáveis de ambiente: `BEEHIIV_API_KEY` e `BEEHIIV_PUBLICATION_ID`

---

## Guias publicados atualmente (4)

| Slug | Categoria |
|---|---|
| `o-que-e-engenharia-de-prompt` | fundamentos |
| `chain-of-thought` | tecnicas |
| `gpt-vs-claude-vs-gemini` | modelos |
| `prompts-prontos-para-trabalho` | prompts |

Categorias vazias: `llms`, `agentes`, `ferramentas`

---

## O que precisa ser feito — em ordem de impacto

### 🔴 CRÍTICO — impacto direto em SEO e conversão

**1. Criar `/og-image.png` (1200×630px)**
A landing page referencia `/og-image.png` no metadata mas o arquivo não existe. Sem ele, o preview no WhatsApp e LinkedIn fica em branco. Criar uma imagem estática com o logo + tagline do Promptfly.

**2. Busca nos guias**
Adicionar campo de busca em `/guias` que filtra os guias pelo título e descrição em tempo real (client-side com `useState`). Sem back-end necessário — só JS no frontend.

**3. Tabela de conteúdos (TOC) nas páginas de guia**
Extrair os `## headings` do MDX e renderizar um índice lateral (sticky no desktop, dropdown no mobile). Isso aumenta tempo de permanência e é sinal de qualidade para o Google.

**4. Botão de copiar nos blocos de código**
Nos artigos há blocos `<pre><code>`. Adicionar um botão "Copiar" que ao clicar copia o código. Uso de `navigator.clipboard.writeText`. Crítico para guias de prompts.

**5. Guias relacionados no final do artigo**
Após o CTA de newsletter, mostrar 2-3 guias da mesma categoria. Reduz bounce rate e aumenta páginas por sessão — ambos sinais SEO.

---

### 🟠 ALTA PRIORIDADE — UX e retenção

**6. Indicador de progresso de leitura**
Barra fina no topo da página de guia que avança conforme o usuário rola. Implementar com `useScroll` + `useEffect` medindo `window.scrollY / document.body.scrollHeight`. Melhora engajamento percebido.

**7. Botões de compartilhamento nos guias**
No final de cada guia, adicionar links diretos para compartilhar no LinkedIn, WhatsApp e X/Twitter com o título e URL pré-preenchidos. Zero back-end — só links com `encodeURIComponent`.

**8. Schema FAQ na seção de perguntas frequentes da landing**
O componente `Faq.tsx` já existe mas não tem JSON-LD. Adicionar `FAQPage` schema com todas as perguntas e respostas. Habilita rich snippets de FAQ no Google — aparecer com as perguntas expandidas diretamente na SERP.

**9. Página de guia — navegação anterior/próximo**
No rodapé de cada artigo, mostrar "← Guia anterior" e "Próximo guia →" com link e título. Mantém o usuário na plataforma e distribui PageRank entre as páginas.

**10. Animação mobile do marquee de reviews**
Na seção `Reviews`, no mobile só deve existir uma coluna de reviews subindo. Atualmente existe lógica para isso mas não está ativada. Verificar `mobileOnly` e `desktopOnly` classes no `Reviews.module.css`.

---

### 🟡 MÉDIO PRAZO — crescimento e conteúdo

**11. Publicar 3 guias nas categorias vazias**
- `llms/como-funciona-um-llm.mdx` — explicar tokens, transformers, temperatura (sem matemática)
- `agentes/o-que-e-um-agente-de-ia.mdx` — agentes vs chatbots, casos de uso reais
- `ferramentas/claude-code-guia-completo.mdx` — o que é, como usar, CLAUDE.md, casos de uso

**12. Vercel Analytics**
Habilitar no painel da Vercel (1 clique, sem código) + adicionar o componente `<Analytics />` de `@vercel/analytics/react` no `layout.tsx`. Passa a ver pageviews, bounces e tempo de permanência por guia.

**13. Página `/sobre`**
Uma página simples explicando o Promptfly, quem é o criador, qual a missão. Ajuda em E-E-A-T (Experience, Expertise, Authoritativeness, Trust) que o Google usa para ranquear conteúdo.

**14. LGPD / Cookie Notice**
Banner simples de cookies na primeira visita (sem bloquear conteúdo). Necessário para conformidade com a LGPD se houver analytics ou terceiros. Componente leve com `localStorage` para não mostrar novamente após aceito.

**15. Redirecionar `/guias` link na Navbar da landing page**
Na `Navbar.tsx`, o link "Guias" aponta para `#` (vazio). Mudar para `/guias`.

---

### 🟢 MELHORIAS FUTURAS

**16. Dark mode**
Adicionar suporte a dark mode usando `prefers-color-scheme` e variáveis CSS. A paleta dark natural: `--color-bg: #0F0F0F`, `--color-title: #EFEFEF`, mantendo o laranja.

**17. Tempo de leitura dinâmico**
Calcular o tempo de leitura real baseado na contagem de palavras do MDX (200 palavras/minuto), em vez de usar o valor fixo do frontmatter.

**18. RSS Feed**
Criar `src/app/feed.xml/route.ts` gerando um RSS Feed com todos os guias. Permite que leitores RSS subscribam diretamente — e o Google indexa RSS como fonte de atualização.

**19. Search Console**
Não é código, mas instruir o usuário a: acessar `search.google.com/search-console` → Add Property `promptfly.com.br` → verificar via DNS → submeter `https://promptfly.com.br/sitemap.xml`.

---

## Arquivos-chave para referência

```
src/
├── app/
│   ├── layout.tsx              # metadata global + WebSite JSON-LD
│   ├── page.tsx                # monta as seções da landing
│   ├── sitemap.ts              # sitemap dinâmico
│   ├── robots.ts               # robots dinâmico
│   ├── api/subscribe/route.ts  # Beehiiv API
│   └── guias/
│       ├── layout.tsx          # header/footer das páginas de guias
│       ├── page.tsx            # lista de guias
│       └── [slug]/
│           ├── page.tsx        # artigo individual
│           └── opengraph-image.tsx
├── components/
│   ├── CategoryNav.tsx         # filtro horizontal de categorias
│   ├── Newsletter.tsx          # formulário integrado
│   └── [demais seções da landing]
├── content/guias/              # arquivos .mdx dos artigos
├── lib/
│   ├── guides.ts               # lê e filtra guias
│   └── categories.ts           # definição das 7 categorias
└── app/globals.css             # design tokens CSS
```

---

## Convenção de commits

```
feat: nova funcionalidade
fix: correção de bug
chore: configuração, dependências
perf: performance
seo: melhorias de SEO
```

---

## Prioridade de execução sugerida

1. Criar `og-image.png`
2. Schema FAQ na landing
3. Busca nos guias
4. TOC nas páginas de artigo
5. Botão copiar nos blocos de código
6. Guias relacionados
7. Indicador de progresso de leitura
8. Botões de compartilhamento
9. Navegação anterior/próximo
10. Publicar 3 guias nas categorias vazias
11. Vercel Analytics
12. Página `/sobre`
13. LGPD banner
14. Corrigir link "Guias" na Navbar
