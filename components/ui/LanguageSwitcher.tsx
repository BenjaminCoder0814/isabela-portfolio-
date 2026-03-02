"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const locales = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    // replace the locale segment in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-0.5 p-1 rounded bg-[var(--bg-2)]">
      {locales.map(({ code, label }) => (
        <motion.button
          key={code}
          onClick={() => switchLocale(code)}
          whileTap={{ scale: 0.92 }}
          className={`px-2 py-0.5 rounded text-xs font-mono font-bold tracking-wider transition-all duration-200 ${
            locale === code
              ? "bg-[var(--accent1)] text-white"
              : "text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
