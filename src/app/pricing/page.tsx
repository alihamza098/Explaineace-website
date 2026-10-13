import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Check,
  Clock,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { pricingTiers, pricingFaqs } from "@/data/pricing";
import { siteConfig } from "@/data/siteConfig";
import { WhatsAppIcon, UpworkIcon } from "@/components/Icons";
import { PricingCalculator } from "@/components/PricingCalculator";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "SaaS Video Production Pricing & Rates | Screencasts & Demos",
  description:
    "Transparent SaaS video pricing: $120/60s screencasts, $220/60s walkthroughs, $200–$300 AI product ads, and $800–$1,200 custom UI motion. Request your quote today.",
  alternates: {
    canonical: "https://explainerace.com/pricing",
  },
  openGraph: {
    title: "SaaS Video Production Pricing & Rates | Screencasts & Demos | EXPLAINERACE",
    description:
      "Transparent SaaS video pricing: $120/60s screencasts, $220/60s walkthroughs, $200–$300 AI product ads, and $800–$1,200 custom UI motion. Request your quote today.",
    url: "https://explainerace.com/pricing",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/jzb-LpUo2i8/hqdefault.jpg",
        width: 1280,
        height: 720,
        alt: "SaaS Video Pricing - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Video Production Pricing & Rates | Screencasts & Demos | EXPLAINERACE",
    description:
      "Transparent SaaS video pricing: $120/60s screencasts, $220/60s walkthroughs, $200–$300 AI product ads, and $800–$1,200 custom UI motion. Request your quote today.",
    images: ["https://img.youtube.com/vi/jzb-LpUo2i8/hqdefault.jpg"],
  },
};

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="pt-28 sm:pt-36 pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-accent-cyan/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Transparent Production Pricing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-tight">
            Clear rates. High clarity.
            <br />
            <span className="bg-gradient-to-r from-brand-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
              Zero guesswork.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto">
            From focused instructional screencasts to dynamic SaaS walkthroughs, AI UGC product ads, and custom UI motion graphics. Inbox for special discounts on longer projects and multi-video batches.
          </p>

          {/* Quick trust reassurance */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
              100% Commercial Broadcast Rights
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-ink-soft">
              <RotateCcw className="w-3.5 h-3.5 text-brand-600" />
              2 Rounds of Revisions Included
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-ink-soft">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Fast 24h to 72h Turnarounds
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {pricingTiers.map((tier, tierIdx) => {
            const isPopular = Boolean(tier.popular);

            return (
              <Reveal key={tier.id} delay={tierIdx * 90} variant="up" className="h-full">
              <div
                className={`price-card relative h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between ${
                  isPopular
                    ? "price-popular bg-gradient-to-b from-white to-surface-card shadow-glow-lg"
                    : "bg-surface-card border border-surface-border hover:border-ink/20 shadow-card"
                }`}
              >
                {/* Popular / Badge Flag */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-md ${
                        isPopular
                          ? "bg-gradient-to-r from-brand-500 to-indigo-500 text-white"
                          : "bg-surface-hover text-accent-cyan border border-accent-cyan/30"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Top Section */}
                <div>
                  <div className="space-y-1 mb-4">
                    <h2 className="text-xl font-bold text-ink tracking-tight">
                      {tier.name}
                    </h2>
                    <p className="text-xs font-medium text-brand-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{tier.duration}</span>
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="my-6 pb-6 border-b border-surface-border space-y-1.5">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                        {tier.price}
                      </span>
                      {tier.priceUnit && (
                        <span className="text-xs text-ink-muted font-medium">
                          {tier.priceUnit}
                        </span>
                      )}
                    </div>
                    {tier.discountNote && (
                      <p className="text-[11px] text-accent-cyan font-medium leading-tight">
                        {tier.discountNote}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-ink-soft leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Ideal For */}
                  <div className="p-3 rounded-xl bg-surface-subtle/70 border border-surface-border mb-6">
                    <span className="block text-[10px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
                      Best For
                    </span>
                    <p className="text-xs text-ink">
                      {tier.idealFor}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="block text-xs font-semibold text-ink uppercase tracking-wider">
                      Included in package:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-ink-soft leading-snug"
                        >
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action & Meta */}
                <div className="space-y-4 pt-6 border-t border-surface-border">
                  <div className="flex items-center justify-between text-xs text-ink-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-ink-muted" />
                      <span>{tier.turnaround}</span>
                    </span>
                    <span className="text-emerald-600 font-medium">
                      {tier.revisions}
                    </span>
                  </div>

                  <Link
                    href={`/contact?package=${tier.id}`}
                    className={`w-full py-3.5 px-5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      isPopular
                        ? "bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-glow hover:shadow-glow-lg"
                        : "bg-ink/[0.08] hover:bg-ink/[0.14] text-ink border border-surface-border"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`https://wa.me/923139110721?text=Hi%20Ali,%20I%20am%20interested%20in%20the%20${encodeURIComponent(tier.name)}%20(${encodeURIComponent(tier.price)}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center block text-[11px] text-ink-muted hover:text-emerald-600 transition-colors"
                  >
                    Quick WhatsApp inquiry →
                  </a>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

        {/* Interactive Pricing & ROI Calculator */}
        <div className="mt-16 sm:mt-24">
          <PricingCalculator />
        </div>

        {/* Payment & Contract Methods */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-10 rounded-3xl bg-surface-card border border-surface-border shadow-card">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Safe & Flexible Payment
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
              How we work together safely
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Choose the hiring method that best matches your company workflow and security requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upwork Direct */}
            <div className="p-6 rounded-2xl bg-surface-subtle border border-surface-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  0% Buyer Fee
                </span>
                <UpworkIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-ink">
                Upwork Direct Contract
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Full Upwork escrow and milestone payment protection, with **0% client marketplace fees** on direct contracts.
              </p>
            </div>

            {/* Payoneer Direct */}
            <div className="p-6 rounded-2xl bg-surface-subtle border border-surface-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-600 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
                  Global Wire & Card
                </span>
                <ShieldCheck className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold text-ink">
                Payoneer Invoicing
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Official business invoice with secure payment via corporate credit card, ACH, or local bank wire transfer.
              </p>
            </div>

            {/* Fiverr Gig & Profile */}
            <a
              href={siteConfig.fiverr.gigUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-surface-subtle hover:bg-surface-hover border border-surface-border hover:border-emerald-500/40 transition-all duration-200 space-y-3 group block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  4.8★ (175 Reviews)
                </span>
                <ExternalLink className="w-4 h-4 text-ink-muted group-hover:text-emerald-600 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-ink group-hover:text-emerald-700 transition-colors flex items-center justify-between">
                <span>Fiverr Gig Order</span>
                <span className="text-[10px] uppercase font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Level 2</span>
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Prefer standard freelance platform ordering with escrow protection? Hire directly through our active Fiverr Gig with 175+ verified Fiverr reviews.
              </p>
              <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 group-hover:underline">
                <span>Order on Fiverr Gig</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="mt-16 sm:mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
              Common questions about pricing & delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingFaqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <h3 className="text-sm font-semibold text-ink">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed pl-6.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-900/40 via-surface-card to-indigo-950/40 border border-brand-500/30 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">
            Need a multi-video bundle or ongoing product updates?
          </h2>
          <p className="text-sm text-ink-soft max-w-xl mx-auto">
            If you need an entire tutorial series, feature update retainer, or custom animated explainer, let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow transition-all"
            >
              Get a Custom Quote
            </Link>
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-500 text-white text-xs font-semibold transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
