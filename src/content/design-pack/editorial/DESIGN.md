# DESIGN.md: Editorial

> Uma revista de portfólio. Tipografia gigante e apertada, assimetria de propósito e uma única cor quente usada só em preenchimento.

**Tema:** claro

Fundo cinza muito claro, tipografia enorme e apertada, uma única cor de destaque (laranja) usada só em preenchimento. É a linguagem do Promptfly: assimétrica, de revista, feita para portfólio, estúdio e marca pessoal.

> **Como usar:** salve este arquivo na raiz do projeto. No CLAUDE.md, escreva: "Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md". Os valores abaixo são a lei. Se precisar de um valor que não está aqui, pergunte antes de inventar.

## Tokens

Os mesmos valores estão em tokens.css, theme.tailwind.css e tokens.json. Cor, fonte, raio, sombra e espaçamento só podem vir desta lista.

### Cores

| Token | Valor | Uso |
|---|---|---|
| `color-canvas` | `#f5f5f5` | Fundo padrão de todas as seções. |
| `color-band` | `#ebebeb` | Faixas de largura total que alternam com o fundo e o rodapé. |
| `color-ink` | `#1a1a1a` | Títulos e texto principal. |
| `color-muted` | `#5f5f5f` | Texto secundário, legendas e textos legais. |
| `color-line` | `#d4d4d4` | Divisórias de 1px e contornos discretos. Nunca como cor de texto. |
| `color-link` | `#b83700` | Links dentro de texto e links de seção. |
| `color-cta` | `#ff4c00` | Fundo do botão de conversão. Só em botões pequenos. |
| `color-cta-ink` | `#1a1a1a` | Texto por cima do botão de conversão. |
| `color-status` | `#b83700` | Texto simples de status (ex: Novo). Sem fundo e sem pílula. |
| `color-paper` | `#fafafa` | Menu aberto, cartões sobre faixa e preenchimentos secundários. |
| `color-control` | `#e0e0e0` | Controles desativados, trilhas e superfícies discretas. |
| `color-outline` | `#767676` | Contorno de campos e botões contornados, indicadores inativos. |

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
| `text-heading` | `clamp(2rem, 4vw, 3.5rem)` | Título de seção e frase de recurso. (tamanho) |
| `text-heading--line-height` | `1` | Título de seção e frase de recurso. (altura da linha) |
| `text-heading--letter-spacing` | `-0.03em` | Título de seção e frase de recurso. (espaçamento entre letras) |
| `text-heading--font-weight` | `800` | Título de seção e frase de recurso. (peso) |
| `text-body` | `17px` | Parágrafos e navegação de seção. (tamanho) |
| `text-body--line-height` | `1.5` | Parágrafos e navegação de seção. (altura da linha) |
| `text-body--letter-spacing` | `-0.01em` | Parágrafos e navegação de seção. (espaçamento entre letras) |
| `text-body--font-weight` | `300` | Parágrafos e navegação de seção. (peso) |
| `text-small` | `14px` | Texto de apoio e preços. (tamanho) |
| `text-small--line-height` | `1.4` | Texto de apoio e preços. (altura da linha) |
| `text-small--letter-spacing` | `0em` | Texto de apoio e preços. (espaçamento entre letras) |
| `text-small--font-weight` | `400` | Texto de apoio e preços. (peso) |
| `text-caption` | `12px` | Legenda, rótulo e texto de botão pequeno. (tamanho) |
| `text-caption--line-height` | `1.3` | Legenda, rótulo e texto de botão pequeno. (altura da linha) |
| `text-caption--letter-spacing` | `0.02em` | Legenda, rótulo e texto de botão pequeno. (espaçamento entre letras) |
| `text-caption--font-weight` | `500` | Legenda, rótulo e texto de botão pequeno. (peso) |
| `text-title` | `19px` | Nome do produto na barra e títulos pequenos. (tamanho) |
| `text-title--line-height` | `1.2` | Nome do produto na barra e títulos pequenos. (altura da linha) |
| `text-title--letter-spacing` | `-0.02em` | Nome do produto na barra e títulos pequenos. (espaçamento entre letras) |
| `text-title--font-weight` | `700` | Nome do produto na barra e títulos pequenos. (peso) |
| `text-kicker` | `12px` | Rótulo curto acima de uma frase. (tamanho) |
| `text-kicker--line-height` | `1.3` | Rótulo curto acima de uma frase. (altura da linha) |
| `text-kicker--letter-spacing` | `0.06em` | Rótulo curto acima de uma frase. (espaçamento entre letras) |
| `text-kicker--font-weight` | `600` | Rótulo curto acima de uma frase. (peso) |

