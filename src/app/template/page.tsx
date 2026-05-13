import type { Metadata } from "next";
import Link from "next/link";
import product from "@/content/template-product.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Template Cinematográfico — Promptfly",
  description: product.description,
  alternates: { canonical: "https://promptfly.com.br/template" },
};

export default function TemplatePage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <Link href="/" className={styles.back}>← Voltar</Link>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroMeta}>
            {product.badge && <span className={styles.badge}>{product.badge}</span>}
            <span className={styles.label}>[ TEMPLATE ]</span>
          </div>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.subtitle}>{product.subtitle}</p>
        </div>

        {/* Vídeo */}
        {product.videoUrl && (
          <div className={styles.videoWrap}>
            <iframe
              src={product.videoUrl}
              className={styles.video}
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Preview do template"
            />
          </div>
        )}

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

        {/* CTA */}
        <div className={styles.ctaBlock}>
          <div className={styles.priceRow}>
            <span className={styles.price}>{product.price}</span>
            <span className={styles.priceSub}>acesso vitalício · entrega imediata</span>
          </div>

          {product.hotmartUrl ? (
            <a
              href={product.hotmartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              Comprar template →
            </a>
          ) : (
            <span className={styles.ctaBtnDisabled}>Em breve</span>
          )}

          {product.repoUrl && (
            <a
              href={product.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.repoLink}
            >
              Ver repositório no GitHub →
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
