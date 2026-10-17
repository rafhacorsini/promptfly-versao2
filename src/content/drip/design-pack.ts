// Sequência de boas-vindas de quem baixa o Design Pack (3 e-mails). Só servidor.
// Regras de copy: nada de travessão, número ou promessa inventada. Preço e contagens vêm do contexto.
// O tipo é repetido aqui em forma mínima porque este arquivo não importa nada (o npm test o carrega direto).

type Ctx = {
  name: string;
  styleId: string;
  styleLabel: string;
  price: string | null;
  animationsPremium: number;
};

const SITE = "https://promptfly.com.br";
const hi = (c: Ctx) => (c.name ? `Oi, ${c.name}!` : "Oi!");
const SIGNATURE = "Rafhael\n@rafha.gpt";

/** "(estilo Vitrine)" ou "(os 3 estilos)"; vazio se não sabemos qual foi. */
const estiloBaixado = (c: Ctx) =>
  c.styleId === "todos" ? " (os 3 estilos)" : c.styleLabel ? ` (estilo ${c.styleLabel})` : "";

/** Onde fica o DESIGN.md dentro do zip, conforme o que a pessoa baixou. */
const ondeFicaODesign = (c: Ctx) =>
  c.styleId && c.styleId !== "todos"
    ? `o DESIGN.md da pasta ${c.styleId}`
    : "o DESIGN.md da pasta do estilo que você escolher";

export const designPackSequence = {
  id: "design-pack",
  reason: "Você recebe este e-mail porque baixou o Design Pack em promptfly.com.br.",
  steps: [
    {
      id: "e1",
      delayDays: 0,
      subject: () => "Seu Design Pack chegou (e o primeiro passo)",
      preview: "3 passos pra IA parar de fazer site feio hoje.",
      body: (c: Ctx) => `${hi(c)}

Você baixou o Design Pack${estiloBaixado(c)}, então já fez a parte que quase ninguém faz: dar regra pra IA antes de pedir o site.

Só que arquivo baixado e não usado não muda nada. Faz isso agora, leva 3 minutos:

1. Descompacte o .zip e abra o Guia-Design-Pack.pdf.
2. Copie o ANTI_PATTERNS.md e ${ondeFicaODesign(c)} pra pasta do seu projeto.
3. Cole esta frase no CLAUDE.md (ou no começo da conversa com a IA):

> Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md. Use só os tokens do DESIGN.md. Se faltar um valor, pergunte antes de inventar.

Pronto. A partir daí ela deixa de chutar cor, letra e espaço.

Perdeu o arquivo ou quer outro estilo? Baixa de novo aqui:
${SITE}/design-pack?utm_source=email&utm_campaign=design-pack-e1

Uma pergunta: que tipo de site você vai criar? Loja, portfólio, landing page de cliente? Responde este e-mail com uma frase. Eu leio.

${SIGNATURE}`,
    },
    {
      id: "e2",
      delayDays: 2,
      subject: () => "O mesmo pedido, com e sem os 2 arquivos",
      preview: "Faça este teste e veja a diferença com seus olhos.",
      body: (c: Ctx) => `${hi(c)}

Quer saber se o Design Pack está funcionando no seu projeto? Faz este teste:

Peça o mesmo hero duas vezes pra IA.

Na primeira, sem os arquivos:

> Crie o hero da minha landing page.

Na segunda, com os 2 arquivos na pasta:

> Crie o hero da minha landing page. Leia DESIGN.md e ANTI_PATTERNS.md antes.

Compare as duas telas lado a lado. Repare em 3 coisas:

- As cores: são as do DESIGN.md ou as que a IA escolheu sozinha?
- A letra: o tamanho e o peso batem com a tabela?
- O layout: apareceu o título no meio com 3 cards iguais embaixo?

Se algo escapou, não peça "deixa mais bonito". Peça isto:

> Revise esta tela contra o DESIGN.md e o ANTI_PATTERNS.md e corrija tudo que estiver fora.

Ela acha os próprios erros e corrige. É o truque mais útil dos 2 arquivos.

Expliquei cada parte, com exemplos, neste guia:
${SITE}/guias/os-2-arquivos-mais-importantes-para-sites-com-ia?utm_source=email&utm_campaign=design-pack-e2

Me conta o que você viu no teste. Responde aqui.

${SIGNATURE}`,
    },
    {
      id: "e3",
      delayDays: 5,
      subject: () => "Os 2 arquivos são a base. O resto está aqui.",
      preview: "Templates, animações e a mentoria pronta, num pagamento só.",
      body: (c: Ctx) => `${hi(c)}

Se você chegou até aqui, já usa os 2 arquivos ou está perto de usar. Eles resolvem o visual básico: cor, letra, espaço e os vícios da IA.

Mas um site cinematográfico, daqueles que as pessoas param pra olhar, pede mais: animação de scroll, transições, um template pronto pra adaptar. Isso é o que está no Promptfly Premium:

- A mentoria pronta: o método do primeiro site ao primeiro cliente
- Os prompts completos de todos os templates cinematográficos
- ${c.animationsPremium > 0 ? `As ${c.animationsPremium} animações de scroll Premium` : "As animações de scroll Premium"}, com prompt e código
- As skills cinematográficas pro Claude Code
- O grupo VIP no Discord

${c.price ? `São ${c.price}, pagamento único` : "É pagamento único"}, acesso vitalício. A compra é pela Hotmart e tem garantia de 7 dias: se não for pra você, devolvem o valor.

Quer ver o que tem dentro antes de decidir?
${SITE}/premium?utm_source=email&utm_campaign=design-pack-e3

Se não for pra agora, tudo bem. Os 2 arquivos continuam seus, de graça, pra sempre.

${SIGNATURE}

P.S. Prefere ver alguns templates sem pagar nada? Tem uns grátis aqui:
${SITE}/projetos?utm_source=email&utm_campaign=design-pack-e3`,
    },
  ],
};
