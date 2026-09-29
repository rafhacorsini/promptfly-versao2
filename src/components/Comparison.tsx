import BeforeAfter from "./BeforeAfter";
import styles from "./Comparison.module.css";

/** Seção "Antes / depois" da home. As imagens ficam em public/guias/jurado-awwwards/. */
export default function Comparison() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>[ ANTES / DEPOIS ]</span>
          </div>
          <h2 className={styles.headline}>
            A diferença dá pra ver.{" "}
            <span className={styles.headlineFade}>
              Sem direção, a IA entrega o genérico. Com um template do Promptfly, sai o Alba.
            </span>
          </h2>
        </div>

        <BeforeAfter
          sideBySide
          before="/guias/jurado-awwwards/antes.jpg"
          after="/guias/jurado-awwwards/depois.jpg"
          beforeLabel="Antes · site genérico feito com IA"
          afterLabel="Depois · Alba Residência"
        />
      </div>
    </section>
  );
}
