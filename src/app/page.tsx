import { About } from "@/components/about";
import { Builds } from "@/components/builds";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Intro } from "@/components/intro";
import { Research } from "@/components/research";
import { ThesisExplorer } from "@/components/thesis-explorer";

export default function Home() {
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
