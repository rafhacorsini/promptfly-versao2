"use client";

import { useState } from "react";
import styles from "./Newsletter.module.css";

type Status = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Algo deu errado. Tente novamente.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.");
      setStatus("error");
    }
  }

  return (
    <section className={styles.section} id="newsletter">
      <div className={styles.inner}>
        {status === "success" ? (
          <div className={styles.success}>
            <span className={styles.successCheck}>✓</span>
            <h2 className={styles.successTitle}>Você está dentro.</h2>
            <p className={styles.successText}>
              Confira seu e-mail — a boas-vindas já está a caminho.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <span className={styles.tag}>[ NEWSLETTER ]</span>
              <h2 className={styles.headline}>
                Receba um guia<br />
                <span className={styles.headlineFade}>toda semana.</span>
              </h2>
              <p className={styles.subtext}>
                Engenharia de prompt na prática. Prompts prontos,
                técnicas aplicadas e exemplos reais — direto no seu e-mail.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputRow}>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  className={styles.input}
                  required
                  disabled={status === "loading"}
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className={styles.btn}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span className={styles.spinner} />
                  ) : (
                    "Assinar grátis →"
                  )}
                </button>
              </div>

              {status === "error" && (
                <p className={styles.errorMsg}>{errorMsg}</p>
              )}

              <p className={styles.trust}>
                Grátis&nbsp;&nbsp;·&nbsp;&nbsp;1 e-mail por semana
                &nbsp;&nbsp;·&nbsp;&nbsp;Cancele quando quiser
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
