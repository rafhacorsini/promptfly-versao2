import { Check, X } from "lucide-react";
import styles from "./TwoFiles.module.css";

const FAZER = [
  "Quais cores o site usa e onde cada uma entra",
  "O tamanho, o peso e o espaçamento de cada letra",
  "Os cantos, os espaços e as sombras",
  "Como é cada peça: botão, cartão, hero, menu",
];

const NUNCA = [
  "Título centralizado com 2 botões e 3 cards iguais",
  "Gradiente roxo e azul",
  "Sombra borrada em todo cartão",
  "Animação rápida e sempre igual",
];

/** Os 2 arquivos lado a lado: o que fazer (claro) e o que nunca fazer (escuro). Usado na página e no guia. */
export default function TwoFiles() {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.light}`}>
          <span className={styles.kicker}>Arquivo 1</span>
          <span className={styles.file}>DESIGN.md</span>
          <span className={styles.role}>Diz o que fazer</span>
          <div className={styles.list} role="list">
            {FAZER.map((t) => (
              <span key={t} className={styles.item} role="listitem">
                <Check size={16} strokeWidth={3} className={styles.iconYes} aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
          <span className={styles.foot}>É a receita do visual do seu site.</span>
        </div>

        <div className={`${styles.card} ${styles.dark}`}>
          <span className={styles.kicker}>Arquivo 2</span>
          <span className={styles.file}>ANTI_PATTERNS.md</span>
          <span className={styles.role}>Diz o que nunca fazer</span>
          <div className={styles.list} role="list">
            {NUNCA.map((t) => (
              <span key={t} className={styles.item} role="listitem">
                <X size={16} strokeWidth={3} className={styles.iconNo} aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
          <span className={styles.foot}>É a lista dos vícios que a IA repete.</span>
        </div>
      </div>
      <span className={styles.bottom}>
        <span className={styles.bottomStrong}>Um é o mapa. O outro é o freio.</span> Juntos, a IA sabe aonde ir e o
        que evitar.
      </span>
    </div>
  );
}
