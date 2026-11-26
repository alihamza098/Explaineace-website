"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { Poster } from "./Poster";
import { useFilmPlayer } from "./useFilmPlayer";

/** Three real portfolio projects, each with a buyer-friendly label. */
const picks = [
  { id: "orbitra-one-saas-promo", label: "Launch motion", why: "For announcing a release with a screen-led promo." },
  { id: "bloom-3d-app-promo", label: "Mobile UI", why: "For showing an app’s screens and gestures in motion." },
  { id: "bybit-guide", label: "Narrated walkthrough", why: "For teaching a workflow step by step with voiceover." },
] as const;

export const SelectedFilms: React.FC = () => {
  const { open, modal } = useFilmPlayer();
  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {picks.map(({ id, label, why }) => {
          const p = projects.find((x) => x.id === id);
          if (!p) return null;
          return (
            <article key={id} className="group flex flex-col overflow-hidden rounded-2xl border border-paper/10 bg-ink-2">
              <button
                type="button"
                onClick={() => open(id, "selected-films")}
                aria-label={`Play ${p.title}, ${p.duration}`}
                className="relative block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime"
              >
                <Poster videoId={p.videoId} title={p.title} label={label} />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors group-hover:bg-ink/5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink shadow-xl transition-transform group-hover:scale-105">
                    <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-ink/85 px-2 py-0.5 font-mono text-[11px] text-paper">
                  {p.duration}
                </span>
              </button>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime">{label}</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug text-paper">{p.client}</h3>
                <p className="mt-1 text-sm text-paper-dim">{p.title}</p>
                <p className="mt-2 text-sm text-paper-mute">{why}</p>
                <Link
                  href={`/work/${p.id}`}
                  className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 self-start text-sm font-semibold text-paper underline decoration-paper/30 underline-offset-4 hover:text-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
                >
                  Read the case study <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-8">
        <Link
          href="/work"
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-paper/25 px-6 text-sm font-semibold text-paper transition-colors hover:border-lime hover:text-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          See the full portfolio <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      {modal}
    </>
  );
};
