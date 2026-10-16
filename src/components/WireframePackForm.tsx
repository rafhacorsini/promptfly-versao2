"use client";

import { useId, useState } from "react";
import { Check, Download, Mail } from "lucide-react";
import { getAttribution } from "@/lib/attribution";
// Mesmo visual do formulário do Design Pack: o painel escuro com nome, e-mail e botão.
import styles from "./DesignPackForm.module.css";

type Status = "idle" | "loading" | "done" | "error";

const FILE = "promptfly-wireframe-pack.zip";

export default function WireframePackForm({ howToHref = "#como-usar" }: { howToHref?: string }) {
  const uid = useId();
  const [name, setName] = useState("");
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
      const res = await fetch("/api/wireframe-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, utm_source, utm_campaign }),
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
      a.download = FILE;
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
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.panel}>
        <div className={styles.stepHead}>
          <span className={`${styles.num} ${styles.numLight}`} aria-hidden="true">
            <Download size={16} strokeWidth={2.6} />
          </span>
          <div className={styles.stepText}>
            <p className={`${styles.stepTitle} ${styles.onDark}`}>Coloque seu e-mail e clique em baixar</p>
            <p className={styles.panelHint}>
              Você vai baixar o <strong>Wireframe Pack</strong> (wireframes, exemplos e prompts), num arquivo .zip.
            </p>
          </div>
        </div>

        {status === "done" ? (
          <div className={styles.success} role="status">
            <p className={styles.successTitle}>
              <Check size={20} strokeWidth={3} /> Download iniciado
            </p>
            <p className={styles.successText}>
              Procure o arquivo <strong>{FILE}</strong> na pasta Downloads do seu computador ou celular.
            </p>
            <p className={styles.successText}>
              <strong>Próximo passo:</strong> descompacte e abra o LEIA-ME.md. Ele explica como mandar o wireframe
              para a IA.
            </p>
            <div className={styles.successActions}>
              <button type="submit" className={styles.ghost}>
                Baixar de novo
              </button>
              <a href={howToHref} className={styles.ghostLink}>
                Ver como usar →
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label className={styles.emailLabel} htmlFor={`${uid}-name`}>
                  Primeiro nome <span className={styles.optional}>(opcional)</span>
                </label>
                <input
                  id={`${uid}-name`}
                  className={styles.input}
                  type="text"
                  autoComplete="given-name"
                  placeholder="Como você se chama?"
                  maxLength={40}
                  value={name}
                  disabled={status === "loading"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.emailLabel} htmlFor={`${uid}-email`}>
                  Seu e-mail
                </label>
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
                  aria-describedby={`${uid}-notes`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                />
              </div>
            </div>

            <button className={styles.button} type="submit" disabled={status === "loading"}>
              <Download size={18} strokeWidth={2.4} aria-hidden="true" />
              {status === "loading" ? "Preparando..." : "Baixar o .zip grátis"}
            </button>

            {status === "error" && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <div id={`${uid}-notes`} className={styles.notes}>
              <p className={styles.note}>
                <Download size={16} strokeWidth={2.4} aria-hidden="true" />
                <span>
                  <strong>O arquivo baixa na hora, aqui nesta página.</strong>{" "}
                  Ele não é enviado por e-mail. Para receber, é só clicar em &quot;Baixar o .zip grátis&quot;.
                </span>
              </p>
              <p className={styles.note}>
                <Mail size={16} strokeWidth={2.4} aria-hidden="true" />
                <span>
                  Seu e-mail entra na newsletter do Promptfly: 1 e-mail por semana, e dá pra sair quando quiser.
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
