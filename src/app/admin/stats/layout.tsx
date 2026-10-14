import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estatísticas",
  robots: { index: false, follow: false },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
