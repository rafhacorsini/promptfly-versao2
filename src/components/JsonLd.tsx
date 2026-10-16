/** Renderiza um bloco de dados estruturados (JSON-LD). Server component, sem estilo. */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  // "<" escapado pra um texto com "</script>" nunca fechar a tag antes da hora.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
