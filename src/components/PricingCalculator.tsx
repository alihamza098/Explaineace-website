"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Flame,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

interface ServiceOption {
  id: string;
  name: string;
  badge?: string;
  baseRatePerMin: number;
  minDurationSec: number;
  turnaroundDays: string;
  bestFor: string;
  features: string[];
}

const SERVICES: ServiceOption[] = [
  {
    id: "screencast",
    name: "Simple Screencast",
    badge: "Fastest Turnaround",
    baseRatePerMin: 120,
    minDurationSec: 30,
    turnaroundDays: "24–48 Hours",
    bestFor: "Knowledge base guides, how-to tutorials, support docs",
    features: [
      "Native 1080p/4K screen recording",
      "Studio voiceover narration sync",
      "Clean pacing & noise removal",
      "2 Revision rounds included",
    ],
  },
  {
    id: "saas-walkthrough",
    name: "Fancy SaaS Walkthrough",
    badge: "Most Popular",
    baseRatePerMin: 220,
    minDurationSec: 30,
    turnaroundDays: "48–72 Hours",
    bestFor: "Landing page hero demos, investor pitches, marketing walkthroughs",
    features: [
      "Dynamic 3D focal zooms (185% zoom on UI)",
      "Stabilized bezier cursor tracking & click ripples",
      "Sleek device mockups & browser frames",
      "Studio voiceover narration + music bed",
      "2 Revision rounds & 100% commercial rights",
    ],
  },
  {
    id: "ai-ugc",
    name: "AI UGC Product Ad",
    badge: "High Conversion",
    baseRatePerMin: 250,
    minDurationSec: 30,
    turnaroundDays: "48–72 Hours",
    bestFor: "Paid social ads (TikTok, Meta, Shorts, Reels)",
    features: [
      "Engaging AI UGC hook narrator",
      "Fast-paced captions with text bounce",
      "Split-screen UI demonstration",
      "9:16 Vertical + 16:9 Landscape renders",
    ],
  },
  {
    id: "custom-motion",
    name: "Custom UI Motion Graphics",
    badge: "Bespoke",
    baseRatePerMin: 900,
    minDurationSec: 30,
    turnaroundDays: "4–7 Business Days",
    bestFor: "Major product reveals, brand launch films, tier-1 SaaS promo",
    features: [
      "Vector Figma recreation & keyframe motion",
      "Custom 3D camera pan & kinetic typography",
      "Custom sound design & SFX mix",
      "Multi-angle isometric UI perspectives",
    ],
  },
];

const DURATION_STEPS = [
  { sec: 30, label: "30s", multiplier: 0.7 },
  { sec: 60, label: "60s (1m)", multiplier: 1.0 },
  { sec: 90, label: "90s (1.5m)", multiplier: 1.45 },
  { sec: 120, label: "120s (2m)", multiplier: 1.85 },
  { sec: 180, label: "180s (3m)", multiplier: 2.65 },
];

