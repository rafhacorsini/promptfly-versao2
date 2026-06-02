import type { Metadata } from "next";
import Link from "next/link";
import ProjectsGallery from "@/components/ProjectsGallery";
import { type Project } from "@/components/ProjectCard";
import { requiredProductId } from "@/lib/premium";
import projectsData from "@/content/projects.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projetos & Prompts — Promptfly",
  description:
    "Galeria de prompts e projetos prontos para clonar. Alguns gratuitos, outros premium. Copie e use em segundos.",
  alternates: { canonical: "https://promptfly.com.br/projetos" },
};

export default function ProjetosPage() {
  // Para cada projeto pago: garante o ID de produto (usa o Premium como padrão)
  // e remove o texto do prompt — ele só é liberado via API após a compra.
  const projects: Project[] = (projectsData as Project[]).map((p) => {
    if (p.isFree) return p;
    return { ...p, hotmartProductId: requiredProductId(p), prompt: "" };
  });

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

        <ProjectsGallery projects={projects} />
      </div>
    </div>
  );
}
