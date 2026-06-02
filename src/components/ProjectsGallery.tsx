"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectCard, { type Project } from "./ProjectCard";
import styles from "./ProjectsGallery.module.css";

type Me = { email: string | null; purchased: string[] };

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [me, setMe] = useState<Me>({ email: null, purchased: [] });
  const [group, setGroup] = useState<{ url: string | null; label?: string }>({ url: null });
  const [showLogin, setShowLogin] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [loginError, setLoginError] = useState("");

  const loadMe = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) setMe(await res.json());
      const g = await fetch("/api/group");
      if (g.ok) setGroup(await g.json());
    } catch {
      /* silencioso */
    }
  }, []);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

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

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMe({ email: null, purchased: [] });
    setGroup({ url: null });
  }

  function isUnlocked(p: Project) {
    if (p.isFree) return true;
    return !!p.hotmartProductId && me.purchased.includes(p.hotmartProductId);
  }

  return (
    <>
      <div className={styles.account}>
        {me.email ? (
          <span className={styles.loggedIn}>
            Conectado como <strong>{me.email}</strong>
            <button type="button" className={styles.linkBtn} onClick={logout}>
              sair
            </button>
          </span>
        ) : (
          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => setShowLogin(true)}
          >
            Já comprou? Entrar para desbloquear →
          </button>
        )}
      </div>

      {group.url && (
        <a
          href={group.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.groupBanner}
        >
          <span className={styles.groupTag}>PREMIUM</span>
          <span className={styles.groupText}>
            Você tem acesso ao grupo exclusivo.
          </span>
          <span className={styles.groupCta}>{group.label ?? "Entrar no grupo →"}</span>
        </a>
      )}

      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            unlocked={isUnlocked(project)}
            onRequireLogin={() => setShowLogin(true)}
          />
        ))}
      </div>

      {showLogin && (
        <div
          className={styles.overlay}
          onClick={() => {
            setShowLogin(false);
            setSent(false);
          }}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {sent ? (
              <>
                <h3 className={styles.modalTitle}>Verifique seu e-mail</h3>
                <p className={styles.modalText}>
                  Enviamos um link de acesso para <strong>{emailInput}</strong>. Abra o
                  e-mail e clique no botão para desbloquear seus projetos. O link vale por
                  15 minutos.
                </p>
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => {
                    setShowLogin(false);
                    setSent(false);
                  }}
                >
                  Fechar
                </button>
              </>
            ) : (
              <>
                <h3 className={styles.modalTitle}>Entrar</h3>
                <p className={styles.modalText}>
                  Digite o e-mail que você usou na compra. Enviaremos um link de acesso.
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
