import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { YoutubeIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Magnetic } from "@/components/motion/Magnetic";

export const CTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="clip">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-night px-6 py-16 sm:px-12 sm:py-24 text-center">
            {/* Animated mesh */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="aurora absolute -top-20 left-[10%] w-[520px] h-[340px] bg-brand-600/50 blur-[120px] rounded-full" />
              <div className="aurora-slow absolute bottom-[-30%] right-[5%] w-[480px] h-[340px] bg-cyan-500/30 blur-[120px] rounded-full" />
              <div className="aurora absolute top-1/3 right-1/3 w-[300px] h-[260px] bg-fuchsia-500/25 blur-[110px] rounded-full" />
              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/85 text-xs font-semibold uppercase tracking-[0.14em] mb-8 backdrop-blur">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Currently Accepting New Client Projects</span>
              </div>

              <SplitText
                text="Have a product that *needs explaining?*"
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] text-white leading-[1.02] max-w-4xl mx-auto"
                accentClassName="serif-accent text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-violet-300 to-cyan-300 pr-1"
              />

              <p className="mt-6 text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
                Let&apos;s turn your software into a video people actually understand.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="btn-sheen w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-ink bg-white hover:bg-brand-50 px-8 py-4 rounded-full shadow-2xl transition-colors duration-300 group"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/work"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 px-8 py-4 rounded-full transition-colors duration-300 backdrop-blur"
                  >
                    <span>Explore All 27 Videos</span>
                  </Link>
                </Magnetic>
              </div>

              <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs sm:text-sm">
                <a
                  href={siteConfig.fiverr.gigUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Order via Fiverr Gig (Level 2 Seller · 4.8★)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href={siteConfig.youtube.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-500" />
                  <span>YouTube Portfolio Playlist</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-300" />
                  <span>{siteConfig.contactEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
