"use client";

import { track } from "@vercel/analytics";

/**
 * <a> comum que dispara um evento no Vercel Analytics ao clicar. Serve pra
 * medir CTA dentro de componente de servidor sem transformar a seção toda
 * em client component.
 */
export default function TrackedLink({
  event,
  data,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  data?: Record<string, string>;
}) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, data);
        props.onClick?.(e);
      }}
    />
  );
}
