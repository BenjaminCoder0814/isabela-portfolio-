"use client";

import dynamic from "next/dynamic";

const PdfPageClient = dynamic(() => import("./PdfPageClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-[var(--accent1)] border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-xs text-[var(--muted)] tracking-widest">Carregando PDF...</p>
      </div>
    </div>
  ),
});

export default function PdfPage() {
  return <PdfPageClient />;
}
