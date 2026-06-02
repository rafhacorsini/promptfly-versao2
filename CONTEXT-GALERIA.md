# Contexto — Projeto "Galeria de Projetos com compra + LGPD" (Promptfly)

> Cole este texto pra qualquer IA continuar o trabalho. Ele resume o objetivo,
> as decisões já tomadas e onde paramos.

## O que é a Promptfly
Landing page editorial premium (Next.js 16, App Router, TypeScript, CSS Modules,
fonte Inter, deploy Vercel). Referência visual: Syntiq. Regras de estilo completas
em `CLAUDE.md` na raiz — leia ANTES de codar (não usar Tailwind inline, não inventar
cores fora do design system em `globals.css`, tipografia fluida com clamp, etc).

## Objetivo deste projeto
Criar uma **galeria de projetos/templates** (estilo motionsites.ai): uns gratuitos,
outros pagos. No projeto pago, a pessoa só consegue **copiar o código online** depois
de comprar. Cobrança via **Hotmart** (o site já vende 1 template por link Hotmart em
`/template` + `src/content/template-product.json`). Também implementar conformidade
**LGPD** (banner de cookies + política de privacidade), que é obrigatório.

## Decisões já tomadas (NÃO reabrir sem perguntar)
- Plataforma de pagamento: **Hotmart** (não Mercado Pago — conta do dono bloqueada).
- Entrega: **copiar código online** (não download de zip).
- Público: **Brasil**, Pix/parcelado (via checkout do próprio Hotmart).
- Desbloqueio do conteúdo pago: **link mágico por e-mail** (digita e-mail da compra,
  recebe link/código pra confirmar). Não usar senha.
- Conteúdo da galeria: **JSON versionado** (`src/content/projects.json`) + uma
  aba nova no `/admin` existente pra editar (mesmo padrão GitHub-commit do admin atual).

## Arquitetura técnica
- **Banco de compras:** Upstash Redis (Vercel KV). Chave `purchase:{email}` → lista de projectIds.
- **Sessão:** cookie JWT httpOnly assinado com `jose` (sem DB de sessão).
- **E-mail:** Resend.
- **Webhook Hotmart:** valida `hottok`, em `PURCHASE_APPROVED` grava a compra; em
  reembolso/chargeback revoga.
- Deps já instaladas: `@upstash/redis`, `resend`, `jose`.

## Variáveis de ambiente
Ver `.env.local.example`. Novas: `KV_REST_API_URL`, `KV_REST_API_TOKEN`,
`RESEND_API_KEY`, `AUTH_EMAIL_FROM`, `AUTH_SECRET`, `HOTMART_HOTTOK`.
Já existentes: `BEEHIIV_*`, `ADMIN_PASSWORD`, `GITHUB_TOKEN`, `GITHUB_REPO`.

## Regra de ouro: NÃO QUEBRAR O SITE
Tudo é aditivo. Únicas alterações em arquivos existentes:
- `src/app/layout.tsx`: montar `<CookieBanner/>` e só carregar `<Analytics/>` após consentimento.
- `src/components/Footer.tsx`: links "Privacidade" e "Termos".
- `src/components/Navbar.tsx`: link "Projetos".
Sempre rodar `npm run build` antes de qualquer commit/push. NUNCA commitar segredos.

## Plano em fases
- **Fase 0 — Infra (EM ANDAMENTO):** instalar deps [feito], `.env.local.example` [feito],
  criar contas Upstash/Resend e pegar Hottok do Hotmart [pendente, dono fazendo].
- **Fase 1 — Galeria:** `src/content/projects.json`, `/projetos` (grade de cards),
  `/projetos/[slug]` (detalhe; grátis=copiar, pago=bloqueado+comprar). Link na Navbar.
- **Fase 2 — Webhook Hotmart:** `/api/hotmart/webhook` grava compras no KV.
- **Fase 3 — Login link mágico:** `/api/auth/request`, `/api/auth/verify`,
  `/api/projects/[slug]/code` (só libera código se cookie provar a compra).
- **Fase 4 — Admin:** aba "Projetos" no `/admin`.
- **Fase 5 — LGPD:** `<CookieBanner/>`, `/privacidade`, `/termos`, links no Footer.

Ordem de execução combinada: Fase 0 → depois 5+1 → depois 2→3→4.

## Estado atual
Fase 0 em andamento. Deps instaladas, `.env.local.example` criado. Falta o dono
criar as contas (Upstash, Resend, Hottok Hotmart). Nada de código de feature escrito ainda.
