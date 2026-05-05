import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F2F2F2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0px",
          }}
        >
          {/* P arrow symbol */}
          <div
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "#1A1A1A",
              letterSpacing: "-6px",
              lineHeight: 1,
            }}
          >
            ⌁
          </div>
          <span
            style={{
              fontSize: "110px",
              fontWeight: 800,
              color: "#1A1A1A",
              letterSpacing: "-5px",
              lineHeight: 1,
            }}
          >
            romptfly
          </span>
        </div>

        {/* Tagline */}
        <span
          style={{
            fontSize: "28px",
            fontWeight: 400,
            color: "#888888",
            letterSpacing: "0px",
            textAlign: "center",
          }}
        >
          Aprenda IA de verdade. Do prompt ao agent.
        </span>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "6px",
            background: "linear-gradient(90deg, #FFB347, #FF4C00, #CC2200)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
