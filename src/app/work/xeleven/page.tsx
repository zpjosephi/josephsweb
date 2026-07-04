import type { Metadata } from "next";
import { CaseStudy } from "@/components/home/case-study";

export const metadata: Metadata = {
  title: "xEleven case study",
  description:
    "How a Computer Science and Statistics thesis became a nine-tool Premier League analytics and season-management app.",
};

const chapters = [
  {
    title: "A thesis I didn't want to stop at",
    body: [
      "xEleven began as my final-year thesis. My double degree (Computer Science and Statistics) required a project that was both a working application and statistically grounded.",
      "That first version was a modest statistical exercise in R; it did the job, and I could have stopped there. But I love football, and the more I worked on it the more I saw what it could become: not a deliverable, but a real Premier League analytics and season-management tool. So after submitting, I kept building, and rebuilt it into the nine-tool web app it is today: live standings, scouting, title-race charts, aging curves, a squad builder, and a full Manager Mode.",
    ],
  },
  {
    title: "Manager Mode had to feel real",
    body: [
      "The hardest part wasn't the charts, it was Manager Mode, the tool that runs a club through an entire season. A simulation is only convincing if the logic underneath it holds up, so I treated it like a model to validate, not just code to write.",
      "I defined the rules myself (transfer economics, squad value, match and penalty outcomes), then tested them by hand, season after season, watching for where they broke. Across roughly thirty iterations I tuned the edge cases: should the engine reward buying a cheap, aging star? how often should a penalty actually miss? Every fix looked small on its own; together they're what makes the simulation feel real instead of arbitrary.",
    ],
  },
  {
    title: "Working within honest limits",
    body: [
      "Live data comes from the football-data.org API, chosen because it's accessible and free, which also meant designing around its rate limits and the fields it doesn't expose.",
      "That constraint was familiar. For the original thesis I collected data entirely by hand, pulling from Transfermarkt and cross-referencing Football Manager for homegrown status, because Transfermarkt's terms don't permit scraping. Respecting that, and doing the tedious manual work instead, taught me as much about data as any model did.",
    ],
  },
  {
    title: "What I'd push further",
    body: [
      "I wanted xEleven to track players across more than a single season, but that runs straight into the limits of freely available data; proper multi-season analysis would need players from outside the Premier League too. For now I scoped to what I could source reliably. It's the kind of limit I'd rather state plainly than paper over.",
    ],
  },
  {
    title: "The first thing I built with real intent",
    body: [
      "xEleven is the first web app I built because I wanted to, not because I had to, and it changed how I see my own range. I learned I could pull live data, model it, and put it in front of someone in a browser, end to end.",
      "As a Computer Science and Statistics student I'd always worked with data. This is where I felt how powerful it is when it's actually running, not just analyzed. And I don't think it's finished; I keep finding more it could be, which is probably the best sign I picked the right thing to build.",
    ],
  },
];

export default function XelevenCaseStudy() {
  return (
    <CaseStudy
      title="xEleven"
      intro="A Premier League analytics and season-management app that brings nine interactive tools into one place, built from a thesis into something I actually wanted to use."
      facts={[
        { k: "Role", v: "Solo: design, data, build" },
        { k: "Stack", v: "Next.js, TypeScript, Recharts" },
        { k: "Data", v: "football-data.org, 10 EPL seasons" },
      ]}
      image={{
        src: "/projects/xeleven.png",
        alt: "xEleven overview page with a season selector and the toolbox of analytics tools",
      }}
      liveUrl="https://epl-xeleven.vercel.app/"
      chapters={chapters}
    />
  );
}
