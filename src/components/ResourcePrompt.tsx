import { getResource } from "@/lib/resources";
import CopyPromptBlock from "./CopyPromptBlock";

/**
 * Bloco de copiar dentro de um guia, puxando o texto do recurso em
 * content/recursos/. Assim o guia e o /r/<slug> da DM usam o mesmo arquivo.
 */
export default function ResourcePrompt({ slug }: { slug: string }) {
  const r = getResource(slug);
  if (!r?.content) return null;

  return (
    <CopyPromptBlock guia={slug} label={r.contentLabel ?? "Prompt"}>
      <pre>
        <code>{r.content}</code>
      </pre>
    </CopyPromptBlock>
  );
}
