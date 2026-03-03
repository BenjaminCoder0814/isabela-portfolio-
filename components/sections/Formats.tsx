"use client";

import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { formats } from "@/lib/formats.data";
import { Locale } from "@/i18n";

const toneMap = {
  magenta: "from-(--magenta)/14 to-(--magenta)/4",
  blue: "from-(--blue)/14 to-(--blue)/4",
  green: "from-(--green)/14 to-(--green)/4",
};

export default function Formats({ locale }: { locale: Locale }) {
  const t = useTranslations("formats");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const mapped = useMemo(
    () =>
      formats.map((format) => ({
        ...format,
        title: format.title[locale],
        description: format.description[locale],
        deliverables: format.deliverables[locale],
      })),
    [locale]
  );

  return (
    <section id="formats" className="section-spacing light-section">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              ref={ref}
              initial={{ x: -24, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="stroke-heading text-(--muted-dark)"
            >
              {t("subtitle")}
            </motion.p>
            <motion.h2
              initial={{ x: -24, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.08, duration: 0.7, ease: "easeOut" }}
              className="mt-2 text-3xl font-semibold text-(--text) md:text-5xl"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ x: -24, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
              className="mt-3 max-w-3xl text-base leading-relaxed text-(--muted-dark) md:text-lg"
            >
              {t("description")}
            </motion.p>
          </div>
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-(--text)"
          >
            {t("label")}
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mapped.map((format, idx) => (
            <motion.article
              key={format.id}
              initial={{ y: 24, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.05 * idx, duration: 0.5, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl border border-black/8 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${toneMap[format.tone]} opacity-80`} aria-hidden />
              <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:backdrop-blur-[2px]" />
              <div className="relative flex h-full flex-col gap-4 p-6">
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-(--muted-dark)">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-(--text)">
                    <span className="h-2 w-2 rounded-full bg-(--text) opacity-50" />
                    {format.duration}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-(--text)">
                    {format.focus.join(" • ")}
                  </span>
                </div>
                <div className="text-2xl font-semibold text-(--text)">{format.title}</div>
                <p className="text-base leading-relaxed text-(--muted-dark)">{format.description}</p>
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--text)">
                  {format.deliverables.map((item) => (
                    <span key={item} className="rounded-full bg-white/70 px-3 py-1 shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}