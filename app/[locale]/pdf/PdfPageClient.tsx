"use client";

import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import PortfolioPdf from "@/pdf/PortfolioPdf";
import type { Locale } from "@/lib/utils";

const locales: Array<{ code: Locale; label: string }> = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function PdfPageClient() {
  const t = useTranslations("pdf");
  const currentLocale = useLocale() as Locale;
  const [selectedLocale, setSelectedLocale] = useState<Locale>(currentLocale);
  const router = useRouter();
  const pathname = usePathname();
  const [showPreview, setShowPreview] = useState(false);

  function switchLocale(newLocale: Locale) {
    setSelectedLocale(newLocale);
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3"
        >
          <span className="label-tag w-fit">PDF</span>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-[var(--muted)]">{t("select")}</p>
        </motion.div>

        {/* Locale selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-3"
        >
          {locales.map(({ code, label }) => (
            <motion.button
              key={code}
              onClick={() => switchLocale(code)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded text-sm font-mono font-bold tracking-wide transition-all duration-200 ${
                selectedLocale === code
                  ? "bg-[var(--accent1)] text-white shadow-md shadow-blue-500/20"
                  : "bg-white border border-[var(--bg-2)] text-[var(--muted)] hover:border-[var(--accent1)] hover:text-[var(--accent1)]"
              }`}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap gap-3"
        >
          <PDFDownloadLink
            document={<PortfolioPdf locale={selectedLocale} />}
            fileName={`isabela-machado-portfolio-${selectedLocale}.pdf`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent1)] text-white text-sm font-bold rounded shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
          >
            {({ loading }) =>
              loading ? "Gerando PDF..." : (
                <>
                  {t("download")}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M3 5l4 4 4-4M1 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </>
              )
            }
          </PDFDownloadLink>

          <motion.button
            onClick={() => setShowPreview(!showPreview)}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 border-2 border-[var(--text)] text-[var(--text)] text-sm font-bold rounded hover:bg-[var(--text)] hover:text-white transition-all duration-200"
          >
            {showPreview ? "Fechar pré-visualização" : t("preview")}
          </motion.button>
        </motion.div>

        {/* PDF Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden border border-[var(--bg-2)] shadow-xl"
            style={{ height: "80vh" }}
          >
            <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
              <PortfolioPdf locale={selectedLocale} />
            </PDFViewer>
          </motion.div>
        )}
      </div>
    </div>
  );
}
