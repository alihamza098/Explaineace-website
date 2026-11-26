"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  editsVsFiles,
  everyPackageIncludes,
  fileMath,
  packages,
  scopedSeparately,
  type CampaignPackage,
} from "@/data/packages";
import { useCampaign } from "./CampaignProvider";

const money = (n: number) => `$${n}`;

/** Each distinct edit exported in three formats. */
const EditGrid: React.FC<{ edits: number }> = ({ edits }) => (
  <div
    className="grid grid-cols-3 gap-1"
    role="img"
    aria-label={`${edits} distinct edits, each in 16:9, 1:1 and 9:16`}
  >
    {Array.from({ length: edits }).map((_, i) =>
      (["16:9", "1:1", "9:16"] as const).map((f) => (
        <span
          key={`${i}-${f}`}
          className="flex h-5 items-center justify-center rounded-[3px] border border-paper/15 bg-ink-3 text-[9px] font-medium text-paper-mute"
        >
          {f}
        </span>
      )),
    )}
  </div>
);

const Card: React.FC<{ p: CampaignPackage; source: string }> = ({ p, source }) => {
  const { choosePackage, packageId, packageChosen } = useCampaign();
  const selected = packageChosen && packageId === p.id;
  return (
    <article
      aria-labelledby={`pkg-${p.id}`}
      data-package={p.id}
      className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
        p.featured
          ? "border-signal/60 bg-ink-2 shadow-[0_0_0_1px_rgba(255, 107, 61,0.25),0_30px_80px_-40px_rgba(255, 107, 61,0.35)] lg:-my-3 lg:py-9"
          : "border-paper/10 bg-ink-2"
      }`}
    >
      {p.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-signal px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-signal-ink">
          Featured
        </span>
      )}
      <h3 id={`pkg-${p.id}`} className="text-lg font-semibold text-paper">
        {p.name}
      </h3>
      <p className="mt-1 min-h-[2.75rem] text-sm leading-snug text-paper-dim">{p.forWho}</p>

      <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
        <span className="text-5xl font-semibold tracking-tight text-paper">{money(p.price)}</span>
        <span className="text-sm text-paper-mute">one time · introductory price</span>
      </p>

      <p className="mt-4 text-[15px] font-medium leading-snug text-paper">{p.headline}</p>
      <p className="mt-1 text-sm font-semibold text-signal">{p.totalFiles} finished video files</p>
      <p className="mt-1 text-xs text-paper-mute">{fileMath(p)}</p>

      <div className="mt-5">
        <EditGrid edits={p.socialEdits.count} />
      </div>

      <ul className="mt-5 space-y-2 text-sm text-paper-dim">
        {p.masters.description.map((d) => (
          <li key={d} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
            <span>{d}</span>
          </li>
        ))}
        <li className="flex gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
          <span>
            {p.socialEdits.count} distinct social edits: {p.socialEdits.names.join(", ")}
          </span>
        </li>
        <li className="flex gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
          <span>Each social edit in 16:9, 1:1 and 9:16</span>
        </li>
      </ul>

      <p className="mt-4 text-sm text-paper-dim">
        <span className="text-paper">Estimated turnaround:</span> {p.turnaround}
      </p>

      <div className="mt-auto pt-6">
      <button
        type="button"
        onClick={() => choosePackage(p.id, source)}
        aria-label={`Choose the ${p.name} package, ${money(p.price)}`}
        className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
          p.featured || selected
            ? "bg-signal text-signal-ink hover:bg-[#ff8660]"
            : "border border-paper/25 text-paper hover:border-signal hover:text-signal"
        }`}
      >
        {selected ? (
          <>
            <Check className="h-4 w-4" aria-hidden /> Selected — continue to brief
          </>
        ) : (
          <>
            Choose package <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
      </div>
    </article>
  );
};

export const PackageCards: React.FC<{ source?: string }> = ({ source = "home" }) => {
  const featured = packages.find((p) => p.featured)!;
  const rows: [string, (p: CampaignPackage) => string][] = [
    ["Price (one time)", (p) => money(p.price)],
    ["Landscape masters", (p) => String(p.masters.count)],
    ["Distinct social edits", (p) => String(p.socialEdits.count)],
    ["Formats per edit", () => "3 (16:9, 1:1, 9:16)"],
    ["Social exports", (p) => String(p.socialExports)],
    ["Total finished files", (p) => String(p.totalFiles)],
    ["Estimated turnaround", (p) => p.turnaround],
  ];
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
        {packages.map((p) => (
          <Card key={p.id} p={p} source={source} />
        ))}
      </div>

      {/* Unique edits vs files, in plain language */}
      <div className="mt-10 grid gap-6 rounded-2xl border border-paper/10 bg-ink-2 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h3 className="text-lg font-semibold text-paper">Edits are not the same as files</h3>
          <p className="mt-2 text-sm leading-relaxed text-paper-dim">
            A <strong className="text-paper">social edit</strong> is one distinct cut with its own idea — a teaser is
            not the same video as a feature spotlight. Every edit is then exported three times for different screens:
            16:9, 1:1 and 9:16. That is why {featured.socialEdits.count} edits become {featured.socialExports} files.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-paper-dim">{editsVsFiles(featured)}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-paper-mute">Every package covers</h3>
          <ul className="mt-3 grid gap-2 text-sm text-paper-dim sm:grid-cols-2 lg:grid-cols-1">
            {everyPackageIncludes.map((i) => (
              <li key={i} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-paper-mute">{scopedSeparately}</p>
        </div>
      </div>

      {/* Comparable at a glance */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-paper/10">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">Campaign packages compared</caption>
          <thead>
            <tr className="bg-ink-2 text-paper">
              <th scope="col" className="p-3 font-semibold">
                <span className="sr-only">Detail</span>
              </th>
              {packages.map((p) => (
                <th key={p.id} scope="col" className="p-3 font-semibold">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-paper-dim">
            {rows.map(([label, f]) => (
              <tr key={label} className="border-t border-paper/10">
                <th scope="row" className="p-3 font-medium text-paper">
                  {label}
                </th>
                {packages.map((p) => (
                  <td key={p.id} className="p-3">
                    {f(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
