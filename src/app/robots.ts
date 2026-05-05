import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://promptfly.com.br/sitemap.xml",
    host: "https://promptfly.com.br",
  };
}
