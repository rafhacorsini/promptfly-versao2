import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import Link from "next/link";
import { getAllGuides, getGuideSource } from "@/lib/guides";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const source = getGuideSource(slug);
  if (!source) return {};
  const { data } = matter(source);
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      publishedTime: data.date,
      tags: data.tags,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const source = getGuideSource(slug);
  if (!source) notFound();

  const { data } = matter(source);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Breadcrumb */}
        <Link href="/guias" className={styles.back}>
          ← Todos os guias
        </Link>

        {/* Meta */}
        <div className={styles.meta}>
          {(data.tags as string[]).map((tag: string) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
          <span className={styles.readTime}>{data.readTime} de leitura</span>
        </div>

        {/* Title */}
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.description}>{data.description}</p>
        <div className={styles.divider} />

        {/* MDX Content */}
        <article className={styles.article}>
          <MDXRemote source={source} />
        </article>

        {/* Newsletter CTA */}
        <div className={styles.cta}>
          <div className={styles.ctaInner}>
            <p className={styles.ctaLabel}>[ NEWSLETTER ]</p>
            <h2 className={styles.ctaTitle}>
              Gostou? Receba um guia assim toda semana.
            </h2>
            <p className={styles.ctaText}>
              Engenharia de prompt na prática — direto no seu e-mail. Grátis.
            </p>
            <a
              href="https://promptfly.beehiiv.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              Assinar newsletter grátis →
            </a>
          </div>
        </div>

        {/* Back */}
        <Link href="/guias" className={styles.backBottom}>
          ← Ver todos os guias
        </Link>
      </div>
    </div>
  );
}
