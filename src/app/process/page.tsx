import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  KeyRound,
  FileText,
  Video,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";
import { processSteps, processFaqs } from "@/data/process";
import { ProcessInfographic } from "@/components/ProcessInfographic";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "SaaS Video Production Process | 4-Stage Workflow",
  description:
    "Discover Ali's 4-stage SaaS video production process: script outlining, 4K screen recording, dynamic UI zooms, and studio audio delivery in 3 to 5 days.",
  alternates: {
    canonical: "https://explainerace.com/process",
  },
  openGraph: {
    title: "SaaS Video Production Process | 4-Stage Workflow | EXPLAINERACE",
    description:
      "Discover Ali's 4-stage SaaS video production process: script outlining, 4K screen recording, dynamic UI zooms, and studio audio delivery in 3 to 5 days.",
    url: "https://explainerace.com/process",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/2ZtQX_lXHOs/hqdefault.jpg",
        width: 1280,
        height: 720,
        alt: "SaaS Video Production Process - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Video Production Process | 4-Stage Workflow | EXPLAINERACE",
    description:
      "Discover Ali's 4-stage SaaS video production process: script outlining, 4K screen recording, dynamic UI zooms, and studio audio delivery in 3 to 5 days.",
    images: ["https://img.youtube.com/vi/2ZtQX_lXHOs/hqdefault.jpg"],
  },
};

const ICONS = [KeyRound, FileText, Video, CheckCircle2];

export default function ProcessPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: processFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="pt-28 sm:pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Production Framework</span>
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            From product to polished video.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            A battle-tested production sequence designed for speed, clarity, and zero hassle. Explore the interactive production pipeline below to see how your interface transforms from raw screen capture into a master video.
          </p>
        </div>

        {/* 1. Centerpiece: Interactive Visual Infographic Animation */}
        <div className="mb-24">
          <ProcessInfographic />
        </div>

        {/* 2. Detailed Breakdown Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Step-by-Step Breakdown
          </span>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-ink">
            What happens behind each stage
          </h2>
          <p className="mt-2 text-ink-muted text-sm">
            Everything is structured so you get maximum quality with minimal time required from your product team.
          </p>
        </div>

        {/* Detailed Timeline Visuals */}
        <div className="space-y-8 mb-24 max-w-5xl">
          {processSteps.map((step, idx) => {
            const Icon = ICONS[idx] || CheckCircle2;
            return (
              <div
                key={step.number}
                className="group relative p-8 sm:p-10 rounded-3xl bg-surface-card border border-surface-border hover:border-brand-500/40 transition-all duration-300 shadow-card"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                  {/* Step Badge */}
                  <div className="shrink-0 flex sm:flex-col items-center gap-3">
                    <span className="font-mono text-4xl sm:text-5xl font-extrabold text-ink/25 group-hover:text-brand-700 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-brand-600/10 border border-brand-500/20 text-brand-600 flex items-center justify-center group-hover:bg-brand-600/20 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-ink/[0.05] text-ink-muted border border-surface-border">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-ink group-hover:text-brand-700 transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-ink-soft text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>

                    <div className="pt-3 flex items-center gap-2 text-xs font-medium text-ink-muted">
                      <span className="text-accent-cyan font-semibold">Key Deliverable:</span>
                      <span className="text-ink">{step.deliverable}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs Section */}
        <div className="mb-20 max-w-4xl">
          <div className="mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Common Questions
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-ink-muted text-sm">
              Answers regarding product access, revisions, voiceover, and platform ordering.
            </p>
          </div>

          <div className="space-y-4">
            {processFaqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-2"
              >
                <h3 className="text-base font-semibold text-ink flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTA />
    </div>
    </>
  );
}
