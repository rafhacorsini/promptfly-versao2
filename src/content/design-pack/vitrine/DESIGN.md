# DESIGN.md: Vitrine

> Um produto numa galeria branca. A imagem é o evento principal, e a tipografia e os controles azuis ficam quietos em volta dela.

**Tema:** claro

Fundo branco, faixas cinza-claro e um único azul para conversão. Pensado para contar a história de um produto, no estilo das vitrines de produto mais limpas da web. Sem sombra, sem gradiente, com cartões de cantos bem arredondados.

> **Como usar:** salve este arquivo na raiz do projeto. No CLAUDE.md, escreva: "Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md". Os valores abaixo são a lei. Se precisar de um valor que não está aqui, pergunte antes de inventar.

## Tokens

Os mesmos valores estão em tokens.css, theme.tailwind.css e tokens.json. Cor, fonte, raio, sombra e espaçamento só podem vir desta lista.

### Cores

| Token | Valor | Uso |
|---|---|---|
| `color-canvas` | `#ffffff` | Fundo padrão de todas as seções. |
| `color-band` | `#f5f5f7` | Faixas de largura total que alternam com o fundo e o rodapé. |
| `color-ink` | `#1d1d1f` | Títulos e texto principal. |
| `color-muted` | `#6e6e73` | Texto secundário, legendas e textos legais. |
| `color-line` | `#d6d6d6` | Divisórias de 1px e contornos discretos. Nunca como cor de texto. |
| `color-link` | `#0066cc` | Links dentro de texto e links de seção. |
| `color-cta` | `#0071e3` | Fundo do botão de conversão. Só em botões pequenos. |
| `color-cta-ink` | `#ffffff` | Texto por cima do botão de conversão. |
| `color-status` | `#b64400` | Texto simples de status (ex: Novo). Sem fundo e sem pílula. |
| `color-paper` | `#fafafc` | Menu aberto, cartões sobre faixa e preenchimentos secundários. |
| `color-control` | `#e6e6e8` | Controles desativados, trilhas e superfícies discretas. |
| `color-outline` | `#86868b` | Contorno de campos e botões contornados, indicadores inativos. |

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
| `text-heading` | `40px` | Título de seção e frase de recurso. (tamanho) |
| `text-heading--line-height` | `40px` | Título de seção e frase de recurso. (altura da linha) |
| `text-heading--letter-spacing` | `0px` | Título de seção e frase de recurso. (espaçamento entre letras) |
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
| hero | font-display | 600 | 80px | 84px | -1.2px |
| heading | font-display | 600 | 40px | 40px | 0px |
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
| `spacing-section` | `90px` | Distância entre seções grandes. |
| `spacing-gap` | `20px` | Distância entre elementos relacionados. |
| `spacing-card` | `28px` | Respiro interno dos cartões. |
| `radius-nav` | `20px` | Barra de navegação flutuante. |
| `radius-link` | `10px` | Links com área de toque e tags pequenas. |

### Sombras

| Token | Valor | Uso |
|---|---|---|
| `shadow-ring` | `0 0 0 1px #e6e6e8` | Anel de 1px discreto. Não é elevação. |
| `shadow-ring-strong` | `0 0 0 1px #86868b` | Anel de 1px para controle selecionado ou contornado. |

## Contraste (WCAG AA)

Razão de contraste de cada par. O mínimo é 4.5:1 para texto normal e 3:1 para contornos de controles.

| Texto ou contorno | Fundo | Razão | Mínimo | Resultado |
|---|---|---|---|---|
| color-ink | color-canvas | 16.83:1 | 4.5:1 | Passa |
| color-ink | color-band | 15.46:1 | 4.5:1 | Passa |
| color-ink | color-paper | 16.14:1 | 4.5:1 | Passa |
| color-muted | color-canvas | 5.07:1 | 4.5:1 | Passa |
| color-muted | color-band | 4.66:1 | 4.5:1 | Passa |
| color-link | color-canvas | 5.57:1 | 4.5:1 | Passa |
| color-link | color-band | 5.11:1 | 4.5:1 | Passa |
| color-cta-ink | color-cta | 4.70:1 | 4.5:1 | Passa |
| color-status | color-canvas | 5.50:1 | 4.5:1 | Passa |
| color-status | color-band | 5.05:1 | 4.5:1 | Passa |
| color-outline | color-canvas | 3.62:1 | 3:1 | Passa |
| color-outline | color-band | 3.33:1 | 3:1 | Passa |

## Componentes

### Navegação global
**Papel:** Barra fixa de utilidades

Barra branca de 44px de altura com a marca e links em text-caption (12px/400) na cor color-ink. Os controles não têm caixa. Quando o menu abre, a superfície passa a color-paper, com borda de 1px em color-line e blur de 20px.

### Navegação do produto
**Papel:** Cabeçalho da página do produto e controles de conversão

