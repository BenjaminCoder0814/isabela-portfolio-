"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { type Locale } from "@/i18n";
import { motion, AnimatePresence } from "framer-motion";

const sections = ["about", "highlights", "showreel", "formats", "process", "skills", "contact"] as const;

export default function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const [active, setActive] = useState<(typeof sections)[number] | "hero">("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tc = now.toLocaleTimeString("pt-BR", { hour12: false });
      setTimecode(`${tc}:00`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setOpen(false);
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top) };
      });
      const closest = offsets.sort((a, b) => a.top - b.top)[0];
      if (closest) setActive(closest.id);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="fixed left-0 right-0 top-0 z-40">
      <div
        className={`section-shell mt-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-lg transition shadow-[0_12px_60px_rgba(0,0,0,0.28)] ${
          scrolled ? "border-white/20 bg-black/60" : ""
        }`}
      >
        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
          >
            <span className="h-2 w-2 rounded-full bg-(--magenta) shadow-[0_0_0_6px_rgba(255,45,146,0.25)]" />
            On Air
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {sections.map((id) => (
              <Link key={id} href={`/${locale}#${id}`} className="relative px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/80">
                <span className="relative inline-block">
                  {t(id)}
                  <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-white/50 transition duration-200 group-hover:scale-x-100 md:group-hover:scale-x-100" aria-hidden />
                </span>
                <AnimatePresence>
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-(--magenta)"
                      transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono uppercase tracking-[0.2em] text-white/80 md:flex">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
                <span className="h-2 w-2 rounded-full bg-(--red) shadow-[0_0_0_6px_rgba(255,42,42,0.25)]" />
                REC
              </span>
              <span className="text-white/70">{timecode}</span>
            </div>
            <Link
              href={`/${locale}/pdf`}
              className="group hidden items-center gap-2 rounded-full border border-(--magenta)/50 bg-(--magenta) px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_12px_40px_rgba(255,45,146,0.35)] transition duration-200 hover:translate-y-[-1px] hover:brightness-110 md:inline-flex"
            >
              <span className="h-2 w-2 rounded-full bg-white" />
              {t("pdf")}
            </Link>
            <LanguageSwitcher locale={locale} />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-5 rounded-full bg-white transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-white transition ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-white transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="section-shell mt-3 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-2">
              {sections.map((id) => (
                <Link
                  key={id}
                  href={`/${locale}#${id}`}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm uppercase tracking-[0.2em] text-white/80 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {t(id)}
                  {active === id && <span className="h-2 w-2 rounded-full bg-(--magenta)" />}
                </Link>
              ))}
              <Link
                href={`/${locale}/pdf`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-(--magenta) px-3 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                onClick={() => setOpen(false)}
              >
                {t("pdf")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
