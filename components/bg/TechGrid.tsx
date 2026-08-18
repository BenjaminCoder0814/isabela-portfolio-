"use client";

/** Grade técnica — linhas de 1px a cada 44px. Estática. */
export default function TechGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,.035) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    />
  );
}
