"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function About() {
  const t = useTranslations("about");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="about" alt>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center" ref={ref}>
        {/* Left — text */}
        <div className="flex flex-col gap-5">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="label-tag w-fit"
          >
            {t("label")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-[var(--muted)] leading-relaxed max-w-lg"
          >
            {t("body")}
          </motion.p>
        </div>

        {/* Right — decorative stat cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { label: "Rádio & TV", value: "1º sem.", color: "var(--accent1)" },
            { label: "Idiomas", value: "PT / EN / ES", color: "var(--accent2)" },
            { label: "Produção", value: "Completa", color: "var(--accent3)" },
            { label: "Foco", value: "Audiovisual", color: "var(--accent1)" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
              className="glass rounded-xl p-5 flex flex-col gap-1 border border-[var(--glass-border)] hover:shadow-md transition-shadow"
            >
              <span
                className="text-2xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--muted)]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
