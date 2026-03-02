"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  blur: number;
  color: string;
}

const COLORS = ["#2D6BFF", "#FF2D92", "#2CFF9A", "#a8c4ff", "#ffd6f0"];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 14 : 28;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Init particles
    for (let i = 0; i < COUNT; i++) {
      particles.current.push({
        x: rand(0, window.innerWidth),
        y: rand(0, window.innerHeight),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.08, 0.08),
        r: rand(8, isMobile ? 24 : 52),
        alpha: rand(0.03, 0.1),
        blur: rand(8, 28),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let lastTs = 0;
    const TARGET_DT = 1000 / 30; // cap at 30fps for bg canvas

    function draw(ts: number) {
      rafRef.current = requestAnimationFrame(draw);
      const dt = ts - lastTs;
      if (dt < TARGET_DT) return;
      lastTs = ts;

      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles.current) {
        // Subtle parallax pull toward mouse
        const dx = mx - p.x;
        const dy = my - p.y;
        p.vx += dx * 0.000008;
        p.vy += dy * 0.000008;
        // Dampen
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        // Wrap
        if (p.x < -p.r) p.x = canvas.width + p.r;
        if (p.x > canvas.width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = canvas.height + p.r;
        if (p.y > canvas.height + p.r) p.y = -p.r;

        ctx.save();
        ctx.filter = `blur(${p.blur}px)`;
        ctx.globalAlpha = p.alpha;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
