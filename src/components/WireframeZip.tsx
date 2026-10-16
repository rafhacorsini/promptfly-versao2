// Mesmo visual do ZipContents (árvore de pastas + lista do que é cada arquivo).
import styles from "./ZipContents.module.css";

const ARQUIVOS = [
  { f: "LEIA-ME.md", d: "Comece por aqui. Como mandar o wireframe para a IA, em 3 passos." },
  { f: "PROMPTS.md", d: "Os pedidos prontos para copiar e colar junto com a imagem." },
  { f: "wireframes/", d: "As imagens dos wireframes. É isto que você manda para a IA." },
  { f: "exemplos/", d: "Os sites que a IA montou a partir de cada wireframe, para comparar." },
];

export default function WireframeZip() {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        <pre className={styles.tree} aria-label="Pastas dentro do arquivo .zip">
          {`promptfly-wireframe-pack/
├── LEIA-ME.md
├── PROMPTS.md
├── wireframes/
│   ├── wireframe-01.png
│   ├── wireframe-02.png
│   └── ...
└── exemplos/
    ├── site-01.jpg
    └── ...`}
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
