# DESIGN.md: Editorial

Fundo cinza muito claro, tipografia enorme e apertada, uma única cor de destaque (laranja) usada só em preenchimento. É a linguagem do Promptfly: assimétrica, de revista, feita para portfólio, estúdio e marca pessoal.

> **Como usar:** salve este arquivo na raiz do projeto. No CLAUDE.md, escreva: "Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md". Os valores abaixo são a lei. Se precisar de um valor que não está aqui, pergunte antes de inventar.

## Tokens

Os mesmos valores estão em tokens.css, theme.tailwind.css e tokens.json. Cor, fonte, raio e espaçamento só podem vir desta lista.

### Cores

| Token | Valor | Uso |
|---|---|---|
| `color-canvas` | `#f5f5f5` | Fundo padrão de todas as seções. |
| `color-band` | `#ebebeb` | Faixas de largura total que alternam com o fundo, cartões e rodapé. |
| `color-ink` | `#1a1a1a` | Títulos e texto principal. |
| `color-muted` | `#5f5f5f` | Texto secundário, legendas e textos legais. |
| `color-line` | `#d4d4d4` | Divisórias de 1px e contornos discretos. Nunca como cor de texto. |
| `color-link` | `#b83700` | Links dentro de texto e links de seção. |
| `color-cta` | `#ff4c00` | Fundo do botão de conversão. Só em botões pequenos. |
| `color-cta-ink` | `#1a1a1a` | Texto por cima do botão de conversão. |
| `color-status` | `#b83700` | Texto simples de status (ex: Novo). Sem fundo e sem pílula. |

### Fontes

| Token | Valor | Uso |
|---|---|---|
| `font-display` | `Inter, "Helvetica Neue", Arial, sans-serif` | Família dos títulos e frases de impacto. |
| `font-text` | `Inter, "Helvetica Neue", Arial, sans-serif` | Família de navegação, parágrafos, links e botões. |

### Tipografia

| Token | Valor | Uso |
|---|---|---|
| `text-hero` | `clamp(3rem, 9vw, 8rem)` | Frase de impacto do hero. (tamanho) |
| `text-hero--line-height` | `0.9` | Frase de impacto do hero. (altura da linha) |
| `text-hero--letter-spacing` | `-0.045em` | Frase de impacto do hero. (espaçamento entre letras) |
| `text-hero--font-weight` | `800` | Frase de impacto do hero. (peso) |
| `text-heading` | `clamp(2rem, 4vw, 3.5rem)` | Título de seção. (tamanho) |
| `text-heading--line-height` | `1` | Título de seção. (altura da linha) |
| `text-heading--letter-spacing` | `-0.03em` | Título de seção. (espaçamento entre letras) |
| `text-heading--font-weight` | `800` | Título de seção. (peso) |
| `text-body` | `17px` | Parágrafos e navegação. (tamanho) |
| `text-body--line-height` | `1.5` | Parágrafos e navegação. (altura da linha) |
| `text-body--letter-spacing` | `-0.01em` | Parágrafos e navegação. (espaçamento entre letras) |
| `text-body--font-weight` | `300` | Parágrafos e navegação. (peso) |
| `text-small` | `14px` | Texto de apoio. (tamanho) |
| `text-small--line-height` | `1.4` | Texto de apoio. (altura da linha) |
| `text-small--letter-spacing` | `0em` | Texto de apoio. (espaçamento entre letras) |
| `text-small--font-weight` | `400` | Texto de apoio. (peso) |
| `text-caption` | `12px` | Legenda, rótulo e texto de botão pequeno. (tamanho) |
| `text-caption--line-height` | `1.3` | Legenda, rótulo e texto de botão pequeno. (altura da linha) |
| `text-caption--letter-spacing` | `0.02em` | Legenda, rótulo e texto de botão pequeno. (espaçamento entre letras) |
| `text-caption--font-weight` | `500` | Legenda, rótulo e texto de botão pequeno. (peso) |

### Raio e espaço

| Token | Valor | Uso |
|---|---|---|
| `radius-card` | `14px` | Cartões e mídias contidas. |
| `radius-pill` | `999px` | Botões e pílulas. |
| `radius-input` | `14px` | Campos de formulário. |
| `spacing-section` | `120px` | Distância entre seções grandes. |
| `spacing-gap` | `20px` | Distância entre elementos relacionados. |
| `spacing-card` | `24px` | Respiro interno dos cartões. |

## Contraste (WCAG AA)

Razão de contraste de cada par de texto e fundo. O mínimo para texto normal é 4.5:1.

| Texto | Fundo | Razão | Mínimo | Resultado |
|---|---|---|---|---|
| color-ink | color-canvas | 15.96:1 | 4.5:1 | Passa |
| color-ink | color-band | 14.60:1 | 4.5:1 | Passa |
| color-muted | color-canvas | 5.86:1 | 4.5:1 | Passa |
| color-muted | color-band | 5.36:1 | 4.5:1 | Passa |
| color-link | color-canvas | 5.37:1 | 4.5:1 | Passa |
| color-link | color-band | 4.91:1 | 4.5:1 | Passa |
| color-cta-ink | color-cta | 5.21:1 | 4.5:1 | Passa |
| color-status | color-canvas | 5.37:1 | 4.5:1 | Passa |
| color-status | color-band | 4.91:1 | 4.5:1 | Passa |

## Faça

- Use color-canvas (#f5f5f5) como fundo padrão e color-band (#ebebeb) para quebrar o ritmo com uma faixa de borda a borda.
- Escreva o título do hero em font-display, entre 3rem e 8rem (clamp), peso 800 e tracking de -0.045em. Deixe-o ocupar a tela.
- Combine dois pesos bem distantes: 800 nos títulos e 300 no texto corrido.
- Use color-cta (#ff4c00) só como preenchimento, com texto color-cta-ink (#1a1a1a) por cima. É a única cor de destaque do site.
- Alinhe à esquerda e use assimetria de propósito: título grande de um lado, texto pequeno do outro.
- Use color-link (#b83700), a versão escura do laranja, em links dentro de texto.
- Separe as seções grandes por no mínimo 120px (spacing-section) no desktop.

## Não faça

- Não use color-cta (#ff4c00) como cor de texto sobre fundo claro. Ele não passa no contraste. Para texto laranja, use color-link.
- Não centralize tudo. Hero centralizado com título médio, subtítulo e dois botões é o layout padrão de IA.
- Não use gradiente, glassmorphism ou sombra grande e borrada nos cartões.
- Não use um peso de fonte só nem tracking padrão em título grande.
- Não use o mesmo raio em tudo. Cartões usam radius-card, botões usam radius-pill.
- Não use mais de uma cor de destaque. O resto é neutro.
- Não prenda uma imagem pequena num cartão quando ela pode ocupar a tela inteira.

## Antes de entregar

- Revise a tela contra cada item de Faça e Não faça e diga quais você conferiu.
- Confirme que nenhuma cor, fonte, raio ou espaçamento fora da tabela de tokens foi usado.
- Teste em 360px, 768px e 1280px, sem rolagem horizontal e com navegação por teclado.
