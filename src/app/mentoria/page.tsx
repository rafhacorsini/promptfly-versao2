import type { Metadata } from "next";
import MentoriaForm from "@/components/MentoriaForm";

export const metadata: Metadata = {
  title: "Mentoria 1:1 | Promptfly",
  description:
    "Agende sua mentoria individual com a Promptfly. Conte sobre seu projeto e vamos preparar a sessão sob medida para você.",
  alternates: { canonical: "https://promptfly.com.br/mentoria" },
};

export default function MentoriaPage() {
  return <MentoriaForm />;
}
