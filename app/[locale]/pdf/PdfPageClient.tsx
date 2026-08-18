"use client";

import { useState } from "react";
import Link from "next/link";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import PortfolioPdf from "@/pdf/PortfolioPdf";
import type { Locale } from "@/lib/utils";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function PdfPageClient() {
  const t = useTranslations("pdf");
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [showPreview, setShowPreview] = useState(false);

  const switchLocale = (next: Locale) => {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  const fileName = `isabela-machado-portfolio-${currentLocale}.pdf`;

  return (
    <div className="relative z-[1] min-h-screen pt-28 pb-16">
      <div className="shell flex max-w-4xl flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">
            <span className="h-px w-7 bg-[var(--line-strong)]" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h1 className="t-h2">{t("title")}</h1>
          <p className="t-body">{t("select")}</p>
        </div>

        {/* seletor de idioma do documento */}
        <div className="flex flex-wrap gap-2">
          {LOCALES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => switchLocale(code)}
              aria-current={currentLocale === code ? "true" : undefined}
              className={`rounded-full px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.16em] uppercase transition-colors ${
                currentLocale === code
                  ? "bg-[var(--key-deep)] text-[#ffffff]"
                  : "border border-[var(--line)] bg-[var(--bg-200)] text-[var(--tx-md)] hover:text-[var(--tx-hi)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <PDFDownloadLink
            document={<PortfolioPdf locale={currentLocale} />}
            fileName={fileName}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--key-deep)] px-6 py-3.5 font-mono text-[11px] font-bold tracking-[0.16em] text-[#ffffff] uppercase transition-transform hover:scale-[1.02]"
          >
            {({ loading }) => (loading ? t("generating") : t("download"))}
          </PDFDownloadLink>

          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-6 py-3.5 font-mono text-[11px] font-bold tracking-[0.16em] text-[var(--tx-hi)] uppercase transition-colors hover:border-[var(--key)]"
          >
            {t("preview")}
          </button>

          <Link
            href={`/${currentLocale}`}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-mono text-[11px] font-bold tracking-[0.16em] text-[var(--tx-md)] uppercase transition-colors hover:text-[var(--tx-hi)]"
          >
            {t("back")}
          </Link>
        </div>

        {showPreview && (
          <div className="overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--bg-200)]">
            <PDFViewer width="100%" height={720} showToolbar style={{ border: "none" }}>
              <PortfolioPdf locale={currentLocale} />
            </PDFViewer>
          </div>
        )}
      </div>
    </div>
  );
}
