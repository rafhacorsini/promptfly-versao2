import React from "react";
import styles from "./ValueProposition.module.css";
import GradientButton from "./GradientButton";

export default function ValueProposition() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Aprenda IA de verdade.{" "}
        <span className={styles.textGray}>Uma vez por semana,<br />no seu e-mail.</span>
      </h2>
      <p className={styles.subtitle}>
        Guias semanais de engenharia de prompt para quem quer resultado real com IA.
        Técnicas aplicadas, prompts prontos para copiar e exemplos práticos —{" "}
        <strong>100% gratuito.</strong>
      </p>

      <div className={styles.buttonGroup}>
        <GradientButton variant="dark" href="/premium">
          Assinar Premium →
        </GradientButton>
        <GradientButton variant="light" href="#newsletter">
          Explorar os guias
        </GradientButton>
      </div>
    </section>
  );
}
