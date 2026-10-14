# DESIGN.md: Noite

> Uma sala preta com o produto iluminado. O preto some, a imagem brilha, e a cor fica só nos links e no botão de conversão.

**Tema:** escuro

A versão escura da vitrine: fundo preto, faixas em grafite e o mesmo azul de conversão. Funciona para produto, tecnologia e portfólio onde a imagem precisa brilhar. Sem brilho neon, sem sombra, sem gradiente.

> **Como usar:** salve este arquivo na raiz do projeto. No CLAUDE.md, escreva: "Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md". Os valores abaixo são a lei. Se precisar de um valor que não está aqui, pergunte antes de inventar.

## Tokens

Os mesmos valores estão em tokens.css, theme.tailwind.css e tokens.json. Cor, fonte, raio, sombra e espaçamento só podem vir desta lista.

### Cores

| Token | Valor | Uso |
|---|---|---|
| `color-canvas` | `#000000` | Fundo padrão de todas as seções. |
| `color-band` | `#161617` | Faixas de largura total que alternam com o fundo e o rodapé. |
| `color-ink` | `#f5f5f7` | Títulos e texto principal. |
| `color-muted` | `#a1a1a6` | Texto secundário, legendas e textos legais. |
| `color-line` | `#424245` | Divisórias de 1px e contornos discretos. Nunca como cor de texto. |
| `color-link` | `#2997ff` | Links dentro de texto e links de seção. |
| `color-cta` | `#0071e3` | Fundo do botão de conversão. Só em botões pequenos. |
| `color-cta-ink` | `#ffffff` | Texto por cima do botão de conversão. |
| `color-status` | `#ff9f0a` | Texto simples de status (ex: Novo). Sem fundo e sem pílula. |
| `color-paper` | `#1d1d1f` | Menu aberto, cartões sobre faixa e preenchimentos secundários. |
| `color-control` | `#2c2c2e` | Controles desativados, trilhas e superfícies discretas. |
| `color-outline` | `#6e6e73` | Contorno de campos e botões contornados, indicadores inativos. |

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
| `text-heading` | `44px` | Título de seção e frase de recurso. (tamanho) |
| `text-heading--line-height` | `46px` | Título de seção e frase de recurso. (altura da linha) |
| `text-heading--letter-spacing` | `-0.44px` | Título de seção e frase de recurso. (espaçamento entre letras) |
| `text-heading--font-weight` | `600` | Título de seção e frase de recurso. (peso) |
| `text-body` | `17px` | Parágrafos e navegação de seção. (tamanho) |
| `text-body--line-height` | `25px` | Parágrafos e navegação de seção. (altura da linha) |
| `text-body--letter-spacing` | `-0.374px` | Parágrafos e navegação de seção. (espaçamento entre letras) |
| `text-body--font-weight` | `400` | Parágrafos e navegação de seção. (peso) |
| `text-small` | `14px` | Texto de apoio e preços. (tamanho) |
| `text-small--line-height` | `18px` | Texto de apoio e preços. (altura da linha) |
| `text-small--letter-spacing` | `-0.224px` | Texto de apoio e preços. (espaçamento entre letras) |
| `text-small--font-weight` | `400` | Texto de apoio e preços. (peso) |
| `text-caption` | `12px` | Legenda, rótulo e texto de botão pequeno. (tamanho) |
| `text-caption--line-height` | `16px` | Legenda, rótulo e texto de botão pequeno. (altura da linha) |
| `text-caption--letter-spacing` | `-0.12px` | Legenda, rótulo e texto de botão pequeno. (espaçamento entre letras) |
| `text-caption--font-weight` | `400` | Legenda, rótulo e texto de botão pequeno. (peso) |
| `text-title` | `19px` | Nome do produto na barra e títulos pequenos. (tamanho) |
| `text-title--line-height` | `23px` | Nome do produto na barra e títulos pequenos. (altura da linha) |
| `text-title--letter-spacing` | `0.228px` | Nome do produto na barra e títulos pequenos. (espaçamento entre letras) |
| `text-title--font-weight` | `600` | Nome do produto na barra e títulos pequenos. (peso) |
| `text-kicker` | `21px` | Rótulo curto acima de uma frase. (tamanho) |
| `text-kicker--line-height` | `21px` | Rótulo curto acima de uma frase. (altura da linha) |
| `text-kicker--letter-spacing` | `0.231px` | Rótulo curto acima de uma frase. (espaçamento entre letras) |
| `text-kicker--font-weight` | `600` | Rótulo curto acima de uma frase. (peso) |

