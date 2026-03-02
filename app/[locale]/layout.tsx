import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { locales, type Locale } from "../../i18n";
import "../../styles/globals.css";
import Navbar from "@/components/nav/Navbar";
import BroadcastHUD from "@/components/hud/BroadcastHUD";
import StudioBackground from "@/components/bg/StudioBackground";

export const metadata: Metadata = {
  title: "Isabela Machado | Portfolio",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const messages = useMessages();
  if (!locales.includes(params.locale)) return notFound();

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <StudioBackground />
          <BroadcastHUD />
          <Navbar locale={params.locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
