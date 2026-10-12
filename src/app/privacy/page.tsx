import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy | EXPLAINERACE",
  description:
    "Privacy Policy for EXPLAINERACE by Ali. How we protect client project data, demo sandbox credentials, NDA agreements, and website analytics.",
  alternates: {
    canonical: "https://explainerace.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | EXPLAINERACE",
    description:
      "Privacy Policy for EXPLAINERACE by Ali. How we protect client project data, demo sandbox credentials, NDA agreements, and website analytics.",
    url: "https://explainerace.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-accent-cyan" />
            <span>Legal & Data Security</span>
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Privacy Policy & Client Data Security
          </h1>
          <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
            Last updated: October 2026. At EXPLAINERACE (operated by Ali), we treat your proprietary software, pre-release interfaces, and customer data with bank-grade discretion.
          </p>
        </div>

        <div className="space-y-10 text-ink-soft text-sm sm:text-base leading-relaxed">
          <section className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-3">
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>1. Staging Credentials & Sandbox Environment Security</span>
            </h2>
            <p>
              When you grant staging, testing, or sandbox access to your software product for screen recording, those credentials are used solely for video capture. We never store production customer passwords, scrape user databases, or reuse login tokens.
            </p>
            <p>
              Once video recording and project delivery are complete, all temporary test account sessions are immediately terminated from our workstations.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-3">
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent-cyan" />
              <span>2. Non-Disclosure Agreements (NDAs) & Pre-Launch Confidentiality</span>
            </h2>
            <p>
              Many SaaS and mobile app clients commission explainer videos before their official public release on Product Hunt, TechCrunch, or app stores. We routinely sign standard unilateral or mutual NDAs.
            </p>
            <p>
              We guarantee that no preview screenshots, draft recordings, or unreleased feature footage will ever be shared or displayed in our public portfolio without your explicit written approval.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-3">
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-600" />
              <span>3. Post-Production Masking & Data Redaction</span>
            </h2>
            <p>
              If your interface displays real user names, internal email addresses, customer payment records, or confidential API keys during screen recording, we apply keyframed gaussian blur masks and synthetic mock overlays to ensure complete privacy in the final master render.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-3">
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>4. Direct Communications & Inquiries</span>
            </h2>
            <p>
              When you contact us via email ({siteConfig.contactEmail}) or WhatsApp ({siteConfig.whatsapp.display}), your message, project brief, and contact details are used strictly to communicate regarding your video project. We never sell, rent, or distribute client contact information to third-party marketing brokers.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-3">
            <h2 className="text-xl font-bold text-ink">5. Contact Regarding Privacy Inquiries</h2>
            <p>
              If you have specific data handling agreements, enterprise security questionnaires, or custom NDA requirements, please contact Ali directly at:
            </p>
            <p className="font-mono text-ink font-semibold">
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-600 underline">
                {siteConfig.contactEmail}
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-border flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-brand-600 hover:text-ink transition-colors"
          >
            &larr; Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 px-5 py-2.5 rounded-full transition-colors"
          >
            <span>Start a Secure Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
