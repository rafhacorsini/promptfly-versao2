"use client";

import { Copy, Check } from "lucide-react";
import { useCopyPrompt } from "@/lib/useCopyPrompt";
import styles from "./PromptPreviewBlock.module.css";

export default function PromptPreviewBlock({
  projectId,
  children,
}: {
  projectId: string;
  children: React.ReactNode;
}) {
  const { copy, copied, loading } = useCopyPrompt(projectId);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.label}>Prévia — é só um trecho, o prompt completo é maior</span>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={copy}
          disabled={loading}
          data-copied={copied}
          aria-label="Copiar prompt completo"
          title="Copiar prompt completo"
        >
          {copied ? <Check size={14} strokeWidth={2.4} /> : <Copy size={14} strokeWidth={2.4} />}
        </button>
      </div>
      {children}
    </div>
  );
}
