"use client";

import Image from "next/image";
import styles from "./Reviews.module.css";

interface Review {
  id: number;
  quote: string;
  name: string;
  role: string;
  rating: string;
  initials: string;
  avatarColor: string;
}

const col1Reviews: Review[] = [
  {
    id: 1,
    quote:
      "O que mais me impressionou foi o pensamento por trás dos prompts. Não era sobre adicionar ferramentas — era sobre redesenhar como eu trabalho com IA.",
    name: "Lucas M.",
    role: "Fundador de Startup",
    rating: "5.0",
    initials: "L",
    avatarColor: "#c8b4a0",
  },
  {
    id: 2,
    quote:
      "Meu tempo de entrega caiu significativamente, mas o mais importante é que minha equipe se sente no controle. Os sistemas são construídos do jeito que a gente realmente trabalha.",
    name: "Daniela R.",
    role: "Head de Operações",
    rating: "4.9",
    initials: "D",
    avatarColor: "#a0b4c8",
  },
  {
    id: 3,
    quote:
      "O Promptfly me ajudou a substituir experimentos aleatórios por um sistema estruturado que funciona de verdade. A diferença não foi automação — foi clareza.",
    name: "Rafael T.",
    role: "Empreendedor Digital",
    rating: "5.0",
    initials: "R",
    avatarColor: "#a0c8b0",
  },
];

const col2Reviews: Review[] = [
  {
    id: 4,
    quote:
      "Pela primeira vez, a IA parece integrada ao meu fluxo de trabalho em vez de ficar de lado. As decisões ficaram mais rápidas e o ruído desapareceu.",
    name: "Fernanda C.",
    role: "Product Lead",
    rating: "5.0",
    initials: "F",
    avatarColor: "#c8c0a0",
  },
  {
    id: 5,
    quote:
      "Cada guia segue uma lógica que consigo reproduzir. Aprendi mais em uma semana do que em meses tentando sozinho com prompts genéricos.",
    name: "Bruno A.",
    role: "Desenvolvedor Independente",
    rating: "4.9",
    initials: "B",
    avatarColor: "#b4a0c8",
  },
  {
    id: 6,
    quote:
      "O Promptfly me ajudou a parar de usar IA de forma aleatória e começar a construir sistemas reais. Os resultados falam por si.",
    name: "Mariana L.",
    role: "Diretora de Marketing",
    rating: "5.0",
    initials: "M",
    avatarColor: "#c8a0b0",
  },
];

const allReviews = [...col1Reviews, ...col2Reviews];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewTop}>
        <span className={styles.quoteIcon}>&ldquo;</span>
        <div className={styles.ratingBadge}>
          <span className={styles.ratingNum}>{review.rating}</span>
          <span className={styles.ratingStar}>★</span>
        </div>
      </div>
      <p className={styles.reviewText}>{review.quote}</p>
      <div className={styles.reviewDivider} />
      <div className={styles.reviewer}>
        <div
          className={styles.reviewerAvatar}
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.initials}
        </div>
        <div>
          <p className={styles.reviewerName}>{review.name}</p>
          <p className={styles.reviewerRole}>{review.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <span className={styles.tag}>[ DEPOIMENTOS ]</span>
            <h2 className={styles.headline}>
              Confiado por quem
              <br />
              <span className={styles.headlineFade}>Constrói com IA</span>
            </h2>
          </div>
          <p className={styles.subtext}>
            Profissionais e empreendedores escolhem o Promptfly para transformar
            IA em resultados reais, com clareza e estrutura.
          </p>
        </div>

        {/* Content: 3 colunas */}
        <div className={styles.content}>

          {/* Card preto — estático */}
          <div className={styles.socialCard}>
            <div className={styles.socialTop}>
              <div className={styles.ratingBlock}>
                <span className={styles.ratingBig}>
                  4,9<span className={styles.ratingSlash}>/5</span>
                </span>
                <span className={styles.ratingLabel}>
                  Satisfação média
                  <br />
                  dos alunos
                </span>
              </div>
            </div>

            <div className={styles.socialBottom}>
              <div className={styles.socialRow}>
                <div className={styles.avatarGroup}>
                  {[1, 2, 3, 4].map((n) => (
                    <Image
                      key={n}
                      src={`/usuarios${n}.png`}
                      alt=""
                      width={28}
                      height={28}
                      className={styles.socialAvatar}
                    />
                  ))}
                </div>
                <div>
                  <div className={styles.stars}>★★★★★</div>
                  <span className={styles.socialCount}>
                    +600 profissionais confiam
                  </span>
                </div>
              </div>
              <div className={styles.socialDivider} />
              <p className={styles.socialBold}>
                Mais de 600 profissionais dependem do Promptfly.
              </p>
              <p className={styles.socialCaps}>
                ELES DOMINAM IA COM ESTRUTURA — E VOCÊ TAMBÉM PODE.
              </p>
            </div>
          </div>

          {/* Coluna 2: desce — apenas desktop */}
          <div className={`${styles.marqueeCol} ${styles.desktopOnly}`}>
            <div className={styles.trackDown}>
              {[...col1Reviews, ...col1Reviews].map((r, i) => (
                <ReviewCard key={`d-${r.id}-${i}`} review={r} />
              ))}
            </div>
          </div>

          {/* Coluna 3: sobe — apenas desktop */}
          <div className={`${styles.marqueeCol} ${styles.desktopOnly}`}>
            <div className={styles.trackUp}>
              {[...col2Reviews, ...col2Reviews].map((r, i) => (
                <ReviewCard key={`u-${r.id}-${i}`} review={r} />
              ))}
            </div>
          </div>

          {/* Coluna única mobile: todos os reviews subindo */}
          <div className={`${styles.marqueeCol} ${styles.mobileOnly}`}>
            <div className={styles.trackUp}>
              {[...allReviews, ...allReviews].map((r, i) => (
                <ReviewCard key={`m-${r.id}-${i}`} review={r} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
