"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./MentoriaForm.module.css";

const IA_OPTIONS = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Outro"];

const HORARIOS = ["09:00", "11:00", "14:00", "16:00", "19:00"];

const NIVEIS = ["Iniciante", "Intermediário", "Avançado"];

const CLAUDE_USO = [
  "Sim, uso com frequência",
  "Já usei, mas não é minha ferramenta principal",
  "Nunca usei",
];

const CREDITOS = [
  "Sim, posso aumentar o limite antes da sessão",
  "Posso, mas preciso de ajuda para saber como",
  "Não sei se meu plano permite",
  "Não, uso apenas o plano gratuito",
];

function formatDatePtBR(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function toISODate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function MentoriaForm() {
  const { minDateISO, defaultDateISO, suggestedLabel } = useMemo(() => {
    const today = new Date();
    const min = new Date(today);
    min.setDate(today.getDate() + 8);
    const suggested = new Date(today);
    suggested.setDate(today.getDate() + 9);
    return {
      minDateISO: toISODate(min),
      defaultDateISO: toISODate(suggested),
      suggestedLabel: `${formatDatePtBR(min)} ou ${formatDatePtBR(suggested)}`,
    };
  }, []);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ferramentasIA, setFerramentasIA] = useState<string[]>([]);
  const [usaClaude, setUsaClaude] = useState(CLAUDE_USO[0]);
  const [nivel, setNivel] = useState(NIVEIS[0]);
  const [creditos, setCreditos] = useState(CREDITOS[0]);
  const [objetivo, setObjetivo] = useState("");
  const [projetoAtual, setProjetoAtual] = useState("");
  const [dataPreferida, setDataPreferida] = useState(defaultDateISO);
  const [horario, setHorario] = useState(HORARIOS[0]);
  const [observacoes, setObservacoes] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleFerramenta(nome: string) {
    setFerramentasIA((prev) =>
      prev.includes(nome) ? prev.filter((f) => f !== nome) : [...prev, nome]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/mentoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          whatsapp,
          ferramentasIA,
          usaClaude,
          nivel,
          creditos,
          objetivo,
          projetoAtual,
          dataPreferida,
          horario,
          observacoes,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? "Erro desconhecido.");
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <span className={styles.tag}>[ MENTORIA ]</span>
          <h1 className={styles.title}>Pedido enviado ✓</h1>
          <p className={styles.hint}>
            Recebemos suas informações. Vamos confirmar o melhor horário com você
            por e-mail ou WhatsApp em breve.
          </p>
          <Link href="/" className={styles.back}>
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          ← Voltar
        </Link>
        <span className={styles.tag}>[ MENTORIA ]</span>
        <h1 className={styles.title}>Agende sua mentoria 1:1</h1>
        <p className={styles.hint}>
          Conte um pouco sobre você e seu projeto para que a sessão seja preparada
          sob medida. Datas disponíveis a partir de {suggestedLabel}.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Field label="Nome completo">
            <input
              className={styles.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Field>

          <Field label="E-mail">
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          <Field label="WhatsApp (com DDD)">
            <input
              className={styles.input}
              placeholder="(11) 91234-5678"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </Field>

          <Field label="Quais IAs você usa no dia a dia?">
            <div className={styles.checkGroup}>
              {IA_OPTIONS.map((op) => (
                <label key={op} className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={ferramentasIA.includes(op)}
                    onChange={() => toggleFerramenta(op)}
                  />
                  {op}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Você usa o Claude (Anthropic)?">
            <select
              className={styles.input}
              value={usaClaude}
              onChange={(e) => setUsaClaude(e.target.value)}
            >
              {CLAUDE_USO.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Seu nível de experiência com IA">
            <select
              className={styles.input}
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
            >
              {NIVEIS.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Consegue aumentar o limite de créditos da IA para a mentoria não travar por falta de créditos?">
            <select
              className={styles.input}
              value={creditos}
              onChange={(e) => setCreditos(e.target.value)}
            >
              {CREDITOS.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Qual o principal objetivo da mentoria?">
            <textarea
              className={styles.textarea}
              rows={3}
              placeholder="Ex: quero aprender a estruturar prompts para um agente de atendimento"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              required
            />
          </Field>

          <Field label="Conte sobre seu projeto atual (o que já tentou, onde travou)">
            <textarea
              className={styles.textarea}
              rows={4}
              value={projetoAtual}
              onChange={(e) => setProjetoAtual(e.target.value)}
              required
            />
          </Field>

          <Field label="Data preferida">
            <input
              type="date"
              className={styles.input}
              min={minDateISO}
              value={dataPreferida}
              onChange={(e) => setDataPreferida(e.target.value)}
              required
            />
          </Field>

          <Field label="Horário preferido">
            <select
              className={styles.input}
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            >
              {HORARIOS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Observações adicionais (opcional)">
            <textarea
              className={styles.textarea}
              rows={3}
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </Field>

          <div className={styles.formFooter}>
            <button type="submit" className={styles.saveBtn} disabled={status === "sending"}>
              {status === "sending" ? "Enviando..." : "Enviar pedido de mentoria →"}
            </button>
            {status === "error" && <p className={styles.error}>{errorMsg}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}
