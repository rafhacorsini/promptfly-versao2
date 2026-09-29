"use client";

import { useEffect, useState } from "react";
import styles from "./Process.module.css";

const steps = [
  {
    number: "01",
    shortTitle: "Viu no reel",
    title: "Viu no reel",
    description: "Comenta a palavra que aparece no vídeo e recebe o link no direct.",
  },
  {
    number: "02",
    shortTitle: "Copia aqui",
    title: "Copia aqui",
    description: "O link abre direto no recurso. Um clique e tá copiado.",
  },
  {
    number: "03",
    shortTitle: "Cola na IA",
    title: "Cola na sua IA e roda",
    description: "Claude Code, ChatGPT ou Gemini. Roda e ajusta pro seu projeto.",
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
    <section className={styles.section} id="como-funciona">
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>[ COMO FUNCIONA ]</span>
          </div>
          <h2 className={styles.headline}>
            Do reel pro seu site{" "}
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