### Escala tipográfica

| Papel | Família | Peso | Tamanho | Altura da linha | Espaçamento |
|---|---|---|---|---|---|
| hero | font-display | 800 | clamp(3rem, 9vw, 8rem) | 0.9 | -0.045em |
| heading | font-display | 800 | clamp(2rem, 4vw, 3.5rem) | 1 | -0.03em |
| title | font-display | 700 | 19px | 1.2 | -0.02em |
| kicker | font-display | 600 | 12px | 1.3 | 0.06em |
| body | font-text | 300 | 17px | 1.5 | -0.01em |
| small | font-text | 400 | 14px | 1.4 | 0em |
| caption | font-text | 500 | 12px | 1.3 | 0.02em |

### Raio e espaço

| Token | Valor | Uso |
|---|---|---|
| `radius-card` | `14px` | Cartões e mídias contidas. |
| `radius-pill` | `999px` | Botões e pílulas. |
| `radius-input` | `14px` | Campos de formulário. |
| `spacing-section` | `120px` | Distância entre seções grandes. |
| `spacing-gap` | `20px` | Distância entre elementos relacionados. |
| `spacing-card` | `24px` | Respiro interno dos cartões. |
| `radius-nav` | `14px` | Barra de navegação flutuante. |
| `radius-link` | `4px` | Links com área de toque e tags pequenas. |

### Sombras

| Token | Valor | Uso |
|---|---|---|
| `shadow-ring` | `0 0 0 1px #d4d4d4` | Anel de 1px discreto. Não é elevação. |
| `shadow-ring-strong` | `0 0 0 1px #767676` | Anel de 1px para controle selecionado ou contornado. |

## Contraste (WCAG AA)

Razão de contraste de cada par. O mínimo é 4.5:1 para texto normal e 3:1 para contornos de controles.

| Texto ou contorno | Fundo | Razão | Mínimo | Resultado |
|---|---|---|---|---|
| color-ink | color-canvas | 15.96:1 | 4.5:1 | Passa |
| color-ink | color-band | 14.60:1 | 4.5:1 | Passa |
| color-ink | color-paper | 16.67:1 | 4.5:1 | Passa |
| color-muted | color-canvas | 5.86:1 | 4.5:1 | Passa |
| color-muted | color-band | 5.36:1 | 4.5:1 | Passa |
| color-link | color-canvas | 5.37:1 | 4.5:1 | Passa |
| color-link | color-band | 4.91:1 | 4.5:1 | Passa |
| color-cta-ink | color-cta | 5.21:1 | 4.5:1 | Passa |
| color-status | color-canvas | 5.37:1 | 4.5:1 | Passa |
| color-status | color-band | 4.91:1 | 4.5:1 | Passa |
| color-outline | color-canvas | 4.17:1 | 3:1 | Passa |
| color-outline | color-band | 3.81:1 | 3:1 | Passa |

## Componentes

### Navegação
**Papel:** Cabeçalho do site

Grade de 4 colunas: logo em text-title à esquerda, hora ou local, links centrais em text-caption maiúsculos e, à direita, um botão em pílula com fundo color-ink e texto branco. Sem caixa em volta da barra.

### Hero gigante
**Papel:** Abertura do site

Título em text-hero (peso 800, tracking de -0.045em, maiúsculo), grudado no canto de baixo à esquerda e ocupando boa parte da tela. A imagem ou o personagem fica solto no fundo, sem cartão, e o título passa ao lado ou por baixo, nunca cobrindo o rosto.

### Botão de conversão
**Papel:** Chamada principal

Preenchimento color-cta, texto color-cta-ink e radius-pill. É o único uso do laranja como fundo. Nunca use esse laranja como cor de texto.

### Botão escuro
**Papel:** Chamada secundária

Fundo color-ink, texto branco, radius-pill e text-caption.

### Tag de seção
**Papel:** Rótulo antes de um título

Texto em text-kicker, maiúsculo, entre colchetes, com contorno de 1px em color-line e radius-link. Exemplo: [ BIBLIOTECA ].

### Cartão
**Papel:** Recurso, template ou guia

Superfície color-paper, radius-card, borda de 1px em color-line, sem sombra. A imagem ocupa o cartão inteiro quando puder.

### Faixa
**Papel:** Quebra de ritmo

Seção de borda a borda em color-band, com bordas de 1px em color-line em cima e embaixo. Pelo menos uma faixa por página.

