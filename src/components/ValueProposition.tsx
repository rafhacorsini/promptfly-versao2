import Link from "next/link";
import type { ResourceView } from "@/lib/resources";
import { CATEGORIES } from "@/content/resources";
import GradientButton from "./GradientButton";
import styles from "./ValueProposition.module.css";

export default function ValueProposition({ cards }: { cards: ResourceView[] }) {
  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>[ BIBLIOTECA DO @RAFHA.GPT ]</span>

      <h1 className={styles.title}>
        Sites cinematográficos com IA.{" "}
        <span className={styles.textGray}>Copie o que eu uso pra criar.</span>
      </h1>
      <p className={styles.subtitle}>
        Prompts, skills e templates prontos pra colar no Claude Code, no ChatGPT ou no
        Gemini. Pra quem cansou de site com cara de template.
      </p>

      <div className={styles.buttonGroup}>
        <GradientButton variant="dark" href="#biblioteca">
          Explorar a biblioteca →
        </GradientButton>
        <GradientButton variant="light" href="/premium">
          Ver Premium
        </GradientButton>
      </div>

      {/* Cards de recursos reais, puxados de content/resources.ts */}
      <ul className={styles.cards}>
        {cards.map((r) => (
          <li key={r.slug}>
            <Link href={`/r/${r.slug}`} className={styles.card}>
              <span className={styles.cardMedia} data-dark={!r.thumb}>
                {r.thumb && !r.thumb.isVideo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.thumb.src} alt="" loading="lazy" />
                ) : (
                  <code className={styles.cardCode}>
                    {(r.content ?? "").split("\n").slice(0, 4).join("\n")}
                  </code>
                )}
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardMeta}>
                  <span>{CATEGORIES[r.category].label}</span>
                  <span className={styles.cardAccess} data-access={r.access}>
                    {r.access === "free" ? "Grátis" : "Premium"}
                  </span>
                </span>
                <span className={styles.cardTitle}>{r.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
