"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-2)] border-t border-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link
              href={`/${locale}`}
              className="font-bold text-lg tracking-widest uppercase"
            >
              Isabela<span className="text-[var(--accent1)]">.</span>
            </Link>
            <p className="mt-1 text-xs text-[var(--muted)] font-mono">{t("made")}</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-5">
            {(["about", "projects", "skills", "contact"] as const).map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-xs font-medium tracking-widest uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {nav(key)}
              </a>
            ))}
          </nav>

          {/* PDF Download */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={`/${locale}/pdf`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border border-[var(--accent1)] text-[var(--accent1)] rounded hover:bg-[var(--accent1)] hover:text-white transition-all duration-200"
            >
              {nav("pdf")}
            </Link>
          </motion.div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--bg)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--muted)]">
            © {year} Isabela Machado — {t("rights")}
          </p>
          <div className="flex items-center gap-1 text-xs font-mono text-[var(--muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)] animate-pulse inline-block" />
            Portfolio v1.0
          </div>
        </div>
      </div>
    </footer>
  );
}
