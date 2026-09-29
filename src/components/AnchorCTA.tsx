"use client";

import { track } from "@vercel/analytics";
import styles from "./AnchorCTA.module.css";

/** Chamada leve no meio do guia que desce até uma seção da própria página. */
export default function AnchorCTA({
  guia,
  text,
  linkLabel,
  href,
}: {
  guia: string;
  text: string;
  linkLabel: string;
  href: string;
}) {
  return (
    <p className={styles.wrap}>
      <span>{text}</span>{" "}
      <a
        href={href}
        className={styles.link}
        onClick={() => track("anchor_cta_click", { guia, destino: href })}
      >
        {linkLabel}
      </a>
    </p>
  );
}
