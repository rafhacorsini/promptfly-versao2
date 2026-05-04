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
│   ├── usuarios1.png                         # Avatar 1 (social proof)
│   ├── usuarios2.png                         # Avatar 2
│   ├── usuarios3.png                         # Avatar 3
│   └── usuarios4.png                         # Avatar 4
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens + reset global
│   │   ├── layout.tsx           # Root layout (Inter font, lang pt-BR)
│   │   └── page.tsx             # Página principal — monta as seções
│   └── components/
│       ├── Hero.tsx              # Hero section (vídeo + Navbar)
│       ├── Hero.module.css
│       ├── Navbar.tsx            # Navbar flutuante (dentro do Hero)
│       ├── Navbar.module.css
│       ├── ValueProposition.tsx  # Título + subtítulo + 2 botões CTA
│       ├── ValueProposition.module.css
│       ├── GradientButton.tsx    # Componente reutilizável de botão
│       ├── GradientButton.module.css
│       ├── SocialProofBar.tsx    # Avatares + estrelas + marquee de marcas
│       ├── SocialProofBar.module.css
│       ├── Reality.tsx           # Seção "Sem Promptfly vs Com Promptfly"
│       └── Reality.module.css
```

---

## Ordem das Seções na Página (page.tsx)

```tsx
<Hero />              // Vídeo + Navbar flutuante
<ValueProposition />  // Título editorial + 2 botões GradientButton
<SocialProofBar />    // Avatares + ★★★★★ + marquee de logos
// ... próximas seções abaixo
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
- **Desktop:** Logo (borboleta desaturada + texto "Promptfly") | Links centrais (Guias, Modelos, Prompts) | Botão "Assinar Newsletter →" com borda de gradiente cônico.
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
- Título: "Aprenda **IA de verdade.** Do prompt ao agent." — "IA de verdade." está em `--color-subtitle` (cinza) via classe `.textGray`.
- Subtítulo: "Promptfly é o ecossistema premium para quem constrói negócios com Inteligência Artificial. Para quem valoriza clareza, lógica e engenharia reversa — sem hype."
- Dois `GradientButton`: "Explorar o Guia →" (dark) e "Ver biblioteca de prompts" (light).
- **Tipografia fluida** com `clamp()` em tudo — sem media queries duros para tamanhos.
- `text-wrap: balance` no título e subtítulo (evita palavras viúvas).
- Mobile: botões empilhados em coluna, max-width 380px.
- Desktop: botões lado a lado com `flex: 1`.

### SocialProofBar (`SocialProofBar.tsx`)
- Barra horizontal com bordas top/bottom sutis (`--color-border`).
- **Esquerda:** 4 avatares sobrepostos (imagens `/usuarios1-4.png`) + ★★★★★ + "+600 profissionais usando".
- **Direita:** Marquee infinito com nomes de marcas (Vista, Rentigo, Nuvelo, Arcflow, DriveON, Courto) com fade nas bordas via `mask-image`.
- Mobile: empilha em coluna; Desktop: lado a lado com divider vertical.

### Reality (`Reality.tsx`)
- Tag `[ REALIDADE ]` + headline editorial com fade.
- Dois cards lado a lado: "Sem Promptfly" (fundo claro, ícone ✕) e "Com Promptfly" (fundo escuro, ícone ✓).

---

## Referência Visual — Syntiq (https://syntiq.framer.website/)

O Syntiq é a referência de design. A landing page segue a mesma estrutura de seções mas adaptada para o conteúdo do Promptfly. Abaixo estão as seções do Syntiq e como elas se mapeiam para o Promptfly:

### Seções do Syntiq → Adaptação Promptfly

| # | Seção Syntiq | Seção Promptfly | Status |
|---|---|---|---|
| 1 | Hero (imagem + navbar + título) | Hero (vídeo 3D + Navbar flutuante) | ✅ Feito |
| 2 | Social Proof ("200+ satisfied teams") | Social Proof (+600 profissionais) | ✅ Feito |
| 3 | Value Prop (título + CTAs) | ValueProposition | ✅ Feito |
| 4 | Reality (Before/After cards) | Reality (Sem/Com Promptfly) | ✅ Feito |
| 5 | Outcome (métricas animadas) | **A fazer** — Adaptar para métricas do Promptfly |
| 6 | Services (4 cards de serviço) | **A fazer** — Adaptar para conteúdos/features do Promptfly |
| 7 | Process (4 steps) | **A fazer** — Adaptar para jornada do usuário |
| 8 | Impact (Before/After visual) | **A fazer** — Adaptar com exemplos visuais |
| 9 | Reviews (testimonials carousel) | **A fazer** — Depoimentos de usuários |
| 10 | Pricing (3 tiers) | **A fazer** — Planos do Promptfly |
| 11 | Newsletter CTA | **A fazer** — CTA para newsletter |
| 12 | FAQ (accordion) | **A fazer** — Perguntas frequentes |
| 13 | Contact / Get Started (formulário) | **A fazer** — CTA final |
| 14 | Footer | **A fazer** — Links + social + copyright |

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
| `usuarios1.png` a `usuarios4.png` | Avatares da social proof bar |

---

## Notas Importantes

- O projeto usa **Next.js 16** que pode ter breaking changes. Consultar `node_modules/next/dist/docs/` antes de usar APIs novas.
- A variável CSS `--font-inter` é injetada pelo Next.js via classe no `<html>`. Referenciar sempre como `var(--font-inter)`.
- O Tailwind está configurado apenas como utilitário global (`@import "tailwindcss"` no globals.css). **NÃO** usar classes Tailwind nos componentes.
- Existe um componente `SocialProof.tsx` / `SocialProof.module.css` que é uma versão duplicada/antiga. O componente ativo é `SocialProofBar.tsx`. Pode deletar o `SocialProof.*` se encontrar.
