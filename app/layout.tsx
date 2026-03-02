import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isabela Machado | Portfolio",
  description: "Portfólio Broadcast/Studio de Isabela Machado - Rádio & TV.",
  metadataBase: new URL("https://isabela.example"),
  openGraph: {
    title: "Isabela Machado | Portfolio",
    description: "Portfólio Broadcast/Studio de Isabela Machado - Rádio & TV.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-(--bg-dark) text-(--text-invert)"
      suppressHydrationWarning
    >
      <body className={`${inter.variable} ${grotesk.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
