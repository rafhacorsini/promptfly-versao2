import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/session";
import { hasAccess } from "@/lib/access";
import { requiredProductId } from "@/lib/premium";
import projectsData from "@/content/projects.json";
import type { Project } from "@/components/ProjectCard";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = (projectsData as Project[]).find((p) => p.id === id);

  if (!project) {
    return NextResponse.json({ error: "Projeto não encontrado." }, { status: 404 });
  }

  // Projeto gratuito: prompt é público.
  if (project.isFree) {
    return NextResponse.json({ prompt: project.prompt });
  }

  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ error: "Faça login para acessar." }, { status: 401 });
  }

  const productId = requiredProductId(project);
  if (!productId) {
    return NextResponse.json(
      { error: "Produto ainda não configurado." },
      { status: 403 }
    );
  }

  const allowed = await hasAccess(email, productId);
  if (!allowed) {
    return NextResponse.json({ error: "Você ainda não comprou este projeto." }, { status: 403 });
  }

  return NextResponse.json({ prompt: project.prompt });
}
