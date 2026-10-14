import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Play,
  Layers,
  Sparkles,
} from "lucide-react";
import { CTA } from "@/components/CTA";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "AI UGC & Product Ads",
  description:
    "High-converting AI UGC video ads and AI product videos for SaaS, apps, and digital brands. Hyper-realistic presenters & dynamic product motion from $200/ad.",
  alternates: {
    canonical: "https://explainerace.com/services/ai-ugc-ads",
  },
  openGraph: {
    title: "AI UGC & Product Ads | EXPLAINERACE",
    description:
      "High-converting AI UGC video ads and AI product videos for SaaS, apps, and digital brands. Hyper-realistic presenters & dynamic product motion from $200/ad.",
    url: "https://explainerace.com/services/ai-ugc-ads",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/fQ7YXzamRvQ/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "AI UGC & Product Ads - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI UGC & Product Ads | EXPLAINERACE",
    description:
      "High-converting AI UGC video ads and AI product videos for SaaS, apps, and digital brands. Hyper-realistic presenters & dynamic product motion from $200/ad.",
    images: ["https://img.youtube.com/vi/fQ7YXzamRvQ/maxresdefault.jpg"],
  },
};

const faqs = [
  {
    q: "How does your AI UGC & Product Ad video service work?",
    a: "We produce paid-social video ads combining hyper-realistic AI creator avatars, dynamic product screen capture motion, and high-retention social editing. You provide your website or software details; we write hook angles, generate lifelike video presenters, choreograph your UI, and edit with kinetic subtitles and sound effects in 48 to 72 hours.",
  },
  {
    q: "How much do AI UGC and AI product videos cost?",
    a: "Our AI product and UGC ads are priced transparently at $200 to $300 per short video ad (typically 30 to 60 seconds). We also offer volume package discounts when testing multiple opening hook variations for paid ad campaigns.",
  },
  {
    q: "Can we split-test multiple 3-second opening hook variations?",
    a: "Yes! The greatest superpower of AI ad production is hook testing velocity. We can keep your core product demonstration consistent while testing 3 to 5 unique opening problem statements, secret tool reveals, or competitor comparisons to drastically lower your customer acquisition costs.",
  },
  {
    q: "Are these video ads allowed on Meta, TikTok, and YouTube Shorts?",
    a: "Yes, 100%. Major social platforms allow AI-generated video ads as long as they comply with standard advertising policies and do not make misleading claims. All our deliverables include full commercial usage and paid ad whitelisting rights.",
  },
  {
    q: "What video aspect ratios and formats do you deliver?",
    a: "We deliver full-resolution 9:16 vertical MP4s (1080x1920) optimized for TikTok, Instagram Reels, and YouTube Shorts, along with optional 16:9 widescreen or 1:1 square versions upon request.",
  },
  {
    q: "How natural do the AI presenters look and sound?",
    a: "2026 generative avatar models feature realistic lip synchronization, subtle head tilts, expressive facial micro-movements, and authentic vocal intonation. When combined with dynamic b-roll cuts of your actual software, viewers engage with the video just like authentic creator content.",
  },
];

