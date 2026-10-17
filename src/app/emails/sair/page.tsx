import type { Metadata } from "next";
import Link from "next/link";
import { verifyUnsubscribeToken } from "@/lib/drip-core";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Parar de receber e-mails | Promptfly",
  robots: { index: false, follow: false },
};

export default async function SairPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; t?: string; feito?: string }>;
}) {
  const { e = "", t = "", feito } = await searchParams;

  if (feito) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Pronto, você não vai mais receber esses e-mails.</h1>
          <p className={styles.text}>
            Isso vale para os e-mails de boas-vindas. A newsletter semanal tem o próprio link para sair, no
            rodapé de cada edição.
          </p>
          <Link href="/" className={styles.link}>
            Voltar para o site
          </Link>
        </div>
      </main>
    );
  }

  const valido = Boolean(e) && e.length <= 254 && verifyUnsubscribeToken(e, t, process.env.AUTH_SECRET ?? "");

  if (!valido) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Esse link não funciona.</h1>
          <p className={styles.text}>
            Ele pode ter sido copiado pela metade. Abra o link direto do e-mail ou responda a um deles pedindo
            para sair.
          </p>
          <Link href="/" className={styles.link}>
            Voltar para o site
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Parar de receber estes e-mails?</h1>
        <p className={styles.text}>
          Você deixa de receber os e-mails de boas-vindas do Promptfly em <strong>{e}</strong>. A newsletter
          semanal é separada e tem o próprio link para sair.
        </p>
        <form method="post" action="/api/drip/unsubscribe">
          <input type="hidden" name="e" value={e} />
          <input type="hidden" name="t" value={t} />
          <input type="hidden" name="from" value="page" />
          <button type="submit" className={styles.button}>
            Parar de receber
          </button>
        </form>
        <Link href="/" className={styles.link}>
          Cancelar e voltar para o site
        </Link>
      </div>
    </main>
  );
}
