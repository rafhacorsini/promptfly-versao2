import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import styles from "./CategoryNav.module.css";

interface Props {
  active?: string;
}

export default function CategoryNav({ active }: Props) {
  return (
    <nav className={styles.nav} aria-label="Categorias">
      <Link
        href="/guias"
        className={`${styles.item} ${!active ? styles.active : ""}`}
      >
        Todos
      </Link>
      {Object.entries(CATEGORIES).map(([slug, cat]) => (
        <Link
          key={slug}
          href={`/guias/categoria/${slug}`}
          className={`${styles.item} ${active === slug ? styles.active : ""}`}
        >
          <span className={styles.icon}>{cat.icon}</span>
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}
