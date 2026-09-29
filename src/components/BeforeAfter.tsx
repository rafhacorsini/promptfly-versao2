import fs from "fs";
import path from "path";
import styles from "./BeforeAfter.module.css";

function exists(publicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

/**
 * Comparação antes/depois. Só aparece quando as duas imagens existem em
 * /public: dá pra publicar o guia antes das imagens ficarem prontas sem
 * deixar caixa vazia no ar.
 */
export default function BeforeAfter({
  title,
  before,
  after,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  caption,
}: {
  title?: string;
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}) {
  if (!exists(before) || !exists(after)) return null;

  return (
    <section className={styles.wrap}>
      {title && <h2>{title}</h2>}
      <div className={styles.grid}>
        <figure className={styles.item}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before} alt={beforeLabel} loading="lazy" className={styles.img} />
          <span className={styles.chip}>{beforeLabel}</span>
        </figure>
        <figure className={styles.item}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={after} alt={afterLabel} loading="lazy" className={styles.img} />
          <span className={`${styles.chip} ${styles.chipAfter}`}>{afterLabel}</span>
        </figure>
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </section>
  );
}
