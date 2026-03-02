"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

export default function SectionWrapper({ id, children, className, alt }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "py-20 lg:py-28",
        alt ? "bg-[var(--bg-2)]" : "bg-[var(--bg)]",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}
