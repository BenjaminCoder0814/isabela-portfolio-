import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://isabelamachado.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Isabela Machado — Mídia Paga & Performance",
    template: "%s · Isabela Machado",
  },
  description:
    "Eu planejo a campanha, produzo o criativo e leio o resultado. Mídia paga e performance — Publicidade e Propaganda (UNASP). Estágio e júnior, 100% remoto.",
  keywords: ["mídia paga", "performance", "Google Ads", "Meta Ads", "publicidade", "criativo de performance", "estágio", "remoto"],
  authors: [{ name: "Isabela Machado" }],
  openGraph: {
    type: "website",
    siteName: "Isabela Machado",
    title: "Isabela Machado — Mídia Paga & Performance",
    description: "Eu planejo a campanha, produzo o criativo e leio o resultado.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isabela Machado — Mídia Paga & Performance",
    description: "Eu planejo a campanha, produzo o criativo e leio o resultado.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