export const PricingCalculator: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("saas-walkthrough");
  const [durationSec, setDurationSec] = useState<number>(60);
  const [batchCount, setBatchCount] = useState<number>(1);
  const sliderId = useId();

  const activeService =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[1];
  const activeDuration =
    DURATION_STEPS.find((d) => d.sec === durationSec) || DURATION_STEPS[1];

  // Base calculated price
  const singleVideoPrice = Math.round(
    activeService.baseRatePerMin * activeDuration.multiplier
  );

  // Discount logic: 3+ videos get 10% off, 5+ get 15% off
  const discountRate = batchCount >= 5 ? 0.15 : batchCount >= 3 ? 0.1 : 0;
  const rawTotal = singleVideoPrice * batchCount;
  const finalPrice = Math.round(rawTotal * (1 - discountRate));
  const savings = rawTotal - finalPrice;

  // Turnaround adjustment
  const turnaroundText =
    batchCount > 1
      ? `${activeService.turnaroundDays} (staggered delivery)`
      : activeService.turnaroundDays;

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-white to-white border border-brand-500/30 p-6 sm:p-10 shadow-glow-lg overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-500/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent-cyan/15 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5 text-accent-cyan" />
          <span>Interactive Price &amp; Timeline Estimator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
          Calculate Your Exact Video Investment
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Pick your preferred video style, adjust the target duration, and see real-time pricing with bulk discounts.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-7">
          {/* Service Picker */}
          <div>
            <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-3">
              1. Choose Video Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SERVICES.map((serv) => {
                const isSelected = serv.id === selectedServiceId;
                return (
                  <button
                    key={serv.id}
                    type="button"
                    onClick={() => setSelectedServiceId(serv.id)}
                    className={`text-left p-3.5 rounded-2xl border transition-all duration-200 relative ${
                      isSelected
                        ? "bg-brand-50 border-brand-500 ring-4 ring-brand-500/10"
                        : "bg-surface-card/60 hover:bg-surface-hover/80 border-surface-border"
                    }`}
                  >
                    {serv.badge && (
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block ${
                          isSelected
                            ? "bg-brand-500 text-white"
                            : "bg-ink/[0.08] text-ink-muted"
                        }`}
                      >
                        {serv.badge}
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-ink line-clamp-1">
                      {serv.name}
                    </h3>
                    <p className="text-[11px] text-ink-muted mt-0.5">
                      Starting at ${serv.baseRatePerMin}/60s
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Duration Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={sliderId} className="text-xs font-bold text-ink-soft uppercase tracking-wider">
                2. Target Runtime / Duration
              </label>
              <span className="text-xs font-mono font-bold text-accent-cyan bg-accent-cyan/10 px-2.5 py-0.5 rounded-md border border-accent-cyan/20">
                {activeDuration.label}
              </span>
            </div>

            {/* Step buttons */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-3">
              {DURATION_STEPS.map((step) => {
                const isActive = step.sec === durationSec;
                return (
                  <button
                    key={step.sec}
                    type="button"
                    onClick={() => setDurationSec(step.sec)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-glow"
                        : "bg-surface-subtle/80 hover:bg-surface-hover text-ink-soft border border-surface-border"
                    }`}
                  >
                    {step.label}
                  </button>
                );
              })}
            </div>

            <input
              id={sliderId}
              type="range"
              min={30}
              max={180}
              step={30}
              value={durationSec}
              onChange={(e) => setDurationSec(Number(e.target.value))}
              aria-label="Target runtime in seconds"
              className="w-full h-2 bg-ink/[0.1] rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
          </div>

          {/* Batch Volume / Number of Videos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-ink-soft uppercase tracking-wider">
                3. Number of Videos
              </label>
              {discountRate > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <Flame className="w-3 h-3 text-emerald-600" />
                  <span>{discountRate * 100}% Batch Discount Applied</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 5].map((count) => {
                const isActive = count === batchCount;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setBatchCount(count)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-brand-50 border border-brand-500 text-brand-700 font-semibold ring-4 ring-brand-500/10"
                        : "bg-surface-subtle/80 hover:bg-surface-hover text-ink-soft border border-surface-border"
                    }`}
                  >
                    {count} {count === 1 ? "Video" : "Videos"}
                    {count >= 3 && (
                      <span className="block text-[9px] text-emerald-600 font-mono mt-0.5">
                        {count >= 5 ? "15% off" : "10% off"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calculation Result Card */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl p-6 sm:p-7 bg-white border border-brand-500/40 shadow-2xl space-y-6">
            {/* Price Display */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted block mb-1">
                Estimated Project Total
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-ink tracking-tight">
                  ${finalPrice}
                </span>
                <span className="text-xs text-ink-muted font-medium">
                  USD (Flat fee)
                </span>
              </div>

              {savings > 0 && (
                <p className="mt-1 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>You save ${savings} with batch pricing!</span>
                </p>
              )}
            </div>

            {/* Scope Summary */}
            <div className="p-3.5 rounded-xl bg-surface-subtle/80 border border-surface-border space-y-2 text-xs">
              <div className="flex justify-between text-ink-soft">
                <span className="text-ink-muted">Selected Format:</span>
                <span className="font-semibold text-ink">{activeService.name}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span className="text-ink-muted">Total Runtime:</span>
                <span className="font-mono text-accent-cyan">
                  {batchCount > 1
                    ? `${batchCount} × ${activeDuration.label}`
                    : activeDuration.label}
                </span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span className="text-ink-muted">Est. Delivery:</span>
                <span className="font-medium text-emerald-600">{turnaroundText}</span>
              </div>
            </div>

            {/* Included in this quote */}
            <div className="space-y-2 text-xs">
              <span className="block font-bold text-ink uppercase tracking-wider text-[11px]">
                Included with this estimate:
              </span>
              <ul className="space-y-2 text-ink-soft">
                {activeService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/contact?package=${activeService.id}&duration=${durationSec}&qty=${batchCount}&quote=${finalPrice}`}
                className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>Book This Video Estimate (${finalPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/923139110721?text=Hi%20Ali,%20I%20used%20your%20calculator%20for%20${encodeURIComponent(
                  activeService.name
                )}%20(${activeDuration.label},%20${batchCount}%20video)%20estimated%20at%20$${finalPrice}.%20Can%20we%20discuss?`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>Discuss Immediately on WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-ink-muted pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Escrow Protected</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-brand-600" />
                <span>2 Free Revisions</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
