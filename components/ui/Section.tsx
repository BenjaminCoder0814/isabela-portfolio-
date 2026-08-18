"use client";

import { useRef, type ReactNode } from "react";
import { m, useInView } from "framer-motion";

type Depth = "000" | "100";
type Spot = "key" | "fill" | "rim" | "warm";

/**
 * Fundo semitransparente: a grade e os spots da camada global continuam
 * visíveis por baixo, e a alternância de profundidade continua mensurável
 * (rgba resolve em getComputedStyle; color-mix não).
 */
const BG: Record<Depth, string> = {
  "000": "rgba(5, 6, 10, 0.55)",
  "100": "rgba(12, 15, 23, 0.86)",
};

const SPOT_POS: Record<Spot, string> = {
  key: "18% 12%",
  fill: "82% 18%",
  rim: "88% 74%",
  warm: "76% 10%",
};

/**
 * Seção do site. NUNCA clara — o ritmo vem de profundidade + cor de luz,
 * nunca de claro/escuro. O fundo é semitransparente para a camada global
 * (grade, spots, partículas) continuar visível por baixo.
 */
export default function Section({
  id,
  depth = "100",
  spot = "key",
  className = "",
  children,
}: {
  id: string;
  depth?: Depth;
  spot?: Spot;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <div
        className="light-rail"
        style={{ ["--rail-color" as string]: `var(--${spot})` }}
        aria-hidden="true"
      />
      <section
        id={id}
        ref={ref}
        className={`section-pad relative overflow-hidden ${className}`}
        style={{
          background: BG[depth],
          ["--spot" as string]: `var(--${spot})`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 55% 45% at ${SPOT_POS[spot]}, color-mix(in srgb, var(--${spot}) 13%, transparent) 0%, transparent 68%)`,
          }}
        />
        <m.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="shell relative z-[1]"
        >
          {children}
        </m.div>
      </section>
    </>
  );
}

/** Cabeçalho padrão: eyebrow mono + H2 display + subtítulo. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  aside,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <p className="eyebrow">
          <span className="h-px w-7 bg-[var(--line-strong)]" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="t-h2 mt-3">{title}</h2>
        {sub ? <p className="t-body mt-4">{sub}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
