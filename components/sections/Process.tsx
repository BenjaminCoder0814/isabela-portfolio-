"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Process() {
  const t = useTranslations("process");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const steps = t.raw("steps") as { title: string; description: string; badge: string }[];

  return (
    <section id="process" className="section-spacing dark-section angled-divider">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              ref={ref}
              initial={{ x: -24, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="stroke-heading"
            >
              {t("subtitle")}
            </motion.p>
            <motion.h2
              initial={{ x: -24, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.08, duration: 0.7, ease: "easeOut" }}
              className="mt-2 text-3xl font-semibold md:text-5xl"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ x: -24, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
              className="mt-3 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg"
            >
              {t("description")}
            </motion.p>
          </div>
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white"
          >
            {t("label")}
          </motion.div>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-[1px] -translate-x-1/2 bg-linear-to-b from-(--magenta)/30 via-white/10 to-transparent md:block" aria-hidden />
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ y: 22, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.06 * idx, duration: 0.5, ease: "easeOut" }}
              className="group relative flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/70">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white/90">
                  <span className="h-2 w-2 rounded-full bg-(--magenta)" />
                  {step.badge}
                </span>
                <span className="text-white/50">{String(idx + 1).padStart(2, "0")}</span>
              </div>
              <div className="text-2xl font-semibold text-white">{step.title}</div>
              <p className="text-base leading-relaxed text-white/75">{step.description}</p>
              <div className="absolute -inset-px rounded-2xl border border-white/5 opacity-0 transition duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}