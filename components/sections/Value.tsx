"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const accentColors = [
  "var(--accent1)",
  "var(--accent2)",
  "var(--accent3)",
  "var(--accent1)",
  "var(--accent2)",
  "var(--accent3)",
];

export default function Value() {
  const t = useTranslations("value");
  const items = t.raw("items") as Array<{ title: string; desc: string }>;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="value">
      <div ref={ref} className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-[var(--muted)]"
          >
            {t("sub")}
          </motion.p>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}
              className={`group bg-white rounded-xl border border-[var(--bg-2)] p-6 flex flex-col gap-3 transition-shadow ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className="w-8 h-0.5 rounded transition-all duration-300 group-hover:w-14"
                style={{ background: accentColors[i] }}
              />
              <h3 className="font-bold text-base text-[var(--text)]">{item.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
