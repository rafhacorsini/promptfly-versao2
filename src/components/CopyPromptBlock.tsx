"use client";

import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { track } from "@vercel/analytics";
import styles from "./CopyPromptBlock.module.css";

/**
 * Bloco de prompt grátis com botão de copiar. O texto vem do fence markdown
 * passado como children (```text ... ```) e é copiado direto do DOM, sem
 * fetch, então o clique continua válido como gesto do usuário no Safari/iOS.
 */
export default function CopyPromptBlock({
  guia,
  label = "Prompt",
  children,
}: {
  guia: string;
  label?: string;
  children: React.ReactNode;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  async function copy() {
    const text = bodyRef.current?.querySelector("pre")?.innerText.trim() ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setError(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      track("prompt_copy", { guia });
    } catch {
      setError(true);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <button
          type="button"
          className={styles.btn}
          onClick={copy}
          data-copied={copied}
          aria-live="polite"
        >
          {copied ? <Check size={15} strokeWidth={2.4} /> : <Copy size={15} strokeWidth={2.4} />}
          {copied ? "Copiado ✓" : "Copiar prompt"}
        </button>
      </div>
      <div ref={bodyRef} className={styles.body}>
        {children}
      </div>
      {error && (
        <p className={styles.error}>Não deu pra copiar automático. Seleciona o texto e copia na mão.</p>
      )}
    </div>
  );
}
