import Navbar from "./Navbar";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Navbar DENTRO do Hero — absolute relativo ao heroSection */}
      <Navbar />

      {/* Vídeo no fundo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.videoElement}
      >
        <source src="/Doll_spinning_360_202603201655.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
