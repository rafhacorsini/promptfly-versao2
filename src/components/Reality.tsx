import styles from "./Reality.module.css";

const withoutItems = [
  "Prompts genéricos sem estrutura",
  "Respostas inconsistentes",
  "Tempo perdido refazendo tudo",
  "Sem saber qual modelo usar",
];

const withItems = [
  "Estrutura clara de prompt",
  "Resultados consistentes e previsíveis",
  "Mais velocidade, menos retrabalho",
  "Modelo certo para cada tarefa",
];

export default function Reality() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.tag}>[ REALIDADE ]</span>
        <h2 className={styles.headline}>
          Ferramentas de IA estão em todo lugar —{" "}
          <span className={styles.headlineFade}>
            mas sem estrutura, contexto e técnica, elas viram experimentos
            desconectados. O Promptfly transforma IA em conhecimento aplicado
            que gera resultado real.
          </span>
        </h2>
      </div>

      <div className={styles.cards}>
        {/* Card esquerdo — Sem Promptfly */}
        <div className={styles.cardLight}>
          <div className={styles.cardHeader}>
            <span className={styles.iconBad}>✕</span>
            <span className={styles.cardTitle}>Sem Promptfly</span>
          </div>
          <ul className={styles.list}>
            {withoutItems.map((item) => (
              <li key={item} className={styles.itemBad}>
                <span className={styles.bullet}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Card direito — Com Promptfly */}
        <div className={styles.cardDark}>
          <div className={styles.cardHeader}>
            <span className={styles.iconGood}>✓</span>
            <span className={styles.cardTitleDark}>Com Promptfly</span>
          </div>
          <ul className={styles.list}>
            {withItems.map((item) => (
              <li key={item} className={styles.itemGood}>
                <span className={styles.bulletGood}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
