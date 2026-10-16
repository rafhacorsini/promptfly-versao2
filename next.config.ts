import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O zip do Design Pack é montado no servidor lendo estes arquivos: garante que vão junto no deploy.
  outputFileTracingIncludes: {
    "/api/design-pack": ["./src/content/design-pack/**/*"],
    "/api/wireframe-pack": ["./src/content/wireframe-pack/**/*"],
    "/design-pack": ["./src/content/design-pack/source/*"],
    "/guias/[slug]": ["./src/content/design-pack/source/*"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // A mentoria individual (1:1) foi descontinuada: virou a "mentoria pronta" do Premium.
  async redirects() {
    return [{ source: "/mentoria", destination: "/premium", permanent: true }];
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
