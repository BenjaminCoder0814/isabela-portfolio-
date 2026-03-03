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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,107,255,0.14),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,45,146,0.18),transparent_32%),radial-gradient(circle_at_30%_80%,rgba(44,255,154,0.12),transparent_30%),linear-gradient(140deg,#0b0d12,#0b0d12_45%,#101320)]" />
      <div className="absolute inset-0 mix-blend-screen opacity-25 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_24px)]" />
      <div className="absolute inset-0 mix-blend-screen opacity-35 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_18px)]" />
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0"
      >
        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_45%)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,196,0,0.16),transparent_40%)] blur-3xl opacity-40" />
      </motion.div>
    </div>
  );
}
