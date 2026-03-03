"use client";

import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n";
import Button from "@/components/ui/Button";

const ROTATE_INTERVAL = 1600;

export default function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("hero");
  const rotate = useMemo(() => t.raw("rotate") as string[], [t]);
  const [active, cycle] = useCycle(...rotate);

  useEffect(() => {
    const id = setInterval(() => cycle(), ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [cycle]);

  return (
    <section id="hero" className="section-shell section-spacing relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,45,146,0.18),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(45,107,255,0.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(5,6,12,0.9),rgba(12,15,24,0.92))]" />
        <div className="absolute left-10 right-10 top-16 h-44 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.16),transparent_55%)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
      </div>

      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="relative flex flex-col gap-5">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 shadow-[0_12px_50px_rgba(255,45,146,0.25)]"
          >
            <span className="h-2 w-2 rounded-full bg-(--magenta) shadow-[0_0_0_6px_rgba(255,45,146,0.25)]" />
            {t("tag")}
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.55 }} className="relative">
            <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_60%)] blur-3xl" />
            <h1 className="text-4xl font-semibold leading-[1.05] md:text-6xl">
              {t("headline")}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/80 md:text-xl">{t("value")}</p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.22, duration: 0.55 }} className="max-w-xl rounded-2xl border border-white/10 bg-white/5 p-4">
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
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-2 flex flex-wrap gap-3">
            <Button href={`/${locale}/pdf`} variant="primary">
              {t("ctaPdf")}
            </Button>
            <Button href={`/${locale}#contact`} variant="ghost">
              {t("ctaContact")}
            </Button>
          </motion.div>

          <div className="pointer-events-none absolute -inset-x-10 bottom-0 top-10 -z-10 bg-[radial-gradient(circle_at_40%_20%,rgba(45,107,255,0.1),transparent_40%),radial-gradient(circle_at_70%_50%,rgba(255,45,146,0.08),transparent_45%)] opacity-80 blur-3xl" aria-hidden />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="relative">
          <div className="absolute -left-8 -right-8 -top-6 bottom-10 rounded-[32px] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.07),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(44,255,154,0.12),transparent_40%)] blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/5 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" aria-hidden />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-(--red) shadow-[0_0_0_6px_rgba(255,42,42,0.25)]" />
                REC
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-(--green) shadow-[0_0_0_6px_rgba(44,255,154,0.25)]" />
                LIVE FEED
              </span>
              <span className="font-mono text-white/60">4K • 25fps • Rec709</span>
            </div>
            <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/12 bg-black/70 p-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.12),transparent_35%)] opacity-70" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_26%,transparent_70%,rgba(0,0,0,0.5))]" />
              <Image
                src="/hero-photo.jpg"
                alt="Isabela Machado"
                width={900}
                height={1100}
                className="relative z-10 h-full w-full rounded-xl object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl border border-white/10" />
              <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-(--magenta)" />
                  ON AIR
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-white/70">
                  <span className="h-2 w-2 rounded-full bg-(--blue)" />
                  TC 00:00:00:00
                </div>
              </div>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-5 flex items-center justify-between rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em]"
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
