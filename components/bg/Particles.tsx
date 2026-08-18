"use client";

import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  base: number;
};

/** Cones de luz (fração da largura) onde a partícula fica mais visível. */
const CONES = [0.12, 0.3, 0.78, 0.85];

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const particles: P[] = [];
    const COUNT = 60;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.6,
        vy: -(0.15 + Math.random() * 0.3),
        drift: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        base: 0.05 + Math.random() * 0.17,
      });
    }

    /** mais opaca dentro dos cones de luz */
    const coneBoost = (x: number) => {
      let best = 0;
      for (const c of CONES) {
        const d = Math.abs(x / w - c);
        best = Math.max(best, Math.max(0, 1 - d / 0.13));
      }
      return 0.3 + best * 0.7;
    };

    let t = 0;
    const draw = () => {
      raf.current = requestAnimationFrame(draw);
      if (document.hidden) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y += p.vy;
        p.phase += 0.012;
        p.x += Math.sin(p.phase) * p.drift * 0.35;
        if (p.y < -8) {
          p.y = h + 8;
          p.x = Math.random() * w;
        }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;

        const pulse = 0.65 + 0.35 * Math.sin(t * 1.4 + p.phase);
        const alpha = p.base * pulse * coneBoost(p.x);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,220,${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
