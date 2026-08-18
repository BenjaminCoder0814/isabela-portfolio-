"use client";

import dynamic from "next/dynamic";
import TechGrid from "./TechGrid";
import Spotlights from "./Spotlights";
import { useMediaQuery } from "@/lib/useClient";

const Particles = dynamic(() => import("./Particles"), { ssr: false });

/**
 * Camada de fundo global. Fica antes do <main>, que sobe para z-index 1.
 * Nada aqui recebe evento de mouse nem entra na árvore de acessibilidade.
 */
export default function AtmosphereLayer() {
  /* o chunk das partículas nem é baixado onde elas não rodam */
  const wide = useMediaQuery("(min-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--bg-000)]"
    >
      <TechGrid />
      <Spotlights />
      {wide && !reduced && <Particles />}
      {/* vinheta — é o que faz a imagem parecer cinema */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 45%, transparent 35%, #000 130%)",
          opacity: 0.55,
        }}
      />
    </div>
  );
}
