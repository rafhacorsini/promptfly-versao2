import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/guides";
import CategoryNav from "@/components/CategoryNav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Guias de Engenharia de Prompt",
  description:
    "Guias práticos sobre engenharia de prompt, IA e como obter resultados reais com modelos de linguagem.",
  alternates: { canonical: "https://promptfly.com.br/guias" },
};

export default function GuiasPage() {
  const guides = getAllGuides();

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.tag}>[ GUIAS ]</span>
          <div>
            <h1 className={styles.title}>
              Aprenda IA{" "}
              <span className={styles.titleFade}>de verdade.</span>
            </h1>
            <p className={styles.subtitle}>
              {guides.length} guia{guides.length !== 1 ? "s" : ""} publicado
              {guides.length !== 1 ? "s" : ""} — técnicas aplicadas, prompts
              prontos e exemplos reais.
            </p>
          </div>
        </div>

        <CategoryNav />

        <div className={styles.grid}>
          {guides.map((guide, i) => (
            <Link
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.tags}>
                  {guide.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className={styles.tagBadge}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={styles.dotDivider} />
              <h2 className={styles.cardTitle}>{guide.title}</h2>
              <p className={styles.cardDesc}>{guide.description}</p>
              <div className={styles.cardMeta}>
                <span>{guide.readTime} de leitura</span>
                <span className={styles.readMore}>Ler guia →</span>
              </div>
            </Link>
          ))}
        </div>

        {guides.length === 0 && (
          <div className={styles.empty}>
            <p>Primeiro guia chegando em breve.</p>
          </div>
        )}
      </div>
    </div>
  );
}
