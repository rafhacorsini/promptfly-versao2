"use client";

import { useState } from "react";
import styles from "./Checklist.module.css";

type Item = {
  label: string;
  desc?: string;
};

export default function Checklist({ items, data }: { items?: Item[]; data?: string }) {
  const parsed: Item[] = items ?? (data ? (JSON.parse(data) as Item[]) : []);
  const [checked, setChecked] = useState<boolean[]>(() => parsed.map(() => false));

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <ul className={styles.list}>
      {parsed.map((item, i) => (
        <li key={i} className={styles.item}>
          <button
            type="button"
            role="checkbox"
            aria-checked={checked[i]}
            className={`${styles.box} ${checked[i] ? styles.boxChecked : ""}`}
            onClick={() => toggle(i)}
          >
            <span className={styles.check}>✓</span>
          </button>
          <button
            type="button"
            className={`${styles.text} ${checked[i] ? styles.textChecked : ""}`}
            onClick={() => toggle(i)}
          >
            <span className={styles.label}>{item.label}</span>
            {item.desc && <span className={styles.desc}> {item.desc}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}
