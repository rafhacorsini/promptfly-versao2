"use client";

import { useEffect, useRef } from "react";
import styles from "./AnimacaoPreview.module.css";

/**
 * Preview de uma animação de scroll: um MP4 curto em loop, gravado do demo
 * rolando (scripts/animacoes/gerar-videos.mjs). Não expõe o código. Só baixa
 * quando chega perto da tela e pausa quando sai. Com prefers-reduced-motion,
 * fica só o poster.
 */
export default function AnimacaoPreview({ slug, label }: { slug: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        if (reduce) return;
        // O arquivo só é pedido na primeira vez que o card chega perto da tela.
        if (!video.getAttribute("src")) video.src = `/animacoes/${slug}.mp4`;
        video.play().catch(() => {});
      },
      { rootMargin: "200px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [slug]);

  return (
    <video
      ref={ref}
      className={styles.preview}
      poster={`/animacoes/${slug}-poster.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label ? `Preview da animação: ${label}` : "Preview da animação"}
    />
  );
}
