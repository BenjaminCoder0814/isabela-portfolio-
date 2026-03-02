"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LowerThirdProps {
  name: string;
  role: string;
  visible?: boolean;
  delay?: number;
}

export default function LowerThird({
  name,
  role,
  visible = true,
  delay = 0,
}: LowerThirdProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-stretch"
        >
          {/* Accent bar */}
          <div className="w-[3px] bg-[#2D6BFF] rounded-l flex-shrink-0" />

          {/* Content */}
          <div className="flex flex-col bg-[#0B0D12]/90 backdrop-blur-sm px-4 py-2.5 rounded-r">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-[#2CFF9A] font-bold">
              {role}
            </span>
            <span className="font-bold text-base text-white leading-snug tracking-tight">
              {name}
            </span>
          </div>

          {/* Live badge */}
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="ml-2 self-center px-2 py-1 bg-[#FF2D92] rounded"
          >
            <span className="font-mono text-[8px] font-bold text-white tracking-[0.15em] uppercase">
              LIVE
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
