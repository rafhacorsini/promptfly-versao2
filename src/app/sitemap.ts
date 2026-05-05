import { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";
import { CATEGORIES } from "@/lib/categories";

const BASE = "https://promptfly.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides().map((guide) => ({
    url: `${BASE}/guias/${guide.slug}`,
    lastModified: new Date(guide.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categories = Object.keys(CATEGORIES).map((slug) => ({
    url: `${BASE}/guias/categoria/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/guias`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    ...categories,
    ...guides,
  ];
}
