"use client";

export const dynamic = "force-dynamic";

import CinematicIntro from "@/components/intro/CinematicIntro";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Highlights from "@/components/sections/Highlights";
import Showreel from "@/components/sections/Showreel";
import Formats from "@/components/sections/Formats";
import Process from "@/components/sections/Process";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { Locale } from "@/i18n";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return (
    <main>
      <CinematicIntro />
      <Hero locale={locale} />
      <About />
      <Highlights />
      <Showreel locale={locale} />
      <Formats locale={locale} />
      <Process />
      <Skills />
      <Contact />
      <Footer locale={locale} />
    </main>
  );
}
