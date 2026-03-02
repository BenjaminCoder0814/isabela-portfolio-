import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

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
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
