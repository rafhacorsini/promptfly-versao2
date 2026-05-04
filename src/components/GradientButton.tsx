import React from "react";
import styles from "./GradientButton.module.css";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "light";
  children: React.ReactNode;
}

export default function GradientButton({ variant = "dark", children, ...props }: GradientButtonProps) {
  const variantClass = variant === "dark" ? styles.dark : styles.light;
  
  return (
    <button className={`${styles.buttonBase} ${variantClass}`} {...props}>
      {children}
    </button>
  );
}
