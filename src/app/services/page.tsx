import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MonitorPlay,
  Video,
  Smartphone,
  Bot,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { valueAddItems } from "@/data/services";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Video Services for SaaS & Software Teams",
  description:
    "Explore specialized software video production: SaaS walkthroughs, screencast tutorials, mobile app demos, and AI UGC product ads. Transparent pricing from $120/60s.",
  alternates: {
    canonical: "https://explainerace.com/services",
  },
  openGraph: {
    title: "Video Services for SaaS & Software Teams | EXPLAINERACE",
    description:
      "Explore specialized software video production: SaaS walkthroughs, screencast tutorials, mobile app demos, and AI UGC product ads. Transparent pricing from $120/60s.",
    url: "https://explainerace.com/services",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/W6-glP7Ct5o/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "Video Services for SaaS & Software Teams - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Services for SaaS & Software Teams | EXPLAINERACE",
    description:
      "Explore specialized software video production: SaaS walkthroughs, screencast tutorials, mobile app demos, and AI UGC product ads. Transparent pricing from $120/60s.",
    images: ["https://img.youtube.com/vi/W6-glP7Ct5o/maxresdefault.jpg"],
  },
};

const serviceCards = [
  {
    title: "SaaS Walkthrough & Product Demo Videos",
    slug: "/services/saas-walkthrough-video",
    icon: MonitorPlay,
    badge: "Most Popular",
    price: "$220 / 60 seconds",
    description:
      "Turn complex platforms into intuitive, high-converting video walkthroughs with 3D camera zooms, stabilized cursor tracks, spotlight framing, and studio voiceover narration.",
    keywords: "SaaS walkthrough video service, SaaS product demo video service",
    highlights: [
      "Dynamic 3D zooms & pan on key UI moments",
      "Stabilized bezier cursor smoothing & click ripple rings",
      "Studio voiceover narration & professional sound mix",
      "100% full commercial rights & 4K master delivery",
    ],
  },
  {
    title: "Screencast Video Production Service",
    slug: "/services/screencast-tutorials",
    icon: Video,
    badge: "Fast 24-48h Delivery",
    price: "$120 / 60 seconds",
    description:
      "Clear, straightforward screen recording tutorials without fancy animations. Focused on pure instructional clarity, ease of following, and rapid turnaround for help academies and SOPs.",
    keywords: "Screencast video production service, screencast video service",
    highlights: [
      "Native 1080p / 4K crisp screen recording",
      "Synchronized studio voiceover narration",
      "Essential focal zooms on key inputs & settings",
      "Volume batch discounts on multi-video series",
    ],
  },
  {
    title: "App Demo & Mobile Promo Video Service",
    slug: "/services/app-demo-video",
    icon: Smartphone,
    badge: "iOS & Android",
    price: "Custom / From $220",
    description:
      "Flawless screen demonstrations for iOS, Android, and responsive web applications with realistic touch interactions, 3D device framing, and App Store preview sizing.",
    keywords: "App demo video service, mobile app promo video service",
    highlights: [
      "Realistic touch gesture & tap animations",
      "3D device mockup frames (iPhone & Android)",
      "App Store & Google Play preview compliance",
      "App onboarding & feature walkthrough videos",
    ],
  },
  {
    title: "AI UGC & Product Ad Videos",
    slug: "/services/ai-ugc-ads",
    icon: Bot,
    badge: "Paid Social Creative",
    price: "$200 – $300 / ad",
    description:
      "High-converting short-form ad creatives combining hyper-realistic AI avatars, dynamic product motion, viral hooks, and native social kinetic captions for TikTok, Meta Reels, and Shorts.",
    keywords: "Human-first creative testing, rapid ad hook iterations",
    highlights: [
      "Hyper-realistic AI presenters & talking heads",
      "Dynamic 3D product motion & UI highlights",
      "3-second opening hook variations for A/B testing",
      "Vertical 9:16 & 16:9 deliverables with full ad rights",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28 sm:pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Specialized Video Production Services
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Video Services for SaaS & Software Teams
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Every software package is built to resolve specific customer friction points—whether you need a high-converting homepage product walkthrough, an onboarding screencast series, a mobile app demo, or high-velocity AI UGC ads.
          </p>
        </div>

        {/* 4 Dedicated Service Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {serviceCards.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.slug}
                className="p-8 sm:p-10 rounded-3xl bg-surface-card border border-surface-border shadow-card hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-semibold uppercase tracking-wider">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{service.badge}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      {service.price}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-ink group-hover:text-brand-700 transition-colors">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-ink-soft text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-surface-border space-y-2.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      Key Highlights:
                    </h3>
                    <ul className="space-y-2">
                      {service.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-xs sm:text-sm text-ink-soft"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-surface-border flex items-center justify-between">
                  <Link
                    href={service.slug}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-6 py-3 rounded-full shadow-glow transition-all"
                  >
                    <span>Explore Service Page</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-xs text-ink-muted hover:text-ink transition-colors"
                  >
                    View Rates &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Foundation */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Technical Foundation
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Every package includes full post-production tooling.
            </h2>
            <p className="mt-3 text-ink-muted text-sm leading-relaxed">
              No hidden fees for cursor smoothing, subtitle files, or high-definition framing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueAddItems.map((val) => (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-brand-500/30 transition-all"
              >
                <h3 className="text-base font-semibold text-ink mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{val.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTA />
    </div>
  );
}
