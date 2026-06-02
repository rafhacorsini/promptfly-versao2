"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "promptfly_cookie_consent";
type Consent = "accepted" | "rejected" | null;

export default function CookieConsent() {
  // null = ainda não decidiu (mostra banner). Começa undefined p/ evitar flash.
  const [consent, setConsent] = useState<Consent | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
  }, []);

  function decide(value: Exclude<Consent, null>) {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  // Enquanto lê o localStorage não renderiza nada (evita piscar o banner).
  if (consent === undefined) return null;

  return (
    <>
      {/* Analytics só carrega com consentimento explícito (LGPD). */}
      {consent === "accepted" && <Analytics />}

      {consent === null && (
        <div className={styles.banner} role="dialog" aria-label="Aviso de cookies">
          <div className={styles.inner}>
            <p className={styles.text}>
              Usamos cookies para entender como o site é usado e melhorar sua
              experiência. Você pode aceitar ou recusar os cookies de análise.
              Saiba mais na nossa{" "}
              <Link href="/privacidade" className={styles.link}>
                Política de Privacidade
              </Link>
              .
            </p>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.reject}
                onClick={() => decide("rejected")}
              >
                Recusar
              </button>
              <button
                type="button"
                className={styles.accept}
                onClick={() => decide("accepted")}
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
