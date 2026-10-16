import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Check, X } from "lucide-react";
import DesignPackDownload from "@/components/DesignPackDownload";
import TwoFiles from "@/components/TwoFiles";
import ZipContents from "@/components/ZipContents";
import StepCards from "@/components/StepCards";
import CopyPromptBlock from "@/components/CopyPromptBlock";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/jsonld";
import styles from "./page.module.css";

const TITLE = "Design Pack grátis: DESIGN.md e ANTI_PATTERNS.md";
const DESCRIPTION =
  "Os 2 arquivos que impedem a IA de fazer site feio. Escolha um dos 3 estilos, coloque seu e-mail e baixe o .zip na hora, grátis.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://promptfly.com.br/design-pack" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://promptfly.com.br/design-pack", locale: "pt_BR" },
};

const FAQ = [
  {
    q: "Recebo o arquivo por e-mail?",
    a: "Não. O .zip baixa na hora, nesta página, quando você clica em \"Baixar o .zip grátis\". Depois é só procurar na pasta Downloads.",
  },
  {
    q: "Preciso saber programar?",
    a: "Não. Você coloca os arquivos na pasta do projeto e escreve uma frase pra IA. Quem escreve o código é ela.",
  },
  {
    q: "Funciona com qual IA?",
    a: "Com Claude Code, Cursor, ChatGPT e Gemini. Se a ferramenta não tiver pasta de projeto, cole o conteúdo dos 2 arquivos no começo da conversa.",
  },
  {
    q: "Qual estilo eu escolho?",
    a: "Vitrine para produto e loja, Noite para tecnologia e visual escuro, Editorial para portfólio e marca pessoal. Na dúvida, marque os 3.",
  },
  {
    q: "Posso mudar as cores?",
    a: "Pode. Mude o valor no DESIGN.md e nos arquivos de tokens. Só confira se o texto continua fácil de ler em cima do fundo.",
  },
  {
    q: "É grátis mesmo?",
    a: "É. Você só informa o e-mail, que entra na newsletter do Promptfly (1 e-mail por semana). Dá pra sair quando quiser.",
  },
];

