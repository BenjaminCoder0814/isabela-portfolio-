"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";

export default function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" className="section-spacing dark-section">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              ref={ref}
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="stroke-heading"
            >
              {t("subtitle")}
            </motion.p>
            <motion.h2
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
              className="mt-2 text-3xl font-semibold md:text-5xl"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
              className="mt-4 max-w-2xl text-base md:text-lg leading-[1.7] text-white/80"
            >
              {t("description")}
            </motion.p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="glass relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%)] opacity-60" aria-hidden />
            <div className="relative grid gap-3 sm:grid-cols-2">
              <Button href="https://wa.me/" variant="primary" className="w-full justify-center">
                {t("buttons.whatsapp")}
              </Button>
              <Button href="mailto:isabela@example.com" variant="ghost" className="w-full justify-center">
                {t("buttons.email")}
              </Button>
              <Button href="https://www.instagram.com" variant="ghost" className="w-full justify-center">
                {t("buttons.instagram")}
              </Button>
              <Button href="https://www.linkedin.com" variant="ghost" className="w-full justify-center">
                {t("buttons.linkedin")}
              </Button>
            </div>
            <div className="relative mt-6 grid gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">{t("availabilityLabel")}</div>
                <div className="mt-1 font-semibold text-white">{t("availability")}</div>
              </div>
              <div className="flex items-center justify-end gap-2 text-xs font-mono uppercase tracking-[0.18em] text-white/70">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
                  <span className="h-2 w-2 rounded-full bg-(--green)" />
                  ON AIR
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
                  {t("qr")}
                </span>
              </div>
            </div>
          </div>
          <div className="glass relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(45,107,255,0.14),transparent_55%)] opacity-50" aria-hidden />
            <form className="relative grid gap-4">
              <label className="text-sm font-semibold text-white/80">
                {t("form.name")}
                <input
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-(--magenta)"
                  type="text"
                  name="name"
                  placeholder=""
                />
              </label>
              <label className="text-sm font-semibold text-white/80">
                {t("form.email")}
                <input
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-(--magenta)"
                  type="email"
                  name="email"
                  placeholder=""
                />
              </label>
              <label className="text-sm font-semibold text-white/80">
                {t("form.message")}
                <textarea
                  className="mt-2 min-h-32 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-(--magenta)"
                  name="message"
                  placeholder=""
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-[1fr_120px] sm:items-center">
                <Button type="submit" variant="primary" className="justify-center">
                  {t("form.submit")}
                </Button>
                <div className="relative flex h-full items-center justify-center rounded-xl border border-white/12 bg-black/30 p-3">
                  <div className="h-20 w-20 rounded-lg border border-white/20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_60%)]" />
                  <div className="absolute inset-0 rounded-xl border border-white/10" aria-hidden />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
