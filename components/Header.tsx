"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import PdfButton from "@/components/ui/PdfButton";

const navItems = [
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "contact", href: "#contact" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-bold text-sm tracking-widest uppercase text-[var(--text)] hover:text-[var(--accent1)] transition-colors"
        >
          IM<span className="text-[var(--accent1)]">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-xs font-medium tracking-widest uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <PdfButton />
          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[var(--glass-border)]"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium tracking-widest uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  {t(item.key)}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
