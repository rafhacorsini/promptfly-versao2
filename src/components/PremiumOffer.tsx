"use client";

import { track } from "@vercel/analytics";
import premium from "@/content/premium.json";
import styles from "./PremiumOffer.module.css";

/**
 * Card de oferta do Premium para guias de venda. Usa o mesmo checkout do
 * /premium (premium.json), então trocar o link lá atualiza aqui também.
 *
 * `perks` é texto separado por "|" porque o next-mdx-remote v6 bloqueia
 * expressões JS (como arrays) em props dentro do MDX.
 */
export default function PremiumOffer({
  guia,
  title,
  price,
  perks,
  ctaLabel,
  secondaryLabel,
  secondaryHref,
}: {
  guia: string;
  title: string;
  price?: string;
  perks: string;
  ctaLabel: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.eyebrow}>
        <span className={styles.badge}>Promptfly Premium</span>
        <span className={styles.badgeSoft}>Acesso vitalício</span>
      </div>

      <p className={styles.title}>{title}</p>
      {price && <p className={styles.price}>{price}</p>}

      <ul className={styles.perks}>
        {perks.split("|").map((p) => p.trim()).filter(Boolean).map((p) => (
          <li key={p} className={styles.perk}>
            <span className={styles.check} aria-hidden="true">✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <a
          href={premium.purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          onClick={() => track("premium_cta_click", { guia, posicao: "oferta" })}
        >
          {ctaLabel} →
        </a>
        {secondaryLabel && secondaryHref && (
          <a
            href={secondaryHref}
            className={styles.secondary}
            onClick={() => track("free_template_click", { guia, posicao: "oferta" })}
          >
            {secondaryLabel}
          </a>
        )}
      </div>
    </div>
  );
}
