import React from "react";
import Link from "next/link";
import {
  MonitorPlay,
  Layers,
  Smartphone,
  GraduationCap,
  Sparkles,
  Laptop,
  ArrowRight,
  Bot,
  Video,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { SplitText } from "@/components/motion/SplitText";

interface CategoryCard {
  title: string;
  description: string;
  priceTag?: string;
  icon: React.ElementType;
  filterSlug: string;
}

const CARDS: CategoryCard[] = [
  {
    title: "AI UGC & Product Ads",
    description:
      "High-converting short ads featuring hyper-realistic AI creators, kinetic captions, and product motion for TikTok, Reels, & Shorts.",
    priceTag: "$200 – $300 / ad",
    icon: Bot,
    filterSlug: "AI UGC & Product Ads",
  },
  {
    title: "Fancy SaaS Walkthroughs",
    description:
      "Polished platform tours with dynamic 3D focal zooms, cursor smoothing, click ripples, and spotlight UI framing.",
    priceTag: "$220 / 60 seconds",
    icon: Layers,
    filterSlug: "SaaS",
  },
  {
    title: "Simple Screencast Tutorials",
    description:
      "Clean, high-definition screen recording tutorials without fancy animations. Focused on pure instruction and fast delivery.",
    priceTag: "$120 / 60 seconds",
    icon: Video,
    filterSlug: "Tutorials",
  },
  {
    title: "Custom UI Motion Explainers",
    description:
      "Bespoke SaaS explainers featuring custom 2D/3D vector UI recreations, abstract flows, and cinematic animations.",
    priceTag: "$800 – $1,200 / scope",
    icon: Sparkles,
    filterSlug: "Explainers",
  },
  {
    title: "Mobile App Demonstrations",
    description:
      "Fluid demonstrations of iOS & Android apps with native touch gesture ripples and device frame mockups.",
    priceTag: "Vertical & Landscape",
    icon: Smartphone,
    filterSlug: "Mobile Apps",
  },
  {
    title: "Training & Knowledge Bases",
    description:
      "Structured learning modules and SOP guides for customer success teams, employee onboarding, and academy centers.",
    priceTag: "Batch Discounts Available",
    icon: GraduationCap,
    filterSlug: "Training",
  },
];

const TINTS = [
  "from-fuchsia-100 to-rose-50 text-fuchsia-600",
  "from-brand-100 to-indigo-50 text-brand-600",
  "from-sky-100 to-cyan-50 text-sky-600",
  "from-violet-100 to-purple-50 text-violet-600",
  "from-emerald-100 to-teal-50 text-emerald-600",
  "from-amber-100 to-orange-50 text-amber-600",
];

export const WhatICreate: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-surface-subtle relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-50 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-14">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow mb-4">Core Production Focus</span>
            </Reveal>
            <SplitText
              text="Videos built to make software *easier to understand.*"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-ink leading-[1.05]"
            />
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
              Every product has unique complexities. I craft targeted video assets designed specifically for your audience&apos;s technical familiarity.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={(idx % 3) * 100} variant="scale" className="h-full">
                <Spotlight className="h-full group relative p-7 rounded-3xl bg-white border border-surface-border hover:border-brand-200 transition-all duration-500 shadow-card hover:shadow-lift hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-6 text-[7rem] font-bold tracking-tighter text-ink/[0.03] group-hover:text-brand-600/[0.07] transition-colors duration-500 select-none"
                  >
                    0{idx + 1}
                  </span>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${TINTS[idx % TINTS.length]} flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      {card.priceTag && (
                        <span className="text-[11px] font-semibold text-ink-soft bg-surface-subtle border border-surface-border px-2.5 py-1 rounded-full">
                          {card.priceTag}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight text-ink">{card.title}</h3>
                    <p className="mt-2.5 text-sm text-ink-muted leading-relaxed">{card.description}</p>
                  </div>

                  <div className="relative mt-7 pt-4 border-t border-surface-border">
                    <Link
                      href={`/work?category=${encodeURIComponent(card.filterSlug)}`}
                      className="text-sm font-semibold text-ink group-hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Browse examples</span>
                      <ArrowRight className="w-4 h-4 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                      <span className="sr-only">for {card.title}</span>
                    </Link>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
