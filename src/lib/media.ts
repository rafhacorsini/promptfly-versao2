export type Thumb = { src: string; isVideo: boolean };

/**
 * Thumbnail leve a partir do previewUrl de um template. Vídeos do Cloudinary
 * viram um frame estático (trocando a extensão por .jpg), assim uma grade de
 * cards não baixa vários vídeos no celular.
 */
export function toThumb(url: string, thumbnailUrl?: string): Thumb {
  // Capa escolhida à mão no projects.json (ex: quando o frame de 2s cai numa transição escura).
  if (thumbnailUrl) return { src: thumbnailUrl, isVideo: false };
  if (url.includes("res.cloudinary.com") && url.includes("/video/upload/")) {
    return {
      src: url
        .replace("/video/upload/", "/video/upload/so_2,w_640,h_400,c_fill,q_auto,f_auto/")
        .replace(/\.(mp4|webm|mov)$/i, ".jpg"),
      isVideo: false,
    };
  }
  return { src: url, isVideo: /\.(mp4|webm|mov)$/i.test(url) };
}
