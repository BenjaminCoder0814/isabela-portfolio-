"use client";

import { useTranslations } from "next-intl";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");

  return (
    <footer className="section-spacing light-section">
      <div className="section-shell rounded-2xl border border-black/10 bg-white/70 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="space-y-2 text-(--text)">
            <div className="text-xs uppercase tracking-[0.2em] text-(--muted-dark)">Broadcast</div>
            <div className="text-lg font-semibold">{t("rights")}</div>
            <div className="flex flex-wrap gap-3 text-sm text-(--muted-dark)">
              <a href={`/${locale}#about`} className="hover:text-(--text)">{t("links.about")}</a>
              <a href={`/${locale}#highlights`} className="hover:text-(--text)">{t("links.highlights")}</a>
              <a href={`/${locale}#showreel`} className="hover:text-(--text)">{t("links.showreel")}</a>
              <a href={`/${locale}#skills`} className="hover:text-(--text)">{t("links.skills")}</a>
              <a href={`/${locale}#contact`} className="hover:text-(--text)">{t("links.contact")}</a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <a
              href={`/${locale}/pdf`}
              className="rounded-full bg-(--text) px-4 py-2 text-sm font-semibold text-(--bg-light) shadow-sm"
            >
              {t("pdf")}
            </a>
            <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-(--muted-dark)">
              REC • ON AIR
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
