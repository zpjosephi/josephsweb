import type { Metadata } from "next";
import { About } from "@/components/about";
import { Builds } from "@/components/builds";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Intro } from "@/components/intro";
import { Research } from "@/components/research";
import { ThesisExplorer } from "@/components/thesis-explorer";

export const metadata: Metadata = {
  title: "Data analyst",
  description:
    "Joseph Irawan, data analyst in Jakarta: a year at Indonesia Eximbank, a Computer Science & Statistics degree from BINUS, and a thesis on Premier League market values.",
};

export default function AnalystPage() {
  return (
    <>
      <main>
        <Intro />
        <ThesisExplorer />
        <Experience />
        <Research />
        <Builds />
        <About />
      </main>
      <Contact />
    </>
  );
}
