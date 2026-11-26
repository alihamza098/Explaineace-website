import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Mail, CheckCircle2 } from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";
import { Reveal } from "@/components/motion/Reveal";

export const CTA: React.FC = () => {
  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-gradient-to-b from-transparent to-[#07080E]">
      {/* Background radial glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="aurora absolute top-1/4 left-1/4 w-[700px] h-[350px] bg-brand-600/15 blur-[140px] rounded-full" /><div className="aurora-slow absolute top-1/3 right-1/4 w-[360px] h-[260px] bg-accent-cyan/10 blur-[120px] rounded-full" /></div>

      <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Currently Accepting New Client Projects</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Have a product that{" "}
          <span
            className="text-shimmer bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg,#A5B4FC,#C7D2FE,#38BDF8,#A5B4FC)" }}
          >
            needs explaining?
          </span>
        </h2>

        <p className="mt-5 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Let&apos;s turn your software into a video people actually understand.
        </p>

        {/* Primary CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="beam-border w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-8 py-4 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-200 group active:scale-95"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] px-8 py-4 rounded-full transition-all duration-200"
          >
            <span>Explore All 33 Videos</span>
          </Link>
        </div>

        {/* Secondary Direct Channels */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-400">
          <a
            href={siteConfig.fiverr.gigUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Order via Fiverr Gig (5.0★ · 18 reviews)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
          </a>

          <a
            href={siteConfig.youtube.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
          >
            <YoutubeIcon className="w-4 h-4 text-red-500" />
            <span>YouTube Portfolio Playlist</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
          </a>

          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
          >
            <Mail className="w-4 h-4 text-accent-cyan" />
            <span>{siteConfig.contactEmail}</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
};
