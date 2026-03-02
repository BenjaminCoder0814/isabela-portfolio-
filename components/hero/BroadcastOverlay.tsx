"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatTimecode } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function BroadcastOverlay() {
  const t = useTranslations("hero");
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const id = setInterval(() => {
      setTimecode(formatTimecode(new Date()));
    }, 33);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* TOP LEFT — REC indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute top-8 left-6 flex items-center gap-2 z-20"
      >
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-2.5 h-2.5 rounded-full bg-[var(--accent2)]"
        />
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--accent2)] uppercase">
          {t("onAir")}
        </span>
      </motion.div>

      {/* TOP RIGHT — Timecode */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute top-8 right-6 z-20"
      >
        <span className="font-mono text-[10px] font-medium tracking-widest text-[var(--muted)] select-none">
          {timecode}
        </span>
      </motion.div>

      {/* TOP CENTER — broadcast bars */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left z-20"
        style={{ background: "linear-gradient(90deg, var(--accent1), var(--accent2), var(--accent3))" }}
      />

      {/* BOTTOM — Lower third */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 left-6 z-20"
      >
        <div className="flex items-stretch">
          <div className="w-1 bg-[var(--accent1)]" />
          <div className="bg-[var(--text)]/90 backdrop-blur-sm px-4 py-2">
            <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--accent3)]">
              Comunicação · Audiovisual
            </p>
            <p className="font-bold text-sm text-white leading-tight">
              Isabela Machado
            </p>
          </div>
        </div>
      </motion.div>

      {/* Corner markers */}
      {[
        "top-16 left-4",
        "top-16 right-4",
        "bottom-4 left-4",
        "bottom-4 right-4",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} z-20 w-4 h-4 opacity-30`}>
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            {i === 0 && <><path d="M0 6V0h6" stroke="currentColor" strokeWidth="1.5"/></>}
            {i === 1 && <><path d="M16 6V0h-6" stroke="currentColor" strokeWidth="1.5"/></>}
            {i === 2 && <><path d="M0 10v6h6" stroke="currentColor" strokeWidth="1.5"/></>}
            {i === 3 && <><path d="M16 10v6h-6" stroke="currentColor" strokeWidth="1.5"/></>}
          </svg>
        </div>
      ))}
    </>
  );
}
