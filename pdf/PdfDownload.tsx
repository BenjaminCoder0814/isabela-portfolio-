"use client";

import { PdfDownload as Download } from "./PortfolioPdf";

export default function PdfDownload(props: { locale: string; label: string }) {
  return <Download {...props} />;
}