export default function DesignPackPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={faqJsonLd(FAQ)} />
      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.tag}>[ DESIGN PACK GRÁTIS ]</span>
          <h1 className={styles.title}>
            Os 2 arquivos que impedem a IA de fazer <span className={styles.accent}>site feio.</span>
          </h1>
          <p className={styles.lead}>
            Um diz pra IA o que fazer. O outro diz o que ela nunca pode fazer. Você coloca os dois na pasta do
            projeto e ela para de inventar cor, letra e layout.
          </p>

          <ol className={styles.steps}>
            <li>
              <span className={styles.stepNum}>1</span>Escolha o estilo
            </li>
            <li>
              <span className={styles.stepNum}>2</span>Coloque seu e-mail
            </li>
            <li>
              <span className={styles.stepNum}>3</span>O .zip baixa na hora
            </li>
          </ol>

          <div className={styles.ctas}>
            <a href="#baixar" className={styles.ctaPrimary}>
              Baixar grátis <ArrowDown size={18} strokeWidth={2.6} aria-hidden="true" />
            </a>
            <a href="#o-que-e" className={styles.ctaSecondary}>
              Entender os 2 arquivos
            </a>
          </div>
        </div>

        {/* Ilustração: os 2 arquivos abertos */}
        <div className={styles.visual} aria-hidden="true">
          <div className={`${styles.win} ${styles.winDark}`}>
            <div className={styles.winBar}>
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.winName}>DESIGN.md</span>
              <span className={styles.winTag}>o que fazer</span>
            </div>
            <div className={styles.winBody}>
              <span className={styles.code}>
                <b>color-canvas</b> #ffffff
              </span>
              <span className={styles.code}>
                <b>color-cta</b> #0071e3
              </span>
              <span className={styles.code}>
                <b>text-hero</b> 80px / 600
              </span>
              <span className={styles.code}>
                <b>radius-card</b> 28px
              </span>
              <span className={styles.rule}>
                <Check size={14} strokeWidth={3} /> Azul só no botão de comprar
              </span>
              <span className={styles.rule}>
                <Check size={14} strokeWidth={3} /> Cartões sem sombra
              </span>
            </div>
          </div>
          <div className={`${styles.win} ${styles.winLight}`}>
            <div className={styles.winBar}>
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.winName}>ANTI_PATTERNS.md</span>
              <span className={styles.winTagNo}>o que nunca fazer</span>
            </div>
            <div className={styles.winBody}>
              <span className={styles.ruleNo}>
                <X size={14} strokeWidth={3} /> Hero centralizado com 3 cards
              </span>
              <span className={styles.ruleNo}>
                <X size={14} strokeWidth={3} /> Gradiente roxo e azul
              </span>
              <span className={styles.ruleNo}>
                <X size={14} strokeWidth={3} /> Sombra borrada em tudo
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── O que é ── */}
      <section id="o-que-e" className={styles.section} aria-labelledby="o-que-e-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ O QUE SÃO ]</span>
          <h2 id="o-que-e-t" className={styles.h2}>
            Um é o mapa. O outro é o freio.
          </h2>
          <p className={styles.sectionLead}>
            A IA faz site feio porque ninguém disse a ela o que é bonito e o que é proibido. Esses 2 arquivos dizem.
          </p>
        </div>
        <TwoFiles />
      </section>

      {/* ── Download ── */}
      <section id="baixar" className={`${styles.section} ${styles.download}`} aria-labelledby="baixar-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ BAIXAR GRÁTIS ]</span>
          <h2 id="baixar-t" className={styles.h2}>
            Escolha o estilo e baixe em 2 passos
          </h2>
          <p className={styles.sectionLead}>
            Cada estilo vem completo e pronto pra usar. O arquivo baixa na hora, aqui mesmo.
          </p>
        </div>
        <DesignPackDownload howToHref="#como-usar" />
      </section>

      {/* ── O que vem ── */}
      <section className={styles.section} aria-labelledby="zip-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ O QUE VEM NO .ZIP ]</span>
          <h2 id="zip-t" className={styles.h2}>
            Um guia em PDF e os arquivos prontos.
          </h2>
          <p className={styles.sectionLead}>
            O DESIGN.md e o ANTI_PATTERNS.md são os que importam. Os outros 3 têm os mesmos valores em formato de
            código, pra quem quiser importar direto no projeto.
          </p>
        </div>
        <ZipContents />
      </section>

      {/* ── Como usar ── */}
      <section id="como-usar" className={styles.section} aria-labelledby="como-usar-t">
        <div className={styles.sectionHead}>
          <span className={styles.tag}>[ COMO USAR ]</span>
          <h2 id="como-usar-t" className={styles.h2}>
            Em 3 passos, sem programar
          </h2>
        </div>
        <StepCards steps="Descompacte o .zip::Abra o arquivo que baixou e copie o ANTI_PATTERNS.md e o DESIGN.md do seu estilo. | Coloque na pasta do projeto::Cole os 2 arquivos na pasta principal do seu site, a mesma onde a IA trabalha. | Avise a IA::Cole a frase abaixo no CLAUDE.md ou no começo da conversa e peça o site normalmente." />
        <CopyPromptBlock guia="design-pack" label="Frase pra IA" buttonLabel="Copiar frase">
          <pre>
            <code>
              {`Antes de criar ou alterar qualquer tela, leia DESIGN.md e ANTI_PATTERNS.md.
Use só os tokens do DESIGN.md. Se faltar um valor, pergunte antes de inventar.
Ao entregar, diga quais itens das duas listas você conferiu.`}
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
          Quer entender o porquê de cada regra?
        </h2>
        <p className={styles.finalText}>
          O guia explica os 2 arquivos com exemplos, o antes e depois e o passo a passo completo.
        </p>
        <div className={styles.ctas}>
          <Link href="/guias/os-2-arquivos-mais-importantes-para-sites-com-ia" className={styles.ctaLight}>
            Ler o guia completo
          </Link>
          <a href="#baixar" className={styles.ctaOutline}>
            Baixar o pack
          </a>
        </div>
        <p className={styles.finalNote}>
          Quer os templates completos, as animações e a mentoria pronta? <Link href="/premium">Veja o Premium</Link>.
        </p>
      </section>
    </div>
  );
}
