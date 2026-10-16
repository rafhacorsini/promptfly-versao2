import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import manifest from "@/content/wireframe-pack/manifest.json";
import WireframePackForm from "@/components/WireframePackForm";
import WireframePair from "@/components/WireframePair";
import WireframeLegend from "@/components/WireframeLegend";
import WireframeZip from "@/components/WireframeZip";
import StepCards from "@/components/StepCards";
import CopyPromptBlock from "@/components/CopyPromptBlock";
import styles from "./page.module.css";

const TITLE = "Wireframe Pack grátis: mande a imagem e a IA monta o site";
const DESCRIPTION =
  "Wireframes prontos para mandar para a IA. Você envia a imagem, a IA monta o site seguindo a estrutura. Baixe o pack grátis, com exemplos e prompts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://promptfly.com.br/wireframes" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://promptfly.com.br/wireframes", locale: "pt_BR" },
};

const FAQ = [
  {
    q: "Recebo o arquivo por e-mail?",
    a: "Não. O .zip baixa na hora, nesta página, quando você clica em \"Baixar o .zip grátis\". Depois é só procurar na pasta Downloads.",
  },
  {
    q: "O que é um wireframe?",
    a: "É o esqueleto de uma página: só caixas e barras mostrando onde cada coisa fica. Sem cor, sem foto, sem texto. Para a IA, é um mapa claro do que montar.",
  },
  {
    q: "Funciona com qual IA?",
    a: "Com qualquer uma que aceite imagem: Claude, ChatGPT, Gemini e o Claude Code. Você envia a imagem junto com o pedido.",
  },
  {
    q: "Preciso saber programar?",
    a: "Não. Você manda a imagem e escreve o tema do seu projeto. Quem escreve o código é a IA.",
  },
  {
    q: "O site fica igual ao dos exemplos?",
    a: "Fica com a mesma estrutura. Cor, foto, fonte e texto dependem do tema que você pedir. Para um visual mais cuidado, use junto o Design Pack, que também é grátis.",
  },
  {
    q: "É grátis mesmo?",
    a: "É. Você só informa o e-mail, que entra na newsletter do Promptfly (1 e-mail por semana). Dá pra sair quando quiser.",
  },
];

