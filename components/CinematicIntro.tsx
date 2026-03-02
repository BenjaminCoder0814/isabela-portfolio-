"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = ["LUZ.", "CÂMERA.", "AÇÃO."];

export default function CinematicIntro() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Advance steps and finish
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    // step 0 already shown
    timers.push(setTimeout(() => setStep(1), 1100));
    timers.push(setTimeout(() => setStep(2), 2200));
    timers.push(setTimeout(() => setStep(3), 3300));
    timers.push(setTimeout(() => setDone(true), 4300));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Lock scroll while active
  useEffect(() => {
    if (!done) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#05060a]"
    >
      {/* Glow vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(45,107,255,0.18) 0%, rgba(5,6,10,0.92) 55%, #05060a 100%)",
        }}
      />

      {/* Noise + scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px 2px, rgba(255,255,255,0.04) 2px 3px)",
        }}
      />

      <div className="relative flex flex-col items-center gap-6 text-center">
        <AnimatePresence mode="wait">
          {step <= 2 && (
            <motion.h1
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl font-black tracking-tight"
              style={{ color: "#f5f5f7" }}
            >
              {STEPS[step]}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Claquete animada */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              key="clap"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [-1.5, 0, -1.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                rotate: { repeat: 2, repeatDelay: 0.1, duration: 0.2 },
              }}
              className="w-36 h-20 rounded-lg border border-white/20 bg-white/5 backdrop-blur"
            >
              <div className="h-8 bg-gradient-to-r from-[#2d6bff] via-[#ff2d92] to-[#ffc400] rounded-t-lg flex items-center px-3 text-xs font-mono tracking-widest text-white">
                TAKE 01 · ON AIR
              </div>
              <div className="flex items-center justify-between px-4 h-12 text-xs font-mono text-white/80">
                <span>SCENE IM-BRD</span>
                <span>FPS 24</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.2, ease: "linear" }}
            className="h-full bg-gradient-to-r from-[#2d6bff] via-[#ff2d92] to-[#ffc400]"
          />
        </div>

        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/60">
          Luz • Câmera • Ação
        </p>
      </div>
    </motion.div>
  );
}
