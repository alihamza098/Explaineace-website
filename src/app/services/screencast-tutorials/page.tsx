import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Video,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";
import { CTA } from "@/components/CTA";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Screencast Video Production Service",
  description:
    "Professional screencast video production service for software tutorials, SOPs & help centers. Pure instructional clarity, studio audio from $120/60s.",
  alternates: {
    canonical: "https://explainerace.com/services/screencast-tutorials",
  },
  openGraph: {
    title: "Screencast Video Production Service | EXPLAINERACE",
    description:
      "Professional screencast video production service for software tutorials, SOPs & help centers. Pure instructional clarity, studio audio from $120/60s.",
    url: "https://explainerace.com/services/screencast-tutorials",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/fJ8ocgOvLNU/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "Screencast Video Production Service - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Screencast Video Production Service | EXPLAINERACE",
    description:
      "Professional screencast video production service for software tutorials, SOPs & help centers. Pure instructional clarity, studio audio from $120/60s.",
    images: ["https://img.youtube.com/vi/fJ8ocgOvLNU/maxresdefault.jpg"],
  },
};

const faqs = [
  {
    q: "What defines your screencast video production service?",
    a: "Our screencast video service delivers clean, distraction-free screen recording tutorials. We intentionally remove excessive 3D motion graphics and hype-driven transitions to focus purely on rapid user comprehension, crisp step-by-step guidance, and synchronized studio voiceover narration.",
  },
  {
    q: "How much does a simple screencast tutorial cost?",
    a: "Our screencast tutorials cost $120 per 60 seconds of finished runtime. This rate includes 1080p/4K high-res recording, essential zooms on key input fields, audio leveling, and commercial rights. Volume batch discounts are available for libraries of 5+ videos.",
  },
  {
    q: "How fast is turnaround for screencast video projects?",
    a: "Because this format focuses on direct execution without complex 3D keyframing, standard 60-to-120-second screencasts are delivered in just 24 to 48 hours.",
  },
  {
    q: "Can you provide timed subtitle files (.SRT / .VTT)?",
    a: "Yes! Timed subtitle files are available with every screencast, allowing you to upload closed captions directly to Zendesk, Intercom, HelpScout, or YouTube for silent viewing and accessibility.",
  },
  {
    q: "Can you record multi-step technical workflows like API setup or developer portals?",
    a: "Absolutely. We routinely record developer tools, API token creation, webhook configurations, and database integrations, masking sensitive keys and auth tokens during post-production.",
  },
  {
    q: "How do we get started on a screencast tutorial project?",
    a: "Simply share your app URL or test account, along with a bulleted list of the steps you need documented. We can write or refine the spoken script and proceed straight to recording.",
  },
];

export default function ScreencastTutorialsPage() {
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
    .filter((p) => p.category === "Tutorials" || p.category === "Training" || p.id.includes("bottronic") || p.id.includes("password"))
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
            <span className="text-brand-600 font-medium">Screencast Tutorials</span>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-4">
              <Video className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Screencast Video Production Service</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-tight">
              Screencast Video Production Service
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-3xl">
              Clear, straightforward screencast video tutorials with zero visual fluff. Built specifically for SaaS customer support libraries, internal SOPs, user onboarding checklists, and feature walkthroughs at an honest rate of $120 per 60 seconds.
            </p>
          </div>

          {/* Deep Content: 500+ Words Targeted Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-8 space-y-8 text-ink-soft leading-relaxed text-sm sm:text-base">
              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Why Software Teams Rely on a Dedicated Screencast Video Service
                </h2>
                <p>
                  Not every video needs 3D camera sweeps, cinematic lens flares, or multi-layered vector animations. When a frustrated customer searches your help desk at 2 AM asking &quot;How do I configure my DNS records?&quot; or &quot;How do I invite team members with custom roles?&quot;, they do not want to sit through an energetic marketing promo. They need immediate, friction-free instructional clarity.
                </p>
                <p>
                  Customer support teams and customer success managers spend hundreds of hours answering the same repetitive questions over email tickets and live chat. Providing concise 60-to-90-second screencast tutorial videos directly resolves these pain points, slashing support ticket volume by up to 43% and accelerating time-to-value for new software users.
                </p>
                <p>
                  Our <strong>screencast video production service</strong> bridges the gap between raw, amateur screen captures and expensive agency retainers. We record your product in clean 1080p or 4K resolution, edit out awkward loading pauses and mouse stalls, apply focused zooms onto important dropdown menus, and sync crisp studio voiceover narration that guides the learner step-by-step.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Where to Deploy Simple Screencast Tutorials
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-600" />
                      Help Centers & Knowledge Bases
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Embed bite-sized videos across Zendesk, Intercom, or Notion to reduce incoming support tickets.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      In-App Onboarding Checklists
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Guide first-time users through their initial setup tasks to guarantee high activation rates.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Layers className="w-4 h-4 text-accent-cyan" />
                      Internal Team SOPs
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Standardize operational procedures and tool workflows for new hires and distributed teams.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      Product Changelogs & Updates
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Show existing customers exactly what changed in your latest sprint release in 60 seconds.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Pricing Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-7 rounded-3xl bg-surface-card border border-brand-500/30 shadow-glow space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">
                  Screencast Production Rate
                </span>
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-ink">$120</div>
                  <div className="text-xs text-ink-muted">per 60 seconds finished runtime</div>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Fast, clean screencast tutorial video with crisp screen recording, synchronized studio narration, and essential input zooms.
                </p>

                <div className="space-y-2 pt-2 border-t border-surface-border">
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Native 1080p / 4K Clean Screen Recording</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Synchronized Studio Voiceover</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Essential Input & Button Zooms</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Fast 24h to 48h Turnaround</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bulk Batch Discounts on 5+ Videos</span>
                  </div>
                </div>

                <div className="pt-3 space-y-2.5">
                  <Link
                    href="/contact?package=Simple%20Screencast%20Tutorial"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-glow transition-all"
                  >
                    <span>Order $120 Screencast</span>
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

              {/* Volume Discount Notice */}
              <div className="p-6 rounded-2xl bg-surface-card border border-surface-border text-xs text-ink-soft space-y-2">
                <div className="font-semibold text-ink">Building a multi-video help academy?</div>
                <p>We provide bundled batch discounts when ordering series of 5 to 20 tutorials at once.</p>
                <Link href="/contact" className="text-brand-600 hover:text-ink underline font-semibold block pt-1">
                  Inquire for Batch Discount &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Relevant Screencast Portfolio Pieces */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Tutorial Examples
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
                  Screencast Tutorial Case Studies
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
                Questions About Screencast Video Production
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
              <Link href="/services/app-demo-video" className="text-brand-600 hover:text-ink underline">
                App Demo Video Service &rarr;
              </Link>
              <Link href="/services/ai-ugc-ads" className="text-brand-600 hover:text-ink underline">
                AI UGC & Product Ads &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CTA />
    </>
  );
}
