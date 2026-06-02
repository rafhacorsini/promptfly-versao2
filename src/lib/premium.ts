import premiumData from "@/content/premium.json";

export const premium = premiumData;

/**
 * ID de produto Hotmart que libera um projeto.
 * Se o projeto não tiver um ID próprio, usa o produto Premium (tudo incluso).
 */
export function requiredProductId(project: { hotmartProductId?: string }): string {
  const own = project.hotmartProductId?.trim();
  return own && own.length > 0 ? own : premium.productId;
}
