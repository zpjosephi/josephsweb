import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { DataTerm } from "@/components/data-term";
import { Portrait } from "@/components/portrait";

const points = [
  {
    title: "The engineer",
    body: "CS background. I build production-grade web apps end to end, from UI to API to deployment.",
  },
  {
    title: "The statistician",
    body: "Statistics background. I model, test, and turn raw data into insight people can act on.",
  },
  {
    title: "The combination",
    body: "Most engineers are weak at modeling; most statisticians can't ship apps. I do both, and that's the edge.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="fig.01 / about"
      annotation="n = 2 disciplines"
      title="Two disciplines, one engineer"
    >
      <div className="mb-10 grid items-start gap-10 md:grid-cols-[260px_1fr]">
        {/* Framed portrait - halftone, datasheet style */}
        <Reveal>
          <figure className="w-full max-w-[260px]">
            <div className="overflow-hidden border-2 border-card-border bg-[#0a0a0a]">
              <Portrait mode="halftone" className="block h-auto w-full" />
            </div>
            {/* caption below keeps the image top aligned with the text */}
            <figcaption className="mt-3">
              <div className="relative">
                <div className="h-1.5 w-full tick-axis opacity-70" />
                <div className="h-px w-full bg-card-border" />
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>subject.001</span>
                <span className="text-accent">cs × stat</span>
              </div>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="max-w-[58ch] space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m a double-degree student in Computer Science and
              Statistics. Instead of treating them as separate worlds, I
              combine them: software that&apos;s built well{" "}
              <span className="text-foreground">and</span> reasons about data.
            </p>
            <p>
              My engineering projects prove I can{" "}
              <DataTerm
                series={[2, 3, 3, 5, 4, 6, 8]}
                metric="things built ↑"
              >
                build
              </DataTerm>
              . My statistics projects prove I can{" "}
              <DataTerm
                series={[5, 4, 6, 5, 7, 6, 9]}
                metric="insight extracted ↑"
              >
                analyze
              </DataTerm>
              . Together they tell a single story: data-driven products people
              actually use.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-px border-2 border-card-border bg-card-border sm:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={0.05 * i}>
            <div className="flex h-full flex-col bg-card p-5">
              <div className="mb-3 flex items-center justify-between tele text-[10px] text-muted-foreground">
                <span className="text-accent">/{String(i + 1).padStart(2, "0")}</span>
                <span>{"+"}</span>
              </div>
              <h3 className="mb-2 tele text-sm text-foreground">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
