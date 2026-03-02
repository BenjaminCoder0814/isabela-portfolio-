export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PortfolioPdf } from "@/pdf/PortfolioPdf";
import PdfDownload from "@/pdf/PdfDownload";

export default async function PdfPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "pdfPage" });

  return (
    <div className="section-shell section-spacing">
      <div className="glass-strong rounded-2xl p-8 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="stroke-heading">PDF</p>
            <h1 className="text-3xl md:text-4xl font-semibold">{t("title")}</h1>
            <p className="text-lg text-muted max-w-2xl">{t("description")}</p>
          </div>
          <PdfDownload locale={params.locale} label={t("download")} />
        </div>
        <div className="mt-8 rounded-xl overflow-hidden border border-white/10 bg-black/40">
          <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <PortfolioPdf locale={params.locale} preview />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
