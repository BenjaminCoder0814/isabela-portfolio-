"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const LOCALES = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    startTransition(() => router.push(segments.join("/") || `/${next}`));
  };

  return (
    <div
      className="flex shrink-0 items-center gap-0.5 rounded-full border border-[var(--line)] bg-[var(--bg-200)] p-1"
      role="group"
      aria-label="Idioma / Language / Idioma"
      data-pending={pending || undefined}
    >
      {LOCALES.map(({ code, label }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-current={active ? "true" : undefined}
            className={`min-h-[40px] min-w-[40px] rounded-full px-3 py-2 font-mono text-[11px] font-bold tracking-[0.14em] transition-colors sm:min-h-0 sm:min-w-0 sm:px-2.5 sm:py-1 sm:text-[10px] ${
              active
                ? "bg-[var(--key-deep)] text-[#ffffff]"
                : "text-[var(--tx-md)] hover:bg-[var(--glass)] hover:text-[var(--tx-hi)]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
