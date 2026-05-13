"use client";

import { useState } from "react";
import defaultProduct from "@/content/template-product.json";
import styles from "./page.module.css";

type Product = typeof defaultProduct & { features: string[] };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const [form, setForm] = useState<Product>({ ...defaultProduct });
  const [featuresText, setFeaturesText] = useState(defaultProduct.features.join("\n"));
  const [stackText, setStackText] = useState(defaultProduct.stack.join(", "));

  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setAuthed(true);
    setAuthError("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");

    const payload: Product = {
      ...form,
      features: featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
      stack: stackText.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data: payload }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? "Erro desconhecido.");
        setStatus("error");
      } else {
        setStatus("ok");
      }
    } catch {
      setErrorMsg("Erro de conexão.");
      setStatus("error");
    }
  }

  if (!authed) {
    return (
      <div className={styles.page}>
        <div className={styles.authBox}>
          <p className={styles.authLabel}>[ ADMIN ]</p>
          <h1 className={styles.authTitle}>Painel do Template</h1>
          <form onSubmit={handleAuth} className={styles.authForm}>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              autoFocus
            />
            <button type="submit" className={styles.btn}>Entrar →</button>
          </form>
          {authError && <p className={styles.error}>{authError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.pageHeader}>
          <p className={styles.pageLabel}>[ ADMIN ]</p>
          <h1 className={styles.pageTitle}>Editar Template</h1>
          <p className={styles.pageHint}>
            Ao salvar, o arquivo é commitado no GitHub e a Vercel faz o deploy automático em ~1 minuto.
          </p>
        </div>

        <form onSubmit={handleSave} className={styles.form}>
          <Field label="Título">
            <input className={styles.input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>

          <Field label="Subtítulo">
            <input className={styles.input} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          </Field>

          <Field label="Descrição">
            <textarea className={styles.textarea} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          </Field>

          <Field label="Preço (ex: R$ 97)">
            <input className={styles.input} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </Field>

          <Field label="Link da Hotmart">
            <input className={styles.input} type="url" placeholder="https://..." value={form.hotmartUrl} onChange={(e) => setForm({ ...form, hotmartUrl: e.target.value })} />
          </Field>

          <Field label="URL do vídeo (mp4 ou YouTube embed)">
            <input className={styles.input} type="url" placeholder="https://..." value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} />
          </Field>

          <Field label="Badge (ex: Novo — deixe vazio para ocultar)">
            <input className={styles.input} value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
          </Field>

          <Field label="Itens inclusos (um por linha)">
            <textarea className={styles.textarea} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={7} />
          </Field>

          <Field label="Stack (separados por vírgula)">
            <input className={styles.input} value={stackText} onChange={(e) => setStackText(e.target.value)} />
          </Field>

          <Field label="Link do repositório GitHub">
            <input className={styles.input} type="url" value={form.repoUrl} onChange={(e) => setForm({ ...form, repoUrl: e.target.value })} />
          </Field>

          <div className={styles.formFooter}>
            <button type="submit" className={styles.saveBtn} disabled={status === "saving"}>
              {status === "saving" ? "Salvando..." : "Salvar e publicar →"}
            </button>

            {status === "ok" && (
              <p className={styles.success}>✓ Salvo. Deploy em andamento na Vercel.</p>
            )}
            {status === "error" && (
              <p className={styles.error}>{errorMsg}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "var(--font-primary)", fontSize: "0.78rem", fontWeight: 600, color: "var(--color-subtitle)", marginBottom: "0.4rem", letterSpacing: "0.02em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
