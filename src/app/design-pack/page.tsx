import type { Metadata } from "next";
import Link from "next/link";
import DesignPackDownload from "@/components/DesignPackDownload";
import styles from "./page.module.css";

const TITLE = "Design Pack grátis: DESIGN.md e ANTI_PATTERNS.md";
const DESCRIPTION =
  "Os 2 arquivos que impedem a IA de fazer site feio. 3 estilos prontos com DESIGN.md, tokens.css, tema do Tailwind e tokens.json, mais o ANTI_PATTERNS.md. Baixe grátis.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://promptfly.com.br/design-pack" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://promptfly.com.br/design-pack", locale: "pt_BR" },
};

export default function DesignPackPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.tag}>[ DESIGN PACK GRÁTIS ]</span>
        <h1 className={styles.title}>
          Os 2 arquivos que impedem a IA de fazer <span className={styles.fade}>site feio.</span>
        </h1>
        <p className={styles.sub}>
          Um diz o que fazer. O outro diz o que nunca fazer. Você coloca os dois na raiz do projeto e a
          IA para de inventar cor, fonte e espaçamento.
        </p>
      </header>

      <section className={styles.pair} aria-label="Os 2 arquivos">
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>DESIGN.md</h2>
          <p className={styles.cardText}>
            As regras do que fazer: cores, fontes, tamanhos, raios, sombras e espaços, a descrição de cada
            componente e a lista &quot;faça&quot; e &quot;não faça&quot; de cada estilo, com pedidos prontos pra IA.
          </p>
        </article>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>ANTI_PATTERNS.md</h2>
          <p className={styles.cardText}>
            A lista do que nunca fazer: hero centralizado, gradiente roxo, 3 cards iguais, sombra em tudo.
            A IA lê antes de mexer na tela.
          </p>
        </article>
      </section>

      <section className={styles.download} aria-labelledby="baixar">
        <h2 id="baixar" className={styles.h2}>
          Baixe grátis
        </h2>
        <DesignPackDownload />
      </section>

      <section className={styles.inside} aria-labelledby="dentro">
        <h2 id="dentro" className={styles.h2}>
          O que vem no .zip
        </h2>
        <ul className={styles.list}>
          <li>
            <strong>DESIGN.md</strong>: as regras do estilo, com tabela de contraste WCAG AA.
          </li>
          <li>
            <strong>tokens.css</strong>: variáveis CSS prontas.
          </li>
          <li>
            <strong>theme.tailwind.css</strong>: o mesmo, no formato do Tailwind v4.
          </li>
          <li>
            <strong>tokens.json</strong>: o mesmo, em JSON.
          </li>
          <li>
            <strong>ANTI_PATTERNS.md</strong>: a lista do que nunca fazer.
          </li>
          <li>
            <strong>LEIA-ME.md</strong>: como usar em 3 passos.
          </li>
        </ul>
        <p className={styles.more}>
          Quer entender o porquê de cada arquivo?{" "}
          <Link href="/guias/os-2-arquivos-mais-importantes-para-sites-com-ia">Leia o guia</Link>. Quer os
          templates completos e as animações?{" "}
          <Link href="/premium">Veja o Premium</Link>.
        </p>
      </section>
    </div>
  );
}
