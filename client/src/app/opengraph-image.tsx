import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Talentele — practical data and technology training in Bhubaneswar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-sharing image: the original Talentele logo on a branded card. */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/talentele-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          borderLeft: "24px solid #d9052e",
          padding: "72px 80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
        <img src={logoSrc} width={560} height={144} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, fontWeight: 800, color: "#0b0b0d", lineHeight: 1.1, letterSpacing: -1.5 }}>
            Learn data and tech skills the practical way.
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#55555f" }}>
            Data Analytics · Data Science · Power BI · Python · SQL · SAP — Bhubaneswar
          </div>
        </div>
      </div>
    ),
    size,
  );
}
