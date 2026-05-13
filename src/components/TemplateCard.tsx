import product from "@/content/template-product.json";
import styles from "./TemplateCard.module.css";

export default function TemplateCard() {
  if (!product.hotmartUrl) return null;

  return (
    <div className={styles.card}>
      <div className={styles.topBar} />
      <div className={styles.inner}>
        <div className={styles.header}>
          {product.badge && <span className={styles.badge}>{product.badge}</span>}
          <span className={styles.label}>[ TEMPLATE ]</span>
        </div>

        <div className={styles.body}>
          <div className={styles.textCol}>
            <h3 className={styles.title}>{product.title}</h3>
            <p className={styles.subtitle}>{product.subtitle}</p>
            <p className={styles.trust}>Entrega imediata · Acesso vitalício</p>
          </div>
          <div className={styles.ctaCol}>
            <span className={styles.price}>{product.price}</span>
            <a
              href={product.hotmartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
            >
              Quero o template →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
