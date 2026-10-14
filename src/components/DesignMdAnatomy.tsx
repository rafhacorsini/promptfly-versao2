import styles from "./DesignMdAnatomy.module.css";

const PARTES = [
  { n: "01", t: "Tokens", d: "As cores, fontes, tamanhos, cantos, sombras e espaços, cada um com o valor exato." },
  { n: "02", t: "Contraste", d: "A prova de que todo texto dá pra ler em cima do fundo onde ele fica." },
  { n: "03", t: "Componentes", d: "Como é cada peça do site: menu, botão, hero, cartão, campo de e-mail." },
  { n: "04", t: "Faça e não faça", d: "As regras de uso: onde cada cor entra e o que nunca combinar." },
  { n: "05", t: "Imagens e layout", d: "Que tipo de foto usar e como a página se organiza de cima a baixo." },
  { n: "06", t: "Guia pra IA", d: "Pedidos prontos pra colar e os tokens em CSS e Tailwind, prontos pra usar." },
];

/** As 6 partes de um DESIGN.md completo, em cartões. */
export default function DesignMdAnatomy() {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid} role="list">
        {PARTES.map((p) => (
          <div key={p.n} className={styles.card} role="listitem">
            <span className={styles.n}>{p.n}</span>
            <span className={styles.t}>{p.t}</span>
            <span className={styles.d}>{p.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
