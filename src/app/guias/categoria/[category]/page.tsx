import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuidesByCategory } from "@/lib/guides";
import { CATEGORIES, getCategoryMeta } from "@/lib/categories";
import CategoryNav from "@/components/CategoryNav";
import styles from "../../page.module.css";

const BASE = "https://promptfly.com.br";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  if (!meta) return {};

  return {
    title: `${meta.label} — Guias Promptfly`,
    description: meta.description,
    alternates: { canonical: `${BASE}/guias/categoria/${category}` },
    openGraph: {
      title: `${meta.label} — Guias Promptfly`,
      description: meta.description,
      url: `${BASE}/guias/categoria/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  if (!meta) notFound();

  const guides = getGuidesByCategory(category);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: BASE },
      { "@type": "ListItem", position: 2, name: "Guias", item: `${BASE}/guias` },
      { "@type": "ListItem", position: 3, name: meta.label, item: `${BASE}/guias/categoria/${category}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.tag}>[ {meta.label.toUpperCase()} ]</span>
            <div>
              <h1 className={styles.title}>
                {meta.label}{" "}
                <span className={styles.titleFade}>
                  {meta.icon}
                </span>
              </h1>
              <p className={styles.subtitle}>
                {meta.description} — {guides.length} guia
                {guides.length !== 1 ? "s" : ""} publicado
                {guides.length !== 1 ? "s" : ""}.
              </p>
            </div>
          </div>

          <CategoryNav active={category} />

          {guides.length > 0 ? (
            <div className={styles.grid}>
              {guides.map((guide, i) => (
                <Link
                  key={guide.slug}
                  href={`/guias/${guide.slug}`}
                  className={styles.card}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardIndex}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.tags}>
                      {guide.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className={styles.tagBadge}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.dotDivider} />
                  <h2 className={styles.cardTitle}>{guide.title}</h2>
                  <p className={styles.cardDesc}>{guide.description}</p>
                  <div className={styles.cardMeta}>
                    <span>{guide.readTime} de leitura</span>
                    <span className={styles.readMore}>Ler guia →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>Primeiro guia de {meta.label} chegando em breve.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
