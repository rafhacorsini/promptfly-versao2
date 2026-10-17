import { NextRequest, NextResponse } from "next/server";
import { clientIp, safeEqual } from "./security-core";
import { failures, recordFailure } from "./rate-limit";

const MAX_FAILURES = 5;
const WINDOW = 60 * 60; // 1 hora

/**
 * Confere a senha do admin. Devolve a resposta de erro (401/429) ou null se a senha confere.
 * Depois de 5 senhas erradas, o IP fica bloqueado por 1 hora (mesmo que acerte).
 */
export async function checkAdminPassword(req: NextRequest, password: unknown): Promise<NextResponse | null> {
  const key = `rl:admin-fail:${clientIp(req.headers)}`;
  if ((await failures(key)) >= MAX_FAILURES) {
    return NextResponse.json({ error: "Muitas tentativas. Tente de novo em 1 hora." }, { status: 429 });
  }
  if (!safeEqual(password, process.env.ADMIN_PASSWORD)) {
    await recordFailure(key, WINDOW);
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }
  return null;
}
