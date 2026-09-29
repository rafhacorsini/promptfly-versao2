import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const BASE_URL = "https://promptfly.com.br";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F5F5F5",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Promptfly: prompts, skills e templates pra sites cinematográficos com IA",
    template: "%s | Promptfly",
  },

  description:
    "Copie os prompts, skills, templates e snippets dos reels do @rafha.gpt. Prontos pra colar no Claude Code, no ChatGPT ou no Gemini.",

  keywords: [
    "sites cinematográficos",
    "Claude Code",
    "prompts prontos",
    "skills Claude Code",
    "templates de sites",
    "GSAP",
    "vibe coding",
    "ChatGPT",
    "Gemini",
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
    title: "Promptfly: prompts, skills e templates pra sites cinematográficos com IA",
    description:
      "Copie os prompts, skills, templates e snippets dos reels do @rafha.gpt. Prontos pra colar no Claude Code, no ChatGPT ou no Gemini.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Promptfly: prompts, skills e templates pra sites cinematográficos com IA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Promptfly: prompts, skills e templates pra sites cinematográficos com IA",
    description:
      "Copie os prompts, skills, templates e snippets dos reels do @rafha.gpt. Prontos pra colar no Claude Code, no ChatGPT ou no Gemini.",
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
    "Copie os prompts, skills, templates e snippets dos reels do @rafha.gpt. Prontos pra colar no Claude Code, no ChatGPT ou no Gemini.",
  inLanguage: "pt-BR",
  publisher: {
    "@type": "Organization",
    name: "Promptfly",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/guias?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
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
        <CookieConsent />
      </body>
    </html>
  );
}
