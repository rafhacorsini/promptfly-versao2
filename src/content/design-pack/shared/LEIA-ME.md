# Promptfly Design Pack

Os 2 arquivos que impedem a IA de fazer site feio:

- **DESIGN.md** diz o que fazer: cores, fontes, tamanhos, raios, espaços e as regras de uso.
- **ANTI_PATTERNS.md** diz o que nunca fazer: os vícios que fazem todo site de IA parecer igual.

## O que vem na pasta

Cada estilo tem 4 arquivos com exatamente os mesmos valores:

| Arquivo | Para quê |
|---|---|
| DESIGN.md | A IA lê antes de criar qualquer tela |
| tokens.css | Variáveis CSS (`--color-canvas`, `--radius-card`...) |
| theme.tailwind.css | O mesmo, no formato do Tailwind v4 (`@theme`) |
| tokens.json | O mesmo, em JSON, pra qualquer ferramenta |

O ANTI_PATTERNS.md é um só e vale para todos os estilos.

## Como usar em 3 passos

1. Copie para a raiz do projeto: o ANTI_PATTERNS.md e a pasta do estilo que você escolheu (ou só o DESIGN.md dela).
2. Crie ou abra o CLAUDE.md e escreva:

   ```text
   Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md.
   Use só os tokens do DESIGN.md. Se faltar um valor, pergunte antes de inventar.
   ```

3. Importe os tokens no CSS global:

   ```css
   /* CSS comum */
   @import "./tokens.css";

   /* Tailwind v4 */
   @import "tailwindcss";
   @import "./theme.tailwind.css";
   ```

Depois é só pedir o site. Se a IA quebrar uma regra, mande ela revisar a tela contra os dois arquivos.

## Sobre as fontes

Os estilos Vitrine e Noite citam SF Pro, que é uma fonte da Apple e não pode ser distribuída. Sem ela instalada, o navegador usa a Inter, que já está na lista de fontes de reserva. Se quiser, troque a primeira fonte de `font-display` e `font-text` pela que você tiver licença.

## Quer mais?

Os templates completos, as animações de scroll e a mentoria pronta estão no Premium: https://promptfly.com.br/premium

Feito por @rafha.gpt · promptfly.com.br
