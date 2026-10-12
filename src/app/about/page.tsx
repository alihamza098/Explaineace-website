import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  ExternalLink,
  Video,
  MonitorPlay,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  Milestone,
} from "lucide-react";
import { UpworkIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "About Ali | SaaS Video Specialist & Founder of EXPLAINERACE",
  description:
    "Learn about Ali, founder of EXPLAINERACE and SaaS video specialist with 157+ verified client reviews on Fiverr (Level 2) and Upwork. Read my story and career timeline.",
  alternates: {
    canonical: "https://explainerace.com/about",
  },
  openGraph: {
    title: "About Ali | SaaS Video Specialist & Founder of EXPLAINERACE",
    description:
      "Learn about Ali, founder of EXPLAINERACE and SaaS video specialist with 157+ verified client reviews on Fiverr (Level 2) and Upwork. Read my story and career timeline.",
    url: "https://explainerace.com/about",
    type: "profile",
    images: [
      {
        url: "https://explainerace.com/avatar.png",
        width: 800,
        height: 800,
        alt: "Ali - SaaS Video Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ali | SaaS Video Specialist & Founder of EXPLAINERACE",
    description:
      "Learn about Ali, founder of EXPLAINERACE and SaaS video specialist with 157+ verified client reviews on Fiverr (Level 2) and Upwork. Read my story and career timeline.",
    images: ["https://explainerace.com/avatar.png"],
  },
};

export default function AboutPage() {
  const careerTimeline = [
    {
      year: "2020 – 2021",
      title: "First Software Screencasts & Freelance Launch",
      description:
        "Started producing screen recording guides and software tutorials for early-stage web applications. Recognized that 90% of software demos suffered from poor pacing, jerky mouse cursor movements, and incomprehensible audio.",
    },
    {
      year: "2022 – 2023",
      title: "Achieved Level 2 Seller Status on Fiverr",
      description:
        "Crossed 100+ five-star verified client engagements across B2B SaaS, mobile health apps, fintech trading platforms, and developer API tools under the Video Supremacy brand. Refined calibrated dynamic zoom post-production standards.",
    },
    {
      year: "2024 – 2025",
      title: "Expanding to Upwork Direct & Agency-Grade Motion",
      description:
        "Integrated Upwork Direct Contracts (0% buyer fee) for enterprise clients requiring corporate escrow security. Mastered 2D/3D vector UI recreation and isometric device camera sweeps for venture-funded SaaS launches.",
    },
    {
      year: "2026",
      title: "Founded EXPLAINERACE & AI Video Integration",
      description:
        "Consolidated full-service software video production under EXPLAINERACE. Expanded specialized offerings to include high-velocity AI UGC ads and AI product videos while maintaining transparent rates from $120/60s for software founders globally.",
    },
  ];

  return (
    <div className="pt-28 sm:pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bio Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Avatar & Verification Column */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left sticky top-28">
            <div className="relative">
              <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-accent-cyan p-1 shadow-glow overflow-hidden">
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-surface-card">
                  <Image
                    src="/avatar.png"
                    alt="Ali - Founder of EXPLAINERACE and Software Video Specialist"
                    fill
                    priority
                    sizes="(max-width: 640px) 208px, 240px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-700 shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Level 2 Fiverr Seller (4.8★)</span>
              </div>
            </div>

            {/* Quick stats & Badges below avatar */}
            <div className="mt-10 w-full p-5 rounded-2xl bg-surface-card border border-surface-border space-y-3.5 shadow-card">
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-muted">Seller Ranking</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Level 2 Seller
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-muted">Client Rating</span>
                <span className="text-amber-500 font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.8 / 5.0
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-muted">Verified Client Reviews</span>
                <span className="text-ink font-medium">157+ Reviews</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-muted">Upwork Escrow</span>
                <span className="text-emerald-600 font-medium">0% Client Fee</span>
              </div>

              <div className="pt-3 border-t border-surface-border space-y-2">
                <a
                  href={siteConfig.fiverr.gigUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Order on Fiverr (4.8★)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                </a>
                <a
                  href="https://www.upwork.com/freelancers/~015f8dfceae72b5311"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-ink/[0.04] hover:bg-ink/[0.08] border border-surface-border text-xs font-medium text-ink flex items-center justify-center gap-1.5 transition-colors"
                >
                  <UpworkIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hire on Upwork Direct (0% Fee)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bio Story Column */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Personal Specialization & Background
              </span>
              <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
                Hi, I&apos;m Ali — Dedicated Software Video Specialist.
              </h1>
            </div>

            <div className="space-y-4 text-ink-soft text-sm sm:text-base leading-relaxed">
              <p className="text-lg text-ink font-medium leading-relaxed">
                I founded EXPLAINERACE to solve a single universal problem: software companies build incredible technology, but prospective customers leave their websites without understanding how it actually works.
              </p>
              <p>
                Unlike generalist video editors who cut social vlogs, travel reels, or wedding videos on the side, my entire career is dedicated exclusively to digital interfaces. I have spent thousands of hours analyzing SaaS dashboards, iOS/Android user journeys, responsive viewports, and onboarding activation funnels.
              </p>
              <p>
                Over the course of 157+ verified client engagements on Fiverr and international direct contracts, I have built a battle-tested post-production workflow. Every project combines native 1080p/4K calibrated screen capture, dynamic 3D focal zooms that eliminate mobile squinting, stabilized bezier cursor physics, professional studio audio narration, and synchronized subtitles.
              </p>
              <p>
                Whether you need a clean 60-second simple screencast tutorial for your documentation academy, an energetic product launch explainer with custom UI motion graphics, or high-retention AI UGC video ads for paid social, I collaborate directly with your team with zero agency middlemen, transparent rates, and fast turnarounds.
              </p>
            </div>

            {/* Principles Checklist */}
            <div className="p-6 rounded-2xl bg-surface-card border border-surface-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-cyan" />
                <span>The EXPLAINERACE Production Standard</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  "100% focused on software, SaaS and mobile UI",
                  "Calibrated zooms that eliminate user squinting",
                  "Studio human voiceover narration and sound design",
                  "Synchronized closed captions (.SRT / .VTT)",
                  "Zero fabricated claims or inflated numbers",
                  "Direct founder collaboration with 24-48h updates",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Timeline Section */}
            <div className="pt-4 space-y-6">
              <div className="flex items-center gap-2 text-ink font-bold text-xl">
                <Milestone className="w-5 h-5 text-accent-cyan" />
                <h2>Career Timeline & Production Milestones</h2>
              </div>

              <div className="relative border-l-2 border-brand-500/30 pl-6 ml-3 space-y-8">
                {careerTimeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle marker */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-brand-600 border-2 border-[#08090E] group-hover:bg-accent-cyan transition-colors" />
                    <span className="text-xs font-mono font-bold text-accent-cyan block uppercase tracking-wider">
                      {item.year}
                    </span>
                    <h3 className="text-base font-bold text-ink mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-6 py-3.5 rounded-full shadow-glow transition-all"
              >
                <span>Browse 27 Verified Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink px-5 py-3.5 rounded-full bg-ink/[0.06] hover:bg-ink/[0.1] border border-surface-border transition-colors"
              >
                <span>Get in Touch with Ali</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CTA />
    </div>
  );
}
