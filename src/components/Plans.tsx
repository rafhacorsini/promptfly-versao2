import premium from "@/content/premium.json";
import TrackedLink from "./TrackedLink";
import styles from "./Plans.module.css";

/** Seção "Grátis vs Premium". Dois cards em vez de tabela: empilham bem a 375px. */
export default function Plans({
  premiumTemplates,
  price,
}: {
  premiumTemplates: number;
  price: string | null;
}) {
  const freeItems = [
    "Os prompts, snippets e arquivos de contexto dos reels",
    "O template Alba Residência completo",
    "Os guias passo a passo",
    "Sem cadastro: abriu, copiou",
  ];

  const premiumItems = [
    "Tudo que é grátis",
    `Os ${premiumTemplates} templates de sites cinematográficos, com o prompt completo`,
    "As skills cinematográficas pro Claude Code",
    "Grupo VIP no Discord",
    "Todo template novo que entrar já é seu, sem pagar de novo",
  ];

  return (
    <section className={styles.section} id="premium">
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>[ GRÁTIS VS PREMIUM ]</span>
          </div>
          <h2 className={styles.headline}>
            Grátis pra começar.{" "}
            <span className={styles.headlineFade}>Premium pra ter tudo.</span>
          </h2>
        </div>

        <div className={styles.cards}>
          <div className={styles.cardFree}>
            <div className={styles.cardTop}>
              <h3 className={styles.cardTitle}>Grátis</h3>
              <p className={styles.price}>R$ 0 · sem cadastro</p>
            </div>
            <div className={styles.dotDivider} />
            <ul className={styles.list}>
              {freeItems.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.check}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#biblioteca" className={styles.btnLight}>
              Explorar a biblioteca
            </a>
          </div>

          <div className={styles.cardPremium}>
            <div className={styles.cardTop}>
              <h3 className={styles.cardTitle}>Premium</h3>
              <p className={styles.price}>
                {price ? `${price} · pagamento único` : "Pagamento único · acesso vitalício"}
              </p>
            </div>
            <div className={styles.dotDivider} />
            <ul className={styles.list}>
              {premiumItems.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.check}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <TrackedLink
              href={premium.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnAccent}
              event="premium_cta_click"
              data={{ posicao: "home_planos" }}
            >
              Quero o Premium →
            </TrackedLink>
            <p className={styles.fine}>Hotmart · garantia de 7 dias</p>
          </div>
        </div>
      </div>
    </section>
  );
}
