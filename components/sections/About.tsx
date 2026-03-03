"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const metrics = t.raw("metrics") as { label: string; value: string }[];
  const cards = t.raw("cards") as { title: string; description: string }[];

  return (
    <section id="about" className="section-spacing dark-section angled-divider">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="relative max-w-2xl">
            <motion.p
              ref={ref}
              initial={{ x: -40, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="stroke-heading"
            >
              {t("subtitle")}
            </motion.p>
            <motion.h2
              initial={{ x: -40, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              className="mt-3 text-3xl font-semibold md:text-5xl"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ x: -40, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="mt-5 text-base leading-[1.7] text-white/80 md:text-lg"
            >
              {t("body")}
            </motion.p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-3xl font-semibold text-white">{metric.value}</div>
                  <div className="text-sm uppercase tracking-[0.14em] text-white/60">{metric.label}</div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -left-10 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_60%)] blur-3xl" aria-hidden />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1 * idx, duration: 0.6, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%)] opacity-70" aria-hidden />
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:backdrop-blur-sm" />
                <div className="relative text-sm uppercase tracking-[0.16em] text-white/60">{card.title}</div>
                <div className="relative mt-2 text-lg font-semibold text-white">{card.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
