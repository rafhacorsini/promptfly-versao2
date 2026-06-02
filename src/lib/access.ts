import { redis } from "./redis";

// Modelo de dados:
//   access:{email}  ->  SET com os IDs de produto Hotmart que o e-mail comprou.
// O e-mail é sempre normalizado (minúsculo, sem espaços).

function key(email: string) {
  return `access:${email.trim().toLowerCase()}`;
}

/** Libera o acesso de um e-mail a um produto Hotmart. */
export async function grantAccess(email: string, productId: string) {
  await redis.sadd(key(email), String(productId));
}

/** Revoga o acesso (reembolso / chargeback / cancelamento). */
export async function revokeAccess(email: string, productId: string) {
  await redis.srem(key(email), String(productId));
}

/** Lista os IDs de produto que o e-mail comprou. */
export async function getPurchasedProducts(email: string): Promise<string[]> {
  const items = await redis.smembers(key(email));
  return (items ?? []).map(String);
}

/** Verifica se o e-mail tem acesso a um produto específico. */
export async function hasAccess(email: string, productId: string): Promise<boolean> {
  const result = await redis.sismember(key(email), String(productId));
  return result === 1;
}
