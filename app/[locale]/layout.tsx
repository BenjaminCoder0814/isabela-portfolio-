import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { fontVars } from "@/app/fonts";
import { personSchema } from "@/lib/personSchema";
import MotionProvider from "@/components/motion/MotionProvider";
import CampaignBootSequence from "@/components/boot/CampaignBootSequence";
import AtmosphereLayer from "@/components/bg/AtmosphereLayer";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/sections/Footer";

const locales = ["pt", "en", "es"];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://isabelamachado.example";

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
      <head>
        {/* JSON-LD Person — é o que sistema de triagem por IA lê */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema(locale, SITE_URL)),
          }}
        />
        <noscript>
          {/* sem JS o observador não roda; nada pode ficar invisível */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CampaignBootSequence />
          <MotionProvider>
            <AtmosphereLayer />
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
