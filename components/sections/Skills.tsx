"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Skills() {
  const t = useTranslations("skills");
  const hard = t.raw("hard") as string[];
  const tools = t.raw("tools") as string[];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const chipBase = "px-3 py-1.5 rounded text-xs font-mono font-semibold tracking-wide border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default";

  return (
    <SectionWrapper id="skills" dark>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Hard skills */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm tracking-widest uppercase text-[var(--muted)]">
              Hard Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {hard.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  className={`${chipBase} bg-[var(--accent1)]/8 text-[var(--accent1)] border-[var(--accent1)]/20 hover:bg-[var(--accent1)] hover:text-white hover:border-[var(--accent1)]`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm tracking-widest uppercase text-[var(--muted)]">
              Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                  className={`${chipBase} bg-[var(--accent2)]/8 text-[var(--accent2)] border-[var(--accent2)]/20 hover:bg-[var(--accent2)] hover:text-white hover:border-[var(--accent2)]`}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
