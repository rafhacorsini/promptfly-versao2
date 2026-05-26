import type { Metadata } from "next";
import Image from "next/image";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "Promptfly — Links",
  description: "Crie projetos incríveis com IA.",
  robots: { index: false },
};

const links = [
  {
    id: "guias",
    num: "01",
    label: "Guias",
    description: "Do prompt ao agent. Aprenda no ritmo certo.",
    href: "https://promptfly.com.br/guias",
    tag: "Grátis",
    tagStyle: "free",
  },
  {
    id: "artigo-3d",
    num: "02",
    label: "Como construir um site 3D",
    description: "Transições dentro de shaders, scroll-driven e WebGPU pipeline.",
    href: "https://tympanus.net/codrops/2026/05/19/80s-business-tech-seamless-scene-transitions-inside-shader-ses-scroll-driven-webgpu-pipeline/",
    tag: "Artigo",
    tagStyle: "neutral",
  },
  {
    id: "mentoria",
    num: "03",
    label: "Mentoria Individual",
    description: "2 encontros por mês, sem horário fixo. Do zero a criar sites com IA.",
    href: "https://pay.kiwify.com.br/b9rbVdm",
    tag: "Vagas limitadas",
    tagStyle: "accent",
  },
  {
    id: "vip",
    num: "04",
    label: "Grupo VIP",
    description: "Prompts, templates e acesso direto. O que funciona, sem enrolação.",
    href: "https://pay.kiwify.com.br/M5DbuZg",
    tag: "Comunidade",
    tagStyle: "dark",
  },
  {
    id: "skills",
    num: "05",
    label: "Skills para Claude Code",
    description: "5 comandos. Instala em 2 minutos. Usa em todo projeto.",
    href: "https://pay.hotmart.com/L105868575N",
    tag: "R$ 37",
    tagStyle: "dark",
  },
];

export default function LinksPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <header className={styles.profile}>
          <div className={styles.logoWrap}>
            <Image src="/logo.png" alt="Promptfly" width={48} height={48} className={styles.logo} />
          </div>
          <div className={styles.profileText}>
            <h1 className={styles.name}>Promptfly</h1>
            <p className={styles.bio}>Crie projetos incríveis com IA.</p>
          </div>
        </header>

        <nav className={styles.links}>
          {links.map((link, i) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <span className={styles.num}>{link.num}</span>
              <div className={styles.body}>
                <div className={styles.top}>
                  <span className={styles.label}>{link.label}</span>
                  <span className={`${styles.tag} ${styles[link.tagStyle]}`}>{link.tag}</span>
                </div>
                <p className={styles.desc}>{link.description}</p>
              </div>
              <span className={styles.arrow}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
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
