import styles from "./StepCards.module.css";

/**
 * Passo a passo numerado em cartões. No MDX: <StepCards steps="Título::Texto | Título::Texto" />
 * (string porque o next-mdx-remote v6 bloqueia array em prop).
 */
export default function StepCards({ steps }: { steps: string }) {
  const items = steps
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [title, ...rest] = s.split("::");
      return { title: title.trim(), text: rest.join("::").trim() };
    });

  return (
    <div className={styles.wrap}>
      <div className={styles.grid} role="list">
        {items.map((it, i) => (
          <div key={it.title} className={styles.card} role="listitem">
            <span className={styles.num} aria-hidden="true">
              {i + 1}
            </span>
            <span className={styles.title}>{it.title}</span>
            {it.text && <span className={styles.text}>{it.text}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
