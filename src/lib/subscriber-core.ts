// Funções puras sobre os dados do inscrito (sem imports: rodam no servidor, no navegador e nos testes).

/**
 * Primeiro nome limpo para usar no e-mail ("Oi, Maria"): só o primeiro nome,
 * só letras (com acento), apóstrofo e hífen, a primeira letra maiúscula, até 30 caracteres.
 * Devolve "" se não sobrar nada (o campo é opcional).
 */
export function cleanFirstName(value: unknown): string {
  const first = String(value ?? "")
    .normalize("NFC")
    .trim()
    .split(/\s+/)[0] ?? "";
  const clean = first.replace(/[^\p{L}'’-]/gu, "").replace(/^[-'’]+|[-'’]+$/g, "").slice(0, 30);
  if (!clean) return "";
  return clean.charAt(0).toLocaleUpperCase("pt-BR") + clean.slice(1).toLocaleLowerCase("pt-BR");
}

export const STYLE_LABELS: Record<string, string> = {
  vitrine: "Vitrine",
  noite: "Noite",
  editorial: "Editorial",
  todos: "Todos",
};

/** Campos personalizados enviados ao Beehiiv. Só entra o que existe. */
export function buildCustomFields(opts: { firstName?: unknown; style?: unknown }): { name: string; value: string }[] {
  const fields: { name: string; value: string }[] = [];
  const name = cleanFirstName(opts.firstName);
  if (name) fields.push({ name: "First Name", value: name });
  const style = typeof opts.style === "string" ? STYLE_LABELS[opts.style] : undefined;
  if (style) fields.push({ name: "Design Pack Style", value: style });
  return fields;
}
