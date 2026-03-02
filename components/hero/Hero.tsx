"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import LowerThird from "@/components/LowerThird";
import Button from "@/components/ui/Button";
import Link from "next/link";

const CameraScene = dynamic(() => import("./CameraScene"), {
  ssr: false,
  loading: () => null,
});

const TAPE_LABELS = ["RÁDIO & TV", "1º SEM", "SP — BR", "BROADCAST"];

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const mouse = useRef<[number, number]>([0, 0]);
  const cycling: string[] = t.raw("cycling") as string[];
  const [cycleIndex, setCycleIndex] = useState(0);
  const [tapeIndex, setTapeIndex] = useState(0);
  const [lowerVisible, setLowerVisible] = useState(false);

  // Mouse / gyro
  useEffect(() => {
    const onMM = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      ];
    };
    const onDO = (e: DeviceOrientationEvent) => {
      mouse.current = [
        ((e.gamma ?? 0) / 45) * 0.5,
        ((e.beta ?? 0) / 90) * 0.5,
      ];
    };
    window.addEventListener("mousemove", onMM, { passive: true });
    window.addEventListener("deviceorientation", onDO, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("deviceorientation", onDO);
    };
  }, []);

  // Word cycle
  useEffect(() => {
    const id = setInterval(() => setCycleIndex((p) => (p + 1) % cycling.length), 2200);
    return () => clearInterval(id);
  }, [cycling.length]);

  // Tape label cycle
  useEffect(() => {
    const id = setInterval(() => setTapeIndex((p) => (p + 1) % TAPE_LABELS.length), 1800);
    return () => clearInterval(id);
  }, []);

  // Lower third appears after entrance
  useEffect(() => {
    const t = setTimeout(() => setLowerVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const ease4: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const fade = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease4 } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* 3D scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CameraScene mouse={mouse} />
      </div>

      {/* Radial vignette — keeps text readable */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 28% 50%, rgba(247,247,251,0) 0%, rgba(247,247,251,0.88) 55%, rgba(247,247,251,1) 100%)",
        }}
      />

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 items-center">
        {/* ── LEFT ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 max-w-xl"
        >
          {/* Eyebrow tag */}
          <motion.div variants={fade}>
            <span className="label-tag">{t("eyebrow")}</span>
          </motion.div>

          {/* Kinetic headline — word blocks slide in */}
          <motion.h1
            variants={fade}
            className="font-black leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.4rem,6vw,4rem)", color: "var(--text)" }}
          >
            {t("headline")
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.07, ease: ease4 }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
          </motion.h1>

          {/* Word rotation */}
          <motion.div variants={fade} className="flex items-center gap-3 h-9 overflow-hidden">
            <div
              className="w-[3px] h-6 rounded-full flex-shrink-0"
              style={{ background: "var(--accent1)" }}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={cycleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: ease4 }}
                className="text-xl font-bold"
                style={{ color: "var(--accent1)" }}
              >
                {cycling[cycleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Sub */}
          <motion.p
            variants={fade}
            className="text-base leading-relaxed max-w-md"
            style={{ color: "var(--muted)" }}
          >
            {t("sub")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fade} className="flex flex-wrap gap-3">
            <Link href={`/${locale}/pdf`}>
              <Button variant="primary">{t("cta1")}</Button>
            </Link>
            <Button variant="outline" href="#contact">
              {t("cta2")}
            </Button>
          </motion.div>

          {/* Lower third */}
          <motion.div variants={fade}>
            <LowerThird
              name="Isabela Machado"
              role="Comunicação · Audiovisual · Rádio &amp; TV"
              visible={lowerVisible}
              delay={0}
            />
          </motion.div>
        </motion.div>

        {/* ── RIGHT — Photo frame ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: ease4 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Glow halo */}
          <div
            className="absolute inset-0 rounded-2xl scale-110 blur-3xl opacity-25"
            style={{
              background:
                "radial-gradient(ellipse at center, #2D6BFF 0%, #FF2D92 60%, transparent 100%)",
            }}
          />

          {/* Glass frame */}
          <div className="relative glass rounded-2xl p-[10px] shadow-2xl border border-white/40">
            {/* Photo area */}
            <div className="relative w-[270px] sm:w-[310px] h-[360px] sm:h-[400px] rounded-xl overflow-hidden bg-[var(--bg-2)]">
              {/* Gradient placeholder — replace with <Image> when photo is ready */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(155deg,#dde8ff 0%,#f5d6ee 45%,#d6f5e6 100%)",
                }}
              />

              {/* Scanlines on photo */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",
                }}
              />

              {/* Placeholder label */}
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <div className="text-center">
                  <p className="font-mono text-[11px] tracking-widest text-[var(--muted)]">isabela.jpg</p>
                </div>
              </div>

              {/* LIVE badge on photo */}
              <div className="absolute top-3 right-3">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.3 }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded"
                  style={{ background: "rgba(255,45,146,0.9)", backdropFilter: "blur(4px)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="font-mono text-[8px] font-bold text-white tracking-[0.2em]">
                    LIVE
                  </span>
                </motion.div>
              </div>

              {/* Corner marks on photo */}
              {["top-2 left-2","top-2 right-2","bottom-2 left-2","bottom-2 right-2"].map((p, i) => (
                <div key={i} className={`absolute ${p} w-3 h-3 opacity-40`}>
                  <svg viewBox="0 0 12 12" fill="none">
                    {i===0 && <path d="M0 5V0h5" stroke="#2D6BFF" strokeWidth="1.2"/>}
                    {i===1 && <path d="M12 5V0H7" stroke="#2D6BFF" strokeWidth="1.2"/>}
                    {i===2 && <path d="M0 7v5h5" stroke="#2D6BFF" strokeWidth="1.2"/>}
                    {i===3 && <path d="M12 7v5H7" stroke="#2D6BFF" strokeWidth="1.2"/>}
                  </svg>
                </div>
              ))}
            </div>

            {/* Frame footer */}
            <div className="mt-2 px-1 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "var(--muted)" }}>
                Isabela Machado
              </span>
              {/* Tape label cycling */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={tapeIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-[8px] font-bold tracking-[0.15em] px-2 py-0.5 rounded"
                  style={{
                    background: "var(--accent1)",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  {TAPE_LABELS[tapeIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Floating info card */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute -bottom-5 -left-8 glass rounded-xl px-4 py-3 shadow-xl border border-white/40 hidden sm:block"
          >
            <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--accent1)" }}>
              Rádio &amp; TV
            </p>
            <p className="font-bold text-sm" style={{ color: "var(--text)" }}>1º Semestre</p>
            <p className="font-mono text-[9px]" style={{ color: "var(--muted)" }}>São Paulo, BR</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--muted)" }} />
            <rect x="6.5" y="5" width="3" height="6" rx="1.5" fill="currentColor" style={{ color: "var(--accent1)" }} />
          </svg>
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: "var(--muted)" }}>
            scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
