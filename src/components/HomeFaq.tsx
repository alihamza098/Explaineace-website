"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

export const homeFaqs = [
  {
    q: "How do I hire a software explainer video specialist?",
    a: "Hiring a software explainer video specialist at EXPLAINERACE is simple and transparent. You don't need a finished script or storyboard to get started. Just share your website or staging app URL and a bulleted list of the core features or workflow you want demonstrated. We review your interface, agree on the ideal format (simple screencast, SaaS walkthrough, AI ad, or custom UI motion), draft a focused script, record in native 4K, and deliver your draft in 48 to 72 hours. You can hire us directly via Upwork Escrow (0% buyer fee), Payoneer invoice, or through our vetted Level 2 Fiverr profile.",
  },
  {
    q: "What does a SaaS walkthrough video cost?",
    a: "Our SaaS walkthrough videos cost $220 per 60 seconds of finished runtime. This tier includes 4K screen recording, dynamic 3D focal zooms on key UI actions, stabilized bezier cursor tracking, click ripple highlights, sleek device framing, professional studio voiceover narration, and 2 revision rounds with 100% full commercial broadcast rights. For larger projects or multi-minute walkthroughs, inbox us for custom bundle discounts.",
  },
  {
    q: "How long does a 60-second screencast tutorial take?",
    a: "A 60-second simple screencast tutorial is typically delivered within 24 to 48 hours. At $120 per 60 seconds, it's our fastest turnaround service—focused on pure instructional clarity, crisp 1080p/4K screen recording, synchronized studio voiceover narration, and clean pacing with zero visual distractions. It's ideal for customer support centers, knowledge base tutorials, and quick feature updates.",
  },
];

export const HomeFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-surface-subtle">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <Reveal>
            <span className="eyebrow mb-4">Got Questions?</span>
          </Reveal>
          <SplitText
            text="Frequently Asked *Questions*"
            className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-ink leading-[1.05]"
          />
          <Reveal delay={150}>
            <p className="mt-5 text-ink-muted text-sm sm:text-base leading-relaxed">
              Everything you need to know about hiring a software video specialist, pricing, and turnaround times.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
            >
              <span>View complete pricing breakdown &amp; FAQ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {homeFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i * 100}>
                <div
                  className={`rounded-3xl transition-all duration-500 overflow-hidden border ${
                    isOpen
                      ? "bg-white border-brand-200 shadow-lift"
                      : "bg-white/70 border-surface-border hover:bg-white hover:shadow-card"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-3xl"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`text-xs font-mono mt-1.5 transition-colors ${isOpen ? "text-brand-600" : "text-ink-faint"}`}>
                        0{i + 1}
                      </span>
                      <h3 className="text-base sm:text-xl font-semibold tracking-tight text-ink pr-2">{faq.q}</h3>
                    </div>
                    <span
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isOpen ? "rotate-45 bg-ink text-white" : "rotate-0 bg-surface-subtle text-ink"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-7 sm:px-7 sm:pl-[3.75rem] text-ink-muted text-sm sm:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
