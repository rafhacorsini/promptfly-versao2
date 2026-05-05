import React from "react";
import styles from "./GradientButton.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  target?: undefined;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  target?: string;
};

type GradientButtonProps = (ButtonProps | AnchorProps) & {
  variant?: "dark" | "light";
  children: React.ReactNode;
};

export default function GradientButton({
  variant = "dark",
  children,
  ...props
}: GradientButtonProps) {
  const className = `${styles.buttonBase} ${variant === "dark" ? styles.dark : styles.light}`;

  if ("href" in props && props.href) {
    const { href, target, ...rest } = props as AnchorProps;
    return (
      <a href={href} target={target} className={className} {...(rest as object)}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}
