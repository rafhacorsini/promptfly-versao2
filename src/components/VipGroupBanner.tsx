"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VipGroupBanner.module.css";

const VIP_URL = "https://pay.kiwify.com.br/M5DbuZg";

const perks = [
  "Hacks e técnicas que não estão em nenhum guia público",
  "Templates de animação completos prontos para usar",
  "Passo a passo para sites cinematográficos do zero",
  "Acompanhamento do seu projeto — eu reviso pessoalmente",
];

export default function VipGroupBanner() {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.card} ${visible ? styles.visible : ""}`}
        ref={cardRef}
      >
        <div className={styles.header}>
          <span className={styles.badge}>Grupo VIP</span>
          <span className={styles.badgeLive}>Vagas abertas</span>
        </div>

        <h3 className={styles.title}>
          Aprende na prática.{" "}
          <span className={styles.titleAccent}>Com quem já fez.</span>
        </h3>

        <p className={styles.subtitle}>
          Tudo que não cabe num post. Os hacks reais, os templates completos,
          os sites cinematográficos construídos do zero — e eu acompanhando
          o seu projeto de perto.
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
          href={VIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Entrar no grupo VIP →
        </a>
      </div>
    </div>
  );
}