export default function AiUgcAdsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const relevantProjects = projects
    .filter((p) => p.category === "AI UGC & Product Ads" || p.category === "Promo" || p.id.includes("nexus") || p.id.includes("orbitra"))
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="pt-28 sm:pt-36 pb-24 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-600/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-ink-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-ink transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-brand-600 font-medium">AI UGC & Product Ads</span>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-4">
              <Bot className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Paid Social Video Ad Production</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-tight">
              AI UGC & Product Ads
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-3xl">
              High-converting short-form video ads engineered for TikTok, Instagram Reels, and YouTube Shorts. We pair hyper-realistic AI creators with dynamic 3D software motion, viral 3-second hook angles, and native kinetic captions to scale your paid acquisition.
            </p>
          </div>

          {/* Deep Content: 500+ Words Human-First Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-8 space-y-8 text-ink-soft leading-relaxed text-sm sm:text-base">
              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Stop Waiting Weeks on Flaky Creator Agencies for Tech UGC
                </h2>
                <p>
                  User Generated Content is undeniably the highest-performing creative format across paid social algorithms. But for SaaS founders, digital product teams, and mobile apps, traditional creator agencies are a massive bottleneck.
                </p>
                <p>
                  Lifestyle influencers struggle to understand complex technical software interfaces. They miss script cues, fumble feature terminology, demand high talent fees ($1,500–$3,000 per video), and take 3 to 5 weeks to deliver a single draft that still requires painful reshoots. By the time the video launches, your ad creative testing momentum is dead.
                </p>
                <p>
                  Our <strong>AI UGC & Product Ad video service</strong> gives performance marketing teams an unfair advantage. We produce studio-quality, high-converting short ads in 48 to 72 hours at an accessible rate of $200 to $300 per ad. You get 100% script precision, zero talent drama, and the freedom to test multiple opening angles simultaneously.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  The Anatomy of a High-Converting AI Product Video Ad
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent-cyan" />
                      3-Second Viral Hook Testing
                    </h3>
                    <p className="text-xs text-ink-soft">
                      We script high-tension opening pattern interrupts and secret-tool reveals that halt thumb-scrolling instantly.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Dynamic 3D UI & Product Motion
                    </h3>
                    <p className="text-xs text-ink-soft">
                      We cut away from the presenter to showcase your actual interface solving the problem with sleek zooms and device tilts.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Layers className="w-4 h-4 text-brand-600" />
                      Social-Native Kinetic Captions
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Word-by-word animated subtitles with color accents and sound effects keep mute viewers fully engaged.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Full Commercial Whitelisting
                    </h3>
                    <p className="text-xs text-ink-soft">
                      No licensing expiration or talent royalty renegotiations. You own 100% perpetual commercial advertising rights.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Pricing Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-7 rounded-3xl bg-surface-card border border-brand-500/30 shadow-glow space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">
                  AI Product & UGC Ad Rate
                </span>
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-ink">$200 – $300</div>
                  <div className="text-xs text-ink-muted">per short ad video (30s – 60s)</div>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Ready-to-run short social ad combining realistic AI presenter, dynamic UI screen motion, viral hook, and kinetic captions.
                </p>

                <div className="space-y-2 pt-2 border-t border-surface-border">
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Vertical 9:16 & 16:9 Landscape Exports</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hyper-Realistic AI Presenter Avatar</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dynamic UI Zooms & Screen Motion</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Word-by-Word Kinetic Subtitles & SFX</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full Paid Ad Whitelisting Rights</span>
                  </div>
                </div>

                <div className="pt-3 space-y-2.5">
                  <Link
                    href="/contact?package=AI%20UGC%20Ad%20Video"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-glow transition-all"
                  >
                    <span>Launch an AI Ad Campaign</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="w-full py-2.5 px-4 rounded-xl bg-ink/[0.05] hover:bg-ink/[0.1] text-xs font-medium text-ink-soft flex items-center justify-center transition-colors"
                  >
                    View All Pricing Tiers &rarr;
                  </Link>
                </div>
              </div>

              {/* Hook Testing Notice */}
              <div className="p-6 rounded-2xl bg-surface-card border border-surface-border text-xs text-ink-soft space-y-2">
                <div className="font-semibold text-ink">Need multiple hook variations?</div>
                <p>We offer bundled discounts for 3x, 5x, or 10x creative split-testing batches.</p>
                <Link href="/contact" className="text-brand-600 hover:text-ink underline font-semibold block pt-1">
                  Inquire for Batch Hook Pricing &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Relevant Portfolio Pieces */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Ad & Promo Showcase
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
                  Recent Product Ad & Promo Case Studies
                </h2>
              </div>
              <Link
                href="/work"
                className="text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                View all 27 portfolio videos &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relevantProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/work/${p.id}`}
                  className="group p-5 rounded-2xl bg-surface-card border border-surface-border hover:border-brand-500/40 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-600">
                      {p.category}
                    </span>
                    <h3 className="font-semibold text-base text-ink group-hover:text-brand-700 transition-colors mt-2.5 line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-ink-muted mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <span className="mt-4 text-[11px] text-brand-600 font-medium inline-flex items-center gap-1">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
                Questions About AI UGC & Product Ads
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-2"
                >
                  <h3 className="text-base font-semibold text-ink flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>{f.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed pl-6.5">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cross Links */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border flex flex-wrap items-center justify-between gap-4 text-xs text-ink-muted">
            <span>Explore other specialized services:</span>
            <div className="flex flex-wrap gap-3">
              <Link href="/services/saas-walkthrough-video" className="text-brand-600 hover:text-ink underline">
                SaaS Walkthrough Video Service &rarr;
              </Link>
              <Link href="/services/screencast-tutorials" className="text-brand-600 hover:text-ink underline">
                Screencast Video Production Service &rarr;
              </Link>
              <Link href="/services/app-demo-video" className="text-brand-600 hover:text-ink underline">
                App Demo Video Service &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CTA />
    </>
  );
}
