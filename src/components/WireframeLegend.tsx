import { Mountain } from "lucide-react";
import styles from "./WireframeLegend.module.css";

const ITENS = [
  { t: "Imagem", d: "Bloco escuro com o ícone de montanha. A IA põe uma foto ou ilustração." },
  { t: "Texto", d: "Barras cinza. Barra grossa é título, barras finas empilhadas são parágrafo." },
  { t: "Botão ou link", d: "Pílula ou retângulo pequeno. Vira botão, link de menu ou etiqueta." },
  { t: "Selo ou ícone", d: "Círculo. Vira botão redondo, selo, avatar ou ícone." },
] as const;

function Sample({ i }: { i: number }) {
  if (i === 0)
    return (
      <span className={`${styles.sample} ${styles.sImg}`}>
        <Mountain size={26} strokeWidth={2} />
      </span>
    );
  if (i === 1)
    return (
      <span className={styles.sample}>
        <span className={styles.barT} />
        <span className={styles.barP} />
        <span className={`${styles.barP} ${styles.barShort}`} />
      </span>
    );
  if (i === 2)
    return (
      <span className={styles.sample}>
        <span className={styles.pill} />
      </span>
    );
  return (
    <span className={styles.sample}>
      <span className={styles.dot} />
    </span>
  );
}

/** Legenda de como ler um wireframe: o que cada forma significa. */
export default function WireframeLegend() {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid} role="list">
        {ITENS.map((it, i) => (
          <div key={it.t} className={styles.card} role="listitem">
            <Sample i={i} />
            <span className={styles.t}>{it.t}</span>
            <span className={styles.d}>{it.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
