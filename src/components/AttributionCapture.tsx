"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { decorateHotmartHref, hotmartCode } from "@/lib/attribution-core";

/**
 * Guarda a origem da visita (utm_source, utm_campaign) e repassa pro checkout:
 * todo link do checkout do Hotmart ganha ?sck= e &src= com a campanha, pra
 * venda aparecer por origem no "Dashboard de Origem de Vendas" do Hotmart.
 * Não renderiza nada.
 */
export default function AttributionCapture() {
  useEffect(() => {
    const code = hotmartCode(captureAttribution());
    if (!code) return;

    const decorate = (root: ParentNode) => {
      root.querySelectorAll<HTMLAnchorElement>('a[href*="hotmart.com"]').forEach((a) => {
        const next = decorateHotmartHref(a.getAttribute("href") ?? "", code, location.origin);
        if (next) a.setAttribute("href", next);
      });
    };

    decorate(document);
    const observer = new MutationObserver(() => decorate(document));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
