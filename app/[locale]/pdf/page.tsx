"use client";

import dynamic from "next/dynamic";

const PdfPageClient = dynamic(() => import("./PdfPageClient"), {
  ssr: false,
  loading: () => (
    <div className="relative z-[1] flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--key)] border-t-transparent" />
        <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--tx-lo)] uppercase">
          Rendering…
        </p>
      </div>
    </div>
  ),
});

export default function PdfPage() {
  return <PdfPageClient />;
}