### Escala tipográfica

| Papel | Família | Peso | Tamanho | Altura da linha | Espaçamento |
|---|---|---|---|---|---|
| hero | font-display | 600 | 88px | 90px | -1.76px |
| heading | font-display | 600 | 44px | 46px | -0.44px |
| title | font-display | 600 | 19px | 23px | 0.228px |
| kicker | font-display | 600 | 21px | 21px | 0.231px |
| body | font-text | 400 | 17px | 25px | -0.374px |
| small | font-text | 400 | 14px | 18px | -0.224px |
| caption | font-text | 400 | 12px | 16px | -0.12px |

### Raio e espaço

| Token | Valor | Uso |
|---|---|---|
| `radius-card` | `28px` | Cartões e mídias contidas. |
| `radius-pill` | `9999px` | Botões e pílulas. |
| `radius-input` | `980px` | Campos de formulário. |
| `spacing-section` | `96px` | Distância entre seções grandes. |
| `spacing-gap` | `20px` | Distância entre elementos relacionados. |
| `spacing-card` | `28px` | Respiro interno dos cartões. |
| `radius-nav` | `20px` | Barra de navegação flutuante. |
| `radius-link` | `10px` | Links com área de toque e tags pequenas. |

### Sombras

| Token | Valor | Uso |
|---|---|---|
| `shadow-ring` | `0 0 0 1px #424245` | Anel de 1px discreto. Não é elevação. |
| `shadow-ring-strong` | `0 0 0 1px #6e6e73` | Anel de 1px para controle selecionado ou contornado. |

## Contraste (WCAG AA)

Razão de contraste de cada par. O mínimo é 4.5:1 para texto normal e 3:1 para contornos de controles.

| Texto ou contorno | Fundo | Razão | Mínimo | Resultado |
|---|---|---|---|---|
| color-ink | color-canvas | 19.29:1 | 4.5:1 | Passa |
| color-ink | color-band | 16.61:1 | 4.5:1 | Passa |
| color-ink | color-paper | 15.46:1 | 4.5:1 | Passa |
| color-muted | color-canvas | 8.16:1 | 4.5:1 | Passa |
| color-muted | color-band | 7.03:1 | 4.5:1 | Passa |
| color-link | color-canvas | 6.96:1 | 4.5:1 | Passa |
| color-link | color-band | 6.00:1 | 4.5:1 | Passa |
| color-cta-ink | color-cta | 4.70:1 | 4.5:1 | Passa |
| color-status | color-canvas | 10.22:1 | 4.5:1 | Passa |
| color-status | color-band | 8.80:1 | 4.5:1 | Passa |
| color-outline | color-canvas | 4.14:1 | 3:1 | Passa |
| color-outline | color-band | 3.57:1 | 3:1 | Passa |

## Componentes

### Navegação global
**Papel:** Barra fixa de utilidades

Barra color-canvas de 44px com links em text-caption na cor color-ink. Sem caixas. Quando abre, a superfície passa a color-paper, com borda de 1px em color-line.

### Faixa de aviso
**Papel:** Mensagem curta acima do hero

Faixa de largura total em color-paper, texto em text-small na cor color-ink e um link em color-link no fim. Uma linha só.

### Hero do produto
**Papel:** Abertura do lançamento

Imagem do produto ocupando a tela inteira sobre color-canvas. Rótulo em text-kicker e a frase em text-hero alinhados à esquerda, na parte de baixo, sobre a imagem. O botão de conversão fica logo abaixo da frase.

### Botão de conversão
**Papel:** Controle principal

Preenchimento color-cta, texto color-cta-ink em text-caption e radius-pill. Compacto. Nunca ocupa a largura da tela.

### Cápsula de preço
**Papel:** Contexto de compra

Cápsula color-paper com radius-pill, preço em text-small peso 600 na cor color-ink e o botão de conversão dentro. Sem sombra.

### Faixa de destaques
**Papel:** Seção de recursos

Fundo color-band de borda a borda, título em color-ink e cartões color-paper com radius-card e sem sombra. A mídia fica centralizada com a frase em text-heading acima.

### Cartão de mídia
**Papel:** Vitrine de um detalhe

Superfície color-paper, radius-card, sem borda brilhante e sem sombra. A imagem pode passar da borda do cartão.

