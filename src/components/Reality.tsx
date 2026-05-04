import styles from "./Reality.module.css";

const withoutItems = [
  "Copia e cola prompts da internet",
  "Respostas genéricas e sem profundidade",
  "Não entende por que a IA erra",
  "Perde horas testando sem método",
];

const withItems = [
  "Domina técnicas como Chain-of-Thought e Few-Shot",
  "Sabe estruturar prompts com clareza e contexto",
  "Entende como cada modelo pensa e responde",
  "Aplica IA com método e resultado previsível",
];

export default function Reality() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Linha 1: [ REALIDADE ] à esquerda + headline à direita */}
        <div className={styles.topRow}>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>[ REALIDADE ]</span>
          </div>
          <h2 className={styles.headline}>
            Todo mundo usa IA —{" "}
            <span className={styles.headlineFade}>
              mas quase ninguém aprendeu a usar de verdade.
              O Promptfly ensina as técnicas que separam quem
              experimenta de quem domina.
            </span>
          </h2>
        </div>

        {/* Linha 2: citação à esquerda + cards à direita */}
        <div className={styles.bottomRow}>

          {/* Bloco de citação — esquerda */}
          <div className={styles.quoteBlock}>
            <span className={styles.quoteMarks}>&ldquo;</span>
            <p className={styles.quoteText}>
              A maioria dos profissionais não precisa de{" "}
              <span className={styles.quoteAccent}>&ldquo;mais ferramentas&rdquo;</span>.
              Precisa aprender a{" "}
              <span className={styles.quoteAccent}>pensar com a IA</span>.
            </p>
            <div className={styles.dashDivider} />
            <div className={styles.quoteAuthor}>
              <div className={styles.avatar}>R</div>
              <div>
                <p className={styles.authorName}>RAFHAEL S.</p>
                <p className={styles.authorRole}>Fundador do Promptfly</p>
              </div>
            </div>
          </div>

          {/* Dois cards — direita */}
          <div className={styles.cards}>
            <div className={styles.cardLight}>
              <div className={styles.cardTop}>
                <span className={styles.iconBad}>✕</span>
                <h3 className={styles.cardTitle}>Sem Promptfly</h3>
              </div>
              <div className={styles.dotDivider} />
              <ul className={styles.list}>
                {withoutItems.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.bullet}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.cardGood}>
              <div className={styles.cardTop}>
                <span className={styles.iconGood}>✓</span>
                <h3 className={styles.cardTitle}>Com Promptfly</h3>
              </div>
              <div className={styles.dotDivider} />
              <ul className={styles.list}>
                {withItems.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.bullet}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
