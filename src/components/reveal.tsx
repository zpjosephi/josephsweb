"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Subtle scroll-reveal. Keep it understated - premium, not gimmicky.
//
// Always render the motion.div: swapping to a plain <div> under reduced
// motion leaves the server-rendered opacity:0 inline style in place after
// hydration (React doesn't patch attribute mismatches), which blanks the
// whole page for prefers-reduced-motion users. Instead we keep the motion
// element and collapse the animation: no translate, zero duration.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
