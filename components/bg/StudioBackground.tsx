"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function StudioBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, [mouseX, mouseY]);

  const parallaxX = useSpring(useTransform(mouseX, (v) => v * 20), {
    stiffness: 60,
    damping: 20,
  });
  const parallaxY = useSpring(useTransform(mouseY, (v) => v * 20), {
    stiffness: 60,
    damping: 20,
  });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,107,255,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,45,146,0.16),transparent_32%),radial-gradient(circle_at_30%_80%,rgba(44,255,154,0.12),transparent_30%),linear-gradient(140deg,#0b0d12,#0b0d12_45%,#0d1020)]" />
      <div className="absolute inset-0 mix-blend-screen opacity-25 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_24px)]" />
      <div className="absolute inset-0 mix-blend-screen opacity-35 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_18px)]" />

      <motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute inset-0">
        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_45%)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,196,0,0.16),transparent_40%)] blur-3xl opacity-40" />

        <div className="absolute inset-0">
          <div className="absolute left-[8%] top-[28%] h-52 w-40 rotate-3 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)] opacity-20 blur-2xl" />
          <div className="absolute right-[6%] top-[18%] h-64 w-48 -rotate-6 rounded-full bg-[radial-gradient(circle_at_60%_30%,rgba(44,255,154,0.18),transparent_65%)] opacity-25 blur-2xl" />
        </div>

        <svg className="absolute inset-0 -z-10" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <g opacity="0.12" filter="url(#shadow)">
            <rect x="80" y="520" width="180" height="120" rx="18" fill="url(#monitor)" />
            <rect x="330" y="500" width="120" height="160" rx="16" fill="url(#camera)" />
            <rect x="600" y="540" width="140" height="110" rx="14" fill="url(#boom)" />
            <rect x="920" y="500" width="220" height="150" rx="18" fill="url(#desk)" />
          </g>
          <g opacity="0.08" stroke="url(#cables)" strokeWidth="2" strokeLinecap="round">
            <path d="M120 590 C260 560 420 640 560 620" />
            <path d="M560 620 C740 610 900 560 1080 590" />
          </g>
          <defs>
            <linearGradient id="monitor" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="camera" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="boom" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="desk" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cables" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#2d6bff" stopOpacity="0.4" />
              <stop offset="1" stopColor="#ff2d92" stopOpacity="0.25" />
            </linearGradient>
            <filter id="shadow" x="0" y="0" width="1440" height="900" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>
        </svg>

        <div className="absolute inset-0 opacity-30">
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
                opacity: 0.3 + (i % 5) * 0.1,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
