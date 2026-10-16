import { ArrowRight } from "lucide-react";
import manifest from "@/content/wireframe-pack/manifest.json";
import styles from "./WireframePair.module.css";

interface Item {
  id: string;
  title: string;
  niche: string;
  notes: string;
}

/** O par "wireframe → site que a IA montou". Uso no MDX: <WireframePair id="wireframe-01" /> */
export default function WireframePair({ id }: { id: string }) {
  const item = (manifest as Item[]).find((m) => m.id === id);
  if (!item) return null;
  const n = id.replace("wireframe-", "");

  return (
    <figure className={styles.fig}>
      <div className={styles.pair}>
        <div className={styles.side}>
          <span className={styles.label}>Wireframe</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.img}
            src={`/wireframes/wireframe-${n}.png`}
            alt={`Wireframe: ${item.title}`}
            loading="lazy"
          />
        </div>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRight size={22} strokeWidth={2.6} />
        </span>
        <div className={styles.side}>
          <span className={`${styles.label} ${styles.labelDark}`}>Site criado pela IA</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.img}
            src={`/wireframes/site-${n}.jpg`}
            alt={`Site criado a partir do wireframe (${item.niche})`}
            loading="lazy"
          />
        </div>
      </div>
      <figcaption className={styles.cap}>
        <strong>{item.title}</strong>
        <span className={styles.niche}>{item.niche}</span>
        <span className={styles.notes}>{item.notes}</span>
      </figcaption>
    </figure>
  );
}
