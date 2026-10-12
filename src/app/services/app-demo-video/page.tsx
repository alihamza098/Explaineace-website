import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
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
  title: "App Demo Video Service | EXPLAINERACE",
  description:
    "Professional app demo video service & mobile app promo videos for iOS & Android. Touch gestures, 3D device frames, onboarding walkthroughs from $220.",
  alternates: {
    canonical: "https://explainerace.com/services/app-demo-video",
  },
  openGraph: {
    title: "App Demo Video Service | EXPLAINERACE",
    description:
      "Professional app demo video service & mobile app promo videos for iOS & Android. Touch gestures, 3D device frames, onboarding walkthroughs from $220.",
    url: "https://explainerace.com/services/app-demo-video",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/kqmPTZOBv9k/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "App Demo Video Service - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "App Demo Video Service | EXPLAINERACE",
    description:
      "Professional app demo video service & mobile app promo videos for iOS & Android. Touch gestures, 3D device frames, onboarding walkthroughs from $220.",
    images: ["https://img.youtube.com/vi/kqmPTZOBv9k/maxresdefault.jpg"],
  },
};

const faqs = [
  {
    q: "What is included in your app demo video service?",
    a: "Our app demo video service includes high-resolution screen recordings inside realistic 3D smartphone frames (iPhone & Android), animated touch gesture indicators (taps, swipes, pinches, long presses), kinetic typography callouts, studio voiceover narration, and App Store / Google Play compliant exports.",
  },
  {
    q: "Can you produce mobile app promo videos for social ads and App Store Previews?",
    a: "Yes! In addition to landscape (16:9) product tours, we deliver mobile-first 9:16 vertical video assets sized specifically for Apple App Store Previews, Google Play Store promo videos, TikTok ads, and Instagram Reels.",
  },
  {
    q: "Do you create saas onboarding video service assets for mobile & tablet apps?",
    a: "Yes. Our app onboarding & feature walkthrough videos guide first-time mobile users through critical permission prompts, push notification opt-ins, biometric logins, and initial workspace creation to reduce app churn on Day 1.",
  },
  {
    q: "How do you capture native mobile app screens with high fidelity?",
    a: "We record direct native screen captures using high-framerate iOS and Android dev sandboxes. This prevents compression artifacts, laggy swipes, or resolution drops often seen when using web-based emulators.",
  },
  {
    q: "How much does a mobile app demo video cost?",
    a: "App demo and mobile walkthrough videos start at $220 for a 60-second walkthrough. High-energy 3D exploded mobile promos (like our Bloom App Store preview showcase) range between $300 and $600 depending on 3D motion requirements.",
  },
  {
    q: "What assets do I need to supply to begin?",
    a: "You can provide a TestFlight build, Android APK, Figma prototype link, or a raw screen recording from your phone. We can frame and reconstruct the interface from there.",
  },
];

export default function AppDemoVideoPage() {
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
    .filter((p) => p.category === "Mobile Apps" || p.id.includes("bloom") || p.id.includes("trading") || p.id.includes("app"))
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
            <span className="text-brand-600 font-medium">App Demo Video Service</span>
          </nav>

          {/* Hero Section */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-4">
              <Smartphone className="w-3.5 h-3.5 text-accent-cyan" />
              <span>App Demo Video Service & Mobile App Promos</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-tight">
              App Demo Video Service
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-3xl">
              Flawless screen demonstrations and mobile app promo video service for iOS and Android products. Featuring 3D device frames, responsive touch gesture animations, and app onboarding & feature walkthrough videos that boost App Store conversions and retain mobile users.
            </p>
          </div>

          {/* Deep Content: 500+ Words Targeted Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-8 space-y-8 text-ink-soft leading-relaxed text-sm sm:text-base">
              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Why Mobile Apps Require a Specialized App Demo Video Service
                </h2>
                <p>
                  Capturing mobile applications is fundamentally different from desktop screen recording. On mobile devices, user interaction occurs through fingers and gestures—taps, swipes, pinch-to-zoom, and haptic feedback. If you simply record a mobile screen and upload it as a flat video, viewers have no idea where the user tapped or why a new screen opened.
                </p>
                <p>
                  Our specialized <strong>mobile app promo video service</strong> elevates mobile screen recordings by placing them inside photorealistic 3D titanium iPhone and Android device frames. We add visual gesture pulses, ripple feedback rings on every tap, and fluid swipe trails that mimic natural hand interactions.
                </p>
                <p>
                  Beyond marketing promos, we provide a complete <strong>saas onboarding video service</strong> and mobile feature guide solution. By guiding new app install users through biometric verification, permission dialogs, and initial workspace customization, you eliminate initial confusion and prevent early uninstalls.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  Mobile App Demo & Promo Video Formats
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent-cyan" />
                      App Store & Google Play Previews
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Compliant 30-second app previews with portrait aspect ratios, zero device hands, and punchy caption cards.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Touch Gestures & Haptic Visuals
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Animated tap ripples, swipe paths, and long-press highlights show exactly how users navigate your mobile UX.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <Layers className="w-4 h-4 text-brand-600" />
                      App Onboarding & Feature Walkthrough Videos
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Step-by-step mobile activation tours embedded in your in-app onboarding flow or welcome email sequence.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-2">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      3D Device Frames & Floating Layers
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Showcase multi-screen depth, floating widgets, and dynamic camera orbits for maximum social ad engagement.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Pricing Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-7 rounded-3xl bg-surface-card border border-brand-500/30 shadow-glow space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">
                  App Demo Production Rate
                </span>
                <div className="space-y-1">
                  <div className="text-4xl font-extrabold text-ink">From $220</div>
                  <div className="text-xs text-ink-muted">per finished video package</div>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Professional mobile app walkthrough or promo with 3D device framing, gesture animations, and vertical/landscape sizing.
                </p>

                <div className="space-y-2 pt-2 border-t border-surface-border">
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>3D Smartphone Mockup (iOS / Android)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Touch Gesture & Tap Animations</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Vertical 9:16 & Landscape 16:9 Exports</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Studio Voiceover & Sound Design</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full Commercial & App Store Rights</span>
                  </div>
                </div>

                <div className="pt-3 space-y-2.5">
                  <Link
                    href="/contact?package=App%20Demo%20Video"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-glow transition-all"
                  >
                    <span>Request App Demo Quote</span>
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

              {/* Direct Support Notice */}
              <div className="p-6 rounded-2xl bg-surface-card border border-surface-border text-xs text-ink-soft space-y-2">
                <div className="font-semibold text-ink">Launching on iOS TestFlight or Google Play?</div>
                <p>We work directly with beta builds, Figma interactive prototypes, or direct mobile screen records.</p>
                <Link href="/contact" className="text-brand-600 hover:text-ink underline font-semibold block pt-1">
                  Start Your App Project &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Relevant Mobile Portfolio Pieces */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Mobile Demos
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
                  Recent Mobile App Demo Case Studies
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
                Questions About App Demo Videos
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
