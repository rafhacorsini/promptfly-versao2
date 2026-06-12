export interface Category {
  label: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Record<string, Category> = {
  fundamentos: {
    label: "Fundamentos",
    description: "O que é IA, LLMs e engenharia de prompt — do zero",
    icon: "◎",
  },
  tecnicas: {
    label: "Técnicas",
    description: "Chain-of-Thought, Few-Shot, Zero-Shot e mais",
    icon: "⌬",
  },
  prompts: {
    label: "Prompts Prontos",
    description: "Templates prontos para copiar e usar hoje",
    icon: "◻",
  },
  modelos: {
    label: "Modelos",
    description: "GPT-4o, Claude, Gemini — quando usar cada um",
    icon: "◈",
  },
  llms: {
    label: "LLMs",
    description: "Como os modelos de linguagem funcionam por dentro",
    icon: "⬡",
  },
  agentes: {
    label: "Agentes",
    description: "IA autônoma, automação e workflows com agentes",
    icon: "⟳",
  },
  ferramentas: {
    label: "Ferramentas",
    description: "Claude Code, Codex CLI, Cursor e stack de IA",
    icon: "⌧",
  },
  negocios: {
    label: "Negócios",
    description: "Como transformar sites com IA em clientes pagantes",
    icon: "◆",
  },
};

export function getCategoryMeta(slug: string): Category | null {
  return CATEGORIES[slug] ?? null;
}
