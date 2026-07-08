export type SkillGroup = {
  label: string;
  items: string[];
};

// The live home (/) skips the badge grid. Three sentences instead, grouped by
// the CS x Statistics positioning, each anchored to where the tools got used.
export type ToolkitRow = {
  label: string;
  body: string;
};

export const toolkit: ToolkitRow[] = [
  {
    label: "Statistics",
    body: "R, Python with pandas and scikit-learn, hypothesis testing, regression, panel models, time-series analysis.",
  },
  {
    label: "Engineering",
    body: "TypeScript, React and Next.js, Node.js, Supabase, SQL. The stack behind the projects above.",
  },
  {
    label: "Communication",
    body: "Tableau, Excel, and presenting to a room. A year at Eximbank turning export data into reports and dashboards.",
  },
];

// Dikelompokin per kategori (bukan list acak) biar recruiter scan cepat.
// Ganti sesuai skill ASLI kamu - jangan cantumin yang gak dikuasai.
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "R", "JavaScript / TypeScript", "SQL"],
  },
  {
    label: "Data & Stats",
    items: ["pandas", "NumPy", "scikit-learn", "Statistical modeling", "Excel"],
  },
  {
    label: "Data Viz",
    items: ["Tableau", "Recharts", "Plotly", "ggplot2", "D3.js"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "REST API", "Supabase", "AI / LLM"],
  },
  {
    label: "Tools & Cloud",
    items: ["Figma", "Git", "Vercel", "AWS (Cloud Practitioner)"],
  },
];
