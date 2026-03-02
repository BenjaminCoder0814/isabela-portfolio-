"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" className="section-spacing dark-section angled-divider">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="max-w-xl">
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
              className="mt-5 text-base md:text-lg leading-[1.7] text-white/80"
            >
              {t("body")}
            </motion.p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {(t.raw("cards") as { title: string; description: string }[]).map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1 * idx, duration: 0.6, ease: "easeOut" }}
                className="glass rounded-xl p-6 md:p-8"
              >
                <div className="text-sm uppercase tracking-[0.16em] text-white/60">{card.title}</div>
                <div className="mt-2 text-lg font-semibold text-white">{card.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
