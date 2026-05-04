"use client";

import { useEffect, useState } from "react";
import styles from "./Process.module.css";

const steps = [
  {
    number: "01",
    shortTitle: "Sua Trilha",
    title: "Escolha sua trilha",
    description: "Diz onde você está hoje — iniciante, intermediário ou avançado. O Promptfly monta o caminho certo pra você não perder tempo com o que já sabe.",
  },
  {
    number: "02",
    shortTitle: "Estrutura",
    title: "Aprenda com estrutura",
    description: "Cada guia segue uma lógica progressiva. Conceito, técnica, exemplo real e aplicação prática. Sem enrolação, sem jargão desnecessário.",
  },
  {
    number: "03",
    shortTitle: "Prática",
    title: "Aplique no mesmo dia",
    description: "Todo conteúdo vem com prompts prontos pra testar imediatamente. Você aprende e já usa — não precisa esperar terminar o guia.",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 6000; // 6 seconds per slide
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((current) => (current + 1) % steps.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeStep]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>[ COMO FUNCIONA ]</span>
          </div>
          <h2 className={styles.headline}>
            Do zero ao domínio{" "}
            <span className={styles.headlineFade}>em 3 passos.</span>
          </h2>
        </div>

        {/* Slide Area */}
        <div className={styles.slideContainer}>
          {/* Tabs/Progress */}
          <div className={styles.tabs}>
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              const isPast = i < activeStep;
              return (
                <button
                  key={step.number}
                  className={`${styles.tab} ${isActive ? styles.activeTab : ""}`}
                  onClick={() => {
                    setActiveStep(i);
                    setProgress(0);
                  }}
                >
                  <div className={styles.tabHeader}>
                    <span className={styles.tabNumber}>{step.number}</span>
                    <span className={styles.tabTitle}>{step.shortTitle}</span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div
                      className={styles.progressBarFill}
                      style={{
                        width: isActive ? `${progress}%` : isPast ? "100%" : "0%",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Slide Content */}
          <div className={styles.slideContentWrapper}>
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`${styles.slideCard} ${i === activeStep ? styles.slideActive : styles.slideHidden}`}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardText}>
                    <span className={styles.hugeNumber}>{step.number}</span>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p className={styles.cardDesc}>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
