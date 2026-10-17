import { createHash, randomInt, timingSafeEqual } from "crypto";

// Funções puras de segurança (sem Redis), cobertas pelo npm test.

/**
 * Compara dois segredos em tempo constante: o tempo de resposta não revela
 * quantos caracteres do palpite estão certos. Senha vazia nunca confere.
 */
export function safeEqual(a: unknown, b: unknown): boolean {
  if (typeof a !== "string" || typeof b !== "string" || a.length === 0 || b.length === 0) return false;
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Código de login de 6 dígitos, com gerador criptográfico (Math.random é previsível). */
export function generateLoginCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

/**
 * IP de quem fez o pedido. Na Vercel, x-real-ip e x-forwarded-for são escritos
 * pela própria Vercel (o valor mandado pelo navegador é descartado).
 */
export function clientIp(headers: Headers): string {
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  return headers.get("x-forwarded-for")?.split(",")[0].trim() || "anon";
}
