"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const STEPS_PT = [
  "Inicializando IM Studio OS v1.0…",
  "Roteando canais de áudio…",
  "Calibrando balanço de branco…",
  "Sincronizando teleprompter…",
  "Carregando lower thirds…",
  "Preparando showreel…",
  "Aguardando sinal…",
  "ENTRANDO AO VIVO →",
];
const STEPS_EN = [
  "Initializing IM Studio OS v1.0…",
  "Routing audio channels…",
  "Calibrating white balance…",
  "Syncing teleprompter…",
  "Loading lower thirds…",
  "Preparing showreel…",
  "Awaiting signal…",
  "GOING LIVE →",
];
const STEPS_ES = [
  "Iniciando IM Studio OS v1.0…",
  "Enrutando canales de audio…",
  "Calibrando balance de blancos…",
  "Sincronizando teleprompter…",
  "Cargando lower thirds…",
  "Preparando showreel…",
  "Esperando señal…",
  "SALIENDO EN VIVO →",
];

const STEPS: Record<string, string[]> = { pt: STEPS_PT, en: STEPS_EN, es: STEPS_ES };

interface IntroBootProps {
  locale: string;
  onDone: () => void;
}

export default function IntroBoot({ locale, onDone }: IntroBootProps) {
  const steps = STEPS[locale] ?? STEPS_PT;
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [glitch, setGlitch] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [timecode, setTimecode] = useState("00:00:00:00");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 3200; // ms

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Timecode ticker
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      const ff = String(Math.floor(d.getMilliseconds() / 33)).padStart(2, "0");
      setTimecode(`${hh}:${mm}:${ss}:${ff}`);
    }, 33);
    return () => clearInterval(id);
  }, []);

  // Progress + step reveal
  useEffect(() => {
    const STEP_INTERVAL = DURATION / steps.length;

    // Stagger steps
    steps.forEach((_, i) => {
      setTimeout(() => {
        setCurrentStep(i);
        setDoneSteps((prev) => (i > 0 ? [...prev, i - 1] : prev));
      }, i * STEP_INTERVAL);
    });

    // Progress bar via rAF
    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDoneSteps(steps.map((_, i) => i));
        setTimeout(() => {
          setGlitch(true);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onDone, 600);
          }, 350);
        }, 300);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080A0F] select-none ${
            glitch ? "animate-glitch" : ""
          }`}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
              zIndex: 1,
            }}
          />

          {/* Noise */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              zIndex: 1,
            }}
          />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
            style={{ background: "linear-gradient(90deg,#2D6BFF,#FF2D92,#2CFF9A)" }} />

          {/* Corner — timecode */}
          <div className="absolute top-5 right-5 font-mono text-[10px] text-[#2CFF9A]/60 tracking-widest z-10">
            {timecode}
          </div>

          {/* Corner — REC */}
          <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
            <motion.span
              animate={{ opacity: [1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-2 rounded-full bg-[#2CFF9A]"
            />
            <span className="font-mono text-[10px] text-[#2CFF9A] tracking-[0.2em] uppercase">
              BOOT
            </span>
          </div>

          {/* Main panel */}
          <div className="relative z-10 w-full max-w-lg px-6 flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-[10px] text-[#2D6BFF] tracking-[0.3em] uppercase"
              >
                IM.BROADCAST_OS
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-mono text-2xl font-bold text-white tracking-wide"
              >
                v1.0.0
              </motion.h1>
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-1.5">
              {steps.map((step, i) => {
                const isDone = doneSteps.includes(i);
                const isActive = currentStep === i && !isDone;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: i <= currentStep ? 1 : 0.15, x: 0 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    className="flex items-center gap-3 font-mono text-xs"
                  >
                    {isDone ? (
                      <span className="text-[#2CFF9A] w-4">✓</span>
                    ) : isActive ? (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="text-[#FF2D92] w-4"
                      >
                        ›
                      </motion.span>
                    ) : (
                      <span className="text-white/20 w-4">·</span>
                    )}
                    <span
                      className={
                        isDone
                          ? "text-white/50"
                          : isActive
                          ? "text-white"
                          : "text-white/20"
                      }
                    >
                      {step}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="flex flex-col gap-2">
              <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg,#2D6BFF,#FF2D92,#2CFF9A)",
                  }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="flex justify-between font-mono text-[9px] text-white/30">
                <span>LOADING</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Bottom safe margin line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
