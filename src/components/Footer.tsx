import styles from "./Footer.module.css";

const navigation = [
  { label: "Realidade", href: "#realidade" },
  { label: "Resultados", href: "#resultados" },
  { label: "Como Funciona", href: "#processo" },
  { label: "FAQ", href: "#faq" },
];

const social = [
  {
    label: "Instagram",
    href: "https://instagram.com/promptfly.br",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/promptfly",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Gradient bar no topo */}
      <div className={styles.gradientBar} />

      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logoRow}>
          <span className={styles.logo}>Promptfly</span>
        </div>

        {/* Colunas */}
        <div className={styles.columns}>
          {/* Contato */}
          <div className={styles.column}>
            <span className={styles.columnTag}>CONTATO</span>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <a href="mailto:contato@promptfly.com.br" className={styles.link}>
                  contato@promptfly.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Navegação */}
          <div className={styles.column}>
            <span className={styles.columnTag}>NAVEGAÇÃO</span>
            <ul className={styles.list}>
              {navigation.map((item) => (
                <li key={item.label} className={styles.listItem}>
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className={styles.column}>
            <span className={styles.columnTag}>SOCIAL</span>
            <ul className={styles.list}>
              {social.map((item) => (
                <li key={item.label} className={styles.listItem}>
                  <a
                    href={item.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span className={styles.legal}>
            © {new Date().getFullYear()} Promptfly® — Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
