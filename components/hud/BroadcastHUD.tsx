"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const pad = (n: number, w = 2) => n.toString().padStart(w, "0");

function formatTimecode(date: Date) {
  const h = pad(date.getHours());
  const m = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  const f = pad(Math.floor((date.getMilliseconds() / 1000) * 24));
  return `${h}:${m}:${s}:${f}`;
}

export default function BroadcastHUD() {
  const [timecode, setTimecode] = useState(() => formatTimecode(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTimecode(formatTimecode(new Date())), 1000 / 12);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <div className="safe-margins" aria-hidden="true" />
      <div className="absolute left-4 top-4 flex items-center gap-3 text-xs font-semibold tracking-[0.28em] uppercase text-white/80">
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="inline-flex items-center gap-2 rounded-full bg-(--glass-strong) px-3 py-1 backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-(--green) shadow-[0_0_0_6px_rgba(44,255,154,0.2)]" />
          REC
        </motion.span>
        <span className="inline-flex items-center gap-2 rounded-full bg-(--glass) px-3 py-1 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-(--magenta) shadow-[0_0_0_6px_rgba(255,45,146,0.2)]" />
          ON AIR
        </span>
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-(--glass) px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white/80 backdrop-blur">
        {timecode}
      </div>
      <div className="absolute inset-8 hidden border border-white/5 md:block" aria-hidden="true">
        <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-white/15" />
        <div className="absolute right-0 top-0 h-6 w-6 border-r border-t border-white/15" />
        <div className="absolute left-0 bottom-0 h-6 w-6 border-l border-b border-white/15" />
        <div className="absolute right-0 bottom-0 h-6 w-6 border-r border-b border-white/15" />
      </div>
    </div>
  );
}
