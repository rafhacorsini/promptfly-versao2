import type { Metadata } from "next";
import Link from "next/link";
import ProjectsGallery from "@/components/ProjectsGallery";
import { type Project } from "@/components/ProjectCard";
import { requiredProductId, premium } from "@/lib/premium";
import projectsData from "@/content/projects.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sites Cinematográficos com IA — Prompts Prontos | Promptfly",
  description:
    "Biblioteca de prompts e projetos para criar sites cinematográficos com IA. Copie os gratuitos em um clique ou desbloqueie o Premium com acesso vitalício.",
  alternates: { canonical: "https://promptfly.com.br/projetos" },
};

export default function ProjetosPage() {
  // Para cada projeto pago: garante o ID de produto (usa o Premium como padrão)
  // e remove o texto do prompt — ele só é liberado via API após a compra.
  const projects: Project[] = (projectsData as Project[]).map((p) => {
    if (p.isFree) return p;
    return {
      ...p,
      hotmartProductId: requiredProductId(p),
      // Modelo "só Premium": todo projeto pago leva ao checkout do Premium.
      hotmartUrl: premium.purchaseUrl,
      prompt: "",
    };
  });

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          ← Voltar
        </Link>

        <header className={styles.header}>
          <span className={styles.tag}>[ DESIGN · IA · PROMPTS ]</span>
          <h1 className={styles.title}>
            Sites <span className={styles.accent}>cinematográficos</span> com prompts
            prontos.
          </h1>
          <p className={styles.subtitle}>
            A biblioteca de prompts e projetos que transformam IA em design de verdade.
            Copie os gratuitos em um clique — desbloqueie o Premium e tenha tudo, para sempre.
          </p>
        </header>

        <ProjectsGallery projects={projects} />
      </div>
    </div>
  );
}
