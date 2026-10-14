# DESIGN.md: Noite

A versão escura da vitrine: fundo preto, faixas em grafite e o mesmo azul de conversão. Funciona para produto, tecnologia e portfólio onde a imagem precisa brilhar. Sem brilho neon, sem sombra, sem gradiente.

> **Como usar:** salve este arquivo na raiz do projeto. No CLAUDE.md, escreva: "Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md". Os valores abaixo são a lei. Se precisar de um valor que não está aqui, pergunte antes de inventar.

## Tokens

Os mesmos valores estão em tokens.css, theme.tailwind.css e tokens.json. Cor, fonte, raio e espaçamento só podem vir desta lista.

### Cores

| Token | Valor | Uso |
|---|---|---|
| `color-canvas` | `#000000` | Fundo padrão de todas as seções. |
| `color-band` | `#161617` | Faixas de largura total que alternam com o fundo, cartões e rodapé. |
| `color-ink` | `#f5f5f7` | Títulos e texto principal. |
| `color-muted` | `#a1a1a6` | Texto secundário, legendas e textos legais. |
| `color-line` | `#424245` | Divisórias de 1px e contornos discretos. Nunca como cor de texto. |
| `color-link` | `#2997ff` | Links dentro de texto e links de seção. |
| `color-cta` | `#0071e3` | Fundo do botão de conversão. Só em botões pequenos. |
| `color-cta-ink` | `#ffffff` | Texto por cima do botão de conversão. |
| `color-status` | `#ff9f0a` | Texto simples de status (ex: Novo). Sem fundo e sem pílula. |

### Fontes

| Token | Valor | Uso |
|---|---|---|
| `font-display` | `"SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif` | Família dos títulos e frases de impacto. |
| `font-text` | `"SF Pro Text", Inter, "Helvetica Neue", Arial, sans-serif` | Família de navegação, parágrafos, links e botões. |

### Tipografia

| Token | Valor | Uso |
|---|---|---|
| `text-hero` | `88px` | Frase de impacto do hero. (tamanho) |
| `text-hero--line-height` | `90px` | Frase de impacto do hero. (altura da linha) |
| `text-hero--letter-spacing` | `-1.76px` | Frase de impacto do hero. (espaçamento entre letras) |
| `text-hero--font-weight` | `600` | Frase de impacto do hero. (peso) |
| `text-heading` | `44px` | Título de seção. (tamanho) |
| `text-heading--line-height` | `46px` | Título de seção. (altura da linha) |
| `text-heading--letter-spacing` | `-0.44px` | Título de seção. (espaçamento entre letras) |
| `text-heading--font-weight` | `600` | Título de seção. (peso) |
| `text-body` | `17px` | Parágrafos e navegação. (tamanho) |
| `text-body--line-height` | `25px` | Parágrafos e navegação. (altura da linha) |
| `text-body--letter-spacing` | `-0.374px` | Parágrafos e navegação. (espaçamento entre letras) |
| `text-body--font-weight` | `400` | Parágrafos e navegação. (peso) |
| `text-small` | `14px` | Texto de apoio. (tamanho) |
| `text-small--line-height` | `18px` | Texto de apoio. (altura da linha) |
| `text-small--letter-spacing` | `-0.224px` | Texto de apoio. (espaçamento entre letras) |
| `text-small--font-weight` | `400` | Texto de apoio. (peso) |
| `text-caption` | `12px` | Legenda, rótulo e texto de botão pequeno. (tamanho) |
| `text-caption--line-height` | `16px` | Legenda, rótulo e texto de botão pequeno. (altura da linha) |
| `text-caption--letter-spacing` | `-0.12px` | Legenda, rótulo e texto de botão pequeno. (espaçamento entre letras) |
| `text-caption--font-weight` | `400` | Legenda, rótulo e texto de botão pequeno. (peso) |

### Raio e espaço

| Token | Valor | Uso |
|---|---|---|
| `radius-card` | `28px` | Cartões e mídias contidas. |
| `radius-pill` | `9999px` | Botões e pílulas. |
| `radius-input` | `980px` | Campos de formulário. |
| `spacing-section` | `96px` | Distância entre seções grandes. |
| `spacing-gap` | `20px` | Distância entre elementos relacionados. |
| `spacing-card` | `28px` | Respiro interno dos cartões. |

## Contraste (WCAG AA)

Razão de contraste de cada par de texto e fundo. O mínimo para texto normal é 4.5:1.

| Texto | Fundo | Razão | Mínimo | Resultado |
|---|---|---|---|---|
| color-ink | color-canvas | 19.29:1 | 4.5:1 | Passa |
| color-ink | color-band | 16.61:1 | 4.5:1 | Passa |
| color-muted | color-canvas | 8.16:1 | 4.5:1 | Passa |
| color-muted | color-band | 7.03:1 | 4.5:1 | Passa |
| color-link | color-canvas | 6.96:1 | 4.5:1 | Passa |
| color-link | color-band | 6.00:1 | 4.5:1 | Passa |
| color-cta-ink | color-cta | 4.70:1 | 4.5:1 | Passa |
| color-status | color-canvas | 10.22:1 | 4.5:1 | Passa |
| color-status | color-band | 8.80:1 | 4.5:1 | Passa |

## Faça

- Use color-canvas (#000000) como fundo padrão e color-band (#161617) para faixas de largura total, cartões e rodapé.
- Escreva o título do hero em font-display, 88px, peso 600, linha de 90px e tracking de -1.76px.
- Use color-ink (#f5f5f7) no texto principal e color-muted (#a1a1a6) só no texto secundário. Nunca branco puro em bloco de leitura.
- Dê 28px de raio (radius-card) aos cartões e às mídias, sem sombra e sem borda brilhante.
- Use color-cta (#0071e3) só em botões pequenos de conversão, com texto color-cta-ink.
- Use color-link (#2997ff) em links dentro do texto e em links de seção.
- Separe as seções grandes por 96px (spacing-section) e os elementos relacionados por 20px (spacing-gap).

## Não faça

- Não use gradiente, brilho neon nem glow em volta de elementos.
- Não use sombra para criar profundidade. No escuro, a separação vem da faixa color-band.
- Não use cinza médio como fundo de seção. É preto ou grafite, nada no meio.
- Não use color-cta como fundo grande nem como cor de todos os botões.
- Não use texto cinza escuro sobre preto. Se não passa no contraste, suba a cor.
- Não crie pílulas coloridas de status. Use só o texto em color-status, 12px, sem fundo.
- Não use mais de um azul. Link e conversão já têm o seu.

## Antes de entregar

- Revise a tela contra cada item de Faça e Não faça e diga quais você conferiu.
- Confirme que nenhuma cor, fonte, raio ou espaçamento fora da tabela de tokens foi usado.
- Teste em 360px, 768px e 1280px, sem rolagem horizontal e com navegação por teclado.
