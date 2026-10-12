import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MonitorPlay,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Zap,
  HelpCircle,
  Play,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { CTA } from "@/components/CTA";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "SaaS Walkthrough Video Service",
  description:
    "Expert SaaS walkthrough video service and product demo videos. 4K screen recording, 3D dynamic zooms, cursor smoothing & studio voiceover from $220/60s.",
  alternates: {
    canonical: "https://explainerace.com/services/saas-walkthrough-video",
  },
  openGraph: {
    title: "SaaS Walkthrough Video Service | EXPLAINERACE",
    description:
      "Expert SaaS walkthrough video service and product demo videos. 4K screen recording, 3D dynamic zooms, cursor smoothing & studio voiceover from $220/60s.",
    url: "https://explainerace.com/services/saas-walkthrough-video",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/W6-glP7Ct5o/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "SaaS Walkthrough Video Service - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Walkthrough Video Service | EXPLAINERACE",
    description:
      "Expert SaaS walkthrough video service and product demo videos. 4K screen recording, 3D dynamic zooms, cursor smoothing & studio voiceover from $220/60s.",
    images: ["https://img.youtube.com/vi/W6-glP7Ct5o/maxresdefault.jpg"],
  },
};

const faqs = [
  {
    q: "What makes a dedicated SaaS walkthrough video service different from general video editing?",
    a: "Generalist video editors treat software like generic footage—cutting arbitrarily and leaving tiny desktop menus impossible to read on mobile screens. A dedicated SaaS walkthrough video service understands software ergonomics: we frame the exact UI hierarchy, apply custom 150%–200% focal zooms onto active inputs, smooth erratic cursor jitter with bezier curves, and sync narration directly to micro-interactions.",
  },
  {
    q: "How much does a SaaS product demo video cost?",
    a: "Our standard SaaS walkthrough and product demo videos are priced transparently at $220 per 60 seconds of finished runtime. For longer product tours (such as 2 to 3 minute in-depth admin overviews), we provide discounted bundle rates upon inquiry.",
  },
  {
    q: "Do I need to supply a finished script before commissioning a SaaS walkthrough?",
    a: "Not at all. While you are welcome to provide bullet points or an internal outline, we can draft a concise, benefit-driven narration script directly from your website, feature documentation, or sandbox test environment.",
  },
  {
    q: "How do you protect sensitive company or user data during recording?",
    a: "We always recommend using a staging environment or dummy test account populated with realistic sample data. In addition, we apply pixel-level motion-tracked blurs, privacy masks, and synthetic text overlays during post-production to guarantee zero confidential data is exposed.",
  },
  {
    q: "What is the typical turnaround time for a 60-second SaaS walkthrough?",
    a: "Most 60 to 90-second SaaS walkthroughs are delivered within 48 to 72 hours for first-cut review. Two dedicated rounds of revisions are included to fine-tune pacing, zoom targets, and audio balancing.",
  },
  {
    q: "What video formats and commercial rights are included?",
    a: "Every project includes master 4K / 1080p 60FPS MP4 files, web-optimized low-latency embeds, optional YouTube timestamp chapters, and 100% full commercial broadcast rights with no ongoing licensing fees.",
  },
];

