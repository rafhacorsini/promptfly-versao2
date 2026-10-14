import styles from "./ZipContents.module.css";

const ARQUIVOS = [
  { f: "LEIA-ME.md", d: "Comece por aqui. Explica como usar em 3 passos." },
  { f: "ANTI_PATTERNS.md", d: "A lista do que a IA nunca pode fazer. Vale pra todos os estilos." },
  { f: "DESIGN.md", d: "As regras do estilo: tokens, componentes, faça e não faça, guia pra IA." },
  { f: "tokens.css", d: "Os mesmos valores em variáveis CSS, pra importar no projeto." },
  { f: "theme.tailwind.css", d: "Os mesmos valores no formato do Tailwind v4." },
  { f: "tokens.json", d: "Os mesmos valores em JSON, pra qualquer ferramenta." },
];

/** O que vem dentro do .zip: árvore de pastas + o que é cada arquivo. */
export default function ZipContents() {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        <pre className={styles.tree} aria-label="Pastas dentro do arquivo .zip">
          {`promptfly-design-pack/
├── LEIA-ME.md
├── ANTI_PATTERNS.md
└── vitrine/   ← seu estilo
    ├── DESIGN.md
    ├── tokens.css
    ├── theme.tailwind.css
    └── tokens.json`}
        </pre>
        <div className={styles.list} role="list">
          {ARQUIVOS.map((a) => (
            <div key={a.f} className={styles.row} role="listitem">
              <span className={styles.file}>{a.f}</span>
              <span className={styles.desc}>{a.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
