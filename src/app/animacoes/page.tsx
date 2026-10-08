import type { Metadata } from "next";
import Link from "next/link";
import AnimacaoCard from "@/components/AnimacaoCard";
import PremiumOffer from "@/components/PremiumOffer";
import { getAnimacoesView } from "@/lib/animacoes";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Biblioteca de Animações de Scroll",
  description:
    "15 animações de scroll com nome, preview, a frase certa pra pedir pra IA, prompt e código. 5 grátis, 10 no Premium.",
  alternates: { canonical: "https://promptfly.com.br/animacoes" },
};

export default function AnimacoesPage() {
  const todas = getAnimacoesView();
  const gratis = todas.filter((a) => a.access === "free");
  const premium = todas.filter((a) => a.access === "premium");
  const price = site.premium.price;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.tag}>[ BIBLIOTECA DE ANIMAÇÕES ]</span>
        <h1 className={styles.title}>
          {todas.length} animações de scroll.{" "}
          <span className={styles.fade}>Com nome, preview e código.</span>
        </h1>
        <p className={styles.sub}>
          Pare de pedir &quot;uma animação legal&quot;. Escolhe pelo nome, copia a frase, o prompt
          e o código, e cola no Claude Code, no ChatGPT ou no Gemini. {gratis.length} são
          grátis. As outras {premium.length} estão no Premium.
        </p>
        <div className={styles.links}>
          <Link href="/guias/nomes-das-animacoes-de-scroll" className={styles.linkDark}>
            Entenda os 6 tipos de scroll →
          </Link>
          <a href="#premium" className={styles.linkLight}>
            Ver as {premium.length} do Premium
          </a>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Grátis</h2>
          <p className={styles.sectionSub}>Copia agora, sem cadastro.</p>
        </div>
        <div className={styles.grid}>
          {gratis.map((a, i) => (
            <AnimacaoCard key={a.slug} a={a} numero={i + 1} />
          ))}
        </div>
      </section>

      <section className={styles.section} id="premium">
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Premium</h2>
          <p className={styles.sectionSub}>
            O preview é aberto pra todo mundo. O prompt e o código liberam com o Premium.
          </p>
        </div>
        <div className={styles.grid}>
          {premium.map((a, i) => (
            <AnimacaoCard key={a.slug} a={a} numero={gratis.length + i + 1} />
          ))}
        </div>
      </section>

      <div className={styles.offer}>
        <PremiumOffer
          guia="animacoes"
          title={`As ${premium.length} animações Premium e todo o resto`}
          price={price ? `${price}, pagamento único e acesso vitalício.` : "Pagamento único, acesso vitalício."}
          perks={[
            `As ${premium.length} animações Premium com prompt e código`,
            "Mentoria pronta: o método do primeiro site ao primeiro cliente",
            "Os prompts completos de todos os templates cinematográficos",
            "As skills cinematográficas pro Claude Code",
            "Grupo VIP no Discord",
            "Pagamento via Hotmart, garantia de 7 dias",
          ].join(" | ")}
          ctaLabel="Quero o Premium"
        />
      </div>
    </div>
  );
}
