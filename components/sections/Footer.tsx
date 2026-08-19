"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/nav/LanguageSwitcher";
import {
  ChannelIcon,
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
  LINKEDIN,
  PHONE_DISPLAY,
  waLink,
  type Channel,
} from "./Contact";

const NAV_KEYS = ["bridge", "deliver", "process", "journey", "lab", "stack", "about", "contact"] as const;

function contacts(waMessage: string): { k: Channel; label: string; href: string }[] {
  return [
    { k: "email", label: EMAIL, href: `mailto:${EMAIL}` },
    { k: "whatsapp", label: PHONE_DISPLAY, href: waLink(waMessage) },
    { k: "linkedin", label: "LinkedIn", href: LINKEDIN },
    { k: "instagram", label: INSTAGRAM_HANDLE, href: INSTAGRAM },
  ];
}

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const contact = useTranslations("contact");
  const locale = useLocale();
  const CONTACTS = contacts(contact("whatsappMessage"));

  return (
    <footer
      className="relative z-[1] overflow-hidden"
      style={{ background: "color-mix(in srgb, var(--bg-000) 92%, transparent)" }}
    >
      <div className="light-rail" aria-hidden="true" style={{ ["--rail-color" as string]: "var(--fill)" }} />

      <div className="shell relative z-[1] pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {/* 1 — marca */}
          <div>
            <Link
              href={`/${locale}`}
              className="font-display text-3xl leading-none tracking-[0.06em] text-[var(--tx-hi)]"
            >
              ISABELA MACHADO<span className="text-[var(--key)]">.</span>
            </Link>
            <p className="mt-3 font-mono text-[11px] sm:text-[10.5px] tracking-[0.16em] text-[var(--tx-lo)] uppercase">
              {t("tagline")}
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] sm:text-[10.5px] tracking-[0.16em] text-[var(--rim)] uppercase">
              <span
                className="h-2 w-2 rounded-full bg-[var(--rim)] shadow-[0_0_8px_var(--rim)]"
                style={{ animation: "status-pulse 2.4s ease-in-out infinite" }}
                aria-hidden="true"
              />
              {t("status")}
            </p>
          </div>

          {/* 2 — navegação */}
          <nav aria-label={t("navLabel")}>
            <p className="eyebrow mb-4">{t("navLabel")}</p>
            <ul className="grid grid-cols-2 gap-x-4 sm:grid-cols-1 sm:gap-y-0">
              {NAV_KEYS.map((k) => (
                <li key={k}>
                  <a
                    href={`#${k}`}
                    className="flex min-h-[44px] items-center font-mono text-[11px] tracking-[0.14em] text-[var(--tx-md)] uppercase transition-colors hover:text-[var(--key)] sm:min-h-[36px]"
                  >
                    {nav(k)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3 — contato */}
          <div className="min-w-0">
            <p className="eyebrow mb-4">{t("contactLabel")}</p>
            <ul className="flex flex-col">
              {CONTACTS.map((c) => (
                <li key={c.k} className="min-w-0">
                  <a
                    href={c.href}
                    target={c.k === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] max-w-full items-center gap-2.5 font-mono text-[11px] tracking-[0.1em] text-[var(--tx-md)] transition-colors hover:text-[var(--key)] sm:min-h-[36px]"
                  >
                    <ChannelIcon k={c.k} className="h-4 w-4" />
                    <span className="truncate">{c.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 — ações */}
          <div>
            <p className="eyebrow mb-4">{t("actionsLabel")}</p>
            <Link
              href={`/${locale}/pdf`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--key-deep)] px-5 py-3 font-mono text-[11px] font-bold tracking-[0.16em] text-[#ffffff] uppercase transition-transform hover:scale-[1.03]"
            >
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden="true">
                <path
                  d="M6 0v8M2.5 5L6 8.5 9.5 5M1 12h10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {nav("pdf")}
            </Link>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--line-soft)] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] sm:text-[10.5px] tracking-[0.12em] text-[var(--tx-lo)]">
            © 2026 Isabela Machado
          </p>
          <span
            aria-hidden="true"
            className="h-px w-32 shrink-0"
            style={{
              background: "linear-gradient(90deg, transparent, var(--key), var(--fill), transparent)",
            }}
          />
        </div>
      </div>
    </footer>
  );
}
