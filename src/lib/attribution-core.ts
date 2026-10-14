// Funções puras de origem (UTM) e do código de origem do checkout Hotmart.
// Sem imports e sem acesso a window: rodam no navegador, no servidor e nos testes (npm test).

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/** Limpa um valor de origem: minúsculo, sem espaços e só com letras, números, ponto, underscore, hífen e pipe. */
export function cleanTag(value: unknown, max = 60): string {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._|-]/g, "")
    .slice(0, max);
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^(www|l|m)\./, "");
  } catch {
    return "";
  }
}

/** True quando a URL tem algum parâmetro utm_ explícito. */
export function hasExplicitUtm(search: string): boolean {
  const p = new URLSearchParams(search);
  return Boolean(p.get("utm_source") || p.get("utm_campaign") || p.get("utm_medium"));
}

/**
 * Lê a origem da visita: os utm_* da URL e, se não houver utm_source,
 * o site de onde a pessoa veio (referrer), quando for outro domínio.
 */
export function parseAttribution(search: string, referrer: string, selfHost: string): Attribution {
  const p = new URLSearchParams(search);
  const out: Attribution = {};
  const source = cleanTag(p.get("utm_source"));
  const medium = cleanTag(p.get("utm_medium"));
  const campaign = cleanTag(p.get("utm_campaign"));
  if (source) out.utm_source = source;
  if (medium) out.utm_medium = medium;
  if (campaign) out.utm_campaign = campaign;

  if (!out.utm_source && referrer) {
    const host = hostOf(referrer);
    const self = selfHost.toLowerCase().replace(/^www\./, "");
    if (host && host !== self) {
      out.utm_source = cleanTag(host);
      out.utm_medium = out.utm_medium || "referral";
    }
  }
  return out;
}

/**
 * Decide o que fica salvo. Um link com utm explícito sempre vence. Sem utm,
 * mantém o que já estava salvo e só usa o referrer se não houver nada.
 */
export function mergeAttribution(stored: Attribution, fresh: Attribution, explicit: boolean): Attribution {
  if (explicit) return fresh;
  if (stored.utm_source || stored.utm_campaign) return stored;
  return fresh;
}

const HOTMART_CHECKOUT_HOSTS = new Set(["pay.hotmart.com", "go.hotmart.com"]);

/**
 * Código de origem do Hotmart: a campanha (ou, sem campanha, a origem).
 * Regras do Hotmart: até 30 caracteres e sem underscore (reservado do sistema).
 * O pipe (|) é permitido para separar características.
 */
export function hotmartCode(attr: Attribution): string {
  const raw = attr.utm_campaign || attr.utm_source || "";
  return cleanTag(raw.replace(/_/g, "-"), 30);
}

/**
 * Acrescenta sck e src ao link de checkout do Hotmart.
 * Devolve null se o link não for do checkout, se não houver código ou se já tiver origem.
 */
export function decorateHotmartHref(href: string, code: string, base = "https://promptfly.com.br"): string | null {
  if (!code) return null;
  let url: URL;
  try {
    url = new URL(href, base);
  } catch {
    return null;
  }
  if (!HOTMART_CHECKOUT_HOSTS.has(url.hostname)) return null;
  if (url.searchParams.get("sck") || url.searchParams.get("src")) return null;
  url.searchParams.set("sck", code);
  url.searchParams.set("src", code);
  return url.toString();
}
