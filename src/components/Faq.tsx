"use client";

import { useState } from "react";
import styles from "./Faq.module.css";

const faqs = [
  {
    question: "Preciso saber programar para usar o Promptfly?",
    answer:
      "Não. O Promptfly ensina técnicas de inteligência artificial e engenharia de prompt de forma clara e acessível. Você não precisa escrever uma linha de código — precisa apenas aprender a se comunicar melhor com a IA."
  },
  {
    question: "É realmente gratuito?",
    answer:
      "Sim, 100%. Todo o conteúdo do Promptfly — artigos, guias, técnicas e frameworks de prompt — é gratuito e aberto. Acreditamos que o conhecimento sobre IA deve ser acessível a todos, não apenas a quem pode pagar por cursos caros."
  },
  {
    question: "Com que frequência os conteúdos são atualizados?",
    answer:
      "Semanalmente. O campo da inteligência artificial evolui muito rápido, e nosso conteúdo acompanha esse ritmo. Publicamos novos artigos, atualizamos técnicas existentes e testamos os frameworks com os modelos mais recentes do mercado."
  },
  {
    question: "Qual a diferença entre o Promptfly e um curso de IA?",
    answer:
      "Cursos tradicionais ensinam teoria isolada. O Promptfly ensina um método aplicável: você aprende a estruturar prompts, dominar técnicas como Chain-of-Thought e Few-Shot, e aplicar isso no mesmo dia no seu trabalho real. É conhecimento prático, não acadêmico."
  },
  {
    question: "Posso aplicar o que aprendo na minha empresa?",
    answer:
      "Com certeza. Nossos guias são construídos com casos de uso reais em marketing, vendas, operações e gestão. Você aprende técnicas de IA que geram resultado direto no seu dia a dia profissional — independente do setor."
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
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Header alinhado com o padrão de grid */}
        <div className={styles.header}>
          <div className={styles.tagContainer}>
            <span className={styles.tag}>[ FAQ ]</span>
          </div>
          <div className={styles.titleBlock}>
            <h2 className={styles.headline}>Perguntas frequentes</h2>
            <p className={styles.subtext}>
              Tudo o que você precisa saber antes de transformar sua forma de
              trabalhar com inteligência artificial.
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