export default function WireframesPage() {
  const first = (manifest as { id: string }[])[0];
  const n = first.id.replace("wireframe-", "");

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.tag}>[ WIREFRAME PACK GRÁTIS ]</span>
          <h1 className={styles.title}>
            Mande a imagem. <span className={styles.accent}>A IA monta o site.</span>
          </h1>
          <p className={styles.lead}>
            Um wireframe é o esqueleto do site: só caixas e barras mostrando onde cada coisa fica. Você manda essa
            imagem para a IA, diz o tema, e ela monta a página seguindo a estrutura.
          </p>

          <ol className={styles.steps}>
            <li>
              <span className={styles.stepNum}>1</span>Escolha um wireframe
            </li>
            <li>
              <span className={styles.stepNum}>2</span>Mande a imagem pra IA
            </li>
            <li>
              <span className={styles.stepNum}>3</span>Receba o site
            </li>
          </ol>

          <div className={styles.ctas}>
            <a href="#baixar" className={styles.ctaPrimary}>
              Baixar grátis <ArrowDown size={18} strokeWidth={2.6} aria-hidden="true" />
            </a>
            <a href="#exemplos" className={styles.ctaSecondary}>
              Ver exemplos
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <figure className={styles.shot}>
            <span className={styles.shotLabel}>Wireframe</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.shotImg} src={`/wireframes/wireframe-${n}.png`} alt="Wireframe de exemplo" />
          </figure>
          <span className={styles.arrowBubble} aria-hidden="true">
            <ArrowRight size={20} strokeWidth={2.8} />
          </span>
          <figure className={styles.shot}>
            <span className={`${styles.shotLabel} ${styles.shotLabelDark}`}>Site criado pela IA</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.shotImg} src={`/wireframes/site-${n}.jpg`} alt="Site criado a partir do wireframe" />
          </figure>
        </div>
      </header>

      {/* ── Exemplos ── */}
      <section id="exemplos" className={styles.section} aria-labelledby="exemplos-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ ANTES E DEPOIS ]</span>
          <h2 id="exemplos-t" className={styles.h2}>
            Do wireframe ao site, nos exemplos reais
          </h2>
          <p className={styles.sectionLead}>
            À esquerda, a imagem que foi enviada para a IA. À direita, o site que ela montou. A estrutura é a mesma.
          </p>
        </div>
        <div className={styles.pairs}>
          {(manifest as { id: string }[]).map((m) => (
            <WireframePair key={m.id} id={m.id} />
          ))}
        </div>
      </section>

      {/* ── Como ler ── */}
      <section className={styles.section} aria-labelledby="ler-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ COMO LER UM WIREFRAME ]</span>
          <h2 id="ler-t" className={styles.h2}>
            4 formas, e a IA entende tudo
          </h2>
          <p className={styles.sectionLead}>
            O wireframe só diz onde cada coisa fica. Cor, fonte e estilo você define no pedido.
          </p>
        </div>
        <WireframeLegend />
      </section>

      {/* ── Download ── */}
      <section id="baixar" className={`${styles.section} ${styles.download}`} aria-labelledby="baixar-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ BAIXAR GRÁTIS ]</span>
          <h2 id="baixar-t" className={styles.h2}>
            Baixe o pack e comece hoje
          </h2>
          <p className={styles.sectionLead}>O arquivo baixa na hora, aqui mesmo.</p>
        </div>
        <WireframePackForm />
      </section>

      {/* ── O que vem ── */}
      <section className={styles.section} aria-labelledby="zip-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ O QUE VEM NO .ZIP ]</span>
          <h2 id="zip-t" className={styles.h2}>
            Wireframes, exemplos e os prompts
          </h2>
        </div>
        <WireframeZip />
      </section>

      {/* ── Como usar ── */}
      <section id="como-usar" className={styles.section} aria-labelledby="como-usar-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ COMO USAR ]</span>
          <h2 id="como-usar-t" className={styles.h2}>
            Em 3 passos, sem programar
          </h2>
        </div>
        <StepCards steps="Escolha o wireframe::Abra a pasta wireframes e escolha o que combina com o seu projeto. Olhe o exemplo para ver o que dá para criar. | Mande a imagem pra IA::Anexe a imagem no Claude, no ChatGPT ou no Gemini e cole o pedido abaixo, trocando o tema. | Ajuste::Peça para a IA comparar o site com o wireframe e corrigir o que ficou fora do lugar." />
        <CopyPromptBlock guia="wireframes" label="Pedido pra mandar junto com a imagem" buttonLabel="Copiar pedido">
          <pre>
            <code>
              {`Crie um site seguindo exatamente a estrutura deste wireframe, bloco por bloco, na mesma ordem e na mesma posição.
Os blocos escuros com ícone de imagem são imagens, as barras cinza são textos, as pílulas são botões e os círculos são botões redondos ou selos.
O tema do site é: [DESCREVA O SEU PROJETO].
Escreva textos reais em português. Não use lorem ipsum. Se faltar alguma informação, pergunte antes de inventar.`}
            </code>
          </pre>
        </CopyPromptBlock>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.section} aria-labelledby="faq-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ DÚVIDAS ]</span>
          <h2 id="faq-t" className={styles.h2}>
            Perguntas rápidas
          </h2>
        </div>
        <div className={styles.faq}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary className={styles.faqQ}>{f.q}</summary>
              <p className={styles.faqA}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Fechamento ── */}
      <section className={styles.final} aria-labelledby="final-t">
        <h2 id="final-t" className={styles.finalTitle}>
          Quer entender o método completo?
        </h2>
        <p className={styles.finalText}>
          O guia mostra como eu crio sites mandando só a imagem do wireframe, com os 4 exemplos passo a passo.
        </p>
        <div className={styles.ctas}>
          <Link href="/guias/como-criar-sites-com-wireframes" className={styles.ctaLight}>
            Ler o guia completo
          </Link>
          <a href="#baixar" className={styles.ctaOutline}>
            Baixar o pack
          </a>
        </div>
        <p className={styles.finalNote}>
          Quer os templates, as animações, as skills e a mentoria pronta? <Link href="/premium">Veja o Premium</Link>.
        </p>
      </section>
    </div>
  );
}
