import { ImageResponse } from "next/og";

export const alt = "Isabela Machado — Mídia Paga & Performance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05060A",
          padding: 64,
          position: "relative",
        }}
      >
        {/* spots de set */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,46,136,0.34), rgba(5,6,10,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -140,
            width: 820,
            height: 820,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(124,92,255,0.30), rgba(5,6,10,0) 68%)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{ width: 16, height: 16, borderRadius: 9999, background: "#FF2E88" }}
            />
            <div
              style={{
                fontSize: 22,
                letterSpacing: 6,
                color: "#FF2E88",
                fontWeight: 700,
              }}
            >
              MÍDIA PAGA · PERFORMANCE
            </div>
          </div>
          <div style={{ fontSize: 20, letterSpacing: 5, color: "#8D95A8" }}>
            GOOGLE ADS · META ADS · GA4
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1,
              fontWeight: 700,
              color: "#F2F4F8",
              letterSpacing: -1,
            }}
          >
            ISABELA MACHADO
          </div>
          <div style={{ display: "flex", width: 220, height: 5, background: "#FF2E88", marginTop: 26 }} />
          <div style={{ fontSize: 30, color: "#A9B1C2", marginTop: 26, maxWidth: 900 }}>
            Eu planejo a campanha, produzo o criativo e leio o resultado.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#8D95A8" }}>
            PT / EN / ES — ESTÁGIO E JÚNIOR, 100% REMOTO
          </div>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#22D3A6" }}>CAMPINAS · BR</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
