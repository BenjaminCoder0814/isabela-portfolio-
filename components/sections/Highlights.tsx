"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const icons: Record<number, string> = {
  0: "🎙",
  1: "📝",
  2: "🎬",
  3: "📸",
  4: "📱",
  5: "🎞",
};

export default function Highlights() {
  const t = useTranslations("highlights");
  const items = t.raw("items") as Array<{ title: string; desc: string }>;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="highlights">
      <div ref={ref} className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label-tag w-fit"
          >
            {t("label")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            {t("title")}
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,87,255,0.1)" }}
              className="group relative bg-white rounded-xl border border-[var(--bg-2)] p-6 flex flex-col gap-3 overflow-hidden cursor-default transition-shadow"
            >
              {/* Accent line */}
              <motion.div
                className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "linear-gradient(90deg, var(--accent1), var(--accent2))" }}
              />

              <span className="text-3xl select-none">{icons[i]}</span>
              <h3 className="font-bold text-lg text-[var(--text)]">{item.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{item.desc}</p>

              {/* Index number */}
              <span className="absolute bottom-4 right-5 font-mono text-xs font-bold text-[var(--bg-2)]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
