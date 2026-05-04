import Image from "next/image";
import styles from "./SocialProofBar.module.css";

const logos = ["DriveON", "Courto", "Vista", "Rentigo", "Nuvelo", "Arcflow"];

export default function SocialProofBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {/* Left block: avatars + stars + text */}
        <div className={styles.leftBlock}>
          <div className={styles.avatarStack}>
            {[1, 2, 3, 4].map((n) => (
              <Image
                key={n}
                src={`/usuarios${n}.png`}
                alt={`Usuário ${n}`}
                width={40}
                height={40}
                className={styles.avatar}
              />
            ))}
          </div>
          <div className={styles.textBlock}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.count}>
              <span className={styles.countBold}>+600</span> profissionais usando
            </p>
          </div>
        </div>

        {/* Vertical divider */}
        <div className={styles.divider} />

        {/* Marquee logos */}
        <div className={styles.marqueeWrapper}>
          <ul className={styles.marqueeTrack}>
            {[...logos, ...logos].map((name, i) => (
              <li key={i} className={styles.logoItem}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
