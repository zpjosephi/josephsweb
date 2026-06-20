import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  annotation,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  /** Small mono note shown on the right of the axis, e.g. "n = 4" */
  annotation?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-20 sm:py-28",
        className
      )}
    >
      {(eyebrow || title) && (
        <header className="mb-12">
          {/* Top axis: full-width hairline + tick marks */}
          <div className="relative">
            <div className="h-2 w-full tick-axis opacity-60" />
            <div className="h-0.5 w-full bg-card-border" />
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            {eyebrow && (
              <p className="tele text-xs text-accent">
                {"// "}
                {eyebrow}
              </p>
            )}
            {annotation && (
              <p className="tele text-[11px] text-muted-foreground">
                [ {annotation} ]
              </p>
            )}
          </div>

          {title && (
            <h2
              className="display mt-4 max-w-3xl font-normal"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