Barra branca com o nome do produto em font-display, text-title (19px/600), e controles em pílula alinhados à direita. Se a barra flutuar sobre a página, use radius-nav (20px) e color-line como limite de 1px.

### Botão contornado
**Papel:** Controle secundário

Fundo transparente, texto color-ink, contorno de 1px em color-outline e radius-pill. Texto em text-caption. Nunca dê cor de preenchimento a esse botão.

### Botão de conversão
**Papel:** Controle principal e compacto

Preenchimento color-cta, texto color-cta-ink em text-caption (12px/400) e radius-pill. Fica pequeno, dentro da barra do produto ou da cápsula de preço.

### Hero do produto
**Papel:** Abertura do lançamento

Palco branco de borda a borda. Rótulo do produto centralizado em text-kicker, depois a frase em text-hero (80px/600, linha de 84px, tracking de -1.2px). A imagem do produto vem logo abaixo, sem cartão em volta.

### Cápsula de preço flutuante
**Papel:** Contexto de compra sobre a imagem

Cápsula color-canvas com radius-card perto da parte de baixo da imagem. Preço em text-small com peso 600 e texto de apoio compacto. O botão de conversão fica dentro dela. Sem sombra.

### Navegação de seção
**Papel:** Atalhos dentro de uma página longa

Lista horizontal de rótulos em text-body com peso 500, cor color-ink, fundo transparente e 28px de respiro vertical. Sem cartão e sem sublinhado.

### Palco de destaques
**Papel:** Seção de carrossel de recursos

Fundo color-band de borda a borda. Título grande em color-ink de um lado e um link em color-link do outro. Cada slide é um cartão color-canvas com radius-card e sem sombra.

### Cartão de mídia
**Papel:** Vitrine de um detalhe do produto

Superfície color-canvas, radius-card, sem borda e sem sombra. A imagem fica centralizada, com a frase do recurso acima em text-heading (40px/600). A mídia pode passar da borda do cartão.

### Bloco editorial
**Papel:** História longa do produto

Rótulo pequeno em text-kicker, frase grande alinhada à esquerda e parágrafo em text-body. A imagem é enorme e entra pelo lado oposto ou por baixo.

### Rótulo de lançamento
**Papel:** Anotação de produto novo

Texto simples em color-status, text-caption com peso 600. Sem pílula, sem fundo e sem borda.

### Campo de busca
**Papel:** Busca da navegação global

Fundo color-canvas, contorno de 1px em color-outline, radius-input, 24px de respiro à esquerda e 45px à direita. Fica escondido até a navegação expandir.

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

## Superfícies

| Nível | Token | Valor | Uso |
|---|---|---|---|
| 0 | `color-canvas` | `#ffffff` | Fundo padrão, hero, navegação do produto e cartões sobre faixa. |
| 1 | `color-band` | `#f5f5f7` | Faixa de largura total, palco de carrossel, área muda e rodapé. |
| 2 | `color-paper` | `#fafafc` | Camada do menu aberto e preenchimento secundário. |
| 3 | `color-control` | `#e6e6e8` | Preenchimento de controle desativado ou discreto e borda fina de navegação. |

## Elevação

A separação vem do branco sobre color-band, dos cantos de 28px e de contornos raros de 1px (shadow-ring). Nada de sombra projetada. As únicas marcas parecidas com elevação são os anéis de 1px em navegação e controles selecionados (shadow-ring-strong).

## Imagens

Fotografia de produto em alta resolução, isolada em fundo branco ou neutro, muitas vezes cortada em escala grande para a dobra e a espessura virarem a composição. Mãos aparecem no hero para dar noção de tamanho. As imagens ficam soltas no branco, sem moldura, ou dentro de cartões brancos de 28px sobre a faixa cinza. Interface do produto só aparece dentro das telas dos aparelhos. Ícones são pequenos, monocromáticos e ficam só na navegação global.

## Layout

A página abre com a navegação global compacta, seguida da barra do produto, e então um hero branco centralizado: rótulo, frase enorme, texto de pré-venda, a imagem dominante e a cápsula de preço. A história segue por uma faixa cinza de destaques com cartões brancos que avançam na horizontal e por seções editoriais largas, com texto à esquerda e imagem enorme entrando pela direita. A navegação de seção apoia a rolagem longa. Tudo é espaçoso e guiado pela imagem, sem linhas de grade visíveis e sem pilhas de cartões.

## Guia para a IA

Referência rápida de cores:

