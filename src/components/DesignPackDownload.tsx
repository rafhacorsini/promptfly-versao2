import { listStyles } from "@/lib/design-pack";
import DesignPackForm from "./DesignPackForm";

/** Formulário de download do Design Pack. Server component: lê os estilos e entrega só os dados da paleta. */
export default function DesignPackDownload() {
  return <DesignPackForm styles={listStyles()} />;
}
