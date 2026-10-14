import styles from "./GuideSummary.module.css";

/** Caixa de resumo no topo do guia. No MDX: <GuideSummary items="frase | frase | frase" /> */
export default function GuideSummary({ title = "Em 30 segundos", items }: { title?: string; items: string }) {
  const list = items
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className={styles.box}>
      <span className={styles.title}>{title}</span>
      <div className={styles.list} role="list">
        {list.map((t, i) => (
          <span key={t} className={styles.item} role="listitem">
            <span className={styles.num} aria-hidden="true">
              {i + 1}
            </span>
            <span>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
