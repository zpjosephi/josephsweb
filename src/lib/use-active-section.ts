"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently nearest the viewport
 * middle. `ids` should be a stable reference (define it at module scope).
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}
