"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Education() {
  const t = useTranslations("education");
  const langItems = t.raw("languages.items") as string[];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="education" alt>
      <div ref={ref} className="flex flex-col gap-10">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main degree */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 bg-white rounded-xl border border-[var(--bg-2)] p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 rounded-full bg-[var(--accent1)]" />
              <span className="font-mono text-xs tracking-widest uppercase text-[var(--accent1)]">
                Graduação
              </span>
            </div>
            <h3 className="font-bold text-xl text-[var(--text)]">{t("degree")}</h3>
            <p className="text-sm text-[var(--muted)]">{t("institution")}</p>
            <span className="label-tag w-fit mt-1">{t("semester")}</span>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl border border-[var(--bg-2)] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 rounded-full bg-[var(--accent2)]" />
              <span className="font-mono text-xs tracking-widest uppercase text-[var(--accent2)]">
                {t("languages.title")}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {langItems.map((lang, i) => (
                <motion.li
                  key={lang}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-2 text-sm text-[var(--text)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)]" />
                  {lang}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Extras placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="md:col-span-3 bg-white rounded-xl border border-[var(--bg-2)] border-dashed p-6 flex items-center gap-4 text-[var(--muted)]"
          >
            <span className="font-mono text-xs tracking-widest uppercase">{t("extras")}</span>
            <div className="flex-1 h-px bg-[var(--bg-2)]" />
            <span className="font-mono text-xs text-[var(--muted)]">Em breve</span>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
