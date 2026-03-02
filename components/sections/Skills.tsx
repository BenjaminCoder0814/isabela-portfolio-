"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

export default function Skills() {
  const t = useTranslations("skills");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const chips = useMemo(() => t.raw("chips") as string[], [t]);
  const tools = useMemo(() => t.raw("tools") as string[], [t]);

  return (
    <section id="skills" className="section-spacing light-section">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              ref={ref}
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="stroke-heading text-(--muted-dark)"
            >
              {t("subtitle")}
            </motion.p>
            <motion.h2
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              className="mt-2 text-3xl font-semibold text-(--text) md:text-5xl"
            >
              {t("title")}
            </motion.h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {chips.map((chip, idx) => (
            <motion.span
              key={chip}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.05 * idx, duration: 0.5, ease: "easeOut" }}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-(--text) shadow-sm"
            >
              {chip}
            </motion.span>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.05 * idx, duration: 0.5, ease: "easeOut" }}
              className="rounded-xl border border-black/5 bg-white px-4 py-3 text-(--text) shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
