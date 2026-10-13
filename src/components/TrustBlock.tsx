import React from "react";
import { Star, ExternalLink, Users, CreditCard } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { Marquee } from "@/components/motion/Marquee";
import { SplitText } from "@/components/motion/SplitText";

export const TrustBlock: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <span className="eyebrow !text-emerald-600">Verified Platform Track Record</span>
            </Reveal>
            <SplitText
              text="Trusted by clients who *need clarity.*"
              className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-ink leading-[1.05]"
              accentClassName="serif-accent text-emerald-600"
            />
            <Reveal delay={150}>
              <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
                Clear communication, technical accuracy, and flexible payment workflows. Work with Ali through verified platforms or direct escrow contracts with zero friction.
              </p>
            </Reveal>

            <Reveal delay={250} className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={siteConfig.fiverr.gigUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sheen inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 px-5 py-3 rounded-full transition-colors shadow-[0_10px_30px_-10px_rgba(5,150,105,0.6)]"
              >
                <span>Order on Fiverr Gig</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.fiverrProfiles[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink bg-white hover:bg-surface-hover border border-surface-border px-4 py-3 rounded-full transition-colors"
              >
                <span>@video_supermacy</span>
                <ExternalLink className="w-3.5 h-3.5 text-ink-faint" />
              </a>
              <a
                href={siteConfig.fiverrProfiles[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink bg-white hover:bg-surface-hover border border-surface-border px-4 py-3 rounded-full transition-colors"
              >
                <span>@explainerace</span>
                <ExternalLink className="w-3.5 h-3.5 text-ink-faint" />
              </a>
            </Reveal>
          </div>

          {/* Right: metric cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Reveal variant="scale" className="h-full">
              <div className="h-full p-7 rounded-3xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-amber-300/70 text-amber-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-6xl font-bold text-ink tracking-[-0.04em]">
                    <CountUp to={4.8} decimals={1} />
                    <span className="text-2xl text-ink-faint font-semibold"> / 5</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-amber-100">
                  <p className="text-xs font-semibold text-ink uppercase tracking-[0.14em]">Client Rating</p>
                  <p className="text-xs text-ink-muted mt-1">Weighted average across both profiles</p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="scale" delay={100} className="h-full">
              <div className="h-full p-7 rounded-3xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-6xl font-bold text-ink tracking-[-0.04em]">
                    <CountUp to={175} />
                    <span className="text-sky-500">+</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-sky-100">
                  <p className="text-xs font-semibold text-ink uppercase tracking-[0.14em]">Fiverr Reviews</p>
                  <p className="text-xs text-ink-muted mt-1">Across 2 Fiverr profiles</p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="scale" delay={200} className="sm:col-span-2">
              <div className="p-7 rounded-3xl bg-ink text-white relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/25 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-emerald-300" />
                    <span className="text-base sm:text-lg font-semibold">Direct Upwork Contract &amp; Payoneer Invoicing</span>
                  </div>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 font-semibold w-fit">
                    0% Client Fee on Upwork
                  </span>
                </div>
                <p className="relative mt-3 text-sm text-white/65 leading-relaxed">
                  Avoid high platform commissions! International clients can work via official{" "}
                  <strong className="text-white">Upwork Direct Contracts with zero (0%) client fees</strong>, or pay seamlessly via{" "}
                  <strong className="text-white">Payoneer</strong> international bank wire and card invoices.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Audience ticker */}
        <Reveal delay={150} className="mt-16 pt-8 border-t border-surface-border flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="shrink-0 text-xs uppercase font-semibold tracking-[0.14em] text-ink-muted">Trusted by teams at:</span>
          <Marquee items={siteConfig.targetAudiences} className="flex-1 min-w-0" />
        </Reveal>
      </div>
    </section>
  );
};
