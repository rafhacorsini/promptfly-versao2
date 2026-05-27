"use client";

import { useState, useEffect, useRef } from "react";
import { getAnimation } from "@/data/animations";
import styles from "./AnimationCard.module.css";

interface Props {
  id: string;
}

export default function AnimationCard({ id }: Props) {
  const anim = getAnimation(id);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<"prompt" | "code" | null>(null);
  const blobRef = useRef<string | null>(null);

  useEffect(() => {
    if (!anim) return;
    let cancelled = false;

    fetch(anim.htmlPath)
      .then((r) => r.text())
      .then((html) => {
        if (cancelled) return;
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        blobRef.current = url;
        setBlobUrl(url);
      })
      .catch(() => {
        if (!cancelled) setBlobUrl(anim.htmlPath);
      });

    return () => {
      cancelled = true;
      if (blobRef.current) {
        URL.revokeObjectURL(blobRef.current);
        blobRef.current = null;
      }
    };
  }, [anim?.htmlPath]);

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

  const openInTab = () => window.open(anim.htmlPath, "_blank", "noopener");

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>{anim.number}</span>
        <div className={styles.headerText}>
          <span className={styles.title}>{anim.title}</span>
          <span className={styles.tech}>{anim.tech}</span>
        </div>
        <button
          className={styles.btnGhostInline}
          onClick={openInTab}
          title="Abrir em nova aba"
        >
          Abrir ↗
        </button>
      </div>

      <div className={styles.preview} style={{ height: anim.previewHeight }}>
        {blobUrl ? (
          <iframe src={blobUrl} className={styles.iframe} title={anim.title} />
        ) : (
          <div className={styles.skeleton} />
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.btnPrompt}`}
          onClick={() => copy("prompt")}
        >
          {copied === "prompt" ? "✓ Prompt copiado" : "Copiar Prompt"}
        </button>
        <button
          className={`${styles.btn} ${styles.btnCode}`}
          onClick={() => copy("code")}
        >
          {copied === "code" ? "✓ Código copiado" : "Copiar Código"}
        </button>
      </div>
    </div>
  );
}
