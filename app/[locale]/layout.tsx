import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { fontVars } from "@/app/fonts";
import MotionProvider from "@/components/motion/MotionProvider";
import StudioLayer from "@/components/bg/StudioLayer";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/sections/Footer";

const locales = ["pt", "en", "es"];

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
  if (!locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={fontVars}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <StudioLayer />
            <Navbar />
            <main className="relative z-[1]">{children}</main>
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
