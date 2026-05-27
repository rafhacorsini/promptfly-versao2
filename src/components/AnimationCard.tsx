"use client";

import { useState } from "react";
import { getAnimation } from "@/data/animations";
import styles from "./AnimationCard.module.css";

interface Props {
  id: string;
}

export default function AnimationCard({ id }: Props) {
  const anim = getAnimation(id);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [copied, setCopied] = useState<"prompt" | "code" | null>(null);

  if (!anim) return null;

  const copy = async (type: "prompt" | "code") => {
    try {
      if (type === "prompt") {
        await navigator.clipboard.writeText(anim.prompt);
      } else {
        const res = await fetch(anim.htmlPath);
        const text = await res.text();
        await navigator.clipboard.writeText(text);
      }
      setCopied(type);
      setTimeout(() => setCopied(null), 2200);
    } catch {
      // silently ignore clipboard errors
    }
  };

  const openInTab = () => {
    window.open(anim.htmlPath, "_blank", "noopener");
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>{anim.number}</span>
        <div className={styles.headerText}>
          <span className={styles.title}>{anim.title}</span>
          <span className={styles.tech}>{anim.tech}</span>
        </div>
      </div>

      <p className={styles.description}>{anim.description}</p>

      <div className={styles.preview} style={{ height: anim.previewHeight }}>
        {previewLoaded ? (
          <iframe
            src={anim.htmlPath}
            className={styles.iframe}
            title={anim.title}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <button className={styles.loadBtn} onClick={() => setPreviewLoaded(true)}>
            <span className={styles.loadIcon}>▶</span>
            <span>Carregar preview</span>
          </button>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => copy("prompt")}
        >
          {copied === "prompt" ? "✓ Copiado" : "Copiar Prompt"}
        </button>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={() => copy("code")}
        >
          {copied === "code" ? "✓ Copiado" : "Copiar Código"}
        </button>
        <button
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={openInTab}
        >
          Abrir ↗
        </button>
      </div>
    </div>
  );
}
