"use client";

import { useState } from "react";
import styles from "./PremiumGuideGate.module.css";

export default function PremiumGuideGate({ purchaseUrl }: { purchaseUrl: string }) {
  const [showLogin, setShowLogin] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [codeError, setCodeError] = useState("");

  async function requestLink(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setSending(true);
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setLoginError(j.error ?? "Não foi possível enviar o link.");
      } else {
        setSent(true);
      }
    } catch {
      setLoginError("Erro de conexão.");
    } finally {
      setSending(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setCodeError("");
    setVerifying(true);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, code: codeInput }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setCodeError(j.error ?? "Código incorreto.");
      } else {
        window.location.reload();
      }
    } catch {
      setCodeError("Erro de conexão.");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.fade} />

      <div className={styles.card}>
        <span className={styles.badge}>Conteúdo de membros</span>
        <h2 className={styles.title}>O resto deste guia é exclusivo pra membros Premium.</h2>
        <p className={styles.text}>
          Templates de DM prontos, estrutura de oferta (preço de isca, preço cheio e
          recorrência) e o passo a passo do projeto isca — tudo o que falta pra você
          começar a prospectar hoje.
        </p>

        <div className={styles.actions}>
          <a href={purchaseUrl} target="_blank" rel="noopener noreferrer" className={styles.buyBtn}>
            Quero ser Premium →
          </a>
          <button type="button" className={styles.loginBtn} onClick={() => setShowLogin(true)}>
            Já sou Premium, entrar
          </button>
        </div>
      </div>

      {showLogin && (
        <div className={styles.overlay} onClick={() => { setShowLogin(false); setSent(false); }}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {sent ? (
              <>
                <h3 className={styles.modalTitle}>Verifique seu e-mail</h3>
                <p className={styles.modalText}>
                  Enviamos um acesso para <strong>{emailInput}</strong>. Clique no link do
                  e-mail <strong>ou</strong> digite o código de 6 dígitos abaixo. Vale por
                  15 minutos.
                </p>
                <form onSubmit={verifyCode} className={styles.form}>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                    placeholder="000000"
                    className={styles.codeInput}
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  />
                  <button type="submit" className={styles.submitBtn} disabled={verifying}>
                    {verifying ? "Verificando…" : "Desbloquear com o código"}
                  </button>
                </form>
                {codeError && <span className={styles.modalError}>{codeError}</span>}
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => { setShowLogin(false); setSent(false); }}
                >
                  Fechar
                </button>
              </>
            ) : (
              <>
                <h3 className={styles.modalTitle}>Entrar</h3>
                <p className={styles.modalText}>
                  Digite o e-mail que você usou na compra do Premium. Enviaremos um link de acesso.
                </p>
                <form onSubmit={requestLink} className={styles.form}>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    className={styles.input}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <button type="submit" className={styles.submitBtn} disabled={sending}>
                    {sending ? "Enviando…" : "Enviar link de acesso"}
                  </button>
                </form>
                {loginError && <span className={styles.modalError}>{loginError}</span>}
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setShowLogin(false)}
                >
                  Fechar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
