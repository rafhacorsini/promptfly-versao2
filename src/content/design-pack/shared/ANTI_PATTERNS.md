# ANTI_PATTERNS.md

Antes de criar ou alterar qualquer tela, leia esta lista e o DESIGN.md.
O DESIGN.md diz o que fazer. Este arquivo diz o que nunca fazer.
Nada daqui entra no projeto sem eu pedir explicitamente.
Se um pedido meu contrariar alguma regra, me avise antes de fazer.

## Layout
- Proibido hero centralizado com título médio, subtítulo, 2 botões e 3 cards logo abaixo. É o layout padrão de IA.
- Proibido grid de 3 cards iguais com ícone em cima como seção principal.
- Proibido alinhar tudo ao centro. Use alinhamento à esquerda e assimetria de propósito.
- Proibido espaço apertado entre seções. Use o spacing-section do DESIGN.md, nunca menos.
- Proibido tudo dentro do mesmo container estreito. Pelo menos uma seção precisa ir de borda a borda.

## Tipografia
- Proibido título do hero menor que o text-hero do DESIGN.md.
- Proibido usar um peso de fonte só. Use os pesos definidos nos tokens.
- Proibido letter-spacing padrão em título grande. Use o tracking dos tokens.
- Proibido linha de texto com mais de 70 caracteres.
- Proibido mais de 2 famílias de fonte.

## Cor e superfície
- Proibido gradiente, e proibido gradiente dentro de texto.
- Proibido glassmorphism como estilo principal.
- Proibido sombra grande e borrada em todo card.
- Proibido mais de 1 cor de destaque. O resto é neutro.
- Proibido o mesmo border-radius em tudo.

## Tokens
- Proibido usar cor, fonte, raio ou espaçamento que não esteja na tabela de tokens do DESIGN.md.
- Proibido escrever valor solto no componente (#hex, px) quando existe token. Use a variável.
- Proibido criar token novo sem me avisar. Se faltar um, pergunte.

## Ícones e imagem
- Proibido ícone genérico (casa, folha, diamante, raio) só pra decorar.
- Proibido emoji na interface.
- Proibido imagem pequena presa num card quando ela pode ocupar a tela inteira.
- Proibido foto de banco sem função. Toda imagem precisa ter um papel na história da página.

## Motion
- Proibido animar a seção inteira de uma vez. Cada elemento entra por conta própria, com stagger.
- Proibido entrada com duração abaixo de 0.6s. Use entre 0.8s e 1.2s.
- Proibido ease linear ou ease-in-out padrão. Use power3.out, expo.out ou cubic-bezier(0.16, 1, 0.3, 1).
- Proibido o mesmo fade-up em tudo. Varie entre máscara, clip-path, texto dividido e escala.
- Proibido ignorar prefers-reduced-motion.
- Proibido scroll nativo seco em site cinematográfico. Use Lenis.

## Acessibilidade
- Proibido texto que não passe em contraste 4.5:1 contra o fundo.
- Proibido botão ou link que não possa ser usado só com o teclado, ou sem foco visível.
- Proibido rolagem horizontal em 360px, 768px e 1280px.
- Proibido imagem com função e sem texto alternativo.

## Copy
- Proibido "Bem-vindo ao", "soluções inovadoras", "transforme seu negócio" e "leve ao próximo nível".
- Proibido lorem ipsum. Se faltar texto, pergunte.
- Proibido número, depoimento ou logo inventado.

## Antes de entregar
- Revise a tela contra esta lista e contra o DESIGN.md, e diga quais itens você conferiu.
