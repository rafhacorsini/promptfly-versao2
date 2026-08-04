"use client";

import { useEffect, useRef, useState } from "react";
import premium from "@/content/premium.json";
import styles from "./PremiumPromo.module.css";

const perks = [
  "Acesso a todos os templates completos — código pronto pra copiar e colar",
  "Grupo exclusivo no Discord com quem já está construindo e vendendo",
  "Prompts inteiros de cada site, prontos pra colar na IA que você usa",
  "Pagamento único — sem mensalidade, acesso vitalício",
];

export default function PremiumPromo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${styles.card} ${visible ? styles.visible : ""}`}
      ref={cardRef}
    >
      <div className={styles.eyebrow}>
        <span className={styles.badge}>Promptfly Premium</span>
        <span className={styles.badgeLive}>Acesso vitalício</span>
      </div>

      <p className={styles.title}>
        Quer o código de <span className={styles.accent}>todos os meus templates</span>?
      </p>

      <p className={styles.subtitle}>
        O Premium libera o código completo de tudo que eu já construí — incluindo esse
        site do anel — mais o grupo exclusivo pra tirar dúvida direto comigo. Pagamento
        único, por pouco mais de R$100.
      </p>

      <ul className={styles.perks}>
        {perks.map((p, i) => (
          <li
            key={i}
            className={styles.perk}
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className={styles.check}>✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <a
        href={premium.purchaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        Quero o Promptfly Premium →
      </a>
    </div>
  );
}
