import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Frame,
  GraduationCap,
  LayoutTemplate,
  MousePointerClick,
  ShieldCheck,
  Terminal,
  Users,
} from "lucide-react";
import { premium } from "@/lib/premium";
import { site } from "@/content/site";
import projectsData from "@/content/projects.json";
import { animacoes } from "@/content/animacoes";
import skillsProduct from "@/content/skills-product.json";
import { toThumb } from "@/lib/media";
import TrackedLink from "@/components/TrackedLink";
import WireframePair from "@/components/WireframePair";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd, productJsonLd } from "@/lib/jsonld";
import styles from "./page.module.css";

const TITLE = "Promptfly Premium: wireframes, templates, animações e skills";
const DESCRIPTION =
  "Do wireframe ao site no ar, num acesso só: wireframes, templates cinematográficos, animações de scroll, skills pro Claude Code e a mentoria pronta. Pagamento único, acesso vitalício.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://promptfly.com.br/premium" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://promptfly.com.br/premium", locale: "pt_BR" },
};

type Project = {
  id: string;
  title: string;
  isFree: boolean;
  previewUrl: string;
  thumbnailUrl?: string;
};

/** "/gsap-component — componente GSAP..." vira { cmd: "/gsap-component", desc: "componente GSAP..." } */
function parseSkills(): { cmd: string; desc: string }[] {
  return skillsProduct.features
    .filter((f) => f.startsWith("/"))
    .map((f) => {
      const [cmd, ...rest] = f.split(" — ");
      return { cmd, desc: rest.join(" — ") };
    });
}

const faqs = [
  {
    q: "O que é a mentoria pronta?",
    a: "É o meu método em guias exclusivos pra quem é Premium: como eu crio os sites cinematográficos com IA, o sistema de animação que deixa tudo coerente e o playbook de prospecção pra achar, abordar e fechar cliente. Não tem encontros marcados: as dúvidas você tira no grupo exclusivo.",
  },
  {
    q: "O que é grátis e o que é Premium?",
    a: "O Design Pack e o Wireframe Pack têm uma versão grátis, que você baixa com o seu e-mail, além de alguns templates e 5 animações. O Premium libera os templates completos, as 10 animações Premium, as skills, os wireframes prontos, a mentoria pronta e o grupo.",
  },
  {
    q: "O pagamento é recorrente?",
    a: "Não. É uma cobrança única com acesso vitalício, sem mensalidade e sem renovação.",
  },
  {
    q: "Como recebo acesso depois de comprar?",
    a: "Assim que a Hotmart confirma o pagamento, seu e-mail já é liberado. É só voltar em /projetos, clicar em \"Já tenho acesso\" e entrar com o e-mail usado na compra.",
  },
  {
    q: "Novidades têm custo extra?",
    a: "Não. Todo template, animação ou wireframe que entrar na biblioteca depois da sua compra já está incluso, sem cobrança adicional.",
  },
  {
    q: "Tem garantia?",
    a: "Sim, 7 dias de garantia incondicional, processada diretamente pela Hotmart.",
  },
];

