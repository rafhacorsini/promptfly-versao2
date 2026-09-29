# ANTI_PATTERNS.md

Antes de criar ou alterar qualquer tela, leia esta lista.
Nada daqui entra no projeto sem eu pedir explicitamente.
Se um pedido meu contrariar alguma regra, me avise antes de fazer.

## Layout
- Proibido hero centralizado com título médio, subtítulo, 2 botões e 3 cards logo abaixo. É o layout padrão de IA.
- Proibido grid de 3 cards iguais com ícone em cima como seção principal.
- Proibido alinhar tudo ao centro. Use alinhamento à esquerda e assimetria de propósito.
- Proibido espaço apertado entre seções. Mínimo de 120px no desktop e 80px no celular.
- Proibido tudo dentro do mesmo container estreito. Pelo menos uma seção precisa ir de borda a borda.

## Tipografia
- Proibido título do hero menor que clamp(3rem, 9vw, 8rem).
- Proibido usar um peso de fonte só. Use dois pesos bem distantes, por exemplo 300 e 800.
- Proibido letter-spacing padrão em título grande. Use entre -0.03em e -0.05em.
- Proibido linha de texto com mais de 70 caracteres.
- Proibido mais de 2 famílias de fonte.

## Cor e superfície
- Proibido gradiente roxo e azul, e proibido gradiente dentro de texto.
- Proibido glassmorphism como estilo principal.
- Proibido sombra grande e borrada em todo card.
- Proibido mais de 1 cor de destaque. O resto é neutro.
- Proibido o mesmo border-radius em tudo.

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

## Copy
- Proibido "Bem-vindo ao", "soluções inovadoras", "transforme seu negócio" e "leve ao próximo nível".
- Proibido lorem ipsum. Se faltar texto, pergunte.

## Antes de entregar
- Revise a tela contra esta lista e diga quais itens você conferiu.
