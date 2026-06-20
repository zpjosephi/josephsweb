export type SkillGroup = {
  label: string;
  items: string[];
};

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
    items: ["Figma", "Git", "Vercel", "AWS (Academy)"],
  },
];
