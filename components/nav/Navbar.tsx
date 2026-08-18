"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, m } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const SECTIONS = ["bridge", "deliver", "process", "lab", "stack", "about", "contact"] as const;

function DownloadIcon() {
  return (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden="true">
      <path
        d="M6 0v8M2.5 5L6 8.5 9.5 5M1 12h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // no topo (hero) nenhum item de navegação fica marcado
      if (window.scrollY < 80) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* indicador de seção ativa */
  useEffect(() => {
    const targets = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* trava o scroll com o drawer aberto */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <m.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-400 ${
        scrolled
          ? "h-16 border-[var(--line)] bg-[rgba(5,6,10,.82)]"
          : "h-20 border-[var(--line-soft)] bg-[rgba(5,6,10,.72)]"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center gap-4 px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="shrink-0 font-display text-lg leading-none tracking-[0.14em] text-[var(--tx-hi)] transition-colors hover:text-[var(--key)]"
        >
          ISABELA<span className="text-[var(--key)]">.</span>
        </Link>

        <nav className="ml-3 hidden min-w-0 flex-1 items-center gap-1 lg:flex">
          {SECTIONS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              aria-current={active === key ? "true" : undefined}
              className="relative rounded-full px-3 py-2 font-mono text-[10.5px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors"
            >
              {active === key && (
                <m.span
                  aria-hidden="true"
                  layoutId="nav-active"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full border border-[var(--line)] bg-[var(--glass)]"
                />
              )}
              <span
                className={`relative z-[1] ${
                  active === key ? "text-[var(--tx-hi)]" : "text-[var(--tx-md)] hover:text-[var(--tx-hi)]"
                }`}
              >
                {t(key)}
              </span>
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <Link
            href={`/${locale}/pdf`}
            aria-label={t("pdf")}
            title={t("pdf")}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--key-deep)] px-3 py-2.5 font-mono text-[10px] font-bold tracking-[0.14em] whitespace-nowrap text-[#ffffff] uppercase transition-transform hover:scale-[1.03] xl:px-4"
          >
            <DownloadIcon />
            <span className="hidden xl:inline">{t("pdf")}</span>
          </Link>

          <button
            type="button"
            className="flex flex-col gap-1.5 p-1.5 lg:hidden"
            aria-label={t("menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block h-0.5 w-5 bg-[var(--tx-hi)] transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-[var(--tx-hi)] transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-[var(--tx-hi)] transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* drawer mobile */}
      <AnimatePresence>
        {open && (
          <>
            <m.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-0 -z-[1] cursor-default bg-black/60 lg:hidden"
            />
            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-dvh w-[78vw] max-w-[320px] border-l border-[var(--line)] bg-[rgba(5,6,10,.94)] backdrop-blur-xl lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-6 pt-24">
                {SECTIONS.map((key) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    onClick={() => setOpen(false)}
                    className="border-b border-[var(--line-soft)] py-3.5 font-mono text-xs tracking-[0.18em] text-[var(--tx-md)] uppercase transition-colors hover:text-[var(--key)]"
                  >
                    {t(key)}
                  </a>
                ))}
              </nav>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </m.header>
  );
}
