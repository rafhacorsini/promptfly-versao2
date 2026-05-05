import { ImageResponse } from "next/og";
import matter from "gray-matter";
import { getGuideSource } from "@/lib/guides";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const source = getGuideSource(slug);
  const { data } = matter(source ?? "");

  const title: string = data.title ?? "Promptfly";
  const tags: string[] = data.tags ?? [];
  const readTime: string = data.readTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F5F5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#FF4C00",
            }}
          />
          <span
            style={{ fontSize: "20px", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.5px" }}
          >
            Promptfly
          </span>
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: "8px" }}>
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#FF4C00",
                    background: "rgba(255,76,0,0.1)",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1
            style={{
              fontSize: title.length > 60 ? "44px" : "54px",
              fontWeight: 800,
              color: "#1A1A1A",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              margin: 0,
              maxWidth: "960px",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(0,0,0,0.12)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#888888" }}>
            promptfly.com.br/guias
          </span>
          {readTime && (
            <span style={{ fontSize: "16px", color: "#888888" }}>
              {readTime} de leitura
            </span>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
