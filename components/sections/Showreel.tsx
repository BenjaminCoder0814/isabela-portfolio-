"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function Showreel({ locale }: { locale: string }) {
  const t = useTranslations("showreel");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const chapters = t.raw("chapters") as { title: string; timecode: string }[];

  return (
    <section id="showreel" className="section-spacing dark-section">
      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
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
              className="mt-3 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg"
            >
              {t("description")}
            </motion.p>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="flex flex-wrap gap-3"
          >
            <Button href={`/${locale}/pdf`} variant="primary" size="sm">
              {t("ctaPdf")}
            </Button>
            <Button href={`/${locale}#contact`} variant="ghost" size="sm">
              {t("ctaContact")}
            </Button>
          </motion.div>
        </div>

        <div className="glass-strong relative overflow-hidden rounded-3xl border border-white/12 p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,45,146,0.14),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(45,107,255,0.16),transparent_40%)] opacity-60" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_24%,transparent_65%,rgba(0,0,0,0.55))]" aria-hidden />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative grid gap-6 lg:grid-cols-[2fr_1fr]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-black/60 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,255,255,0.1),transparent_45%)] opacity-60" aria-hidden />
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(135deg,#1b1f2d,#0b0d12)]" aria-label={t("title")}>
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                      <span className="h-2 w-2 rounded-full bg-(--green) shadow-[0_0_0_6px_rgba(44,255,154,0.2)]" />
                      {t("live")}
                    </div>
                    <div className="text-2xl font-semibold md:text-3xl">{t("teaser")}</div>
                    <div className="text-sm text-white/70">{t("hint")}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-(--magenta)" />
                  {t("status")}
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <span>4K</span>
                  <span>25fps</span>
                  <span>Rec709</span>
                </div>
              </div>
            </div>

            <div className="relative grid content-between gap-4 rounded-2xl border border-white/12 bg-white/5 p-4 md:p-5">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-white/70">
                <span>{t("chaptersTitle")}</span>
                <span>{t("runtime")}</span>
              </div>
              <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-black/20">
                {chapters.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ y: 10, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.05 * idx, duration: 0.4, ease: "easeOut" }}
                    className="flex items-center justify-between px-4 py-3 text-sm text-white/90"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-white/60">{item.timecode}</span>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-lg border border-white/10 bg-(--glass) px-4 py-3 text-sm text-white/80">
                {t("ctaDeck")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}