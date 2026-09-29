"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
        {/* Logo: ícone + texto PROMPTFLY */}
        <div className={styles.logoArea}>
          <Image
            src="/logo.png"
            alt="Promptfly icon"
            width={26}
            height={26}
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>Promptfly</span>
        </div>

        {/* Links Centro — Desktop */}
        <div className={styles.navLinks}>
          <Link href="/#biblioteca" className={styles.navLink}>Biblioteca</Link>
          <Link href="/projetos" className={styles.navLink}>Templates</Link>
          <Link href="/guias" className={styles.navLink}>Guias</Link>
        </div>

        {/* CTA — Desktop */}
        <Link href="/premium" className={styles.ctaButton}>
          Ver Premium →
        </Link>

        {/* Mobile: dois tracinhos */}
        <div className={styles.mobileMenu} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
        </div>
      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlayOpen : ''}`}>
        <div className={styles.mobileHeader}>
          <div className={styles.logoTextDark}>PROMPTFLY</div>
          <button className={styles.closeButton} onClick={() => setIsMobileMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className={styles.mobileLinks}>
          <Link href="/#biblioteca" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>BIBLIOTECA</Link>
          <Link href="/projetos" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>TEMPLATES</Link>
          <Link href="/guias" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>GUIAS</Link>
        </div>

        <div className={styles.mobileFooter}>
          <Link
            href="/premium"
            className={styles.mobileCtaButton}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            VER PREMIUM
          </Link>
        </div>
      </div>
    </nav>
  );
}
