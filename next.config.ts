import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  async headers() {
    return [
      {
        source: "/prints/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*\\.png|.*\\.jpg|.*\\.avif|.*\\.webp|.*\\.gif|.*\\.mp4)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Modelos .glb em /templates são carregados via fetch/XHR (GLTFLoader)
        // por sites de terceiros que copiam o prompt — sem CORS liberado aqui
        // o navegador do comprador bloqueia a resposta e o modelo 3D nunca carrega.
        source: "/templates/(.*\\.glb)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
