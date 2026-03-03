"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

export default function Skills() {
  const t = useTranslations("skills");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const categories = useMemo(() => t.raw("categories") as { title: string; items: string[] }[], [t]);
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
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.06 * idx, duration: 0.5, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-(--magenta)/0 via-(--blue)/0 to-(--blue)/8" aria-hidden />
              <div className="relative text-sm uppercase tracking-[0.18em] text-(--muted-dark)">{cat.title}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-semibold text-(--text)">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
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
