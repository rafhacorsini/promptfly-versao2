# DESIGN.md: Vitrine

Fundo branco, faixas cinza-claro e um único azul para conversão. Pensado para contar a história de um produto, no estilo das vitrines de produto mais limpas da web. Sem sombra, sem gradiente, com cartões de cantos bem arredondados.

> **Como usar:** salve este arquivo na raiz do projeto. No CLAUDE.md, escreva: "Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md". Os valores abaixo são a lei. Se precisar de um valor que não está aqui, pergunte antes de inventar.

## Tokens

Os mesmos valores estão em tokens.css, theme.tailwind.css e tokens.json. Cor, fonte, raio e espaçamento só podem vir desta lista.

### Cores

| Token | Valor | Uso |
|---|---|---|
| `color-canvas` | `#ffffff` | Fundo padrão de todas as seções. |
| `color-band` | `#f5f5f7` | Faixas de largura total que alternam com o fundo, cartões e rodapé. |
| `color-ink` | `#1d1d1f` | Títulos e texto principal. |
| `color-muted` | `#6e6e73` | Texto secundário, legendas e textos legais. |
| `color-line` | `#d6d6d6` | Divisórias de 1px e contornos discretos. Nunca como cor de texto. |
| `color-link` | `#0066cc` | Links dentro de texto e links de seção. |
| `color-cta` | `#0071e3` | Fundo do botão de conversão. Só em botões pequenos. |
| `color-cta-ink` | `#ffffff` | Texto por cima do botão de conversão. |
| `color-status` | `#b64400` | Texto simples de status (ex: Novo). Sem fundo e sem pílula. |

### Fontes

| Token | Valor | Uso |
|---|---|---|
| `font-display` | `"SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif` | Família dos títulos e frases de impacto. |
| `font-text` | `"SF Pro Text", Inter, "Helvetica Neue", Arial, sans-serif` | Família de navegação, parágrafos, links e botões. |

### Tipografia

| Token | Valor | Uso |
|---|---|---|
| `text-hero` | `80px` | Frase de impacto do hero. (tamanho) |
| `text-hero--line-height` | `84px` | Frase de impacto do hero. (altura da linha) |
| `text-hero--letter-spacing` | `-1.2px` | Frase de impacto do hero. (espaçamento entre letras) |
| `text-hero--font-weight` | `600` | Frase de impacto do hero. (peso) |
| `text-heading` | `40px` | Título de seção. (tamanho) |
| `text-heading--line-height` | `40px` | Título de seção. (altura da linha) |
| `text-heading--letter-spacing` | `0px` | Título de seção. (espaçamento entre letras) |
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
| `spacing-section` | `90px` | Distância entre seções grandes. |
| `spacing-gap` | `20px` | Distância entre elementos relacionados. |
| `spacing-card` | `28px` | Respiro interno dos cartões. |

## Contraste (WCAG AA)

Razão de contraste de cada par de texto e fundo. O mínimo para texto normal é 4.5:1.

| Texto | Fundo | Razão | Mínimo | Resultado |
|---|---|---|---|---|
| color-ink | color-canvas | 16.83:1 | 4.5:1 | Passa |
| color-ink | color-band | 15.46:1 | 4.5:1 | Passa |
| color-muted | color-canvas | 5.07:1 | 4.5:1 | Passa |
| color-muted | color-band | 4.66:1 | 4.5:1 | Passa |
| color-link | color-canvas | 5.57:1 | 4.5:1 | Passa |
| color-link | color-band | 5.11:1 | 4.5:1 | Passa |
| color-cta-ink | color-cta | 4.70:1 | 4.5:1 | Passa |
| color-status | color-canvas | 5.50:1 | 4.5:1 | Passa |
| color-status | color-band | 5.05:1 | 4.5:1 | Passa |

## Faça

- Use color-canvas (#ffffff) como fundo padrão da história do produto e reserve color-band (#f5f5f7) para faixas de largura total e para o rodapé.
- Escreva o título do hero em font-display, 80px, peso 600, linha de 84px e tracking de -1.2px.
- Use font-text em 17px, peso 400 e tracking de -0.374px nos parágrafos. A navegação da página usa 17px com peso 500.
- Dê 28px de raio (radius-card) aos cartões e às mídias contidas, e deixe esses cartões sem sombra.
- Use color-cta (#0071e3) só em botões pequenos de conversão, preenchidos, com texto color-cta-ink de 12px.
- Use color-link (#0066cc) em links dentro do texto e em links de seção. Nem todo item de navegação precisa ficar azul.
- Separe as seções grandes por 90px (spacing-section) e os elementos relacionados por 20px (spacing-gap).

## Não faça

- Não use gradiente. A cor e a profundidade da página vêm das imagens do produto.
- Não use sombra em cartões, blocos editoriais ou cápsulas de preço flutuantes.
- Não troque o raio de 28px dos cartões por 8px, 12px ou cantos retos.
- Não use color-cta como fundo grande de hero nem como cor de todos os botões.
- Não ponha o título do hero em peso 700 nem com tracking mais aberto que -1.2px em 80px.
- Não crie pílulas coloridas para rótulos de lançamento. Use só o texto em color-status, 12px, sem fundo.
- Não cubra as imagens do produto com painéis densos dentro de caixas. Deixe espaço branco em volta delas.

## Antes de entregar

- Revise a tela contra cada item de Faça e Não faça e diga quais você conferiu.
- Confirme que nenhuma cor, fonte, raio ou espaçamento fora da tabela de tokens foi usado.
- Teste em 360px, 768px e 1280px, sem rolagem horizontal e com navegação por teclado.
