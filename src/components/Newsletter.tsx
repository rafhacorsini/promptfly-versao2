import Link from "next/link";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  return (
    <section className={styles.section} id="newsletter">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.tag}>[ PREMIUM ]</span>
          <h2 className={styles.headline}>
            Tenha acesso<br />
            <span className={styles.headlineFade}>a tudo.</span>
          </h2>
          <p className={styles.subtext}>
            Grupo exclusivo e a biblioteca completa de templates e prompts,
            desbloqueados de uma vez — para sempre.
          </p>
        </div>

        <Link href="/premium" className={styles.btn}>
          Assinar Premium →
        </Link>
      </div>
    </section>
  );
}
