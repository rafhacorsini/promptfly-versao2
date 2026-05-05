import React from "react";
import styles from "./ValueProposition.module.css";
import GradientButton from "./GradientButton";

// Troque pela URL do seu Beehiiv quando criar a conta
const NEWSLETTER_URL = "https://promptfly.beehiiv.com/subscribe";

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
        <GradientButton variant="dark" href={NEWSLETTER_URL} target="_blank">
          Assinar newsletter grátis →
        </GradientButton>
        <GradientButton variant="light" href="#guias">
          Explorar os guias
        </GradientButton>
      </div>
    </section>
  );
}
