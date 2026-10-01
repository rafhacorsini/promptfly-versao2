"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import premium from "@/content/premium.json";
import styles from "./Newsletter.module.css";

type Status = "idle" | "loading" | "success" | "error";

/** CTA final da home: Premium em destaque e newsletter como opção grátis. */
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
        track("newsletter_signup", { origem: "home" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Algo deu errado. Tenta de novo.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erro de conexão. Tenta de novo.");
      setStatus("error");
    }
  }

  return (
    <section className={styles.section} id="newsletter">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.tag}>[ PREMIUM ]</span>
          <h2 className={styles.headline}>
            Pare de começar do zero.{" "}
            <span className={styles.headlineFade}>Tenha a biblioteca inteira.</span>
          </h2>
          <p className={styles.subtext}>
            A mentoria pronta, todos os templates de sites cinematográficos, as skills,
            o grupo VIP e cada template novo que eu lançar.
          </p>
        </div>

        <a
          href={premium.purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          onClick={() => track("premium_cta_click", { posicao: "home_final" })}
        >
          Quero o Premium →
        </a>

        <div className={styles.newsletter}>
          {status === "success" ? (
            <div className={styles.success}>
              <span className={styles.successCheck}>✓</span>
              <p className={styles.successText}>Pronto. Confere seu e-mail.</p>
            </div>
          ) : (
            <>
              <p className={styles.newsletterText}>
                Prefere começar grátis? Recebe um recurso novo por semana no e-mail.
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputRow}>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    aria-label="Seu e-mail"
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
                  <button type="submit" className={styles.btn} disabled={status === "loading"}>
                    {status === "loading" ? <span className={styles.spinner} /> : "Quero receber"}
                  </button>
                </div>

                {status === "error" && <p className={styles.errorMsg}>{errorMsg}</p>}

                <p className={styles.trust}>
                  Grátis&nbsp;&nbsp;·&nbsp;&nbsp;1 e-mail por semana&nbsp;&nbsp;·&nbsp;&nbsp;Cancele quando quiser
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
