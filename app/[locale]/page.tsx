import Hero from "@/components/hero/Hero";
import Bridge from "@/components/sections/Bridge";
import Deliver from "@/components/sections/Deliver";
import Process from "@/components/sections/Process";
import Journey from "@/components/sections/Journey";
import Lab from "@/components/sections/Lab";
import Stack from "@/components/sections/Stack";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Bridge />
      <Deliver />
      <Process />
      <Journey />
      <Lab />
      <Stack />
      <About />
      <Contact />
    </>
  );
}