- `color-canvas`: #ffffff. Fundo padrão de todas as seções.
- `color-band`: #f5f5f7. Faixas de largura total que alternam com o fundo e o rodapé.
- `color-ink`: #1d1d1f. Títulos e texto principal.
- `color-muted`: #6e6e73. Texto secundário, legendas e textos legais.
- `color-line`: #d6d6d6. Divisórias de 1px e contornos discretos. Nunca como cor de texto.
- `color-link`: #0066cc. Links dentro de texto e links de seção.
- `color-cta`: #0071e3. Fundo do botão de conversão. Só em botões pequenos.
- `color-cta-ink`: #ffffff. Texto por cima do botão de conversão.
- `color-status`: #b64400. Texto simples de status (ex: Novo). Sem fundo e sem pílula.
- `color-paper`: #fafafc. Menu aberto, cartões sobre faixa e preenchimentos secundários.
- `color-control`: #e6e6e8. Controles desativados, trilhas e superfícies discretas.
- `color-outline`: #86868b. Contorno de campos e botões contornados, indicadores inativos.

Pedidos prontos (cole no Claude Code, no ChatGPT ou no Gemini):

- Crie um hero com fundo color-canvas: rótulo do produto centralizado em font-display text-kicker, frase centralizada em text-hero na cor color-ink, e a imagem do produto logo abaixo, sem cartão em volta.
- Crie uma barra do produto com o nome em font-display text-title, um botão contornado (color-outline, radius-pill) e um botão de conversão color-cta com texto color-cta-ink em text-caption.
- Crie uma seção de destaques com fundo color-band, título em color-ink, um link em color-link e um cartão color-canvas com radius-card, sem sombra, e uma frase em text-heading.
- Crie uma seção editorial branca com frase grande à esquerda, parágrafo em text-body com o tracking do token e uma foto grande cortada no lado direito.
- Crie uma cápsula de preço flutuante color-canvas com radius-card sobre a imagem, preço em text-small peso 600 e um botão de conversão compacto dentro, sem sombra.

## Início rápido

### Variáveis CSS

```css
:root {
  --color-canvas: #ffffff;
  --color-band: #f5f5f7;
  --color-ink: #1d1d1f;
  --color-muted: #6e6e73;
  --color-line: #d6d6d6;
  --color-link: #0066cc;
  --color-cta: #0071e3;
  --color-cta-ink: #ffffff;
  --color-status: #b64400;
  --font-display: "SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif;
  --font-text: "SF Pro Text", Inter, "Helvetica Neue", Arial, sans-serif;
  --text-hero: 80px;
  --text-hero--line-height: 84px;
  --text-hero--letter-spacing: -1.2px;
  --text-hero--font-weight: 600;
  --text-heading: 40px;
  --text-heading--line-height: 40px;
  --text-heading--letter-spacing: 0px;
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
  --spacing-section: 90px;
  --spacing-gap: 20px;
  --spacing-card: 28px;
  --color-paper: #fafafc;
  --color-control: #e6e6e8;
  --color-outline: #86868b;
  --text-title: 19px;
  --text-title--line-height: 23px;
  --text-title--letter-spacing: 0.228px;
  --text-title--font-weight: 600;
  --text-kicker: 21px;
  --text-kicker--line-height: 21px;
  --text-kicker--letter-spacing: 0.231px;
  --text-kicker--font-weight: 600;
  --shadow-ring: 0 0 0 1px #e6e6e8;
  --shadow-ring-strong: 0 0 0 1px #86868b;
  --radius-nav: 20px;
  --radius-link: 10px;
}
```

### Tailwind v4

```css
@theme {
  --color-canvas: #ffffff;
  --color-band: #f5f5f7;
  --color-ink: #1d1d1f;
  --color-muted: #6e6e73;
  --color-line: #d6d6d6;
  --color-link: #0066cc;
  --color-cta: #0071e3;
  --color-cta-ink: #ffffff;
  --color-status: #b64400;
  --font-display: "SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif;
  --font-text: "SF Pro Text", Inter, "Helvetica Neue", Arial, sans-serif;
  --text-hero: 80px;
  --text-hero--line-height: 84px;
  --text-hero--letter-spacing: -1.2px;
  --text-hero--font-weight: 600;
  --text-heading: 40px;
  --text-heading--line-height: 40px;
  --text-heading--letter-spacing: 0px;
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
  --spacing-section: 90px;
  --spacing-gap: 20px;
  --spacing-card: 28px;
  --color-paper: #fafafc;
  --color-control: #e6e6e8;
  --color-outline: #86868b;
  --text-title: 19px;
  --text-title--line-height: 23px;
  --text-title--letter-spacing: 0.228px;
  --text-title--font-weight: 600;
  --text-kicker: 21px;
  --text-kicker--line-height: 21px;
  --text-kicker--letter-spacing: 0.231px;
  --text-kicker--font-weight: 600;
  --shadow-ring: 0 0 0 1px #e6e6e8;
  --shadow-ring-strong: 0 0 0 1px #86868b;
  --radius-nav: 20px;
  --radius-link: 10px;
}
```

## Antes de entregar

- Revise a tela contra cada item de Faça e Não faça e diga quais você conferiu.
- Confirme que nenhuma cor, fonte, raio, sombra ou espaçamento fora da tabela de tokens foi usado.
- Teste em 360px, 768px e 1280px, sem rolagem horizontal e com navegação por teclado.