export default function PremiumPage() {
  const premiumTemplates = (projectsData as Project[]).filter((p) => !p.isFree);
  const premiumAnimacoes = animacoes.filter((a) => a.access === "premium");
  const skills = parseSkills();

  // Capas dos templates: só as que viram imagem (as que são vídeo local ficam de fora da vitrine).
  const templateCards = premiumTemplates
    .map((p) => ({ id: p.id, name: p.title.split(" — ")[0], thumb: toThumb(p.previewUrl, p.thumbnailUrl) }))
    .filter((c) => !c.thumb.isVideo)
    .slice(0, 8);

  const price = site.premium.price;
  const cta = (posicao: string, label: string, className: string) => (
    <TrackedLink
      event="premium_cta_click"
      data={{ posicao }}
      href={premium.purchaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label} <ArrowRight size={18} strokeWidth={2.6} aria-hidden="true" />
    </TrackedLink>
  );

  return (
    <div className={styles.page}>
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={productJsonLd({
          name: "Promptfly Premium",
          description: DESCRIPTION,
          path: "/premium",
          price: site.premium.price,
        })}
      />
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <Link href="/projetos" className={styles.back}>
              ← Voltar
            </Link>
            <div className={styles.heroMeta}>
              <span className={styles.badge}>Premium</span>
              <span className={styles.label}>[ ACESSO VITALÍCIO ]</span>
            </div>
            <h1 className={styles.title}>
              Do wireframe ao site no ar. <span className={styles.titleAccent}>Tudo num acesso só.</span>
            </h1>
            <p className={styles.subtitle}>
              Wireframes, templates, animações de scroll, skills pro Claude Code e a mentoria pronta. Cinco peças que se
              encaixam, numa cobrança única.
            </p>

            <div className={styles.heroActions}>
              {cta("premium_hero", "Quero o Premium", styles.ctaBtn)}
              <span className={styles.trustLine}>
                <ShieldCheck size={14} strokeWidth={2.2} aria-hidden="true" />
                {price ? `${price} · pagamento único · ` : ""}Hotmart · garantia de 7 dias
              </span>
            </div>

            <ul className={styles.chips} aria-label="O que está incluso">
              <li>Wireframes</li>
              <li>{premiumTemplates.length} templates</li>
              <li>{premiumAnimacoes.length} animações</li>
              <li>{skills.length} skills</li>
              <li>Mentoria pronta</li>
            </ul>
          </div>

          <div className={styles.mosaic} aria-hidden="true">
            {/* eslint-disable @next/next/no-img-element */}
            <figure className={styles.tile}>
              <img src="/wireframes/wireframe-03.png" alt="" loading="eager" />
              <figcaption>Wireframe</figcaption>
            </figure>
            <figure className={styles.tile}>
              <img src="/wireframes/site-03.jpg" alt="" loading="eager" />
              <figcaption>Site criado</figcaption>
            </figure>
            <figure className={styles.tile}>
              <img src={`/animacoes/${premiumAnimacoes[0].slug}-poster.jpg`} alt="" loading="eager" />
              <figcaption>Animação</figcaption>
            </figure>
            <figure className={styles.tile}>
              <img src={templateCards[0].thumb.src} alt="" loading="eager" />
              <figcaption>Template</figcaption>
            </figure>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      <div className={styles.inner}>
        {/* ── O CAMINHO ── */}
        <section className={styles.section} aria-labelledby="caminho-t">
          <div className={styles.sectionHeader}>
            <span className={styles.tag}>[ O CAMINHO ]</span>
            <h2 id="caminho-t" className={styles.sectionTitle}>
              Cada peça resolve uma etapa do site
            </h2>
            <p className={styles.sectionLead}>
              Você não precisa de tudo ao mesmo tempo. Mas quando as peças andam juntas, o site sai mais rápido e sem cara
              de IA.
            </p>
          </div>

          <ol className={styles.flow}>
            {[
              ["Wireframe", "Define onde cada bloco fica. Você manda a imagem e a IA monta a estrutura."],
              ["Template", "Um site completo como ponto de partida. Você troca a marca e adapta."],
              ["Animação", "Movimento de scroll com nome, preview, prompt e código."],
              ["Skill", "Comandos no Claude Code que fazem o trabalho repetido por você."],
              ["Mentoria", "O método do primeiro site ao primeiro cliente."],
            ].map(([t, d], i) => (
              <li key={t} className={styles.flowItem}>
                <span className={styles.flowNum}>{i + 1}</span>
                <span className={styles.flowTitle}>{t}</span>
                <span className={styles.flowText}>{d}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── WIREFRAMES ── */}
        <section className={styles.section} aria-labelledby="wf-t">
          <div className={styles.pillar}>
            <div className={styles.pillarText}>
              <span className={styles.pillarIcon}>
                <Frame size={20} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className={styles.tag}>[ WIREFRAMES ]</span>
              <h2 id="wf-t" className={styles.sectionTitle}>
                Mande a imagem. A IA monta o site.
              </h2>
              <p className={styles.pillarLead}>
                Wireframes prontos pra mandar pra IA, com os sites que saíram deles e os prompts que acompanham a imagem.
                Sem descrever layout com palavras.
              </p>
              <ul className={styles.bullets}>
                <li>
                  <Check size={16} strokeWidth={3} aria-hidden="true" /> Wireframes prontos pra mandar pra IA
                </li>
                <li>
                  <Check size={16} strokeWidth={3} aria-hidden="true" /> Exemplos de sites criados a partir deles
                </li>
                <li>
                  <Check size={16} strokeWidth={3} aria-hidden="true" /> Prompts prontos, com e sem Design Pack
                </li>
              </ul>
              <Link href="/wireframes" className={styles.textLink}>
                Baixar o pack grátis <ArrowRight size={16} strokeWidth={2.6} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.pillarVisual}>
              <WireframePair id="wireframe-02" />
            </div>
          </div>
        </section>

        {/* ── TEMPLATES ── */}
        <section className={styles.section} aria-labelledby="tpl-t">
          <div className={styles.sectionHeader}>
            <span className={styles.pillarIcon}>
              <LayoutTemplate size={20} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className={styles.tag}>[ TEMPLATES ]</span>
            <h2 id="tpl-t" className={styles.sectionTitle}>
              {premiumTemplates.length} sites cinematográficos, o prompt completo de cada um
            </h2>
            <p className={styles.sectionLead}>
              Heroes, landing pages inteiras e prompts técnicos. Você copia, troca a marca e publica.
            </p>
          </div>

          <div className={styles.gallery}>
            {templateCards.map((c) => (
              <figure key={c.id} className={styles.galleryItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.thumb.src} alt={`Prévia do template ${c.name}`} loading="lazy" />
                <figcaption>{c.name}</figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.note}>E mais {Math.max(premiumTemplates.length - templateCards.length, 0)} no catálogo. Os novos entram sem custo extra.</p>
        </section>

        {/* ── ANIMAÇÕES ── */}
        <section className={styles.section} aria-labelledby="anim-t">
          <div className={styles.sectionHeader}>
            <span className={styles.pillarIcon}>
              <MousePointerClick size={20} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className={styles.tag}>[ ANIMAÇÕES ]</span>
            <h2 id="anim-t" className={styles.sectionTitle}>
              {premiumAnimacoes.length} animações de scroll com nome, prompt e código
            </h2>
            <p className={styles.sectionLead}>
              Pare de pedir &quot;uma animação legal&quot;. Escolha pelo nome, copie a frase e o código e cole na IA.
            </p>
          </div>

          <div className={styles.gallery}>
            {premiumAnimacoes.map((a) => (
              <figure key={a.slug} className={styles.galleryItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/animacoes/${a.slug}-poster.jpg`} alt={`Prévia da animação ${a.nome}`} loading="lazy" />
                <figcaption>{a.nome}</figcaption>
              </figure>
            ))}
          </div>
          <Link href="/animacoes" className={styles.textLink}>
            Ver a biblioteca de animações <ArrowRight size={16} strokeWidth={2.6} aria-hidden="true" />
          </Link>
        </section>

        {/* ── SKILLS ── */}
        <section className={styles.section} aria-labelledby="skills-t">
          <div className={styles.sectionHeader}>
            <span className={styles.pillarIcon}>
              <Terminal size={20} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className={styles.tag}>[ SKILLS ]</span>
            <h2 id="skills-t" className={styles.sectionTitle}>
              {skills.length} comandos que fazem o trabalho repetido por você
            </h2>
            <p className={styles.sectionLead}>Instala em 2 minutos e usa em todo projeto no Claude Code.</p>
          </div>

          <div className={styles.skills}>
            {skills.map((s) => (
              <div key={s.cmd} className={styles.skill}>
                <code className={styles.skillCmd}>{s.cmd}</code>
                <span className={styles.skillDesc}>{s.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── MENTORIA E GRUPO ── */}
        <section className={styles.section} aria-labelledby="ment-t">
          <div className={styles.sectionHeader}>
            <span className={styles.tag}>[ MENTORIA E COMUNIDADE ]</span>
            <h2 id="ment-t" className={styles.sectionTitle}>
              Do primeiro site ao primeiro cliente
            </h2>
          </div>

          <div className={styles.duo}>
            <div className={styles.card}>
              <span className={styles.pillarIcon}>
                <GraduationCap size={20} strokeWidth={2} aria-hidden="true" />
              </span>
              <h3 className={styles.cardTitle}>Mentoria pronta</h3>
              <p className={styles.cardText}>
                O método que eu uso, em guias exclusivos: como eu crio os sites cinematográficos com IA, o sistema de
                animação que deixa tudo coerente e o playbook pra achar, abordar e fechar cliente.
              </p>
            </div>
            <div className={styles.card}>
              <span className={styles.pillarIcon}>
                <Users size={20} strokeWidth={2} aria-hidden="true" />
              </span>
              <h3 className={styles.cardTitle}>Grupo exclusivo</h3>
              <p className={styles.cardText}>
                Converse direto com quem já está aplicando IA de verdade. Tire dúvidas, troque prompts e veja o que está
                funcionando agora.
              </p>
            </div>
          </div>
        </section>

        {/* ── PREÇO ── */}
        <section className={styles.priceCard} aria-labelledby="preco-t">
          <div className={styles.priceHead}>
            <span className={styles.tagLight}>[ PREMIUM ]</span>
            <h2 id="preco-t" className={styles.priceTitle}>
              Tudo isso numa cobrança só
            </h2>
            {price && <p className={styles.priceValue}>{price}</p>}
            <p className={styles.priceSub}>Pagamento único, acesso vitalício, sem mensalidade.</p>
          </div>

          <ul className={styles.priceList}>
            {[
              "Wireframes prontos pra mandar pra IA",
              `${premiumTemplates.length} templates com o prompt completo`,
              `${premiumAnimacoes.length} animações de scroll Premium, com prompt e código`,
              `${skills.length} skills cinematográficas pro Claude Code`,
              "Mentoria pronta: do primeiro site ao primeiro cliente",
              "Grupo exclusivo no Discord",
              "Todo lançamento futuro incluído",
            ].map((t) => (
              <li key={t}>
                <Check size={18} strokeWidth={3} aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>

          <div className={styles.priceActions}>
            {cta("premium_preco", "Quero o Premium", styles.priceBtn)}
            <span className={styles.priceTrust}>
              <ShieldCheck size={14} strokeWidth={2.2} aria-hidden="true" />
              Pagamento seguro via Hotmart · Garantia de 7 dias
            </span>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={styles.section} aria-labelledby="faq-t">
          <div className={styles.sectionHeader}>
            <span className={styles.tag}>[ DÚVIDAS ]</span>
            <h2 id="faq-t" className={styles.sectionTitle}>
              Perguntas frequentes
            </h2>
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

      {/* ── CTA FINAL ── */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <h2 className={styles.finalCtaTitle}>Pronto pra criar do wireframe ao site no ar?</h2>
          <p className={styles.finalCtaText}>Tudo liberado na hora, com acesso vitalício e 7 dias de garantia.</p>
          {cta("premium_final", "Quero o Premium", styles.finalCtaBtn)}
        </div>
      </section>
    </div>
  );
}
