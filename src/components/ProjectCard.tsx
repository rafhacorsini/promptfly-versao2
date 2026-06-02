"use client";

import { useState } from "react";
import { Copy, Check, Lock } from "lucide-react";
import styles from "./ProjectCard.module.css";

export type Project = {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
  tags: string[];
  isFree: boolean;
  price: string;
  hotmartUrl: string;
  hotmartProductId?: string;
  prompt: string;
};

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;

function Preview({ url, title }: { url: string; title: string }) {
  if (!url) {
    return <div className={styles.previewFallback} aria-hidden="true" />;
  }
  if (VIDEO_EXT.test(url)) {
    return (
      <video
        className={styles.preview}
        src={url}
        autoPlay
        muted
        loop
        playsInline
        aria-label={`Prévia de ${title}`}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={styles.preview} src={url} alt={`Prévia de ${title}`} />;
}

export default function ProjectCard({
  project,
  unlocked,
  onRequireLogin,
}: {
  project: Project;
  unlocked: boolean;
  onRequireLogin: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canCopy = project.isFree || unlocked;

  async function copyPrompt() {
    setError("");
    try {
      let text = project.prompt;
      // Prompt pago não vem no HTML — busca protegido no servidor.
      if (!project.isFree) {
        setLoading(true);
        const res = await fetch(`/api/projects/${project.id}/unlock`);
        setLoading(false);
        if (!res.ok) {
          setError("Não foi possível liberar. Faça login novamente.");
          return;
        }
        ({ prompt: text } = await res.json());
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setLoading(false);
      setError("Erro ao copiar.");
    }
  }

  return (
    <article className={styles.card}>
      <div className={`${styles.previewWrap} ${!canCopy ? styles.locked : ""}`}>
        <Preview url={project.previewUrl} title={project.title} />
        <div className={styles.previewShade} aria-hidden="true" />

        {project.isFree ? (
          <span className={styles.badgeFree}>Grátis</span>
        ) : (
          <span className={styles.badgePaid}>
            <Lock size={12} strokeWidth={2.2} />
            {unlocked ? "Seu" : "Premium"}
          </span>
        )}

        {!canCopy && (
          <div className={styles.lockedOverlay}>
            <span className={styles.lockedIcon}>
              <Lock size={20} strokeWidth={2} />
            </span>
            <span className={styles.lockedLabel}>Conteúdo Premium</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.tags}>
          {project.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        {canCopy ? (
          <button
            type="button"
            className={styles.copyBtn}
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
                <Copy size={16} strokeWidth={2.2} /> Copiar prompt
              </>
            )}
          </button>
        ) : (
          <>
            <a
              href={project.hotmartUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.buyBtn}
            >
              Desbloquear com Premium →
            </a>
            <button type="button" className={styles.alreadyBtn} onClick={onRequireLogin}>
              Já comprei
            </button>
          </>
        )}

        {error && <span className={styles.error}>{error}</span>}
      </div>
    </article>
  );
}
