"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function PdfButton() {
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}>
      <Link
        href={`/${locale}/pdf`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase border border-[var(--accent1)] text-[var(--accent1)] rounded hover:bg-[var(--accent1)] hover:text-white transition-all duration-200"
      >
        <span className="hidden sm:inline">{t("pdf")}</span>
        <span className="sm:hidden">PDF</span>
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 0v8M1 5l4 4 4-4M1 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </motion.div>
  );
}
