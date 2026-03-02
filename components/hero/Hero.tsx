"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import BroadcastOverlay from "./BroadcastOverlay";
import Button from "@/components/ui/Button";
import Link from "next/link";

const CameraScene = dynamic(() => import("./CameraScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const mouse = useRef<[number, number]>([0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  const cycling: string[] = t.raw("cycling") as string[];
  const [cycleIndex, setCycleIndex] = useState(0);

  // Mouse tracking
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current = [x, y];
    }
    // Gyroscope fallback for mobile
    function onDeviceOrientation(e: DeviceOrientationEvent) {
      const x = ((e.gamma ?? 0) / 45) * 0.5;
      const y = ((e.beta ?? 0) / 90) * 0.5;
      mouse.current = [x, y];
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
    };
  }, []);

  // Word cycling
  useEffect(() => {
    const id = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycling.length);
    }, 2200);
    return () => clearInterval(id);
  }, [cycling.length]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg)]"
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CameraScene mouse={mouse} />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(250,249,247,0) 0%, rgba(250,249,247,0.85) 60%, rgba(250,249,247,1) 100%)",
        }}
      />

      {/* Broadcast overlay elements */}
      <BroadcastOverlay />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants}>
            <span className="label-tag">{t("eyebrow")}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-[var(--text)]"
          >
            {t("headline")}
          </motion.h1>

          {/* Cycling word */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 h-8">
            <span className="text-sm font-mono text-[var(--muted)] tracking-widest uppercase">—</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={cycleIndex}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg font-bold text-[var(--accent1)]"
              >
                {cycling[cycleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Sub */}
          <motion.p
            variants={itemVariants}
            className="text-base text-[var(--muted)] max-w-md leading-relaxed"
          >
            {t("sub")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <Link href={`/${locale}/pdf`}>
              <Button variant="primary">{t("cta1")}</Button>
            </Link>
            <Button variant="outline" href="#contact">
              {t("cta2")}
            </Button>
          </motion.div>
        </motion.div>

        {/* Right — Photo frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-2xl blur-2xl opacity-20 scale-105"
              style={{ background: "linear-gradient(135deg, var(--accent1), var(--accent2))" }}
            />

            {/* Photo container — glass frame */}
            <div className="relative glass rounded-2xl p-3 shadow-2xl border border-white/40">
              <div className="relative w-[280px] sm:w-[320px] h-[380px] sm:h-[420px] rounded-xl overflow-hidden bg-[var(--bg-2)]">
                {/* Placeholder gradient until real photo is added */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, #e0eaff 0%, #f5d6ee 50%, #d6f5e6 100%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                  <div className="text-center">
                    <p className="font-mono text-xs text-[var(--muted)] tracking-widest">
                      [ FOTO ]
                    </p>
                    <p className="font-mono text-xs text-[var(--muted)] tracking-widest">
                      isabela.jpg
                    </p>
                  </div>
                </div>
                {/* Image — uncomment and add real photo */}
                {/* <Image src="/images/isabela.jpg" alt="Isabela Machado" fill className="object-cover" priority /> */}
              </div>

              {/* Frame details */}
              <div className="mt-2 flex items-center justify-between px-1">
                <span className="font-mono text-[9px] tracking-widest text-[var(--muted)] uppercase">
                  Isabela Machado
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[var(--accent3)] uppercase">
                  ● Live
                </span>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-6 glass rounded-lg px-3 py-2 shadow-lg border border-[var(--glass-border)]"
            >
              <p className="font-mono text-[10px] font-bold tracking-widest text-[var(--accent1)] uppercase">
                Rádio & TV
              </p>
              <p className="font-bold text-sm text-[var(--text)]">1º Semestre</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" className="text-[var(--muted)]" />
            <motion.rect
              x="7" y="5" width="2" height="5" rx="1"
              fill="currentColor"
              className="text-[var(--accent1)]"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