### Bloco de texto pequeno
**Papel:** Apoio assimétrico ao título

Parágrafo curto em text-body (peso 300), com largura máxima de uns 260px, alinhado no lado oposto ao título, com um rótulo de status em text-caption embaixo.

### Campo de formulário
**Papel:** E-mail e busca

Fundo color-paper, contorno de 1px em color-outline, radius-input e texto em color-ink. Foco com contorno de 3px em color-ink.

### Rótulo de status
**Papel:** Anotação de disponibilidade

Texto simples em color-status com text-caption e um ponto verde antes. Sem pílula colorida.

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

## Superfícies

| Nível | Token | Valor | Uso |
|---|---|---|---|
| 0 | `color-canvas` | `#f5f5f5` | Fundo padrão, hero, navegação do produto e cartões sobre faixa. |
| 1 | `color-band` | `#ebebeb` | Faixa de largura total, palco de carrossel, área muda e rodapé. |
| 2 | `color-paper` | `#fafafa` | Camada do menu aberto e preenchimento secundário. |
| 3 | `color-control` | `#e0e0e0` | Preenchimento de controle desativado ou discreto e borda fina de navegação. |

## Elevação

Sem sombra projetada. A separação vem de faixas color-band, de bordas de 1px em color-line (shadow-ring) e do contraste entre tamanhos de letra. No máximo uma linha de contorno em controles selecionados (shadow-ring-strong).

## Imagens

Personagens, retratos e capturas de tela com função na história, nunca foto de banco decorativa. Imagem grande, solta no fundo claro, sem moldura, e se possível ocupando a tela inteira. Se a imagem tiver fundo branco, ela se funde com a página usando mix-blend-mode: multiply. Ícones só quando carregam informação.

## Layout

Mobile primeiro. No desktop, o título ocupa o canto de baixo à esquerda e um texto curto fica no canto oposto, com a imagem entre os dois. No celular, título e texto sobem e a imagem fica centralizada embaixo. Seções separadas por no mínimo 120px, uma faixa de borda a borda por página, e nada centralizado só por hábito.

## Guia para a IA

Referência rápida de cores:

- `color-canvas`: #f5f5f5. Fundo padrão de todas as seções.
- `color-band`: #ebebeb. Faixas de largura total que alternam com o fundo e o rodapé.
- `color-ink`: #1a1a1a. Títulos e texto principal.
- `color-muted`: #5f5f5f. Texto secundário, legendas e textos legais.
- `color-line`: #d4d4d4. Divisórias de 1px e contornos discretos. Nunca como cor de texto.
- `color-link`: #b83700. Links dentro de texto e links de seção.
- `color-cta`: #ff4c00. Fundo do botão de conversão. Só em botões pequenos.
- `color-cta-ink`: #1a1a1a. Texto por cima do botão de conversão.
- `color-status`: #b83700. Texto simples de status (ex: Novo). Sem fundo e sem pílula.
- `color-paper`: #fafafa. Menu aberto, cartões sobre faixa e preenchimentos secundários.
- `color-control`: #e0e0e0. Controles desativados, trilhas e superfícies discretas.
- `color-outline`: #767676. Contorno de campos e botões contornados, indicadores inativos.

Pedidos prontos (cole no Claude Code, no ChatGPT ou no Gemini):

- Crie um hero em color-canvas com o título em text-hero (peso 800, tracking apertado, maiúsculo) no canto de baixo à esquerda, um parágrafo curto em text-body no canto oposto e a imagem solta entre os dois, sem cartão.
- Crie uma navegação em grade de 4 colunas: logo em text-title, links centrais em text-caption maiúsculos e um botão em pílula com fundo color-ink e texto branco à direita.
- Crie uma tag de seção em text-kicker, maiúscula, entre colchetes, com contorno de 1px em color-line e radius-link, seguida de um título em text-heading.
- Crie um botão de conversão com fundo color-cta, texto color-cta-ink e radius-pill, e um link de texto em color-link ao lado.
- Crie uma faixa de borda a borda em color-band e uma grade de cartões color-paper com radius-card, sem sombra, cada um com a imagem ocupando o cartão inteiro.

## Início rápido

### Variáveis CSS

