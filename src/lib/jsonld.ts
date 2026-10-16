// Montadores de dados estruturados (schema.org). Só devolvem objetos: quem renderiza é o <JsonLd />.
// Regra: só entra aqui o que está visível na página. Nada de avaliação, nota ou número inventado.

const BASE = "https://promptfly.com.br";

export interface FaqItem {
  q: string;
  a: string;
}

/** Perguntas e respostas visíveis na página (as mesmas do accordion). */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "pt-BR",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** "R$ 129,90" vira "129.90". Devolve null se não achar um número. */
export function priceToDecimal(price: string | null | undefined): string | null {
  if (!price) return null;
  const m = /(\d{1,3}(?:\.\d{3})*|\d+)(?:,(\d{1,2}))?/.exec(price);
  if (!m) return null;
  const inteiro = m[1].replace(/\./g, "");
  const centavos = (m[2] ?? "0").padEnd(2, "0");
  return `${inteiro}.${centavos}`;
}

/** Produto à venda. Sem preço válido, sai sem `offers` (nunca inventa). */
export function productJsonLd(p: { name: string; description: string; path: string; price: string | null }) {
  const decimal = priceToDecimal(p.price);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    url: `${BASE}${p.path}`,
    image: `${BASE}/og-image.png`,
    brand: { "@type": "Brand", name: "Promptfly" },
    ...(decimal
      ? {
          offers: {
            "@type": "Offer",
            url: `${BASE}${p.path}`,
            price: decimal,
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "Promptfly", url: BASE },
          },
        }
      : {}),
  };
}
