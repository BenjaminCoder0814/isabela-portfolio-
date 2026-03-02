"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = ""; // placeholder for locale

  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em]">
      {locales.map((lng) => {
        const target = `/${[lng, ...segments.slice(1)].filter(Boolean).join("/")}`;
        return (
          <Link
            key={lng}
            href={target}
            className={`rounded-full px-3 py-1 transition-colors ${
              lng === locale
                ? "bg-(--glass-strong) text-white"
                : "text-white/70 hover:text-white bg-(--glass)"
            }`}
          >
            {lng}
          </Link>
        );
      })}
    </div>
  );
}
