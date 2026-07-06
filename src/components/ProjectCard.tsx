"use client";

import { useEffect, useRef, useState } from "react";
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

// Cloudinary comprime/redimensiona sob demanda via parâmetros na própria URL —
// isso evita baixar o arquivo original (às vezes vários MB) em conexões móveis.
function optimizeUrl(url: string): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
}

function useInView<T extends HTMLElement>(rootMargin = "400px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

function Preview({ url, title }: { url: string; title: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  if (!url) {
    return <div className={styles.previewFallback} aria-hidden="true" />;
  }

  const isVideo = VIDEO_EXT.test(url);

  return (
    <div ref={ref} className={styles.previewMedia}>
      {inView &&
        (isVideo ? (
          <video
            className={styles.preview}
            src={optimizeUrl(url)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`Prévia de ${title}`}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.preview}
            src={optimizeUrl(url)}
            alt={`Prévia de ${title}`}
            loading="lazy"
            decoding="async"
          />
        ))}
    </div>
  );
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
      <div className={styles.previewWrap}>
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
              <Lock size={15} strokeWidth={2.2} /> Desbloquear
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
