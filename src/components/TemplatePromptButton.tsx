"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./TemplatePromptButton.module.css";

export default function TemplatePromptButton({
  projectId,
  label = "Copiar prompt completo",
}: {
  projectId: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function resolveText(): Promise<string> {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/unlock`);
      if (!res.ok) throw new Error("unlock-failed");
      const { prompt } = await res.json();
      return prompt;
    } finally {
      setLoading(false);
    }
  }

  async function copyPrompt() {
    setError("");
    try {
      if (typeof ClipboardItem !== "undefined") {
        // Mesmo motivo do ProjectCard: no Safari/iOS o clipboard.write() só
        // conta como gesto do usuário se for chamado de forma síncrona no
        // clique — por isso o texto resolve depois, via Promise, em vez de
        // um await antes do write.
        const item = new ClipboardItem({
          "text/plain": resolveText().then((text) => new Blob([text], { type: "text/plain" })),
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(await resolveText());
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setLoading(false);
      setError("Erro ao copiar. Tenta de novo.");
    }
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.btn}
        onClick={copyPrompt}
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
