import { Check, X } from "lucide-react";
import styles from "./WithWithout.module.css";

const ROWS = [
  {
    label: "Cor",
    sem: "A IA escolhe roxo e azul, porque é o que mais aparece na internet.",
    com: "Usa só as cores do DESIGN.md, cada uma no lugar certo.",
  },
  {
    label: "Letra",
    sem: "Tamanho médio, um peso só, tudo com cara de modelo pronto.",
    com: "Tamanho, peso e espaçamento exatos, iguais em todas as telas.",
  },
  {
    label: "Layout",
    sem: "Título no meio, dois botões e três cards iguais embaixo.",
    com: "O layout descrito no arquivo, sem os vícios da lista proibida.",
  },
  {
    label: "Correção",
    sem: "Você pede \"deixa mais bonito\" e ela chuta outra coisa.",
    com: "Você manda revisar contra os 2 arquivos e ela acha o erro sozinha.",
  },
];

/** Comparação "sem os arquivos" x "com os arquivos". */
export default function WithWithout() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head} aria-hidden="true">
        <span />
        <span className={styles.headSem}>Sem os 2 arquivos</span>
        <span className={styles.headCom}>Com os 2 arquivos</span>
      </div>
      {ROWS.map((r) => (
        <div key={r.label} className={styles.row}>
          <span className={styles.label}>{r.label}</span>
          <span className={`${styles.cell} ${styles.sem}`}>
            <X size={16} strokeWidth={3} aria-hidden="true" />
            <span>
              <span className={styles.srOnly}>Sem os arquivos: </span>
              {r.sem}
            </span>
          </span>
          <span className={`${styles.cell} ${styles.com}`}>
            <Check size={16} strokeWidth={3} aria-hidden="true" />
            <span>
              <span className={styles.srOnly}>Com os arquivos: </span>
              {r.com}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
