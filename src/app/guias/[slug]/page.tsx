import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import Link from "next/link";
import { getAllGuides, getPublicGuides, getGuideSource } from "@/lib/guides";
import { getSessionEmail } from "@/lib/session";
import { hasAccess } from "@/lib/access";
import { premium } from "@/lib/premium";
import PremiumGuideGate from "@/components/PremiumGuideGate";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import TemplateCTAInline from "@/components/TemplateCTAInline";
import GuideCarousel from "@/components/GuideCarousel";
import SkillsCTABanner from "@/components/SkillsCTABanner";
import VipGroupBanner from "@/components/VipGroupBanner";
import AnimationCard from "@/components/AnimationCard";
import AnimationPromo from "@/components/AnimationPromo";
import PremiumPromo from "@/components/PremiumPromo";
import TemplatePromptButton from "@/components/TemplatePromptButton";
import Checklist from "@/components/Checklist";
import PromptCarousel from "@/components/PromptCarousel";
import styles from "./page.module.css";

const BASE = "https://promptfly.com.br";

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
    alternates: { canonical: `${BASE}/guias/${slug}` },
    ...(data.membersOnly
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      url: `${BASE}/guias/${slug}`,
      publishedTime: data.date,
      authors: ["Promptfly"],
      tags: data.tags,
      locale: "pt_BR",
      siteName: "Promptfly",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const source = getGuideSource(slug);
  if (!source) notFound();

  const { data, content } = matter(source);

  const fullBlock = Boolean(data.membersOnly);
  let previewContent = content;
  let lockedContent = "";
  let locked = false;
  if (data.premium || data.membersOnly) {
    const email = await getSessionEmail();
    const unlocked = email ? await hasAccess(email, premium.productId) : false;
    if (!unlocked) {
      locked = true;
      if (fullBlock) {
        // Exclusivo de membros: nada de prévia. Página fica fechada por completo.
        previewContent = "";
        lockedContent = "";
      } else {
        const [before, after] = content.split("{/* PREMIUM_CUT */}");
        previewContent = before;
        lockedContent = after ?? "";
      }
    }
  }

  const allGuides = getPublicGuides();
  const currentIndex = allGuides.findIndex((g) => g.slug === slug);
  const prevGuide = currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;
  const nextGuide = currentIndex > 0 ? allGuides[currentIndex - 1] : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    dateModified: data.date,
    inLanguage: "pt-BR",
    url: `${BASE}/guias/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/guias/${slug}` },
    author: { "@type": "Organization", name: "Promptfly", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Promptfly",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
    },
    keywords: (data.tags as string[]).join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: BASE },
      { "@type": "ListItem", position: 2, name: "Guias", item: `${BASE}/guias` },
      { "@type": "ListItem", position: 3, name: data.title, item: `${BASE}/guias/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <ReadingProgress />

      <div className={styles.page}>
        <div className={styles.inner}>
          <Link href="/guias" className={styles.back}>← Todos os guias</Link>

          <div className={styles.meta}>
            {(data.tags as string[]).map((tag: string) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
            <span className={styles.readTime}>{data.readTime} de leitura</span>
          </div>

          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.divider} />

          <article className={styles.article}>
            <MDXRemote source={previewContent} components={{ TemplateCTAInline, GuideCarousel, SkillsCTABanner, VipGroupBanner, AnimationCard, AnimationPromo, PremiumPromo, TemplatePromptButton, Checklist, PromptCarousel }} />
          </article>

          {locked && (
            <div className={styles.lockedWrapper}>
              <div className={styles.lockedContent}>
                <article className={styles.article}>
                  <MDXRemote source={lockedContent} components={{ TemplateCTAInline, GuideCarousel, SkillsCTABanner, VipGroupBanner, AnimationCard, AnimationPromo, PremiumPromo, TemplatePromptButton, Checklist, PromptCarousel }} />
                </article>
              </div>
              <PremiumGuideGate purchaseUrl={premium.purchaseUrl} />
            </div>
          )}

          {/* Share */}
          <div className={styles.divider} />
          <ShareButtons
            title={data.title}
            url={`${BASE}/guias/${slug}`}
          />

          {/* Prev / Next */}
          {(prevGuide || nextGuide) && (
            <nav className={styles.prevNext}>
              <div className={styles.prevNextSide}>
                {prevGuide && (
                  <Link href={`/guias/${prevGuide.slug}`} className={styles.navCard}>
                    <span className={styles.navDir}>← Anterior</span>
                    <span className={styles.navTitle}>{prevGuide.title}</span>
                  </Link>
                )}
              </div>
              <div className={`${styles.prevNextSide} ${styles.nextSide}`}>
                {nextGuide && (
                  <Link href={`/guias/${nextGuide.slug}`} className={`${styles.navCard} ${styles.navCardNext}`}>
                    <span className={styles.navDir}>Próximo →</span>
                    <span className={styles.navTitle}>{nextGuide.title}</span>
                  </Link>
                )}
              </div>
            </nav>
          )}

          {/* Skills CTA */}
          <SkillsCTABanner />

          {/* Newsletter CTA */}
          <div className={styles.cta}>
            <div className={styles.ctaInner}>
              <p className={styles.ctaLabel}>[ PREMIUM ]</p>
              <h2 className={styles.ctaTitle}>Gostou? Tenha acesso a tudo no Promptfly Premium.</h2>
              <p className={styles.ctaText}>
                Grupo exclusivo e todos os templates e prompts, para sempre.
              </p>
              <Link href="/premium" className={styles.ctaBtn}>
                Assinar Premium →
              </Link>
            </div>
          </div>

          <Link href="/guias" className={styles.backBottom}>← Ver todos os guias</Link>
        </div>
      </div>
    </>
  );
}
