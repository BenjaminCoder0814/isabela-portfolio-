"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BroadcastHUD() {
  const [timecode, setTimecode] = useState("00:00:00:00");

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

  return (
    <div className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{ background: "linear-gradient(90deg,#2D6BFF 0%,#FF2D92 50%,#2CFF9A 100%)" }}
      />

      {/* Safe-margin lines (inner TV safe area) */}
      <div className="absolute inset-[3.5%] border border-white/[0.04] rounded-sm" />
      <div className="absolute inset-[6%] border border-white/[0.025] rounded-sm" />

      {/* Corner markers */}
      {(["top-3 left-3","top-3 right-3","bottom-3 left-3","bottom-3 right-3"] as const).map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-5 h-5 opacity-25`}>
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            {i === 0 && <path d="M0 8V0h8" stroke="#2D6BFF" strokeWidth="1.5" />}
            {i === 1 && <path d="M20 8V0h-8" stroke="#2D6BFF" strokeWidth="1.5" />}
            {i === 2 && <path d="M0 12v8h8" stroke="#2D6BFF" strokeWidth="1.5" />}
            {i === 3 && <path d="M20 12v8h-8" stroke="#2D6BFF" strokeWidth="1.5" />}
          </svg>
        </div>
      ))}

      {/* TOP LEFT — REC + ON AIR */}
      <div className="absolute top-5 left-5 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <motion.span
            animate={{ opacity: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-2 h-2 rounded-full bg-[#2CFF9A] shadow-[0_0_6px_#2CFF9A]"
          />
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#2CFF9A] font-bold uppercase">
            REC
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
            className="w-2 h-2 rounded-full bg-[#FF2D92] shadow-[0_0_6px_#FF2D92]"
          />
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#FF2D92] font-bold uppercase">
            ON AIR
          </span>
        </div>
      </div>

      {/* TOP RIGHT — Timecode */}
      <div className="absolute top-5 right-5 flex flex-col items-end gap-0.5">
        <span className="font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase">
          SMPTE
        </span>
        <span className="font-mono text-[10px] tracking-widest text-[#2D6BFF]/60 font-bold">
          {timecode}
        </span>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />
    </div>
  );
}
