"use client";

import { Copy, Check } from "lucide-react";
import { useCopyPrompt } from "@/lib/useCopyPrompt";
import styles from "./TemplatePromptButton.module.css";

export default function TemplatePromptButton({
  projectId,
  label = "Copiar prompt completo",
}: {
  projectId: string;
  label?: string;
}) {
  const { copy, copied, loading, error } = useCopyPrompt(projectId);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.btn}
        onClick={copy}
        data-copied={copied}
        disabled={loading}
      >
        {loading ? (
          "Liberando…"
        ) : copied ? (
          <>
            <Check size={16} strokeWidth={2.2} /> Prompt copiado!
          </>
        ) : (
          <>
            <Copy size={16} strokeWidth={2.2} /> {label}
          </>
        )}
      </button>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
