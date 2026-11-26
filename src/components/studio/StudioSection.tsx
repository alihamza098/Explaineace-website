import React from "react";

/** Consistent section frame for the studio-styled pages. */
export const StudioSection: React.FC<{
  id?: string;
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  tone?: "ink" | "raised";
  headingId?: string;
  headingTabIndex?: boolean;
  as?: "h1" | "h2";
}> = ({ id, eyebrow, title, intro, children, tone = "ink", headingId, headingTabIndex, as: H = "h2" }) => (
  <section
    id={id}
    aria-labelledby={headingId ?? `${id}-title`}
    className={`scroll-mt-20 py-16 sm:py-24 ${tone === "raised" ? "bg-ink-2/60" : "bg-ink"}`}
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl sm:mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">{eyebrow}</p>
        <H
          id={headingId ?? `${id}-title`}
          {...(headingTabIndex ? { tabIndex: -1, "data-inquiry-heading": "" } : {})}
          className="mt-2 text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-paper focus:outline-none sm:text-5xl"
        >
          {title}
        </H>
        {intro && <div className="mt-4 text-base leading-relaxed text-paper-dim sm:text-lg">{intro}</div>}
      </div>
      {children}
    </div>
  </section>
);
