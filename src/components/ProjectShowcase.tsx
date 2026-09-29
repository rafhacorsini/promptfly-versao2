import Link from "next/link";
import projects from "@/content/projects.json";
import styles from "./ProjectShowcase.module.css";

type Item = { id: string; name: string; subtitle: string; thumb: string; isVideo: boolean };

// Cloudinary gera um frame estático do vídeo trocando a extensão para .jpg,
// assim a vitrine não baixa 6 vídeos no celular.
function toThumb(url: string): { thumb: string; isVideo: boolean } {
  if (url.includes("res.cloudinary.com") && url.includes("/video/upload/")) {
    return {
      thumb: url
        .replace("/video/upload/", "/video/upload/so_2,w_640,h_400,c_fill,q_auto,f_auto/")
        .replace(/\.(mp4|webm|mov)$/i, ".jpg"),
      isVideo: false,
    };
  }
  return { thumb: url, isVideo: /\.(mp4|webm|mov)$/i.test(url) };
}

function toItem(p: (typeof projects)[number]): Item {
  const [name, ...rest] = p.title.split(" — ");
  return { id: p.id, name, subtitle: rest.join(" "), ...toThumb(p.previewUrl) };
}

function Thumb({ item }: { item: Item }) {
  if (item.isVideo) {
    return (
      <video
        className={styles.media}
        src={`${item.thumb}#t=2`}
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={styles.media} src={item.thumb} alt="" loading="lazy" />;
}

/**
 * Vitrine de templates puxada de projects.json. Server component de propósito:
 * só nome, subtítulo e thumbnail chegam ao navegador; os prompts pagos ficam
 * no servidor.
 *
 * `ids` é texto separado por vírgula porque o next-mdx-remote v6 bloqueia
 * expressões JS (como arrays) em props dentro do MDX.
 */
export default function ProjectShowcase({
  ids,
  freeId,
  moreHref = "/projetos",
}: {
  ids: string;
  freeId?: string;
  moreHref?: string;
}) {
  const items = ids
    .split(",")
    .map((id) => projects.find((p) => p.id === id.trim()))
    .filter((p): p is (typeof projects)[number] => Boolean(p))
    .map(toItem);

  const premiumTotal = projects.filter((p) => !p.isFree).length;
  const remaining = premiumTotal - items.length;
  const free = freeId ? projects.find((p) => p.id === freeId) : undefined;
  const freeItem = free ? toItem(free) : null;

  return (
    <div id="biblioteca" className={styles.wrap}>
      <div className={styles.grid}>
        {items.map((item) => (
          <Link key={item.id} href="/projetos" className={styles.card}>
            <div className={styles.mediaBox}>
              <Thumb item={item} />
            </div>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.subtitle}>{item.subtitle}</span>
          </Link>
        ))}
      </div>

      {remaining > 0 && (
        <Link href={moreHref} className={styles.more}>
          + {remaining} templates na biblioteca →
        </Link>
      )}

      {freeItem && (
        <Link href="/projetos" className={styles.free}>
          <div className={styles.freeMedia}>
            <Thumb item={freeItem} />
          </div>
          <div className={styles.freeText}>
            <span className={styles.freeBadge}>Grátis pra testar agora</span>
            <span className={styles.freeName}>{freeItem.name}</span>
            <span className={styles.subtitle}>{freeItem.subtitle}</span>
          </div>
        </Link>
      )}
    </div>
  );
}
