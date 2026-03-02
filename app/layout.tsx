import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Isabela Machado — Portfólio",
  description: "Estudante de Rádio e TV, criadora de conteúdo e comunicadora audiovisual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
