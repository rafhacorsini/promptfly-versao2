import product from "@/content/template-product.json";
import styles from "./TemplateCTAInline.module.css";

export default function TemplateCTAInline() {
  if (!product.hotmartUrl) return null;

  return (
    <div className={styles.wrap}>
      <p className={styles.eyebrow}>Quer o código pronto?</p>
      <p className={styles.text}>
        O template completo com todas as animações, arquivos de instrução para IA e documentação está disponível por <strong>{product.price}</strong>.
      </p>
      <a
        href={product.hotmartUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        Pegar o template →
      </a>
    </div>
  );
}
