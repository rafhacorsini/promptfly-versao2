# CLAUDE.md — Promptfly Landing Page

## Projeto

Landing page editorial premium para o **Promptfly**, um ecossistema de engenharia de prompt e IA em português. A referência visual principal é o site **[Syntiq](https://syntiq.framer.website/)** — adaptado para o contexto do Promptfly com identidade própria.

---

## Stack Técnica

| Item | Detalhe |
|---|---|
| Framework | **Next.js 16** (App Router) |
| Linguagem | TypeScript |
| Tipografia | **Inter** (via `next/font/google`, variável `--font-inter`) |
| Estilização | **CSS Modules** (`.module.css` por componente) |
| Utilitários | Tailwind (apenas `@import "tailwindcss"` no globals — NÃO usar classes inline do Tailwind) |
| Ícones | `lucide-react` (já instalado) |
| Deploy | **Vercel** (conectado ao repositório GitHub) |
| Dev server | `npm run dev` |
| Build | `npm run build` |

---

## Comandos

```bash
# Desenvolvimento
npm run dev

# Build de produção (Vercel faz automaticamente)
npm run build

# Lint
npm run lint

# Git — commit e push para deploy automático na Vercel
git add .
git commit -m "feat: descrição"
git push origin main
```

---

## Estrutura de Arquivos

```
promptfly-docs/
├── public/
│   ├── Doll_spinning_360_202603201655.mp4   # Vídeo 3D do Hero
│   ├── logo.png                              # Logo borboleta Promptfly
│   └── guias/jurado-awwwards/antes.jpg|depois.jpg  # Imagens do antes/depois
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens + reset global
│   │   ├── layout.tsx           # Root layout (Inter font, lang pt-BR)
│   │   ├── page.tsx             # Página principal — monta as seções
│   │   └── r/[slug]/page.tsx    # Página de entrega da DM (/r/jurado etc.)
│   ├── content/
│   │   ├── resources.ts         # Biblioteca de recursos (fonte da home e do /r)
│   │   ├── recursos/            # Texto que o botão Copiar copia
│   │   ├── site.ts              # Números reais da home (null = escondido)
│   │   ├── projects.json        # Templates (viram recursos automaticamente)
│   │   └── premium.json         # Checkout Hotmart do Premium
│   ├── lib/resources.ts         # Monta os recursos no servidor
│   └── components/              # Um .tsx + um .module.css por componente
```

---

## Dados da biblioteca (resources.ts)

- **Recurso novo:** adicionar um objeto em `src/content/resources.ts`. Se tiver texto pra copiar, salvar em `src/content/recursos/` e apontar `contentFile`. O card da home e o `/r/<slug>` saem sozinhos.
- **Templates** não entram no `resources.ts`: vêm de `projects.json` com o slug igual ao `id`. Capa própria pelo campo opcional `thumbnailUrl`.
- `featuredSlugs` e `heroSlugs` definem a ordem dos destaques e os 3 cards do hero.
- `lib/resources.ts` roda só no servidor (lê arquivos e o `projects.json`, que tem prompts pagos). Nunca importar `projects.json` em client component.
- **Números da home** ficam em `src/content/site.ts`. Sem dado real, deixar `null`: o item some. O nº de recursos é contado automaticamente.
- **Regras de copy:** nada de número, depoimento ou logo inventado. Nada de travessão (—) em copy nova. Premium é **pagamento único de R$ 129** (Hotmart, garantia de 7 dias) e inclui a **mentoria pronta** (guias exclusivos com o método do site ao cliente) e as skills. A mentoria individual 1:1 foi descontinuada: `/mentoria` redireciona pro `/premium`.

---

## Ordem das Seções na Página (page.tsx)

```tsx
<Hero />              // Vídeo + Navbar flutuante
<ValueProposition />  // H1 + 2 CTAs + 3 cards de recursos reais (heroSlugs)
<SocialProofBar />    // Números reais de site.ts (item null não aparece)
<Library />           // #biblioteca: 6 categorias (filtram) + recursos em destaque
<Process />           // #como-funciona: reel → copia → cola na IA
<Comparison />        // Antes/depois (BeforeAfter lado a lado no desktop)
<Plans />             // #premium: cards Grátis vs Premium
<About />             // Quem faz (foto em site.ts, senão inicial "R")
<Faq />               // #faq
<Newsletter />        // CTA final do Premium + formulário Beehiiv (/api/subscribe)
<Footer />
```

---

## Design System — CSS Variables (globals.css :root)

```css
--color-bg: #F5F5F5;
--color-surface: #F3F3F3;
--color-title: #1A1A1A;
--color-subtitle: #888888;
--color-text: #2B2B2B;
--color-border: rgba(0,0,0,0.08);
--color-accent: #FF4C00;
--gradient-border: conic-gradient(from 0deg, #7B7B7B, #FF4C00, #656565, #7B7B7B);
--font-primary: var(--font-inter), sans-serif;
--radius-lg: 14px;
--spacing-sm: 0.75rem;
--spacing-md: 1.25rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
```

### Regras de Cores — NUNCA inventar cores fora deste sistema.

---

## Componentes Existentes — Detalhes

### Hero (`Hero.tsx`)
- `<section>` com `position: relative` (pai da Navbar absolute).
- Vídeo `Doll_spinning_360_202603201655.mp4` com `autoPlay muted loop playsInline`.
- Altura fixa de 320px, `border-radius: 2rem`, centralizado com fundo `--color-bg`.
- O vídeo deve sempre acompanhar a largura total (sem `max-width` travado).

### Navbar (`Navbar.tsx`)
- `"use client"` — usa `useState` para o menu mobile.
- Posição `absolute` dentro do Hero, colada no topo do vídeo.
- Fundo semitransparente com `backdrop-filter: blur`.
- **Desktop:** Logo (borboleta desaturada + texto "Promptfly") | Links centrais (Biblioteca, Templates, Guias) | Botão "Ver Premium →" com borda de gradiente cônico.
- **Mobile (< 768px):** Logo à esquerda + 2 tracinhos (toggle) à direita. Menu dropdown abre dentro da `<nav>` com `position: absolute`, animação de opacity/translateY. O botão de 2 tracinhos funciona como toggle (abre E fecha).
- O menu overlay está DENTRO da tag `<nav>`, não fora dela.

### GradientButton (`GradientButton.tsx`)
- Componente reutilizável. Aceita `variant="dark" | "light"`.
- **Dark:** fundo `#1A1A1A`, texto branco, sombra sutil.
- **Light:** fundo `#F3F3F3`, texto `#1A1A1A`.
- Ambos com borda `2.5px` em `--gradient-border` (conic-gradient), `border-radius: 14px`.
- Hover com `translateY(-1px)` + sombra. Active com `translateY(1px)`.
- Usa `background-clip: padding-box, border-box` para a borda gradiente.

### ValueProposition (`ValueProposition.tsx`)
- É o `<h1>` da home: "Sites cinematográficos com IA. **Copie o que eu uso pra criar.**" A segunda frase fica em `--color-subtitle` via `.textGray`.
- Dois `GradientButton`: "Explorar a biblioteca →" (dark, `#biblioteca`) e "Ver Premium" (light, `/premium`).
- Abaixo, 3 cards de recursos reais (prop `cards`, vinda de `heroSlugs`) que levam pro `/r/<slug>`.
- **Tipografia fluida** com `clamp()` em tudo — sem media queries duros para tamanhos.
- `text-wrap: balance` no título e subtítulo (evita palavras viúvas).
- Mobile: botões empilhados em coluna, max-width 380px.
- Desktop: botões lado a lado com `flex: 1`.

### SocialProofBar (`SocialProofBar.tsx`)
- Faixa com bordas tracejadas e só números reais (prop `stats`). Item com valor `null` não é renderizado.
- Mobile: grade de 2 colunas; Desktop: em linha com divisórias tracejadas.
- Avatares, estrelas e faixa de logos foram removidos de propósito: eram fictícios.

### Plans (`Plans.tsx`, ex-Reality)
- Tag `[ GRÁTIS VS PREMIUM ]` + headline com fade.
- Dois cards: "Grátis" (claro, borda tracejada) e "Premium" (escuro, CTA laranja pro checkout da Hotmart).

---

## Referência Visual — Syntiq (https://syntiq.framer.website/)

O Syntiq é a referência de design. A landing page segue a mesma estrutura de seções mas adaptada para o conteúdo do Promptfly. Abaixo estão as seções do Syntiq e como elas se mapeiam para o Promptfly:

### Seções do Syntiq → Adaptação Promptfly

| # | Seção Syntiq | Seção Promptfly | Status |
|---|---|---|---|
| 1 | Hero (imagem + navbar + título) | Hero (vídeo 3D + Navbar) + ValueProposition com cards | ✅ Feito |
| 2 | Social Proof | SocialProofBar (só números reais) | ✅ Feito |
| 3 | Services | Library (categorias + recursos em destaque) | ✅ Feito |
| 4 | Process | Process (reel → copia → cola) | ✅ Feito |
| 5 | Impact (Before/After visual) | Comparison | ✅ Feito |
| 6 | Pricing | Plans (Grátis vs Premium) | ✅ Feito |
| 7 | About | About (Quem faz) | ✅ Feito |
| 8 | FAQ (accordion) | Faq | ✅ Feito |
| 9 | Newsletter CTA | Newsletter (Premium + newsletter) | ✅ Feito |
| 10 | Footer | Footer | ✅ Feito |
| · | Reviews / Outcome | **Removidos**: depoimentos e métricas não eram reais. Só voltam com dado verdadeiro. | · |

---

## Regras de Ouro (OBRIGATÓRIAS)

### Estilo & Design
1. **NÃO usar Tailwind inline.** Todo CSS vai em arquivos `.module.css`.
2. **NÃO inventar cores.** Usar apenas as variáveis do design system.
3. **NÃO usar fontes além de Inter.** A fonte é configurada no `layout.tsx`.
4. **Estética editorial, nunca "cara de template".** Pensar como front-end sênior da Apple.
5. **Tipografia fluida com `clamp()`.** Nunca tamanhos fixos que quebram em telas intermediárias.
6. **`text-wrap: balance`** em todos os títulos e subtítulos para evitar palavras viúvas.
7. **Bordas de gradiente cônico** nos botões via `background-clip`, nunca com `border-image`.

### Arquitetura
8. **Um componente = um arquivo `.tsx` + um `.module.css`.**
9. **A Navbar vive DENTRO do Hero.tsx**, não no layout.tsx.
10. **O menu mobile overlay vive DENTRO da tag `<nav>`**, não como irmão.
11. **Novas seções são componentes independentes** importados no `page.tsx`.
12. **Componentes reutilizáveis** (como GradientButton) ficam na mesma pasta `components/`.

### Responsividade
13. **Mobile-first.** O CSS base é para mobile, media queries adicionam para desktop.
14. **No mobile, palavras NUNCA devem sobrar sozinhas** numa linha (viúvas).
15. **Breakpoints:** `768px` (tablet/desktop) e `1024px` (desktop grande) quando necessário.
16. **Botões no mobile:** sempre `flex-direction: column` com `width: 100%`.
17. **O vídeo do Hero DEVE acompanhar qualquer largura de tela** — sem `max-width` travado.

### Git & Deploy
18. **Git está inicializado** (commit inicial existe). Remote ainda não configurado.
19. **Para conectar ao GitHub:** `git remote add origin <url>` e `git push -u origin main`.
20. **Vercel faz deploy automático** no push para `main`.
21. **Sempre fazer build antes de push** para garantir que não há erros: `npm run build`.

---

## Padrão de Criação de Novas Seções

Ao criar uma nova seção, seguir este checklist:

1. Criar `NomeDaSecao.tsx` em `src/components/`.
2. Criar `NomeDaSecao.module.css` no mesmo diretório.
3. Usar as CSS variables do design system (nunca hardcoded).
4. Importar e adicionar na ordem correta em `page.tsx`.
5. Garantir responsividade mobile-first.
6. Testar em 375px (iPhone), 768px (iPad) e 1440px (desktop).

---

## Assets Disponíveis (pasta public/)

| Arquivo | Uso |
|---|---|
| `Doll_spinning_360_202603201655.mp4` | Vídeo 3D do Hero |
| `logo.png` | Logo borboleta (usada na Navbar, desaturada) |
| `guias/jurado-awwwards/antes.jpg`, `depois.jpg` | Antes/depois (home e guia do jurado) |

---

## Notas Importantes

- O projeto usa **Next.js 16** que pode ter breaking changes. Consultar `node_modules/next/dist/docs/` antes de usar APIs novas.
- A variável CSS `--font-inter` é injetada pelo Next.js via classe no `<html>`. Referenciar sempre como `var(--font-inter)`.
- O Tailwind está configurado apenas como utilitário global (`@import "tailwindcss"` no globals.css). **NÃO** usar classes Tailwind nos componentes.
- Existe um componente `SocialProof.tsx` / `SocialProof.module.css` que é uma versão duplicada/antiga. O componente ativo é `SocialProofBar.tsx`. Pode deletar o `SocialProof.*` se encontrar.
