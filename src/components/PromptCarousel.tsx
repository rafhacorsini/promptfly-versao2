"use client";

import { useState } from "react";
import styles from "./PromptCarousel.module.css";

interface Slide {
  number: string;
  title: string;
  tech: string;
  summary: string;
  demo: "text" | "transition" | "entrance";
}

const slides: Slide[] = [
  {
    number: "01",
    title: "Animação de texto",
    tech: "GSAP · SplitText · stagger",
    summary:
      "Título não \"aparece\" — ele entra. Cada palavra sobe de baixo com clip e stagger, com peso e easing de cinema.",
    demo: "text",
  },
  {
    number: "02",
    title: "Transição entre seções",
    tech: "GSAP · ScrollTrigger · clip-path",
    summary:
      "Uma seção dá lugar à outra com uma cortina que varre a tela — o scroll vira uma cena, não uma lista de blocos.",
    demo: "transition",
  },
  {
    number: "03",
    title: "Entrada de seção",
    tech: "GSAP · ScrollTrigger · parallax",
    summary:
      "A seção \"chega\" na viewport: sobe, ganha foco e profundidade com parallax — timing controlado, nada travado.",
    demo: "entrance",
  },
];

function Demo({ kind }: { kind: Slide["demo"] }) {
  if (kind === "text") {
    return (
      <div className={`${styles.stage} ${styles.stageText}`}>
        <div className={styles.textLine}>
          {["Sites", "que", "parecem", "cinema"].map((w, i) => (
            <span
              key={i}
              className={styles.word}
              style={{ "--i": i } as React.CSSProperties}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "transition") {
    return (
      <div className={`${styles.stage} ${styles.stageTransition}`}>
        <div className={styles.panelA}>Seção A</div>
        <div className={styles.panelB}>Seção B</div>
      </div>
    );
  }
  return (
    <div className={`${styles.stage} ${styles.stageEntrance}`}>
      <div className={styles.enterCard}>
        <span className={styles.enterBar} />
        <span className={styles.enterBarSm} />
      </div>
    </div>
  );
}

export default function PromptCarousel() {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {slides.map((s, i) => (
          <article
            key={i}
            className={styles.slide}
            onMouseEnter={() => setActive(i)}
          >
            <div className={styles.head}>
              <span className={styles.number}>{s.number}</span>
              <div className={styles.headText}>
                <span className={styles.title}>{s.title}</span>
                <span className={styles.tech}>{s.tech}</span>
              </div>
            </div>

            <Demo kind={s.demo} />

            <p className={styles.summary}>{s.summary}</p>
          </article>
        ))}
      </div>
      <p className={styles.hint}>← arraste para ver os 3 prompts →</p>
      <span className={styles.srOnly}>{slides[active].title}</span>
    </div>
  );
}