```css
:root {
  --color-canvas: #f5f5f5;
  --color-band: #ebebeb;
  --color-ink: #1a1a1a;
  --color-muted: #5f5f5f;
  --color-line: #d4d4d4;
  --color-link: #b83700;
  --color-cta: #ff4c00;
  --color-cta-ink: #1a1a1a;
  --color-status: #b83700;
  --font-display: Inter, "Helvetica Neue", Arial, sans-serif;
  --font-text: Inter, "Helvetica Neue", Arial, sans-serif;
  --text-hero: clamp(3rem, 9vw, 8rem);
  --text-hero--line-height: 0.9;
  --text-hero--letter-spacing: -0.045em;
  --text-hero--font-weight: 800;
  --text-heading: clamp(2rem, 4vw, 3.5rem);
  --text-heading--line-height: 1;
  --text-heading--letter-spacing: -0.03em;
  --text-heading--font-weight: 800;
  --text-body: 17px;
  --text-body--line-height: 1.5;
  --text-body--letter-spacing: -0.01em;
  --text-body--font-weight: 300;
  --text-small: 14px;
  --text-small--line-height: 1.4;
  --text-small--letter-spacing: 0em;
  --text-small--font-weight: 400;
  --text-caption: 12px;
  --text-caption--line-height: 1.3;
  --text-caption--letter-spacing: 0.02em;
  --text-caption--font-weight: 500;
  --radius-card: 14px;
  --radius-pill: 999px;
  --radius-input: 14px;
  --spacing-section: 120px;
  --spacing-gap: 20px;
  --spacing-card: 24px;
  --color-paper: #fafafa;
  --color-control: #e0e0e0;
  --color-outline: #767676;
  --text-title: 19px;
  --text-title--line-height: 1.2;
  --text-title--letter-spacing: -0.02em;
  --text-title--font-weight: 700;
  --text-kicker: 12px;
  --text-kicker--line-height: 1.3;
  --text-kicker--letter-spacing: 0.06em;
  --text-kicker--font-weight: 600;
  --shadow-ring: 0 0 0 1px #d4d4d4;
  --shadow-ring-strong: 0 0 0 1px #767676;
  --radius-nav: 14px;
  --radius-link: 4px;
}
```

### Tailwind v4

```css
@theme {
  --color-canvas: #f5f5f5;
  --color-band: #ebebeb;
  --color-ink: #1a1a1a;
  --color-muted: #5f5f5f;
  --color-line: #d4d4d4;
  --color-link: #b83700;
  --color-cta: #ff4c00;
  --color-cta-ink: #1a1a1a;
  --color-status: #b83700;
  --font-display: Inter, "Helvetica Neue", Arial, sans-serif;
  --font-text: Inter, "Helvetica Neue", Arial, sans-serif;
  --text-hero: clamp(3rem, 9vw, 8rem);
  --text-hero--line-height: 0.9;
  --text-hero--letter-spacing: -0.045em;
  --text-hero--font-weight: 800;
  --text-heading: clamp(2rem, 4vw, 3.5rem);
  --text-heading--line-height: 1;
  --text-heading--letter-spacing: -0.03em;
  --text-heading--font-weight: 800;
  --text-body: 17px;
  --text-body--line-height: 1.5;
  --text-body--letter-spacing: -0.01em;
  --text-body--font-weight: 300;
  --text-small: 14px;
  --text-small--line-height: 1.4;
  --text-small--letter-spacing: 0em;
  --text-small--font-weight: 400;
  --text-caption: 12px;
  --text-caption--line-height: 1.3;
  --text-caption--letter-spacing: 0.02em;
  --text-caption--font-weight: 500;
  --radius-card: 14px;
  --radius-pill: 999px;
  --radius-input: 14px;
  --spacing-section: 120px;
  --spacing-gap: 20px;
  --spacing-card: 24px;
  --color-paper: #fafafa;
  --color-control: #e0e0e0;
  --color-outline: #767676;
  --text-title: 19px;
  --text-title--line-height: 1.2;
  --text-title--letter-spacing: -0.02em;
  --text-title--font-weight: 700;
  --text-kicker: 12px;
  --text-kicker--line-height: 1.3;
  --text-kicker--letter-spacing: 0.06em;
  --text-kicker--font-weight: 600;
  --shadow-ring: 0 0 0 1px #d4d4d4;
  --shadow-ring-strong: 0 0 0 1px #767676;
  --radius-nav: 14px;
  --radius-link: 4px;
}
```

## Antes de entregar

- Revise a tela contra cada item de Faça e Não faça e diga quais você conferiu.
- Confirme que nenhuma cor, fonte, raio, sombra ou espaçamento fora da tabela de tokens foi usado.
- Teste em 360px, 768px e 1280px, sem rolagem horizontal e com navegação por teclado.
