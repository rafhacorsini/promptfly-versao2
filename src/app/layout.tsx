import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = "https://promptfly.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Promptfly — Aprenda IA de verdade. Do prompt ao agent.",
    template: "%s | Promptfly",
  },

  description:
    "O ecossistema premium para quem constrói negócios com Inteligência Artificial. Guias, modelos e prompts prontos para usar — em português, sem hype.",

  keywords: [
    "engenharia de prompt",
    "prompt engineering",
    "inteligência artificial",
    "IA para negócios",
    "ChatGPT",
    "Claude",
    "prompts prontos",
    "aprender IA",
    "agentes de IA",
    "Promptfly",
  ],

  authors: [{ name: "Promptfly", url: BASE_URL }],
  creator: "Promptfly",
  publisher: "Promptfly",

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "Promptfly",
    title: "Promptfly — Aprenda IA de verdade. Do prompt ao agent.",
    description:
      "O ecossistema premium para quem constrói negócios com Inteligência Artificial. Guias, prompts e modelos em português.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Promptfly — Aprenda IA de verdade",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Promptfly — Aprenda IA de verdade",
    description:
      "O ecossistema premium para quem constrói negócios com IA. Prompts, guias e modelos em português.",
    images: ["/og-image.png"],
    creator: "@promptfly",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "pt-BR": BASE_URL,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Promptfly",
  url: BASE_URL,
  description:
    "Guias semanais de engenharia de prompt para quem quer resultado real com IA.",
  publisher: {
    "@type": "Organization",
    name: "Promptfly",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
    },
  },
  inLanguage: "pt-BR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
