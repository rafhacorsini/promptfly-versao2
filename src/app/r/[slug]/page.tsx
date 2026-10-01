import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyPromptBlock from "@/components/CopyPromptBlock";
import TemplatePromptButton from "@/components/TemplatePromptButton";
import PremiumOffer from "@/components/PremiumOffer";
import GradientButton from "@/components/GradientButton";
import { CATEGORIES } from "@/content/resources";
import { site } from "@/content/site";
import { getAllResources, getResource, getPremiumTemplateCount } from "@/lib/resources";
import styles from "./page.module.css";

const BASE = "https://promptfly.com.br";

interface Props {
  params: Promise<{ slug: string }>;
}

// Só existem os /r gerados a partir de content/resources.ts e projects.json.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) return {};

  return {
    title: r.title,
    description: r.description,
    // Página de entrega da DM: não compete no Google com o guia original.
    robots: { index: false, follow: true },
    alternates: r.guideSlug ? { canonical: `${BASE}/guias/${r.guideSlug}` } : undefined,
    openGraph: {
      title: r.title,
      description: r.description,
      url: `${BASE}/r/${slug}`,
      locale: "pt_BR",
      siteName: "Promptfly",
    },
  };
}

function copyButtonLabel(contentLabel?: string) {
  if (contentLabel?.endsWith(".md")) return "Copiar arquivo";
  if (contentLabel?.endsWith(".tsx")) return "Copiar código";
  return "Copiar prompt";
}

export default async function RecursoPage({ params }: Props) {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) notFound();

  const free = r.access === "free";
  const total = getAllResources().length;
  const premiumTemplates = getPremiumTemplateCount();
  const price = site.premium.price;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/#biblioteca" className={styles.back}>← Biblioteca Promptfly</Link>

        <div className={styles.meta}>
          <span className={styles.access} data-access={r.access}>
            {free ? "Grátis" : "Premium"}
          </span>
          <span className={styles.category}>{CATEGORIES[r.category].label}</span>
          <span className={styles.tools}>{r.tools.join(" · ")}</span>
        </div>

        <h1 className={styles.title}>{r.title}</h1>
        <p className={styles.lead}>{r.description}</p>

        {r.thumb && (
          <div className={styles.preview}>
            {r.thumb.isVideo ? (
              <video src={r.thumb.src} autoPlay muted loop playsInline />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={r.thumb.src} alt={r.title} />
            )}
          </div>
        )}

        {/* O recurso em si */}
        {free && r.content && (
          <div className={styles.content}>
            <CopyPromptBlock
              guia={slug}
              label={r.contentLabel ?? "Prompt"}
              buttonLabel={copyButtonLabel(r.contentLabel)}
            >
              <pre>
                <code>{r.content}</code>
              </pre>
            </CopyPromptBlock>
          </div>
        )}

        {free && r.projectId && (
          <TemplatePromptButton projectId={r.projectId} label="Copiar o prompt completo do template" />
        )}

        {free && !r.content && !r.projectId && r.guideSlug && (
          <div className={styles.openRow}>
            <GradientButton variant="dark" href={`/guias/${r.guideSlug}`}>
              Abrir o recurso completo →
            </GradientButton>
          </div>
        )}

        {!free && (
          <p className={styles.lockNote}>
            Esse recurso faz parte do Promptfly Premium.
            {r.href && (
              <>
                {" "}
                <Link href={r.href}>Ver os detalhes →</Link>
              </>
            )}
          </p>
        )}

        {r.howTo && r.howTo.length > 0 && (
          <div className={styles.howTo}>
            <h2 className={styles.howToTitle}>Como usar</h2>
            <ol className={styles.steps}>
              {r.howTo.map((step, i) => (
                <li key={step} className={styles.step}>
                  <span className={styles.stepNumber}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <PremiumOffer
          guia={slug}
          title={
            free
              ? `Esse é 1 recurso. A biblioteca tem ${total}.`
              : "Desbloqueie esse e a biblioteca inteira."
          }
          price={price ? `${price} · pagamento único.` : "Pagamento único, acesso vitalício."}
          perks={[
            "Mentoria pronta: o método do primeiro site ao primeiro cliente",
            `Os ${premiumTemplates} templates de sites cinematográficos, com o prompt completo`,
            "As skills cinematográficas pro Claude Code",
            "Grupo VIP no Discord",
            "Todo template novo incluído, sem pagar de novo",
            "Pagamento via Hotmart, garantia de 7 dias",
          ].join(" | ")}
          ctaLabel="Quero o Premium"
        />

        <div className={styles.links}>
          {r.guideSlug && (r.content || r.projectId) && (
            <Link href={`/guias/${r.guideSlug}`}>Ver o guia completo →</Link>
          )}
          <Link href="/#biblioteca">Mais recursos grátis →</Link>
        </div>
      </div>
    </div>
  );
}
