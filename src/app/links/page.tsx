import type { Metadata } from "next";
import Image from "next/image";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "Promptfly — Links",
  description: "Guias, mentoria, grupo VIP e skills para quem constrói com IA.",
  robots: { index: false },
};

const links = [
  {
    id: "guias",
    label: "Guias",
    description: "Aprenda IA do prompt ao agent, do zero.",
    href: "https://promptfly.com.br/guias",
    tag: "Gratuito",
    tagStyle: "free",
    icon: "📚",
  },
  {
    id: "mentoria",
    label: "Mentoria Individual",
    description: "2 encontros por mês, sem horário fixo. Do zero a criar sites com IA — no seu ritmo.",
    href: "https://pay.kiwify.com.br/b9rbVdm",
    tag: "Vagas limitadas",
    tagStyle: "accent",
    icon: "🎓",
  },
  {
    id: "vip",
    label: "Grupo VIP",
    description: "Prompts, templates e acesso direto a mim. Tudo que funciona, sem enrolação.",
    href: "https://pay.kiwify.com.br/M5DbuZg",
    tag: "Comunidade",
    tagStyle: "dark",
    icon: "👑",
  },
  {
    id: "skills",
    label: "Skills para Claude Code",
    description: "5 comandos prontos para instalar em 2 minutos. Sites cinematográficos no piloto automático.",
    href: "https://pay.hotmart.com/L105868575N",
    tag: "R$ 37",
    tagStyle: "dark",
    icon: "⚡",
  },
];

export default function LinksPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/logo.png"
              alt="Promptfly"
              width={72}
              height={72}
              className={styles.avatar}
            />
          </div>
          <h1 className={styles.name}>Promptfly</h1>
          <p className={styles.bio}>
            Engenharia de prompt e IA em português.<br />
            Para quem constrói negócios reais.
          </p>
        </div>

        <nav className={styles.links}>
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <span className={styles.cardIcon}>{link.icon}</span>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>{link.label}</span>
                  <span className={`${styles.tag} ${styles[link.tagStyle]}`}>
                    {link.tag}
                  </span>
                </div>
                <p className={styles.cardDescription}>{link.description}</p>
              </div>
              <span className={styles.arrow}>→</span>
            </a>
          ))}
        </nav>

        <footer className={styles.footer}>
          <span>promptfly.com.br</span>
        </footer>
      </div>
    </main>
  );
}
