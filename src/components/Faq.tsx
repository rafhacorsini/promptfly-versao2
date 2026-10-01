"use client";

import { useState } from "react";
import styles from "./Faq.module.css";

const faqs = [
  {
    question: "Preciso saber programar?",
    answer:
      "Pra copiar e usar, não. Os prompts e templates funcionam colando na IA. Mas saber o básico de HTML, CSS e como rodar um projeto ajuda muito a ajustar o resultado e publicar o site."
  },
  {
    question: "Funciona com qual IA?",
    answer:
      "Os prompts funcionam no Claude, no ChatGPT e no Gemini. As skills e os arquivos de contexto, como o CLAUDE.md, são feitos pro Claude Code. É ele que eu uso nos meus sites."
  },
  {
    question: "O que é grátis e o que é Premium?",
    answer:
      "Os recursos que aparecem nos reels são grátis e não pedem cadastro. O Premium libera a mentoria pronta (o meu método, do primeiro site ao primeiro cliente, em guias exclusivos), todos os templates de sites, as skills pro Claude Code, o grupo VIP e os templates novos que eu lançar. É um pagamento único pela Hotmart, com garantia de 7 dias."
  },
  {
    question: "Com que frequência sai recurso novo?",
    answer:
      "Recurso grátis sai junto com os reels. No Premium, todo template novo que entra na biblioteca já fica liberado pra você, sem pagar de novo."
  },
  {
    question: "Como recebo o que pedi no reel?",
    answer:
      "Comenta a palavra que aparece no vídeo. Você recebe o link no direct, e ele abre direto no recurso, é só copiar. Se não chegou, olha a aba de solicitações de mensagem do Instagram."
  }
];

function FaqItem({
  question,
  answer,
  isOpen,
  onClick
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}>
      <button className={styles.questionBtn} onClick={onClick}>
        <h3 className={styles.question}>{question}</h3>
        <span className={styles.icon}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div className={styles.answerWrapper}>
        <div className={styles.answerInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // O primeiro começa aberto

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        {/* Header alinhado com o padrão de grid */}
        <div className={styles.header}>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>[ FAQ ]</span>
          </div>
          <div className={styles.titleBlock}>
            <h2 className={styles.headline}>Perguntas frequentes</h2>
            <p className={styles.subtext}>
              O que todo mundo pergunta antes de copiar o primeiro recurso.
            </p>
          </div>
        </div>

        {/* Lista de FAQ alinhada com o bloco da direita */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
