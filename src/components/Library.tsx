"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import {
  MessageSquareText,
  Sparkles,
  LayoutTemplate,
  CodeXml,
  Workflow,
  FileText,
  Copy,
  Check,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES, type ResourceCategory } from "@/content/resources";
import type { ResourceView } from "@/lib/resources";
import styles from "./Library.module.css";

const ICONS: Record<ResourceCategory, LucideIcon> = {
  prompts: MessageSquareText,
  skills: Sparkles,
  templates: LayoutTemplate,
  snippets: CodeXml,
  workflows: Workflow,
  contexto: FileText,
};

const ORDER = Object.keys(CATEGORIES) as ResourceCategory[];

/**
 * Seções "Categorias" e "Recursos em destaque" da home. Ficam no mesmo
 * componente porque clicar numa categoria filtra o grid logo abaixo.
 */
export default function Library({
  all,
  featured,
}: {
  all: ResourceView[];
  featured: string[];
}) {
  const [category, setCategory] = useState<ResourceCategory | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();

  const counts = useMemo(() => {
    const c = {} as Record<ResourceCategory, number>;
    for (const cat of ORDER) c[cat] = all.filter((r) => r.category === cat).length;
    return c;
  }, [all]);

  const list = category
    ? all.filter((r) => r.category === category)
    : featured
        .map((s) => all.find((r) => r.slug === s))
        .filter((r): r is ResourceView => Boolean(r));

  async function copy(r: ResourceView) {
    if (!r.content) return;
    try {
      await navigator.clipboard.writeText(r.content);
      setCopied(r.slug);
      setTimeout(() => setCopied((s) => (s === r.slug ? null : s)), 2000);
      track("prompt_copy", { recurso: r.slug, origem: "home" });
    } catch {
      // Sem permissão de clipboard: manda pra página do recurso, que tem o texto visível.
      router.push(`/r/${r.slug}`);
    }
  }

  return (
    <section id="biblioteca" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>[ BIBLIOTECA ]</span>
          </div>
          <h2 className={styles.headline}>
            O que tem na biblioteca.{" "}
            <span className={styles.headlineFade}>Escolhe uma categoria ou copia um destaque.</span>
          </h2>
        </div>

        {/* 3. Categorias */}
        <div className={styles.categories}>
          {ORDER.map((cat) => {
            const Icon = ICONS[cat];
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                className={styles.category}
                aria-pressed={active}
                onClick={() => setCategory(active ? null : cat)}
              >
                <span className={styles.categoryTop}>
                  <Icon size={18} strokeWidth={1.8} />
                  <span className={styles.categoryCount}>{counts[cat]}</span>
                </span>
                <span className={styles.categoryName}>{CATEGORIES[cat].label}</span>
                <span className={styles.categoryLine}>{CATEGORIES[cat].line}</span>
              </button>
            );
          })}
        </div>

        {/* 4. Recursos em destaque (ou a categoria escolhida) */}
        <div className={styles.gridHeader}>
          <div>
            <h3 className={styles.gridTitle}>
              {category ? CATEGORIES[category].label : "Recursos em destaque"}
            </h3>
            <p className={styles.gridSub}>Copia agora. Os grátis não pedem cadastro.</p>
          </div>
          {category && (
            <button type="button" className={styles.reset} onClick={() => setCategory(null)}>
              Ver destaques
            </button>
          )}
        </div>

        <ul className={styles.grid}>
          {list.map((r) => {
            const Icon = ICONS[r.category];
            const isCopied = copied === r.slug;
            return (
              <li key={r.slug} className={styles.card}>
                <Link href={`/r/${r.slug}`} className={styles.media} data-kind={r.thumb ? "image" : r.content ? "code" : "icon"}>
                  {r.thumb && !r.thumb.isVideo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.thumb.src} alt="" loading="lazy" />
                  ) : r.thumb?.isVideo ? (
                    <video src={`${r.thumb.src}#t=2`} muted playsInline preload="metadata" aria-hidden="true" />
                  ) : r.content ? (
                    <code className={styles.code}>{r.content.split("\n").slice(0, 7).join("\n")}</code>
                  ) : (
                    <span className={styles.iconMedia}>
                      <Icon size={30} strokeWidth={1.5} />
                      <span>{r.guideSlug ? "Passo a passo no guia" : "Incluído no Premium"}</span>
                    </span>
                  )}
                </Link>

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <span>{CATEGORIES[r.category].label}</span>
                    <span className={styles.access} data-access={r.access}>
                      {r.access === "free" ? "Grátis" : "Premium"}
                    </span>
                  </div>
                  <Link href={`/r/${r.slug}`} className={styles.title}>
                    {r.title}
                  </Link>
                  <span className={styles.tools}>{r.tools.join(" · ")}</span>
                </div>

                <div className={styles.actions}>
                  {r.access === "premium" ? (
                    <a
                      href="/premium"
                      className={styles.btnDark}
                      onClick={() => track("premium_cta_click", { recurso: r.slug, posicao: "card" })}
                    >
                      <Lock size={14} strokeWidth={2.2} /> Desbloquear
                    </a>
                  ) : r.content ? (
                    <>
                      <button
                        type="button"
                        className={styles.btnAccent}
                        data-copied={isCopied}
                        onClick={() => copy(r)}
                      >
                        {isCopied ? <Check size={14} strokeWidth={2.4} /> : <Copy size={14} strokeWidth={2.2} />}
                        {isCopied ? "Copiado ✓" : "Copiar"}
                      </button>
                      <Link href={`/r/${r.slug}`} className={styles.btnGhost}>
                        Ver
                      </Link>
                    </>
                  ) : (
                    <Link href={`/r/${r.slug}`} className={styles.btnAccent}>
                      Abrir →
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.moreRow}>
          <Link href="/projetos" className={styles.more}>
            Ver todos os templates →
          </Link>
          <Link href="/guias" className={styles.more}>
            Ver todos os guias →
          </Link>
        </div>
      </div>
    </section>
  );
}
