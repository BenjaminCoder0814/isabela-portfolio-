import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return notFound();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StudioBackground />
          <BroadcastHUD />
          <Navbar locale={locale as Locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
