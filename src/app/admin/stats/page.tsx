"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface EventSummary {
  total: number;
  bySource: Record<string, number>;
  byCampaign: Record<string, number>;
  byValue: Record<string, number>;
  last14Days: Record<string, number>;
}
interface Stats {
  events: Record<string, EventSummary>;
  sales: { count: Record<string, string>; value: Record<string, string>; refunded: Record<string, string> };
  newsletter: { total: number; bySource: Record<string, number> } | null;
}

const NOMES: Record<string, string> = {
  premium_cta_click: "Cliques no Premium",
  free_template_click: "Cliques em template grátis",
  prompt_copy: "Prompts copiados",
  animacao_copy: "Animações copiadas",
  anchor_cta_click: "Cliques em botão de guia",
  newsletter_signup: "Inscrições (formulário da home)",
  design_pack_download: "Downloads do Design Pack",
  wireframe_pack_download: "Downloads do Wireframe Pack",
};

const ordenar = (o: Record<string, number | string>) =>
  Object.entries(o)
    .map(([k, v]) => [k, Number(v)] as const)
    .sort((a, b) => b[1] - a[1]);

function Tabela({ titulo, dados, formato }: { titulo: string; dados: Record<string, number | string>; formato?: (n: number) => string }) {
  const linhas = ordenar(dados);
  return (
    <div className={styles.table}>
      <h3 className={styles.h3}>{titulo}</h3>
      {linhas.length === 0 ? (
        <p className={styles.empty}>Sem dados ainda.</p>
      ) : (
        <table>
          <tbody>
            {linhas.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{formato ? formato(v) : v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function StatsPage() {
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) setError(json.error ?? "Erro desconhecido.");
      else setStats(json);
    } catch {
      setError("Erro de conexão.");
    }
    setLoading(false);
  }

  const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Estatísticas</h1>

      <form className={styles.auth} onSubmit={load}>
        <label htmlFor="pw">Senha do admin</label>
        <input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : stats ? "Atualizar" : "Ver números"}
        </button>
        {error && <p role="alert">{error}</p>}
      </form>

      {stats && (
        <>
          <section aria-labelledby="inscritos">
            <h2 id="inscritos" className={styles.h2}>
              Inscritos no e-mail por origem
            </h2>
            {stats.newsletter ? (
              <>
                <p className={styles.big}>{stats.newsletter.total} ativos</p>
                <Tabela titulo="Por origem (utm_source)" dados={stats.newsletter.bySource} />
              </>
            ) : (
              <p className={styles.empty}>Beehiiv não configurado.</p>
            )}
          </section>

          <section aria-labelledby="vendas">
            <h2 id="vendas" className={styles.h2}>
              Vendas no Hotmart por origem
            </h2>
            <p className={styles.note}>
              Conta só as vendas que chegaram pelo webhook depois desta atualização. O histórico completo está no
              Dashboard de Origem de Vendas do Hotmart.
            </p>
            <div className={styles.grid}>
              <Tabela titulo="Vendas aprovadas" dados={stats.sales.count} />
              <Tabela titulo="Valor vendido" dados={stats.sales.value} formato={brl} />
              <Tabela titulo="Reembolsos" dados={stats.sales.refunded} />
            </div>
          </section>

          <section aria-labelledby="cliques">
            <h2 id="cliques" className={styles.h2}>
              Cliques e ações por origem
            </h2>
            {Object.entries(stats.events).map(([nome, ev]) => (
              <div key={nome} className={styles.event}>
                <h3 className={styles.h3}>
                  {NOMES[nome] ?? nome}: {ev.total}
                </h3>
                <div className={styles.grid}>
                  <Tabela titulo="Por origem" dados={ev.bySource} />
                  <Tabela titulo="Por campanha" dados={ev.byCampaign} />
                  <Tabela titulo="Por detalhe" dados={ev.byValue} />
                  <Tabela titulo="Últimos 14 dias" dados={ev.last14Days} />
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
