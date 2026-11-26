"use client";

import React from "react";
import { CalendarDays, Check } from "lucide-react";
import {
  calendarNote,
  estimate,
  placementNote,
  publishingOptions,
  sampleCalendar,
} from "@/data/packages";
import { useCampaign } from "./CampaignProvider";

export const PublishingSection: React.FC<{ source?: string }> = ({ source = "home" }) => {
  const { publishingId, setPublishing } = useCampaign();
  const combo = estimate("product-launch", "launch");

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    const n = publishingOptions.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + n) % n;
    if (next >= 0) {
      e.preventDefault();
      setPublishing(publishingOptions[next].id, source);
      requestAnimationFrame(() =>
        document.querySelector<HTMLElement>(`[data-pub="${publishingOptions[next].id}"]`)?.focus(),
      );
    }
  };

  return (
    <div>
      <div role="radiogroup" aria-label="Who publishes your campaign" className="grid gap-4 lg:grid-cols-3">
        {publishingOptions.map((o, idx) => {
          const on = publishingId === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={on}
              data-pub={o.id}
              tabIndex={on ? 0 : -1}
              onClick={() => setPublishing(o.id, source)}
              onKeyDown={(e) => onKey(e, idx)}
              className={`flex min-h-[44px] flex-col rounded-2xl border p-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lime ${
                on ? "border-lime bg-lime/[0.06]" : "border-paper/10 bg-ink-2 hover:border-paper/30"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="text-base font-semibold text-paper">{o.label}</span>
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    on ? "border-lime bg-lime text-lime-ink" : "border-paper/30"
                  }`}
                  aria-hidden
                >
                  {on && <Check className="h-3 w-3" />}
                </span>
              </span>
              <span className="mt-1 text-2xl font-semibold tracking-tight text-lime">{o.priceLabel}</span>
              <span className="mt-2 text-sm font-medium text-paper">{o.who}</span>
              <span className="mt-2 text-sm leading-relaxed text-paper-dim">{o.included}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-paper-dim">{placementNote}</p>

      {/* Sample calendar: agenda on phones, three columns on larger screens */}
      <div className="mt-10 rounded-2xl border border-paper/10 bg-ink-2 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <CalendarDays className="h-5 w-5 text-lime" aria-hidden />
          <h3 className="text-lg font-semibold text-paper">
            Sample calendar: Product Launch + Publish our launch
          </h3>
          <span className="rounded-full border border-lime/40 px-3 py-1 text-xs font-semibold text-lime">
            {combo.display}
          </span>
        </div>
        <p className="mt-2 text-sm text-paper-dim">
          An example of how the three social edits could be scheduled. Every edit goes to two agreed accounts, so three
          edits become six placements.
        </p>

        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {sampleCalendar.map((c, i) => (
            <li key={c.edit} className="relative rounded-xl border border-paper/10 bg-ink p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-lime">{c.when}</span>
                <span className="text-xs text-paper-mute">{c.day}</span>
              </div>
              <p className="mt-2 text-base font-semibold text-paper">
                <span className="text-paper-mute">{i + 1}. </span>
                {c.edit}
              </p>
              <p className="mt-1 text-sm text-paper-dim">{c.purpose}</p>
              <ul className="mt-3 space-y-1.5">
                {c.placements.map((p) => (
                  <li
                    key={p.account}
                    className="flex items-center justify-between rounded-lg bg-ink-3 px-3 py-2 text-sm text-paper"
                  >
                    <span>{p.account}</span>
                    <span className="text-xs text-paper-mute">{p.format} · 1 placement</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-relaxed text-paper-mute">{calendarNote}</p>
      </div>
    </div>
  );
};
