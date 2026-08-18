"use client";

/** Grade técnica: malha fina de 44px + malha de 176px por cima. Estática. */
export default function TechGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: [
          "linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          "linear-gradient(0deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          "linear-gradient(0deg, rgba(255,255,255,.03) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "176px 176px, 176px 176px, 44px 44px, 44px 44px",
      }}
    />
  );
}
