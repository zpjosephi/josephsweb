import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Telemetry } from "@/components/telemetry";
import { SectionRail } from "@/components/section-rail";
import { DataTicker } from "@/components/data-ticker";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ByNumbers } from "@/components/sections/by-numbers";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { DataViz } from "@/components/sections/dataviz";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="brutal contents">
      {/* Blueprint graph-paper backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 datasheet-grid"
      />
      {/* Analog degradation: mechanical noise grain + CRT scanlines */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] noise-overlay" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] scanlines" />
      <Navbar />
      <Telemetry />
      <SectionRail />
      <main id="main-content" className="flex-1 brutal">
        <Hero />
        <DataTicker />
        <About />
        <ByNumbers />
        <Experience />
        <Projects />
        <Skills />
        <DataViz />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
