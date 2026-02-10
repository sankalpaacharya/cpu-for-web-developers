import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Inside React - Sanku's Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        {/* Top section with badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              backgroundColor: "rgba(232, 168, 124, 0.15)",
              borderRadius: "100px",
              border: "1px solid rgba(232, 168, 124, 0.3)",
            }}
          >
            <span
              style={{
                color: "#e8a87c",
                fontSize: 20,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Blog
            </span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              margin: 0,
              marginBottom: "24px",
              fontStyle: "italic",
            }}
          >
            Inside React
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Deep dives into React internals, Fiber architecture, and modern web development
          </p>
        </div>

        {/* Bottom section - Author/Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Author avatar placeholder */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "#e8a87c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 24, color: "#0a0a0a", fontWeight: 600 }}>
                S
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{ color: "#ffffff", fontSize: 22, fontWeight: 600 }}
              >
                Sankalpa Acharya
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 16 }}>
                inside-react.vercel.app
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
