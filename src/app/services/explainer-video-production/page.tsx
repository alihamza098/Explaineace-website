import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MonitorPlay,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Layers,
  Sparkles,
} from "lucide-react";
import { CTA } from "@/components/CTA";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Explainer Video Production Service",
  description:
    "Explainer video production for SaaS teams. Fixed $220 for 60 seconds, delivered in 48 to 72 hours with studio voiceover, captions, and full rights.",
  alternates: {
    canonical: "https://explainerace.com/services/explainer-video-production",
  },
  openGraph: {
    title: "Explainer Video Production Service | EXPLAINERACE",
    description:
      "Explainer video production for SaaS teams. Fixed $220 for 60 seconds, delivered in 48 to 72 hours with studio voiceover, captions, and full rights.",
    url: "https://explainerace.com/services/explainer-video-production",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/M5CJdH4k8wU/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "Explainer Video Production Service - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explainer Video Production Service | EXPLAINERACE",
    description:
      "Explainer video production for SaaS teams. Fixed $220 for 60 seconds, delivered in 48 to 72 hours with studio voiceover, captions, and full rights.",
    images: ["https://img.youtube.com/vi/M5CJdH4k8wU/maxresdefault.jpg"],
  },
};

const faqs = [
  {
    q: "What is included in the $220 explainer video price?",
    a: "Everything from script to finished file: narration drafting, storyboard, motion graphics or 4K screen capture, studio voiceover, captions, sound design, two revision rounds, and 4K and 1080p master files with full commercial broadcast rights. There are no separate charges for the script, the voiceover, or the revisions.",
  },
  {
    q: "How long does explainer video production take?",
    a: "Most 60-second explainers reach first cut within 48 to 72 hours of the brief. Revision rounds follow on the same schedule, so a typical project is finished within a week of starting.",
  },
  {
    q: "What is the difference between an explainer video and a SaaS walkthrough?",
    a: "An explainer sells the outcome in a short story for someone who does not yet understand the offer. A walkthrough shows the actual interface in detail for someone already evaluating the product. Many clients order both: the explainer for the homepage, the walkthrough for product and pricing pages.",
  },
  {
    q: "Do I need to supply a finished script?",
    a: "No. We draft the narration from your website, feature documentation, or a sandbox test account, and send the script for approval before production begins. You are welcome to supply bullet points or an outline if you have them.",
  },
  {
    q: "What formats and commercial rights are included?",
    a: "Every project includes master 4K and 1080p 60FPS MP4 files, 16:9 and 9:16 social cutdowns on request, and full commercial broadcast rights with no ongoing licensing fees.",
  },
  {
    q: "What do you need from me to start?",
    a: "Three things: access to the product through a staging or demo account, one sentence describing who the video is for, and the single action it should produce. Send those through the contact page or WhatsApp and production starts the same day.",
  },
];

const processSteps = [
  {
    step: "1. Brief",
    text: "Send your product URL, your target viewer, and the one action the video should produce.",
  },
  {
    step: "2. Script",
    text: "We draft the 60-second narration and send it for approval before any production begins.",
  },
  {
    step: "3. Storyboard",
    text: "Each script line gets a visual plan, so you approve the story frame by frame.",
  },
  {
    step: "4. Production",
    text: "Animation or 4K capture, voiceover recording, sound design, and captions.",
  },
  {
    step: "5. Review and delivery",
    text: "First cut in 48 to 72 hours, two revision rounds included, then master files with full commercial rights.",
  },
];