### Controle de carrossel
**Papel:** Pausa e pontos de navegação

Pílula pequena em color-control com radius-pill e ícones em color-muted. Pontos e pausa agrupados, sem caixa em volta.

### Bloco editorial
**Papel:** História longa do produto

Rótulo pequeno em text-kicker, frase grande à esquerda em color-ink e parágrafo em text-body na cor color-muted. A imagem entra pelo lado oposto.

### Rótulo de lançamento
**Papel:** Anotação de produto novo

Texto simples em color-status, text-caption com peso 600. Sem pílula e sem fundo.

### Campo de busca
**Papel:** Busca da navegação

Fundo color-paper, contorno de 1px em color-outline, radius-input e texto em color-ink.

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

## Superfícies

| Nível | Token | Valor | Uso |
|---|---|---|---|
| 0 | `color-canvas` | `#000000` | Fundo padrão, hero, navegação do produto e cartões sobre faixa. |
| 1 | `color-band` | `#161617` | Faixa de largura total, palco de carrossel, área muda e rodapé. |
| 2 | `color-paper` | `#1d1d1f` | Camada do menu aberto e preenchimento secundário. |
| 3 | `color-control` | `#2c2c2e` | Preenchimento de controle desativado ou discreto e borda fina de navegação. |

## Elevação

No escuro, a profundidade vem da troca de camadas (color-canvas, color-band, color-paper) e de anéis de 1px (shadow-ring). Sombra projetada some no preto e só suja a imagem, então não existe. Nada de brilho em volta dos elementos.

## Imagens

Produto isolado no preto, com luz própria: o brilho vem da imagem, nunca da interface. Imagens grandes, às vezes cortadas, ocupando a largura inteira do palco. Cores fortes só aparecem no próprio produto (uma pulseira verde, uma tela acesa). Ícones pequenos, monocromáticos e em color-ink.

## Layout

Navegação global e uma faixa de aviso no topo, depois um palco preto de tela cheia com a imagem do produto e a frase alinhada embaixo, à esquerda. A história continua em faixas grafite com cartões que avançam na horizontal e em blocos editoriais com texto à esquerda e imagem enorme do outro lado. Muito espaço vazio entre as seções, sem linhas de grade e sem pilhas de cartões.

## Guia para a IA

Referência rápida de cores:

- `color-canvas`: #000000. Fundo padrão de todas as seções.
- `color-band`: #161617. Faixas de largura total que alternam com o fundo e o rodapé.
- `color-ink`: #f5f5f7. Títulos e texto principal.
- `color-muted`: #a1a1a6. Texto secundário, legendas e textos legais.
- `color-line`: #424245. Divisórias de 1px e contornos discretos. Nunca como cor de texto.
- `color-link`: #2997ff. Links dentro de texto e links de seção.
- `color-cta`: #0071e3. Fundo do botão de conversão. Só em botões pequenos.
- `color-cta-ink`: #ffffff. Texto por cima do botão de conversão.
- `color-status`: #ff9f0a. Texto simples de status (ex: Novo). Sem fundo e sem pílula.
- `color-paper`: #1d1d1f. Menu aberto, cartões sobre faixa e preenchimentos secundários.
- `color-control`: #2c2c2e. Controles desativados, trilhas e superfícies discretas.
- `color-outline`: #6e6e73. Contorno de campos e botões contornados, indicadores inativos.

Pedidos prontos (cole no Claude Code, no ChatGPT ou no Gemini):

- Crie um hero de tela cheia sobre color-canvas: imagem do produto ocupando o palco, rótulo em text-kicker e frase em text-hero alinhados à esquerda embaixo, e abaixo deles um botão de conversão color-cta.
- Crie uma faixa de aviso de largura total em color-paper com uma linha em text-small na cor color-ink e um link em color-link no final.
- Crie uma seção de destaques com fundo color-band e cartões color-paper com radius-card, sem sombra, cada um com uma imagem centralizada e uma frase em text-heading.
- Crie uma cápsula de preço em color-paper com radius-pill, preço em text-small peso 600 e um botão de conversão color-cta compacto dentro.
- Crie um bloco editorial com rótulo em text-kicker, frase grande em color-ink, parágrafo em text-body na cor color-muted e uma imagem grande entrando pela direita.

## Início rápido

### Variáveis CSS

