"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Outcome.module.css";

type ChartType = "bar-asc" | "line-fall" | "line-rise" | "wave";

interface Metric {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  description: string;
  barCount: number;
  chartType: ChartType;
  delay: number;
}

const metrics: Metric[] = [
  {
    label: "Conteúdo especializado",
    value: 200,
    prefix: "+",
    suffix: "",
    description: "artigos e guias publicados sobre engenharia de prompt e IA.",
    barCount: 1,
    chartType: "bar-asc",
    delay: 0,
  },
  {
    label: "Sem treinamento estruturado",
    value: 87,
    prefix: "",
    suffix: "%",
    description: "dos profissionais usam IA sem qualquer treinamento estruturado.",
    barCount: 2,
    chartType: "line-fall",
    delay: 90,
  },
  {
    label: "Com prompts estruturados",
    value: 3,
    prefix: "",
    suffix: "×",
    description: "mais resultado com prompts estruturados versus tentativa e erro.",
    barCount: 3,
    chartType: "line-rise",
    delay: 180,
  },
  {
    label: "Comunidade Promptfly",
    value: 600,
    prefix: "+",
    suffix: "",
    description: "profissionais já aplicando engenharia de prompt no dia a dia.",
    barCount: 4,
    chartType: "wave",
    delay: 270,
  },
];

function MiniChart({ type }: { type: ChartType }) {
  if (type === "bar-asc") {
    const heights = [20, 32, 42, 52, 60, 68];
    const total = heights.length;
    const barW = 200 / total;
    return (
      <svg viewBox="0 0 200 70" className={styles.chart} preserveAspectRatio="none">
        {heights.map((h, i) => (
          <rect
            key={i}
            x={i * barW + 3}
            y={70 - h}
            width={barW - 6}
            height={h}
            rx="3"
            fill={i === total - 1 ? "#1a1a1a" : "#e4e4e4"}
          />
        ))}
      </svg>
    );
  }

  if (type === "line-fall") {
    return (
      <svg viewBox="0 0 200 70" className={styles.chart} preserveAspectRatio="none">
        <defs>
          <linearGradient id="fallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0,8 C 50,10 80,35 130,52 C 160,62 180,58 200,62 L 200,70 L 0,70 Z"
          fill="url(#fallGrad)"
        />
        <path
          d="M 0,8 C 50,10 80,35 130,52 C 160,62 180,58 200,62"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (type === "line-rise") {
    return (
      <svg viewBox="0 0 200 70" className={styles.chart} preserveAspectRatio="none">
        <defs>
          <linearGradient id="riseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0,62 L 60,60 L 110,42 L 160,20 L 200,8 L 200,70 L 0,70 Z"
          fill="url(#riseGrad)"
        />
        <path
          d="M 0,62 L 60,60 L 110,42 L 160,20 L 200,8"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  // wave
  return (
    <svg viewBox="0 0 200 70" className={styles.chart} preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0,48 C 30,28 50,55 90,36 C 130,18 155,45 200,14 L 200,70 L 0,70 Z"
        fill="url(#waveGrad)"
      />
      <path
        d="M 0,48 C 30,28 50,55 90,36 C 130,18 155,45 200,14"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MetricCard({ metric, animate }: { metric: Metric; animate: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * metric.value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const id = setTimeout(() => requestAnimationFrame(tick), metric.delay);
    return () => clearTimeout(id);
  }, [animate, metric.value, metric.delay]);

  return (
    <div
      className={`${styles.card} ${animate ? styles.visible : ""}`}
      style={{ animationDelay: `${metric.delay}ms` }}
    >
      <div className={styles.cardMeta}>
        <span className={styles.cardLabel}>{metric.label}</span>
        <div className={styles.signalBars}>
          {Array.from({ length: metric.barCount }).map((_, i) => (
            <span
              key={i}
              className={styles.signalBar}
              style={{ height: `${7 + i * 3}px` }}
            />
          ))}
        </div>
      </div>

      <p className={styles.metricValue}>
        {metric.prefix}
        {count}
        {metric.suffix}
      </p>

      <div className={styles.chartWrapper}>
        <MiniChart type={metric.chartType} />
      </div>

      <p className={styles.cardDesc}>{metric.description}</p>
    </div>
  );
}

export default function Outcome() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        {/* Header: título à esquerda + subtexto à direita */}
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <span className={styles.tag}>[ RESULTADO ]</span>
            <h2 className={styles.headline}>
              Impacto real,
              <br />
              <span className={styles.headlineFade}>
                você consegue medir.
              </span>
            </h2>
          </div>
          <p className={styles.subtext}>
            Não ensinamos apenas teoria. Construímos conhecimento que gera
            resultados mensuráveis nas suas operações com IA.
          </p>
        </div>

        {/* Grid de métricas */}
        <div className={styles.grid}>
          {metrics.map((m) => (
            <MetricCard key={m.label} metric={m} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
