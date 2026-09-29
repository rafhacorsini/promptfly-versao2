import { site } from "@/content/site";
import styles from "./About.module.css";

/** Seção "Quem faz". Sem foto configurada em content/site.ts, mostra a inicial. */
export default function About() {
  const { photo } = site.about;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.tagContainer}>
          <span className={styles.tag}>[ QUEM FAZ ]</span>
        </div>

        <div className={styles.content}>
          <div className={styles.photo}>
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="Rafha, criador do Promptfly" />
            ) : (
              <span className={styles.initial} aria-hidden="true">R</span>
            )}
          </div>

          <div className={styles.text}>
            <h2 className={styles.headline}>Oi, eu sou o Rafha.</h2>
            <p className={styles.bio}>
              Sou dev frontend e estudo Análise e Desenvolvimento de Sistemas na FIAP.
              Crio sites cinematográficos com IA e mostro o processo no Instagram. O
              Promptfly é onde eu guardo tudo isso pra você copiar.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
            >
              Seguir {site.instagram.handle} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
