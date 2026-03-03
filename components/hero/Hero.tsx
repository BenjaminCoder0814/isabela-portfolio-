"use client";

import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n";
import Button from "@/components/ui/Button";

const ROTATE_INTERVAL = 1600;

export default function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("hero");
  const [active, cycle] = useCycle(...t.raw("rotate"));

  useEffect(() => {
    const id = setInterval(() => cycle(), ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [cycle]);

  return (
    <section id="hero" className="section-shell section-spacing relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(circle_at_20%_10%,rgba(255,45,146,0.16),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(45,107,255,0.16),transparent_42%)]" />
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-4">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 shadow-[0_12px_50px_rgba(255,45,146,0.25)]"
          >
            {t("tag")}
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl leading-[1.05] font-semibold md:text-6xl"
          >
            {t("headline")}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-muted max-w-xl"
          >
            <div className="flex items-baseline gap-2 text-2xl font-semibold text-white">
              <span className="text-white/70">{t("rotate.0")}</span>
              <motion.span
                key={active as string}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="text-(--magenta)"
              >
                {active}
              </motion.span>
            </div>
            <p className="mt-4 text-lg md:text-xl text-white/80">{t("value")}</p>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 flex flex-wrap gap-3"
          >
            <Button href={`/${locale}/pdf`} variant="primary">
              {t("ctaPdf")}
            </Button>
            <Button href={`/${locale}#contact`} variant="ghost">
              {t("ctaContact")}
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="absolute left-4 top-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              <span className="inline-flex items-center gap-2 rounded-full bg-(--glass-strong) px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-(--red) shadow-[0_0_0_6px_rgba(255,42,42,0.25)]" />
                REC
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-(--glass) px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-(--magenta) shadow-[0_0_0_6px_rgba(255,45,146,0.25)]" />
                LIVE
              </span>
            </div>
            <div className="relative rounded-2xl border border-white/10 bg-black/60 p-2">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.12),transparent_35%)] opacity-70" />
              <Image
                src="/hero-photo.jpg"
                alt="Isabela Machado"
                width={900}
                height={1100}
                className="relative z-10 h-full w-full rounded-xl object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl border border-white/10" />
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,45,146,0.18),transparent_60%)] blur-3xl" />
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em]"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-(--green)" />
                {t("lowerThirdTop")}
              </div>
              <div className="text-white/70">{t("lowerThirdBottom")}</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
