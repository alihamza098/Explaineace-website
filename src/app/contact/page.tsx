import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  CreditCard,
  Building,
  ArrowRight,
} from "lucide-react";
import { YoutubeIcon, WhatsAppIcon, UpworkIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";
import { PackageNoticeBanner, CopyEmailButton } from "@/components/ContactClientInteractive";

export const metadata: Metadata = {
  title: "Contact Ali — SaaS Video Specialist",
  description:
    "Get in touch with Ali for SaaS walkthroughs, screencast tutorials, and video pricing. Reach out directly on WhatsApp (+92 313 9110721) or email for a fast quote.",
  alternates: {
    canonical: "https://explainerace.com/contact",
  },
  openGraph: {
    title: "Contact Ali — SaaS Video Specialist",
    description:
      "Get in touch with Ali for SaaS walkthroughs, screencast tutorials, and video pricing. Reach out directly on WhatsApp (+92 313 9110721) or email for a fast quote.",
    url: "https://explainerace.com/contact",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/W6-glP7Ct5o/hqdefault.jpg",
        width: 1280,
        height: 720,
        alt: "Contact Ali - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Ali — SaaS Video Specialist | EXPLAINERACE",
    description:
      "Get in touch with Ali for SaaS walkthroughs, screencast tutorials, and video pricing. Reach out directly on WhatsApp (+92 313 9110721) or email for a fast quote.",
    images: ["https://img.youtube.com/vi/W6-glP7Ct5o/hqdefault.jpg"],
  },
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/923139110721?text=${encodeURIComponent(
    "Hi Ali, I'm reaching out from explainerace.com. I have a software/app video project inquiry."
  )}`;

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Direct Contact & Project Inquiries
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Direct access. Zero waiting.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Skip long intake forms. Reach out directly through WhatsApp for instant replies, email for briefs and proposals, or hire safely through Upwork and Fiverr.
          </p>
        </div>

        {/* Selected Package Banner if arriving from /pricing */}
        <Suspense fallback={null}>
          <PackageNoticeBanner />
        </Suspense>

        {/* Main Grid: Direct Channels - Server-Rendered for Crawlers & Instant Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Primary Direct Channels (WhatsApp & Email) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Channel 1: WhatsApp (Instant) */}
            <div className="relative p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-surface-card to-surface-card border-2 border-emerald-500/40 shadow-glow-lg overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Recommended & Fastest Response
                </span>
                <span className="text-xs text-ink-muted font-medium hidden sm:inline">
                  Available Daily
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Chat Directly on WhatsApp
              </h2>

              <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                Skip back-and-forth email delays. Drop a message to discuss your software, get a fast custom estimate, or confirm script and turnaround requirements immediately.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-emerald-700 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] group/btn"
                >
                  <WhatsAppIcon className="w-5 h-5 text-ink" />
                  <span>Open WhatsApp Chat ({siteConfig.whatsapp.display})</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>

              <p className="mt-3.5 text-[11px] text-ink-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Typical reply time: <strong>under 15 minutes</strong></span>
              </p>
            </div>

            {/* Primary Channel 2: Direct Email */}
            <div className="p-7 sm:p-9 rounded-3xl bg-surface-card border border-surface-border hover:border-brand-500/30 transition-all shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-bold uppercase tracking-wider">
                  <Mail className="w-3.5 h-3.5" />
                  Direct Email Inbox
                </span>
                <span className="text-xs text-ink-muted font-medium">
                  Official Inquiries
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                Send an Email
              </h3>

              <p className="text-sm text-ink-soft leading-relaxed">
                Prefer formal email communication or have detailed brief documents, script drafts, or NDA requirements? Email Ali directly at:
              </p>

              {/* Email Address Highlight Bar */}
              <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="font-mono text-base sm:text-lg font-bold text-ink tracking-wide break-all">
                  {siteConfig.contactEmail}
                </span>

                <CopyEmailButton />
              </div>

              <p className="text-[11px] text-ink-muted">
                Checked continuously. All inquiries receive a response within 24 business hours.
              </p>
            </div>

            {/* Helpful Briefing Checklist */}
            <div className="p-6 rounded-2xl bg-surface-subtle/70 border border-surface-border space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-soft flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                <span>What to include in your message for a fast turnaround:</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-muted">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-1.5" />
                  <span>Your product or website URL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-1.5" />
                  <span>Target video duration (60s, 2m, or ads)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-1.5" />
                  <span>Core user flow or features to show</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-1.5" />
                  <span>Target completion deadline</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contracts, Invoicing & Verified Profiles */}
          <div className="lg:col-span-5 space-y-6">
            {/* Upwork Direct Contract */}
            <div className="p-6 sm:p-7 rounded-3xl bg-surface-card border border-emerald-500/20 shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  0% Client Fee
                </span>
                <UpworkIcon className="w-5 h-5 text-emerald-600" />
              </div>

              <h3 className="text-lg font-bold text-ink">
                Upwork Direct Contract Protection
              </h3>

              <p className="text-xs text-ink-soft leading-relaxed">
                Need corporate escrow protection? I can initiate an official <strong>Upwork Direct Contract</strong> where you enjoy full escrow security, milestone approvals, and dispute protection while paying <strong>0% client marketplace fees</strong>.
              </p>

              <a
                href="https://www.upwork.com/freelancers/~015f8dfceae72b5311"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-ink/[0.06] hover:bg-ink/[0.12] border border-surface-border text-ink text-xs font-semibold transition-colors group"
              >
                <span>View Profile & Hire on Upwork</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Payoneer Business Invoicing */}
            <div className="p-6 sm:p-7 rounded-3xl bg-surface-card border border-surface-border shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
                  Official Invoicing
                </span>
                <Building className="w-5 h-5 text-brand-600" />
              </div>

              <h3 className="text-lg font-bold text-ink">
                Payoneer International Invoicing
              </h3>

              <p className="text-xs text-ink-soft leading-relaxed">
                Receive an official business invoice payable by bank transfer (ACH, SEPA, UK Faster Payments, Wire) or credit/debit card with zero friction for accounts payable.
              </p>

              <div className="p-3 rounded-xl bg-surface-subtle text-[11px] text-ink-muted flex items-center gap-2 border border-surface-border">
                <CreditCard className="w-4 h-4 text-brand-600 shrink-0" />
                <span>USD, EUR, GBP & CAD bank wire or card supported.</span>
              </div>
            </div>

            {/* Fiverr Vetted Profiles */}
            <div className="p-6 sm:p-7 rounded-3xl bg-surface-card border border-surface-border shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  5.0 ★ · 18 Reviews
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>

              <h3 className="text-lg font-bold text-ink">
                Order Through Fiverr Marketplace
              </h3>

              <p className="text-xs text-ink-soft leading-relaxed">
                Prefer hiring through Fiverr? Place an order directly on my active Level 2 gig or explore my verified portfolio profiles:
              </p>

              <a
                href={siteConfig.fiverr.gigUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all block group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-600">Featured Active Gig</span>
                  <span className="text-[10px] text-ink-soft font-medium">Level 2 Seller</span>
                </div>
                <div className="text-xs font-bold text-ink group-hover:text-emerald-700 transition-colors flex items-center justify-between mt-1">
                  <span>Order on Fiverr: Software & SaaS Explainer Gig</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {siteConfig.fiverrProfiles.map((p) => (
                  <a
                    key={p.username}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-surface-subtle hover:bg-surface-hover border border-surface-border transition-colors block"
                  >
                    <span className="text-[10px] text-emerald-600 font-semibold block uppercase">
                      {p.sellerLevel}
                    </span>
                    <span className="text-xs font-bold text-ink hover:text-brand-700 transition-colors flex items-center justify-between mt-0.5">
                      <span>fiverr.com/{p.username}</span>
                      <ExternalLink className="w-3 h-3 text-ink-muted" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
