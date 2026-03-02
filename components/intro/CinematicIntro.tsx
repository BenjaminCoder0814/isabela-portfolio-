"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import clsx from "clsx";

const steps = ["light", "camera", "action"] as const;

export default function CinematicIntro() {
  const t = useTranslations("intro");
  const prefersReduced = useReducedMotion();
  const [show, setShow] = useState(!prefersReduced);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (prefersReduced) {
      return;
    }
    const timers: NodeJS.Timeout[] = [];
    steps.forEach((_, idx) => {
      timers.push(
        setTimeout(() => {
          setActiveStep(idx + 1);
        }, (idx + 1) * 1100)
      );
    });
    timers.push(
      setTimeout(() => {
        setShow(false);
      }, 4200)
    );
    return () => timers.forEach(clearTimeout);
  }, [prefersReduced]);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
      return;
    }
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    return () => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [show]);

  const textSequence = useMemo(
    () => steps.map((key) => t(key)),
    [t]
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-60 bg-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_45%)] opacity-60 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_30%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {textSequence.map((text, idx) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                  animate={{
                    opacity: activeStep > idx ? 1 : 0,
                    scale: activeStep > idx ? 1 : 0.9,
                    filter: activeStep > idx ? "blur(0px)" : "blur(6px)",
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-none"
                >
                  {text}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                  opacity: activeStep >= steps.length ? 1 : 0,
                  y: activeStep >= steps.length ? 0 : 20,
                  scale: activeStep >= steps.length ? 1 : 0.95,
                }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="mt-8 inline-flex items-center justify-center"
              >
                <Clapboard active={activeStep >= steps.length} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Clapboard({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ rotate: -6 }}
      animate={{ rotate: active ? 0 : -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={clsx(
        "relative h-16 w-28 rounded-lg border border-white/30 bg-white/10 backdrop-blur",
        "shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden"
      )}
    >
          <div className="absolute inset-0 bg-linear-to-br from-white/20 via-white/10 to-transparent" />
      <motion.div
        initial={{ rotate: -14, originX: "50%", originY: "100%" }}
        animate={{ rotate: active ? 0 : -14 }}
        transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.05 }}
        className="absolute -top-8 left-0 right-0 mx-auto h-10 w-28 rounded-md bg-white/70 text-black"
      >
        <div className="absolute inset-0 flex items-center justify-center gap-1 text-xs font-semibold">
          <span>SCN</span>
          <span>001</span>
          <span>TAKE</span>
          <span>01</span>
        </div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,black_10px,black_18px)] opacity-30" />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm tracking-[0.2em]">
        {active ? "CLAP" : "READY"}
      </div>
    </motion.div>
  );
}