```css
:root {
  --color-canvas: #000000;
  --color-band: #161617;
  --color-ink: #f5f5f7;
  --color-muted: #a1a1a6;
  --color-line: #424245;
  --color-link: #2997ff;
  --color-cta: #0071e3;
  --color-cta-ink: #ffffff;
  --color-status: #ff9f0a;
  --font-display: "SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif;
  --font-text: "SF Pro Text", Inter, "Helvetica Neue", Arial, sans-serif;
  --text-hero: 88px;
  --text-hero--line-height: 90px;
  --text-hero--letter-spacing: -1.76px;
  --text-hero--font-weight: 600;
  --text-heading: 44px;
  --text-heading--line-height: 46px;
  --text-heading--letter-spacing: -0.44px;
  --text-heading--font-weight: 600;
  --text-body: 17px;
  --text-body--line-height: 25px;
  --text-body--letter-spacing: -0.374px;
  --text-body--font-weight: 400;
  --text-small: 14px;
  --text-small--line-height: 18px;
  --text-small--letter-spacing: -0.224px;
  --text-small--font-weight: 400;
  --text-caption: 12px;
  --text-caption--line-height: 16px;
  --text-caption--letter-spacing: -0.12px;
  --text-caption--font-weight: 400;
  --radius-card: 28px;
  --radius-pill: 9999px;
  --radius-input: 980px;
  --spacing-section: 96px;
  --spacing-gap: 20px;
  --spacing-card: 28px;
  --color-paper: #1d1d1f;
  --color-control: #2c2c2e;
  --color-outline: #6e6e73;
  --text-title: 19px;
  --text-title--line-height: 23px;
  --text-title--letter-spacing: 0.228px;
  --text-title--font-weight: 600;
  --text-kicker: 21px;
  --text-kicker--line-height: 21px;
  --text-kicker--letter-spacing: 0.231px;
  --text-kicker--font-weight: 600;
  --shadow-ring: 0 0 0 1px #424245;
  --shadow-ring-strong: 0 0 0 1px #6e6e73;
  --radius-nav: 20px;
  --radius-link: 10px;
}
```

### Tailwind v4

```css
@theme {
  --color-canvas: #000000;
  --color-band: #161617;
  --color-ink: #f5f5f7;
  --color-muted: #a1a1a6;
  --color-line: #424245;
  --color-link: #2997ff;
  --color-cta: #0071e3;
  --color-cta-ink: #ffffff;
  --color-status: #ff9f0a;
  --font-display: "SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif;
  --font-text: "SF Pro Text", Inter, "Helvetica Neue", Arial, sans-serif;
  --text-hero: 88px;
  --text-hero--line-height: 90px;
  --text-hero--letter-spacing: -1.76px;
  --text-hero--font-weight: 600;
  --text-heading: 44px;
  --text-heading--line-height: 46px;
  --text-heading--letter-spacing: -0.44px;
  --text-heading--font-weight: 600;
  --text-body: 17px;
  --text-body--line-height: 25px;
  --text-body--letter-spacing: -0.374px;
  --text-body--font-weight: 400;
  --text-small: 14px;
  --text-small--line-height: 18px;
  --text-small--letter-spacing: -0.224px;
  --text-small--font-weight: 400;
  --text-caption: 12px;
  --text-caption--line-height: 16px;
  --text-caption--letter-spacing: -0.12px;
  --text-caption--font-weight: 400;
  --radius-card: 28px;
  --radius-pill: 9999px;
  --radius-input: 980px;
  --spacing-section: 96px;
  --spacing-gap: 20px;
  --spacing-card: 28px;
  --color-paper: #1d1d1f;
  --color-control: #2c2c2e;
  --color-outline: #6e6e73;
  --text-title: 19px;
  --text-title--line-height: 23px;
  --text-title--letter-spacing: 0.228px;
  --text-title--font-weight: 600;
  --text-kicker: 21px;
  --text-kicker--line-height: 21px;
  --text-kicker--letter-spacing: 0.231px;
  --text-kicker--font-weight: 600;
  --shadow-ring: 0 0 0 1px #424245;
  --shadow-ring-strong: 0 0 0 1px #6e6e73;
  --radius-nav: 20px;
  --radius-link: 10px;
}
```

## Antes de entregar

- Revise a tela contra cada item de Faça e Não faça e diga quais você conferiu.
- Confirme que nenhuma cor, fonte, raio, sombra ou espaçamento fora da tabela de tokens foi usado.
- Teste em 360px, 768px e 1280px, sem rolagem horizontal e com navegação por teclado.
