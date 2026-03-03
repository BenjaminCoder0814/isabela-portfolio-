"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { type Locale } from "@/i18n";
import { motion, AnimatePresence } from "framer-motion";

const sections = ["about", "highlights", "showreel", "formats", "process", "skills", "contact"] as const;

export default function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const [active, setActive] = useState<(typeof sections)[number] | "hero">("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
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
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-40`}
    >
      <div
        className={`section-shell mt-4 rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur ${
          scrolled ? "shadow-lg shadow-(--magenta)/20" : ""
        }`}
      >
        <div className="flex items-center gap-4 md:gap-6">
          <Link href={`/${locale}`} className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
            <span className="h-2 w-2 rounded-full bg-(--magenta) shadow-[0_0_0_6px_rgba(255,45,146,0.25)]" />
            On Air
          </Link>
          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {sections.map((id) => (
              <Link key={id} href={`/${locale}#${id}`} className="relative px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/80">
                {t(id)}
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
            <Link
              href={`/${locale}/pdf`}
              className="rounded-full bg-(--magenta) px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-(--magenta)/30 transition hover:brightness-110"
            >
              {t("pdf")}
            </Link>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
