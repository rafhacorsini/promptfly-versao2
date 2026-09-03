"use client";

import { useCallback, useState } from "react";

/**
 * Busca o prompt de um projeto via /api/projects/[id]/unlock e copia pro
 * clipboard. No Safari/iOS, navigator.clipboard.write() só conta como gesto
 * do usuário quando chamado de forma síncrona dentro do clique — por isso o
 * texto resolve depois, via Promise dentro do ClipboardItem, em vez de um
 * await antes do write (que é o que quebra silenciosamente no iOS).
 */
export function useCopyPrompt(projectId: string) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resolveText = useCallback(async (): Promise<string> => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/unlock`);
      if (!res.ok) throw new Error("unlock-failed");
      const { prompt } = await res.json();
      return prompt as string;
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const copy = useCallback(async () => {
    setError("");
    try {
      if (typeof ClipboardItem !== "undefined") {
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
  }, [resolveText]);

  return { copy, copied, loading, error };
}
