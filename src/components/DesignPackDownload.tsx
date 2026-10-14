import { listStyles } from "@/lib/design-pack";
import DesignPackForm from "./DesignPackForm";

/** Formulário de download do Design Pack. Server component: lê os estilos e entrega só os dados da miniatura. */
export default function DesignPackDownload({ howToHref }: { howToHref?: string }) {
  return <DesignPackForm styles={listStyles()} howToHref={howToHref} />;
}
