"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AnimationPromo.module.css";

const VIP_URL = "https://pay.kiwify.com.br/M5DbuZg";

const perks = [
  "Todas as animações com código completo — Three.js, GSAP, CSS puro",
  "Skills prontas para colar no Claude Code e gerar qualquer efeito em segundos",
  "Templates cinematográficos completos para clonar e entregar",
  "Prompts de venda para fechar projetos de R$5k a R$20k",
  "Comunidade ativa para network, feedback e parcerias",
];

export default function AnimationPromo() {
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
        <span className={styles.badge}>Grupo VIP</span>
        <span className={styles.badgeLive}>Vagas abertas</span>
      </div>

      <h2 className={styles.title}>
        Quer saber cobrar{" "}
        <span className={styles.accent}>R$10.000 por uma página?</span>
      </h2>

      <p className={styles.subtitle}>
        No grupo você tem acesso a tudo que precisa para construir sites cinematográficos do zero e vender como serviço premium. Não é curso. É o material completo mais a comunidade de quem já está fazendo.
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
        Quero entrar no grupo VIP →
      </a>
    </div>
  );
}