export default function ExplainerVideoProductionPage() {
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

  const explainerIds = [
    "framer-saas-explainer",
    "metrade-promo",
    "internet-under-the-sea-explainer",
  ];
  const relevantProjects = projects.filter((p) => explainerIds.includes(p.id));

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
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-brand-300 font-medium">Explainer Video Production</span>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <MonitorPlay className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Explainer Video Production Service</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Explainer Video Production Service
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Your product is hard to explain in words. A 60-second explainer video makes it obvious: one problem, one solution, three proof moments, one next step. Fixed at $220 for 60 seconds, delivered in 48 to 72 hours, with studio voiceover, captions, two revision rounds, and full commercial rights.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>18 Fiverr reviews</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>5.0 out of 5 stars</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Fiverr &amp; Upwork direct</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>48 hour turnaround</span>
              </span>
            </div>
          </div>

          {/* Deep Content: 500+ Words Targeted Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-8 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Why Software Teams Order an Explainer Video First
                </h2>
                <p>
                  When a prospect lands on your homepage, you have seconds before they decide whether your product is worth understanding. Most leave without reading past the headline, not because the product is weak, but because the value is buried in paragraphs, feature lists, and documentation links. An explainer video does the assembly for them: voice, motion, and sequence carry the logic in an order the viewer cannot skip.
                </p>
                <p>
                  The format works because it respects the viewer&apos;s time. Sixty seconds, one message, one next step. The viewer finishes knowing what the product does, who it is for, and what to do next, which is exactly what a homepage has to achieve before any demo or sales call can do its work.
                </p>
                <p>
                  Our <strong>explainer video production service</strong> is built for software and SaaS teams that need that clarity fast. We produce the video from script to finished file: narration drafted from your product, motion graphics or 4K screen capture, studio voiceover, and captions, delivered in 48 to 72 hours at a fixed $220 for 60 seconds.
                </p>
                <p>
                  If you are still deciding on format, our guide to{" "}
                  <Link href="/blog/what-is-an-explainer-video" className="text-brand-300 hover:text-white underline">
                    what an explainer video is
                  </Link>{" "}
                  covers the six types, ideal length, and real costs, with examples from our portfolio.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  What Every Explainer Video Includes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-surface-card border border-white/[0.06] space-y-2">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent-cyan" />
                      Script-First Production
                    </h3>
                    <p className="text-xs text-slate-300">
                      Narration is drafted from your website, docs, or sandbox account before anything is animated, so the story is approved before production starts.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-white/[0.06] space-y-2">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-brand-400" />
                      Motion Graphics &amp; UI Animation
                    </h3>
                    <p className="text-xs text-slate-300">
                      Custom 2D motion graphics, animated UI, and vector reconstructions built from your real interface, not stock templates.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-white/[0.06] space-y-2">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      4K Product Capture
                    </h3>
                    <p className="text-xs text-slate-300">
                      Crisp 4K 60FPS screen capture with dynamic focal zooms and stabilized cursor work, so every click is legible on any screen.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-white/[0.06] space-y-2">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Studio Voiceover &amp; Captions
                    </h3>
                    <p className="text-xs text-slate-300">
                      Clear human studio narration, balanced audio mix, and captions for silent viewing, burned in or delivered as timed files.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  From Brief to Finished Video in 48 to 72 Hours
                </h2>
                <div className="space-y-3 pt-2">
                  {processSteps.map((s) => (
                    <div
                      key={s.step}
                      className="p-5 rounded-2xl bg-surface-card border border-white/[0.06] flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
                    >
                      <span className="font-semibold text-white text-sm shrink-0 sm:w-44">
                        {s.step}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300">{s.text}</span>
                    </div>
                  ))}
                </div>
                <p>
                  The full production workflow, including revision stages and delivery formats, is documented on the{" "}
                  <Link href="/process" className="text-brand-300 hover:text-white underline">
                    Process page
                  </Link>
                  . Rates for every format are on the{" "}
                  <Link href="/pricing" className="text-brand-300 hover:text-white underline">
                    Pricing page
                  </Link>
                  .
                </p>
              </section>
            </div>

            {/* Sidebar Pricing & CTA Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-7 rounded-3xl bg-surface-card border border-brand-500/30 shadow-glow space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">
                  Explainer Video Rate
                </span>
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-white">$220</div>
                  <div className="text-xs text-slate-400">per 60 seconds finished runtime</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A complete 60-second explainer video: script, storyboard, motion graphics or 4K capture, studio voiceover, captions, and full commercial rights. This is our walkthrough-style tier — screen capture with dynamic zooms and studio voiceover. Bespoke custom UI-motion explainers with vector UI reconstruction are a separate tier at $800–$1,200.
                </p>

                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Script &amp; Storyboard Included</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Motion Graphics or 4K Capture</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Studio Voiceover &amp; Captions</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>2 Rounds of Revisions Included</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Full Commercial Broadcast Rights</span>
                  </div>
                </div>

                <div className="pt-3 space-y-2.5">
                  <Link
                    href="/contact?package=Explainer%20Video%20Production"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-glow transition-all"
                  >
                    <span>Request Explainer Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-slate-300 flex items-center justify-center transition-colors"
                  >
                    View All Pricing Tiers &rarr;
                  </Link>
                </div>
              </div>

              {/* Direct WhatsApp Quick Chat */}
              <div className="p-6 rounded-2xl bg-surface-card border border-white/[0.06] text-xs text-slate-300 space-y-3">
                <div className="font-semibold text-white">Have a product that needs explaining?</div>
                <p>Chat directly with Ali on WhatsApp for an immediate assessment of your explainer video.</p>
                <a
                  href={siteConfig.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>Chat on WhatsApp (+92 313 9110721) &rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Relevant Portfolio Pieces */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  Featured Explainers
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Recent Explainer Video Case Studies
                </h2>
              </div>
              <Link
                href="/work"
                className="text-xs sm:text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
              >
                View all 33 portfolio videos &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relevantProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/work/${p.id}`}
                  className="group p-5 rounded-2xl bg-surface-card border border-white/[0.06] hover:border-brand-500/40 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300">
                      {p.category}
                    </span>
                    <h3 className="font-semibold text-base text-white group-hover:text-brand-300 transition-colors mt-2.5 line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <span className="mt-4 text-[11px] text-brand-400 font-medium inline-flex items-center gap-1">
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
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Questions About Explainer Video Production
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-surface-card border border-white/[0.06] space-y-2"
                >
                  <h3 className="text-base font-semibold text-white flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    <span>{f.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6.5">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Cross Links */}
          <div className="p-6 rounded-2xl bg-surface-card border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <span>Start with the guide, or explore other services:</span>
            <div className="flex flex-wrap gap-3">
              <Link href="/blog/what-is-an-explainer-video" className="text-brand-300 hover:text-white underline">
                What Is an Explainer Video? &rarr;
              </Link>
              <Link href="/services/saas-walkthrough-video" className="text-brand-300 hover:text-white underline">
                SaaS Walkthrough Video Service &rarr;
              </Link>
              <Link href="/services/screencast-tutorials" className="text-brand-300 hover:text-white underline">
                Screencast Video Production Service &rarr;
              </Link>
              <Link href="/services/app-demo-video" className="text-brand-300 hover:text-white underline">
                App Demo Video Service &rarr;
              </Link>
              <Link href="/services/ai-ugc-ads" className="text-brand-300 hover:text-white underline">
                AI UGC &amp; Product Ads &rarr;
              </Link>
              <Link href="/pricing" className="text-brand-300 hover:text-white underline">
                Pricing &rarr;
              </Link>
              <Link href="/process" className="text-brand-300 hover:text-white underline">
                Process &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CTA />
    </>
  );
}
