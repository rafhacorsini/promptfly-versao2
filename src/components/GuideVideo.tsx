import styles from "./GuideVideo.module.css";

/**
 * Vídeo em loop dos guias. Substitui `<video style={{...}}>` no MDX, que o
 * next-mdx-remote v6 renderiza sem estilo por bloquear expressões JS.
 */
export default function GuideVideo({ src }: { src: string }) {
  return (
    <video className={styles.video} autoPlay muted loop playsInline>
      <source src={src} type="video/mp4" />
    </video>
  );
}
