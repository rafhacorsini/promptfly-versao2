import { redis } from "./redis";

/**
 * Conta uma tentativa na janela e diz se ainda está dentro do limite.
 * As chaves rl:* expiram sozinhas no fim da janela. Se o Redis falhar,
 * libera (o limite é proteção extra, não pode derrubar o site).
 */
export async function withinLimit(name: string, id: string, limit: number, windowSec: number): Promise<boolean> {
  try {
    const bucket = `rl:${name}:${id}:${Math.floor(Date.now() / (windowSec * 1000))}`;
    const n = await redis.incr(bucket);
    if (n === 1) await redis.expire(bucket, windowSec);
    return n <= limit;
  } catch (err) {
    console.error(`rate-limit ${name}:`, err);
    return true;
  }
}

/** Quantas falhas a chave já tem (sem contar uma nova). */
export async function failures(key: string): Promise<number> {
  try {
    return Number((await redis.get<number>(key)) ?? 0);
  } catch {
    return 0;
  }
}

/** Registra uma falha; a contagem some depois de windowSec. */
export async function recordFailure(key: string, windowSec: number): Promise<number> {
  try {
    const n = await redis.incr(key);
    if (n === 1) await redis.expire(key, windowSec);
    return n;
  } catch {
    return 0;
  }
}
