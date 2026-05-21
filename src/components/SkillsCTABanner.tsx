import styles from "./SkillsCTABanner.module.css";
import product from "@/content/skills-product.json";

const features = [
  "/gsap-component — componente GSAP + ScrollTrigger com cleanup correto",
  "/section-hero — hero cinematográfica com preloader, parallax e scroll indicator",
  "/palette — mapeia paleta e gera 3 variações para você escolher",
  "/perf-audit — auditoria de vídeos, imagens e animações com correção interativa",
  "/responsive-fix — converte px fixos para clamp() e adiciona breakpoints",
];

export default function SkillsCTABanner() {
  if (!product.hotmartUrl) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.badge}>Skills para Claude Code</span>
          <span className={styles.badgeNew}>{product.badge}</span>
        </div>

        <h3 className={styles.title}>
          5 comandos prontos.<br />
          <span className={styles.titleAccent}>Instala em 2 minutos.</span>
        </h3>

        <p className={styles.subtitle}>
          Em vez de escrever esses prompts do zero em cada projeto, você instala
          uma vez e chama com <code className={styles.code}>/nome-da-skill</code>.
          O agente executa. Você dirige.
        </p>

        <ul className={styles.features}>
          {features.map((f, i) => (
            <li key={i} className={styles.feature}>
              <span className={styles.check}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>Acesso completo</span>
            <span className={styles.price}>{product.price}</span>
          </div>

          <a
            href={product.hotmartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Quero as skills →
          </a>
        </div>
      </div>
    </div>
  );
}
