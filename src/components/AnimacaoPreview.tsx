"use client";

import { useEffect, useRef, useState } from "react";
import { PREVIEW_FRAMES } from "@/content/animacoes";
import styles from "./AnimacaoPreview.module.css";

/**
 * Preview de uma animação de scroll: uma sprite vertical com os frames do
 * demo sendo rolado, tocada com CSS steps(). Não expõe o código, carrega só
 * quando aparece na tela e para quando sai.
 */
export default function AnimacaoPreview({ slug, label }: { slug: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "200px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A sprite só começa a baixar quando o card chega perto da tela.
  useEffect(() => {
    if (!visible || loaded) return;
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = `/animacoes/${slug}.jpg`;
  }, [visible, loaded, slug]);

  return (
    <div
      ref={ref}
      className={styles.preview}
      data-playing={visible && loaded}
      role="img"
      aria-label={label ? `Preview da animação: ${label}` : "Preview da animação"}
      style={
        {
          "--poster": `url(/animacoes/${slug}-poster.jpg)`,
          "--sprite": loaded ? `url(/animacoes/${slug}.jpg)` : "none",
          "--frames": PREVIEW_FRAMES,
        } as React.CSSProperties
      }
    />
  );
}
