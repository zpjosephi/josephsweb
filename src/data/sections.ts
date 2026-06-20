// Single source of truth for the on-page section index.
// Figure numbers here must match each section's `eyebrow="fig.0X / ..."`.
export type SectionMeta = { id: string; fig: string; label: string };

export const sectionIndex: SectionMeta[] = [
  { id: "about", fig: "01", label: "About" },
  { id: "experience", fig: "02", label: "Career" },
  { id: "projects", fig: "03", label: "Work" },
  { id: "skills", fig: "04", label: "Stack" },
  { id: "demo", fig: "05", label: "Live" },
  { id: "contact", fig: "06", label: "Contact" },
];

export const sectionIds = sectionIndex.map((s) => s.id);
