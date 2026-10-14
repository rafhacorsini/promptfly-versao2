"use client";

import { useId, useState } from "react";
import { getAttribution } from "@/lib/attribution";
import styles from "./DesignPackForm.module.css";

interface StyleOption {
  id: string;
  name: string;
  mode: string;
  summary: string;
  swatches: { label: string; color: string }[];
}

type Status = "idle" | "loading" | "done" | "error";

export default function DesignPackForm({ styles: options }: { styles: StyleOption[] }) {
  const uid = useId();
  const [style, setStyle] = useState(options[0]?.id ?? "vitrine");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    try {
      const { utm_source, utm_campaign } = getAttribution();
      const res = await fetch("/api/design-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, style, utm_source, utm_campaign }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Algo deu errado. Tente de novo.");
        setStatus("error");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `promptfly-design-pack-${style}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setStatus("done");
    } catch {
      setError("Erro de conexão. Tente de novo.");
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} aria-describedby={`${uid}-consent`}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>1. Escolha o estilo</legend>
        <div className={styles.options}>
          {[...options, { id: "todos", name: "Os 3 estilos", mode: "", summary: "Baixe tudo e escolha depois.", swatches: [] }].map(
            (o) => (
              <label key={o.id} className={styles.option} data-checked={style === o.id}>
                <input
                  className={styles.radio}
                  type="radio"
                  name={`${uid}-style`}
                  value={o.id}
                  checked={style === o.id}
                  onChange={() => setStyle(o.id)}
                />
                <span className={styles.optionName}>
                  {o.name}
                  {o.mode && <span className={styles.mode}>{o.mode}</span>}
                </span>
                {o.swatches.length > 0 && (
                  <span className={styles.swatches} aria-hidden="true">
                    {o.swatches.map((s) => (
                      <span key={s.label} className={styles.swatch} style={{ background: s.color }} />
                    ))}
                  </span>
                )}
                <span className={styles.optionText}>{o.summary}</span>
              </label>
            ),
          )}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label className={styles.legend} htmlFor={`${uid}-email`}>
          2. Seu melhor e-mail
        </label>
        <div className={styles.row}>
          <input
            id={`${uid}-email`}
            className={styles.input}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="seu@email.com"
            required
            value={email}
            disabled={status === "loading"}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
          />
          <button className={styles.button} type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Preparando..." : "Baixar grátis"}
          </button>
        </div>
        <p id={`${uid}-consent`} className={styles.consent}>
          Ao baixar, você entra na newsletter do Promptfly: 1 e-mail por semana, e dá pra sair quando quiser.
        </p>
      </div>

      <div role="status" aria-live="polite" className={styles.status}>
        {status === "error" && <p className={styles.error}>{error}</p>}
        {status === "done" && (
          <p className={styles.done}>
            Pronto, o download começou. Se não começou, clique em &quot;Baixar grátis&quot; de novo. Você também vai
            receber um e-mail de boas-vindas.
          </p>
        )}
      </div>
    </form>
  );
}
