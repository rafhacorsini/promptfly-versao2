import type { Metadata } from "next";
import Link from "next/link";
import product from "@/content/skills-product.json";
import styles from "../template/page.module.css";

export const metadata: Metadata = {
  title: "Skills Cinematográficas para Claude Code — Promptfly",
  description: product.description,
  alternates: { canonical: "https://promptfly.com.br/skills" },
};

export default function SkillsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <Link href="/" className={styles.back}>← Voltar</Link>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroMeta}>
            {product.badge && <span className={styles.badge}>{product.badge}</span>}
            <span className={styles.label}>[ SKILLS ]</span>
          </div>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.subtitle}>{product.subtitle}</p>
        </div>

        {/* Descrição */}
        <p className={styles.description}>{product.description}</p>

        {/* Stack */}
        <div className={styles.stackRow}>
          {product.stack.map((s) => (
            <span key={s} className={styles.stackBadge}>{s}</span>
          ))}
        </div>

        <div className={styles.divider} />

        {/* Features */}
        <div className={styles.featuresBlock}>
          <h2 className={styles.sectionTitle}>O que está incluso</h2>
          <ul className={styles.features}>
            {product.features.map((f) => (
              <li key={f} className={styles.feature}>
                <span className={styles.check}>✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.divider} />

        {/* Como funciona */}
        <div className={styles.featuresBlock}>
          <h2 className={styles.sectionTitle}>Como funciona</h2>
          <ol className={styles.features} style={{ listStyle: "none", counterReset: "steps" }}>
            {[
              "Baixe o arquivo após a compra",
              "Copie os .md para a pasta .claude/commands/ na raiz do seu projeto",
              "Abra o Claude Code dentro do projeto",
              "Digite /nome-da-skill e o agente executa",
            ].map((step, i) => (
              <li key={i} className={styles.feature}>
                <span className={styles.check}>{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.divider} />

        {/* CTA */}
        <div className={styles.ctaBlock}>
          <div className={styles.priceRow}>
            <span className={styles.price}>{product.price}</span>
            <span className={styles.priceSub}>acesso vitalício · entrega imediata</span>
          </div>

          <a
            href={product.hotmartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Quero as skills →
          </a>
        </div>

      </div>
    </div>
  );
}
