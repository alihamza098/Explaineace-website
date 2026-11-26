"use client";

import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { HeroMacbook } from "./HeroMacbook";
import { useFilmPlayer } from "./useFilmPlayer";

/** Launch film shown by "Watch launch film": a real ExplainerAce project. */
export const LAUNCH_FILM_ID = "orbitra-one-saas-promo";

const points = [
  { n: "1", t: "A main product film", d: "A launch promo or narrated walkthrough built from your real screens." },
  { n: "2", t: "Distinct social edits, each in 3 formats", d: "16:9, 1:1 and 9:16 — not one video resized." },
  { n: "3", t: "Post it yourself, or we publish it", d: "Optional two-week posting calendar." },
];

export const StudioHero: React.FC = () => {
  const { open, modal } = useFilmPlayer();

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ink pb-16 pt-24 sm:pb-24 sm:pt-32 lg:pt-36">
      <div className="studio-grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime sm:text-[13px]">
            Software video studio · ExplainerAce
          </p>
          {/* Static, readable from first paint: no hidden-until-animated text */}
          <h1 id="hero-title" className="mt-3 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-paper sm:text-7xl lg:text-[5.25rem]">
            Product films in motion.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-paper-dim sm:mt-6 sm:text-lg">
            Launch your software with a product film, show people how it works with clear tutorials, and get social cuts
            ready for every screen.
          </p>

          <ol className="mt-5 max-w-xl space-y-2.5 sm:mt-7">
            {points.map((p) => (
              <li key={p.n} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lime/60 text-xs font-semibold text-lime">
                  {p.n}
                </span>
                <span className="text-sm leading-snug text-paper-dim">
                  <strong className="font-semibold text-paper">{p.t}.</strong> <span className="hidden sm:inline">{p.d}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <a
              href="#packages"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-lime px-7 text-[15px] font-semibold text-lime-ink transition-colors hover:bg-[#d6ff4a] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Explore packages <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => open(LAUNCH_FILM_ID, "hero")}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-paper/25 px-7 text-[15px] font-semibold text-paper transition-colors hover:border-lime hover:text-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden /> Watch launch film
            </button>
          </div>

          <p className="mt-5 text-sm text-paper-mute">
            <a
              href={siteConfig.fiverr.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-paper/30 underline-offset-4 hover:text-paper"
            >
              {siteConfig.fiverr.rating}★ · {siteConfig.fiverr.reviewsCount} reviews on Fiverr
            </a>
            <span className="mx-2" aria-hidden>·</span>
            From $249 for a full campaign
          </p>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/[0.08] blur-3xl"
            aria-hidden
          />
          <HeroMacbook />
        </div>
      </div>
      {modal}
    </section>
  );
};
