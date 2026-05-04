import React from "react";
import styles from "./ValueProposition.module.css";
import GradientButton from "./GradientButton";

export default function ValueProposition() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Aprenda <span className={styles.textGray}>IA de verdade.</span> Do prompt ao agent.
      </h2>
      <p className={styles.subtitle}>
        Promptfly é o ecossistema premium para quem constrói negócios com Inteligência Artificial. Para quem valoriza clareza, lógica e engenharia reversa — sem hype.
      </p>
      
      <div className={styles.buttonGroup}>
        <GradientButton variant="dark">
          Explorar o Guia →
        </GradientButton>
        <GradientButton variant="light">
          Ver biblioteca de prompts
        </GradientButton>
      </div>
    </section>
  );
}
