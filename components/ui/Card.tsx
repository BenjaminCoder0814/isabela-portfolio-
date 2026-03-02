"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}

export default function Card({ children, className, glass, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "0 20px 40px rgba(0,87,255,0.08)" } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-lg border border-[var(--bg-2)] overflow-hidden",
        glass ? "glass" : "bg-white",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
