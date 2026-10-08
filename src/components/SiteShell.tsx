import Link from "next/link";
import Image from "next/image";
// Mesmo cabeçalho/rodapé dos guias, pra quem chega por um link direto ver a mesma marca.
import styles from "@/app/guias/layout.module.css";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt="Promptfly" width={22} height={22} />
          <span>Promptfly</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/#biblioteca" className={styles.navLink}>Biblioteca</Link>
          <Link href="/animacoes" className={styles.navLink}>Animações</Link>
          <Link href="/premium" className={styles.cta}>
            Ver Premium →
          </Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Link href="/">← Voltar para o início</Link>
        <span>© 2026 Promptfly</span>
      </footer>
    </div>
  );
}
