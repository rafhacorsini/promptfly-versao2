import type { Metadata } from "next";
import Link from "next/link";
import { premium } from "@/lib/premium";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Promptfly Premium — Acesso vitalício | Promptfly",
  description:
    "Assine o Promptfly Premium e tenha acesso ao grupo exclusivo e a todos os templates e prompts, para sempre.",
  alternates: { canonical: "https://promptfly.com.br/premium" },
};

const perks = [
  "Acesso ao grupo exclusivo, com quem já está construindo com IA de verdade",
  "Todos os templates e prompts premium desbloqueados — inclusive os que ainda vão sair",
  "Acesso vitalício: pague uma vez, use para sempre",
  "Prompts prontos para copiar e adaptar em qualquer projeto",
];

export default function PremiumPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/projetos" className={styles.back}>
          ← Voltar
        </Link>

        <div className={styles.hero}>
          <div className={styles.heroMeta}>
            <span className={styles.badge}>Premium</span>
            <span className={styles.label}>[ ACESSO VITALÍCIO ]</span>
          </div>
          <h1 className={styles.title}>Promptfly Premium</h1>
          <p className={styles.subtitle}>
            Tudo que o Promptfly tem para oferecer, desbloqueado de uma vez só: grupo
            exclusivo e a biblioteca completa de templates e prompts.
          </p>
        </div>

        <div className={styles.divider} />

        <div className={styles.featuresBlock}>
          <h2 className={styles.sectionTitle}>O que está incluso</h2>
          <ul className={styles.features}>
            {perks.map((perk) => (
              <li key={perk} className={styles.feature}>
                <span className={styles.check}>✓</span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.divider} />

        <div className={styles.ctaBlock}>
          <a
            href={premium.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Assinar Promptfly Premium →
          </a>
          <span className={styles.ctaSub}>
            Pagamento processado com segurança pela Hotmart.
          </span>
        </div>
      </div>
    </div>
  );
}
