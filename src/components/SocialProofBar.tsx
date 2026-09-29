import styles from "./SocialProofBar.module.css";

export type Stat = { value: string | null; label: string };

/**
 * Faixa de números reais. Item sem valor (null) não aparece, então a faixa
 * nunca mostra número inventado ou um "+0".
 */
export default function SocialProofBar({ stats }: { stats: Stat[] }) {
  const visible = stats.filter((s): s is { value: string; label: string } => Boolean(s.value));
  if (visible.length === 0) return null;

  return (
    <div className={styles.bar}>
      <ul className={styles.inner}>
        {visible.map((s) => (
          <li key={s.label} className={styles.item}>
            <span className={styles.value}>{s.value}</span>
            <span className={styles.label}>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
