"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@/lib/track";
import { Copy, Check, Lock } from "lucide-react";
import type { AnimacaoView } from "@/lib/animacoes";
import AnimacaoPreview from "./AnimacaoPreview";
import styles from "./AnimacaoCard.module.css";

type Kind = "prompt" | "code";
type Lockout = null | "login" | "premium" | "erro";

// Busca o conteúdo de uma animação Premium. Lança com o motivo quando não pode.
async function fetchConteudo(slug: string): Promise<{ prompt: string; code: string }> {
  const res = await fetch(`/api/animacoes/${slug}`);
  if (res.status === 401) throw new Error("login");
  if (res.status === 403) throw new Error("premium");
  if (!res.ok) throw new Error("erro");
  return res.json();
}

export default function AnimacaoCard({ a, numero }: { a: AnimacaoView; numero: number }) {
  const [copied, setCopied] = useState<Kind | null>(null);
  const [lockout, setLockout] = useState<Lockout>(null);
  const isFree = a.access === "free";

  async function copy(kind: Kind) {
    setLockout(null);
    try {
      if (isFree) {
        await navigator.clipboard.writeText((kind === "prompt" ? a.prompt : a.code) ?? "");
      } else {
        // No Safari/iOS, o clipboard precisa ser pedido dentro do clique:
        // o ClipboardItem aceita uma Promise e espera o fetch terminar.
        const text = fetchConteudo(a.slug).then((c) => (kind === "prompt" ? c.prompt : c.code));
        if (typeof ClipboardItem !== "undefined") {
          await navigator.clipboard.write([
            new ClipboardItem({ "text/plain": text.then((t) => new Blob([t], { type: "text/plain" })) }),
          ]);
        } else {
          await navigator.clipboard.writeText(await text);
        }
      }
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
      track("animacao_copy", { animacao: a.slug, tipo: kind, acesso: a.access });
    } catch (err) {
      const reason = err instanceof Error ? err.message : "erro";
      setLockout(reason === "login" || reason === "premium" ? reason : "erro");
    }
  }

  return (
    <article className={styles.card} id={a.slug}>
      <AnimacaoPreview slug={a.slug} label={a.nome} />

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.num}>{String(numero).padStart(2, "0")}</span>
          <span className={styles.tipo}>{a.tipo}</span>
          <span className={styles.access} data-access={a.access}>
            {isFree ? "Grátis" : "Premium"}
          </span>
        </div>
        <h3 className={styles.nome}>{a.nome}</h3>
        <p className={styles.desc}>{a.descricao}</p>

        <div className={styles.frase}>
          <span className={styles.fraseLabel}>Peça assim</span>
          <p>{a.frase}</p>
        </div>

        <div className={styles.actions}>
          {(["prompt", "code"] as Kind[]).map((kind) => (
            <button
              key={kind}
              type="button"
              className={kind === "prompt" ? styles.btnAccent : styles.btnGhost}
              data-copied={copied === kind}
              onClick={() => copy(kind)}
            >
              {copied === kind ? (
                <Check size={14} strokeWidth={2.4} />
              ) : isFree ? (
                <Copy size={14} strokeWidth={2.2} />
              ) : (
                <Lock size={14} strokeWidth={2.2} />
              )}
              {copied === kind ? "Copiado ✓" : kind === "prompt" ? "Copiar prompt" : "Copiar código"}
            </button>
          ))}
        </div>

        {lockout && (
          <p className={styles.lockout}>
            {lockout === "login" && (
              <>
                Essa animação é do Premium. <Link href="/premium">Ver o Premium</Link> ·{" "}
                <Link href="/projetos">Já tenho acesso</Link>
              </>
            )}
            {lockout === "premium" && (
              <>
                Sua conta ainda não é Premium. <Link href="/premium">Ver o Premium</Link>
              </>
            )}
            {lockout === "erro" && <>Não deu pra copiar. Tenta de novo.</>}
          </p>
        )}
      </div>
    </article>
  );
}
