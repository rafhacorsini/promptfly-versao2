// Origem da visita guardada no navegador (first-party, sem dado pessoal): só a
// campanha e a origem do link. Usada no formulário de e-mail, no checkout e nos eventos.
import {
  type Attribution,
  hasExplicitUtm,
  mergeAttribution,
  parseAttribution,
} from "./attribution-core";

const KEY = "pf_attr";

function readStored(): Attribution {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/** Lê a origem da URL atual, junta com a salva e guarda o resultado. */
export function captureAttribution(): Attribution {
  const fresh = parseAttribution(location.search, document.referrer, location.hostname);
  const merged = mergeAttribution(readStored(), fresh, hasExplicitUtm(location.search));
  try {
    localStorage.setItem(KEY, JSON.stringify(merged));
  } catch {
    /* navegação privada: segue sem guardar */
  }
  return merged;
}

/** Origem salva (ou a da URL atual, se ainda não foi capturada). */
export function getAttribution(): Attribution {
  const stored = readStored();
  return stored.utm_source || stored.utm_campaign ? stored : captureAttribution();
}
