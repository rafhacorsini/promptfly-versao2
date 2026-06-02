import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import projectsData from "@/content/projects.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projetos & Prompts — Promptfly",
  description:
    "Galeria de prompts e projetos prontos para clonar. Alguns gratuitos, outros premium. Copie e use em segundos.",
  alternates: { canonical: "https://promptfly.com.br/projetos" },
};

export default function ProjetosPage() {
  // Por segurança, o texto dos prompts PAGOS nunca é enviado ao navegador.
  // Ele só será liberado após a compra (via API autenticada).
  const projects: Project[] = (projectsData as Project[]).map((p) =>
    p.isFree ? p : { ...p, prompt: "" }
  );

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          ← Voltar
        </Link>

        <header className={styles.header}>
          <span className={styles.tag}>[ BIBLIOTECA ]</span>
          <h1 className={styles.title}>Projetos &amp; Prompts</h1>
          <p className={styles.subtitle}>
            Prompts e projetos prontos para clonar. Copie os gratuitos em um clique —
            desbloqueie os premium e tenha acesso vitalício.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
