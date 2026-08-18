"use client";

import { useEffect } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useClient";

type Spot = {
  x: string;
  y: string;
  color: string;
  size: string;
  anim: string;
  duration: number;
  delay: number;
  /** false = só a partir de 768px, escondido por CSS (não por JS) */
  mobile: boolean;
};

const SPOTS: Spot[] = [
  { x: "12%", y: "18%", color: "var(--key)",  size: "min(1150px, 105vw)", anim: "drift-a", duration: 22, delay: 0,   mobile: true },
  { x: "78%", y: "26%", color: "var(--fill)", size: "min(1050px, 95vw)",  anim: "drift-b", duration: 27, delay: -4,  mobile: false },
  { x: "30%", y: "60%", color: "var(--rim)",  size: "min(980px, 90vw)",   anim: "drift-c", duration: 34, delay: -9,  mobile: false },
  { x: "85%", y: "80%", color: "var(--key)",  size: "min(1100px, 100vw)", anim: "drift-a", duration: 18, delay: -14, mobile: true },
];

export default function Spotlights() {
  const reduced = useReducedMotion();
  /* usado só para o parallax (transform), que não desloca layout */
  const canParallax = useMediaQuery("(min-width: 768px)");

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 40, stiffness: 90, mass: 0.6 });
  const sy = useSpring(my, { damping: 40, stiffness: 90, mass: 0.6 });

  useEffect(() => {
    if (!canParallax || reduced) return;
    const onMove = (e: MouseEvent) => {
      mx.set(((e.clientX / window.innerWidth) * 2 - 1) * 28);
      my.set(((e.clientY / window.innerHeight) * 2 - 1) * 28);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [canParallax, reduced, mx, my]);

  const still = !canParallax || reduced;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SPOTS.map((s, i) => (
        <m.div
          key={i}
          /* quem some no mobile é o CSS: o conjunto de elementos é o mesmo
             no servidor e no cliente, então não há salto de layout */
          className={`spot ${s.mobile ? "" : "hidden md:block"}`}
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            marginLeft: `calc(${s.size} / -2)`,
            marginTop: `calc(${s.size} / -2)`,
            x: still ? 0 : sx,
            y: still ? 0 : sy,
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background: `radial-gradient(ellipse 60% 45% at center, color-mix(in srgb, ${s.color} 55%, transparent) 0%, transparent 70%)`,
              animation: reduced
                ? "none"
                : `${s.anim} ${s.duration}s cubic-bezier(.45,.05,.55,.95) ${s.delay}s infinite alternate`,
              willChange: "transform",
            }}
          />
        </m.div>
      ))}
    </div>
  );
}
