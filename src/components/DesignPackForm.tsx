"use client";

import { useId, useState } from "react";
import { Check, Download, Mail } from "lucide-react";
import { getAttribution } from "@/lib/attribution";
import styles from "./DesignPackForm.module.css";

interface Preview {
  canvas: string;
  band: string;
  paper: string;
  ink: string;
  muted: string;
  line: string;
  cta: string;
  ctaInk: string;
  radiusCard: string;
  radiusPill: string;
  heroWeight: string;
}

interface StyleOption {
  id: string;
  name: string;
  mode: string;
  bestFor: string;
  preview: Preview;
}

type Status = "idle" | "loading" | "done" | "error";

/** Miniatura de uma página no estilo, desenhada só com os tokens dele. */
function StyleMock({ p }: { p: Preview }) {
  const vars = {
    "--m-canvas": p.canvas,
    "--m-band": p.band,
    "--m-paper": p.paper,
    "--m-ink": p.ink,
    "--m-muted": p.muted,
    "--m-line": p.line,
    "--m-cta": p.cta,
    "--m-cta-ink": p.ctaInk,
    "--m-radius-card": p.radiusCard,
    "--m-radius-pill": p.radiusPill,
    "--m-hero-weight": p.heroWeight,
  } as React.CSSProperties;

  return (
    <span className={styles.mock} style={vars} aria-hidden="true">
      <span className={styles.mNav}>
        <span className={styles.mLogo} />
        <span className={styles.mLinks}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.mNavPill} />
      </span>
      <span className={styles.mHero}>
        Seu site,
        <br />
        sem cara de IA.
      </span>
      <span className={styles.mText} />
      <span className={`${styles.mText} ${styles.mTextShort}`} />
      <span className={styles.mCta}>Comprar</span>
      <span className={styles.mBand}>
        <span className={styles.mCard} />
        <span className={styles.mCard} />
      </span>
    </span>
  );
}

export default function DesignPackForm({
  styles: options,
  howToHref = "/design-pack#como-usar",
}: {
  styles: StyleOption[];
  howToHref?: string;
}) {
  const uid = useId();
  const [style, setStyle] = useState(options[0]?.id ?? "vitrine");
  const [all, setAll] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const choice = all ? "todos" : style;
  const fileName = `promptfly-design-pack-${choice}.zip`;
  const chosenName = all ? "os 3 estilos" : `o estilo ${options.find((o) => o.id === style)?.name ?? style}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    try {
      const { utm_source, utm_campaign } = getAttribution();
      const res = await fetch("/api/design-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, style: choice, utm_source, utm_campaign }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Algo deu errado. Tente de novo.");
        setStatus("error");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setStatus("done");
    } catch {
      setError("Erro de conexão. Tente de novo.");
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      {/* Passo 1 */}
      <div className={styles.step}>
        <div className={styles.stepHead}>
          <span className={styles.num} aria-hidden="true">
            1
          </span>
          <div className={styles.stepText}>
            <p className={styles.stepTitle}>Escolha o estilo</p>
            <p className={styles.stepHint}>Clique na miniatura do visual que combina com o seu site.</p>
          </div>
        </div>

        <fieldset className={styles.fieldset}>
          <legend className={styles.srOnly}>Estilo do Design Pack</legend>
          <div className={styles.options}>
            {options.map((o) => {
              const checked = all || style === o.id;
              return (
                <label key={o.id} className={styles.option} data-checked={checked}>
                  <input
                    className={styles.radio}
                    type="radio"
                    name={`${uid}-style`}
                    value={o.id}
                    checked={style === o.id}
                    onChange={() => {
                      setStyle(o.id);
                      setAll(false);
                    }}
                  />
                  <StyleMock p={o.preview} />
                  <span className={styles.optionBody}>
                    <span className={styles.optionTop}>
                      <span className={styles.optionName}>{o.name}</span>
                      <span className={styles.badge}>{o.mode}</span>
                      <span className={styles.tick} aria-hidden="true">
                        <Check size={14} strokeWidth={3} />
                      </span>
                    </span>
                    <span className={styles.optionText}>Bom para: {o.bestFor}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <label className={styles.allToggle}>
          <input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} />
          <span>Quero os 3 estilos no mesmo arquivo</span>
        </label>
      </div>

      {/* Passo 2 */}
      <div className={styles.panel}>
        <div className={styles.stepHead}>
          <span className={`${styles.num} ${styles.numLight}`} aria-hidden="true">
            2
          </span>
          <div className={styles.stepText}>
            <p className={`${styles.stepTitle} ${styles.onDark}`}>Coloque seu e-mail e clique em baixar</p>
            <p className={styles.panelHint}>
              Você vai baixar <strong>{chosenName}</strong>, o ANTI_PATTERNS.md e o guia em PDF, num arquivo .zip.
            </p>
          </div>
        </div>

        {status === "done" ? (
          <div className={styles.success} role="status">
            <p className={styles.successTitle}>
              <Check size={20} strokeWidth={3} /> Download iniciado
            </p>
            <p className={styles.successText}>
              Procure o arquivo <strong>{fileName}</strong> na pasta Downloads do seu computador ou celular.
            </p>
            <p className={styles.successText}>
              <strong>Próximo passo:</strong> descompacte e abra o <strong>Guia-Design-Pack.pdf</strong>. É o ebook que explica tudo, do zero.
            </p>
            <div className={styles.successActions}>
              <button type="submit" className={styles.ghost}>
                Baixar de novo
              </button>
              <a href={howToHref} className={styles.ghostLink}>
                Ver como usar →
              </a>
            </div>
          </div>
        ) : (
          <>
            <label className={styles.emailLabel} htmlFor={`${uid}-email`}>
              Seu e-mail
            </label>
            <div className={styles.row}>
              <input
                id={`${uid}-email`}
                className={styles.input}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="seu@email.com"
                required
                value={email}
                disabled={status === "loading"}
                aria-describedby={`${uid}-notes`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
              />
              <button className={styles.button} type="submit" disabled={status === "loading"}>
                <Download size={18} strokeWidth={2.4} aria-hidden="true" />
                {status === "loading" ? "Preparando..." : "Baixar o .zip grátis"}
              </button>
            </div>

            {status === "error" && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <div id={`${uid}-notes`} className={styles.notes}>
              <p className={styles.note}>
                <Download size={16} strokeWidth={2.4} aria-hidden="true" />
                <span>
                  <strong>O arquivo baixa na hora, aqui nesta página.</strong>{" "}
                  Ele não é enviado por e-mail. Para receber, é só clicar em &quot;Baixar o .zip grátis&quot;.
                </span>
              </p>
              <p className={styles.note}>
                <Mail size={16} strokeWidth={2.4} aria-hidden="true" />
                <span>
                  Seu e-mail entra na newsletter do Promptfly: 1 e-mail por semana, e dá pra sair quando quiser.
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
