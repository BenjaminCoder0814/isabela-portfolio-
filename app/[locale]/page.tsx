import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Highlights from "@/components/sections/Highlights";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Value from "@/components/sections/Value";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Projects />
      <Skills />
      <Education />
      <Value />
      <Contact />
    </>
  );
}