export default function SaasWalkthroughVideoPage() {
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
    .filter((p) => p.category === "SaaS" || p.id.includes("prim") || p.id.includes("metrade") || p.id.includes("green"))
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
            <span className="text-brand-600 font-medium">SaaS Walkthrough Video</span>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-4">
              <MonitorPlay className="w-3.5 h-3.5 text-accent-cyan" />
              <span>SaaS Walkthrough Video Service & Product Demos</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-tight">
              SaaS Walkthrough Video Service
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-3xl">
              Turn complex platforms into clear, high-converting video walkthroughs. Our dedicated SaaS product demo video service combines calibrated 4K screen capture, dynamic 3D focal zooms, stabilized cursor physics, and studio voiceover narration to prove your software&apos;s value in under 90 seconds.
            </p>
          </div>

          {/* Deep Content: 500+ Words Targeted Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-8 space-y-8 text-ink-soft leading-relaxed text-sm sm:text-base">
              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Why High-Growth Software Needs a Specialized SaaS Walkthrough Video Service
                </h2>
                <p>
                  When potential customers arrive on your SaaS landing page, they do not want to parse lengthy documentation or sit through a mandatory 30-minute sales qualifying call just to understand what your interface looks like. Modern software buyers want instant proof: they want to see the dashboard, watch the workflow in action, and experience the core &quot;aha!&quot; moment within seconds.
                </p>
                <p>
                  However, raw screen recordings recorded over Zoom or recorded with basic desktop screen capture tools fail to convert. They suffer from tiny fonts, jerky mouse motions, long pauses while forms load, and zero visual guidance. Viewers get lost in complex navigation sidebars and abandon the page.
                </p>
                <p>
                  Our specialized <strong>SaaS product demo & walkthrough video service</strong> solves this directly. We re-engineer your software capture in post-production using frame-by-frame 3D camera pan, 150%–200% focal zooms, custom spotlight framing, and bezier-curved cursor stabilization. Every click is emphasized with subtle ripple animations, directing the viewer&apos;s eyes exactly where the magic happens.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  SaaS Product Demo & Walkthrough Videos: Core Production Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent-cyan" />
                      Dynamic 3D Focal Zooms
                    </h3>
                    <p className="text-xs text-ink-soft">
                      We zoom dynamically into active buttons, toggle switches, and data charts so mobile visitors never have to squint.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Stabilized Cursor Physics
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Jittery mouse movements are replaced with silky, predictable bezier curves and glowing click ripple accents.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Layers className="w-4 h-4 text-brand-600" />
                      Sleek UI Framing & Depth
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Browser chrome is framed within dark obsidian canvases, floating drop shadows, and subtle spotlight vignettes.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Studio Voiceover & Audio Mix
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Crystal-clear human studio voiceover narration paired with subtle UI click sound effects and ducked background audio.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Pricing & CTA Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-7 rounded-3xl bg-surface-card border border-brand-500/30 shadow-glow space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">
                  SaaS Walkthrough Rate
                </span>
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-ink">$220</div>
                  <div className="text-xs text-ink-muted">per 60 seconds finished runtime</div>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  High-production SaaS product demo & walkthrough video featuring dynamic zooms, cursor smoothing, UI framing, and studio narration.
                </p>

                <div className="space-y-2 pt-2 border-t border-surface-border">
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>4K 60FPS Master MP4 Export</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dynamic 3D Zooms & Pan</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Studio Voiceover Narration</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2 Rounds of Revisions Included</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full Commercial Broadcast Rights</span>
                  </div>
                </div>

                <div className="pt-3 space-y-2.5">
                  <Link
                    href="/contact?package=SaaS%20Walkthrough%20Video"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-glow transition-all"
                  >
                    <span>Request Walkthrough Quote</span>
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

              {/* Direct WhatsApp Quick Chat */}
              <div className="p-6 rounded-2xl bg-surface-card border border-surface-border text-xs text-ink-soft space-y-3">
                <div className="font-semibold text-ink">Have a specific feature tour in mind?</div>
                <p>Chat directly with Ali on WhatsApp for an immediate assessment of your software demo.</p>
                <a
                  href={siteConfig.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
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
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Featured Demos
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
                  Recent SaaS Walkthrough Case Studies
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
                Questions About SaaS Walkthrough Videos
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

          {/* Internal Cross Links */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border flex flex-wrap items-center justify-between gap-4 text-xs text-ink-muted">
            <span>Also explore other services:</span>
            <div className="flex flex-wrap gap-3">
              <Link href="/services/screencast-tutorials" className="text-brand-600 hover:text-ink underline">
                Screencast Video Production Service &rarr;
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
