import Link from "next/link";
import styles from "./LegalLayout.module.css";

export default function LegalLayout({
  tag,
  title,
  updatedAt,
  children,
}: {
  tag: string;
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          ← Voltar
        </Link>
        <span className={styles.tag}>[ {tag} ]</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Última atualização: {updatedAt}</p>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
