"use client";

export const dynamic = "force-dynamic";

import CinematicIntro from "@/components/intro/CinematicIntro";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Highlights from "@/components/sections/Highlights";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale as any;
  return (
    <main>
      <CinematicIntro />
      <Hero locale={locale} />
      <About />
      <Highlights />
      <Projects locale={locale} />
      <Skills />
      <Contact />
      <Footer locale={locale} />
    </main>
  );
}
