import type { Metadata } from "next";
import Link from "next/link";
import { Users, LayoutTemplate, Infinity as InfinityIcon, ShieldCheck, GraduationCap } from "lucide-react";
import { premium } from "@/lib/premium";
import { site } from "@/content/site";
import projectsData from "@/content/projects.json";
import { type Project } from "@/components/ProjectCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Promptfly Premium — Acesso vitalício | Promptfly",
  description:
    "Mentoria pronta, grupo exclusivo, todos os templates de sites cinematográficos e as skills pro Claude Code. Pagamento único, acesso vitalício.",
  alternates: { canonical: "https://promptfly.com.br/premium" },
};

const withoutItems = [
  "Aprende sozinho, sem um caminho do primeiro site ao primeiro cliente",
  "Testa prompt solto e não sabe por que não funciona",
  "Refaz do zero cada site ou peça que precisa",
  "Fica de fora do grupo onde as técnicas novas circulam primeiro",
  "Paga de novo a cada template que quiser",
];

const withItems = [
  "Segue a mentoria pronta: do primeiro site ao primeiro cliente",
  "Copia prompts testados e adapta em minutos",
  "Acesso à biblioteca inteira, sem exceção",
  "Grupo exclusivo com quem já está construindo com IA",
  "Uma cobrança. Templates novos incluídos para sempre",
];

const features = [
  {
    icon: GraduationCap,
    title: "Mentoria pronta",
    text: "O método que eu uso, em guias exclusivos: como eu crio os sites cinematográficos com IA, o sistema de animação que deixa tudo coerente e o playbook pra achar, abordar e fechar cliente.",
  },
  {
    icon: Users,
    title: "Grupo exclusivo",
    text: "Converse direto com quem já está aplicando IA de verdade. Tire dúvidas, troque prompts e veja o que está funcionando agora.",
  },
  {
    icon: LayoutTemplate,
    title: "Biblioteca completa",
    text: "Todos os templates e prompts do catálogo, sem exceção: heroes, landing pages inteiras e prompts técnicos, mais as skills cinematográficas pro Claude Code. Copie, adapte e publique.",
  },
  {
    icon: InfinityIcon,
    title: "Acesso vitalício",
    text: "Pague uma vez. Todo template novo que entrar no catálogo depois já é seu, sem custo extra, para sempre.",
  },
];

const faqs = [
  {
    q: "O que é a mentoria pronta?",
    a: "É o meu método em guias exclusivos pra quem é Premium: como eu crio os sites cinematográficos com IA, o sistema de animação que deixa tudo coerente e o playbook de prospecção pra achar, abordar e fechar cliente. Não tem encontros marcados: as dúvidas você tira no grupo exclusivo.",
  },
  {
    q: "O pagamento é recorrente?",
    a: "Não. É uma cobrança única com acesso vitalício — sem mensalidade e sem renovação.",
  },
  {
    q: "Como recebo acesso depois de comprar?",
    a: "Assim que a Hotmart confirma o pagamento, seu e-mail já é liberado. É só voltar em /projetos, clicar em \"Já tenho acesso\" e entrar com o e-mail usado na compra.",
  },
  {
    q: "Templates novos têm custo extra?",
    a: "Não. Todo template que entrar no catálogo depois da sua compra já está incluso, sem cobrança adicional.",
  },
  {
    q: "Tem garantia?",
    a: "Sim, 7 dias de garantia incondicional, processada diretamente pela Hotmart.",
  },
];

export default function PremiumPage() {
  const premiumTemplates = (projectsData as Project[]).filter((p) => !p.isFree);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/projetos" className={styles.back}>
            ← Voltar
          </Link>

          <div className={styles.heroMeta}>
            <span className={styles.badge}>Premium</span>
            <span className={styles.label}>[ ACESSO VITALÍCIO ]</span>
          </div>

          <h1 className={styles.title}>
            Tudo o que o Promptfly tem, <span className={styles.titleFade}>de uma vez só.</span>
          </h1>

          <p className={styles.subtitle}>
            Mentoria pronta, grupo exclusivo, a biblioteca inteira de templates e
            prompts, e todo lançamento futuro incluído. Sem mensalidade, numa cobrança só.
          </p>

          <div className={styles.heroActions}>
            <a
              href={premium.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              Assinar Promptfly Premium →
            </a>
            <span className={styles.trustLine}>
              <ShieldCheck size={14} strokeWidth={2.2} />
              {site.premium.price ? `${site.premium.price} vitalício · ` : ""}Pagamento seguro via Hotmart · Garantia de 7 dias
            </span>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{premiumTemplates.length}+</span>
              <span className={styles.statLabel}>templates premium</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>1</span>
              <span className={styles.statLabel}>grupo exclusivo</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>acesso vitalício</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.inner}>
        {/* COMPARAÇÃO */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.tag}>[ ANTES / DEPOIS ]</span>
            <h2 className={styles.sectionTitle}>O que muda com o Premium</h2>
          </div>

          <div className={styles.compareGrid}>
            <div className={styles.compareCardBad}>
              <div className={styles.compareTop}>
                <span className={styles.iconBad}>✕</span>
                <h3 className={styles.compareTitle}>Sem Premium</h3>
              </div>
              <ul className={styles.compareList}>
                {withoutItems.map((item) => (
                  <li key={item} className={styles.compareItem}>
                    <span className={styles.bullet}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.compareCardGood}>
              <div className={styles.compareTop}>
                <span className={styles.iconGood}>✓</span>
                <h3 className={styles.compareTitle}>Com Premium</h3>
              </div>
              <ul className={styles.compareList}>
                {withItems.map((item) => (
                  <li key={item} className={styles.compareItem}>
                    <span className={styles.bullet}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.tag}>[ O QUE ESTÁ INCLUSO ]</span>
            <h2 className={styles.sectionTitle}>Quatro coisas. Uma cobrança.</h2>
          </div>

          <div className={styles.featuresGrid}>
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureText}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEMPLATES */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.tag}>[ NO CATÁLOGO HOJE ]</span>
            <h2 className={styles.sectionTitle}>Alguns dos templates inclusos</h2>
          </div>

          <div className={styles.templatesGrid}>
            {premiumTemplates.map((t) => (
              <div key={t.id} className={styles.templateCard}>
                <h3 className={styles.templateTitle}>{t.title}</h3>
                <p className={styles.templateDescription}>{t.description}</p>
                <div className={styles.templateTags}>
                  {t.tags.map((tag) => (
                    <span key={tag} className={styles.templateTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className={styles.templatesNote}>
            + novos templates adicionados sem custo extra.
          </p>
        </section>

        {/* FAQ */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.tag}>[ FAQ ]</span>
            <h2 className={styles.sectionTitle}>Perguntas frequentes</h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.q} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{faq.q}</summary>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* CTA FINAL */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <h2 className={styles.finalCtaTitle}>Pronto pra ter tudo?</h2>
          <p className={styles.finalCtaText}>
            A mentoria pronta, o grupo exclusivo e a biblioteca completa, liberados na hora.
          </p>
          <a
            href={premium.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.finalCtaBtn}
          >
            Assinar Promptfly Premium →
          </a>
        </div>
      </section>
    </div>
  );
}
