"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Highlights() {
  const t = useTranslations("highlights");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="highlights" className="section-spacing light-section">
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
          {(t.raw("items") as { title: string; description: string }[]).map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.05 * idx, duration: 0.6, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-(--magenta)/0 via-(--blue)/0 to-(--blue)/10 opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="relative flex flex-col gap-3">
                <div className="h-10 w-10 rounded-full bg-black/4 text-(--text) opacity-80" aria-hidden>
                  <div className="h-full w-full bg-[radial-gradient(circle,rgba(45,107,255,0.16),transparent_60%)]" />
                </div>
                <div className="text-xl font-semibold text-(--text)">{item.title}</div>
                <p className="text-base leading-relaxed text-(--muted-dark)">{item.description}</p>
              </div>
              <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:backdrop-blur-sm" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
