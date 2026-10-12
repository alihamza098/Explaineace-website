"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Volume2, ArrowRight } from "lucide-react";
import { VideoModal } from "@/components/VideoModal";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ScrollLinked } from "@/components/motion/ScrollLinked";

export const FeaturedVideo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const featuredId = "4E72rncOnBc"; // Green Medicine SaaS Tour

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow mb-4">Cinematic Case Showcase</span>
            </Reveal>
            <SplitText
              text="Green Medicine *SaaS Walkthrough*"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-ink leading-[1.05]"
            />
            <Reveal delay={150}>
              <p className="mt-4 text-ink-muted text-sm sm:text-lg max-w-2xl leading-relaxed">
                Experience how an intricate medical database and patient management portal was transformed into an effortless, easy-to-follow user journey.
              </p>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <Link
              href="/work/green-medicine"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink bg-white hover:bg-ink hover:text-white border border-surface-border px-5 py-3 rounded-full shadow-card transition-all duration-300"
            >
              <span>Read Full Breakdown</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* The frame opens from an inset card to full width as it scrolls into view */}
      <ScrollLinked end={0.25} className="max-w-[1400px] mx-auto px-2 sm:px-4">
        <div className="scroll-expand">
          <div
            data-cursor="play"
            role="button"
            tabIndex={0}
            aria-label="Play the Green Medicine SaaS walkthrough"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setModalOpen(true);
              }
            }}
            className="relative overflow-hidden aspect-[4/3] sm:aspect-video w-full bg-surface-night cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40"
            onClick={() => setModalOpen(true)}
          >
            <div className="scroll-expand-media absolute inset-0">
              <Image
                src={`https://img.youtube.com/vi/${featuredId}/maxresdefault.jpg`}
                alt="Green Medicine SaaS Walkthrough Featured Video"
                fill
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover group-hover:scale-105 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

            {/* Top specs */}
            <div className="scroll-expand-content absolute top-5 sm:top-8 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-ink">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Client: Green Medicine · Telehealth Platform</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white/85">
                <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                <span>Voiceover + Captions Synced</span>
              </div>
            </div>

            {/* Center play */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-white/40 animate-ping [animation-duration:2.4s]" />
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white text-ink flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-ink ml-1.5" />
                </div>
              </div>
              <span className="mt-5 text-xs sm:text-sm font-semibold text-white uppercase tracking-[0.14em]">
                Watch the walkthrough · 3:15
              </span>
            </div>

            {/* Bottom bar */}
            <div className="scroll-expand-content absolute bottom-5 sm:bottom-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
              <div className="hidden sm:flex flex-wrap items-center gap-2 text-xs text-white">
                {["Dynamic UI Zooms", "Cursor Smoothing", "1080p 60fps"].map((chip) => (
                  <span key={chip} className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/15 font-medium">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="hidden sm:block text-xs text-white/60 font-medium">Click anywhere to open player</div>
            </div>
          </div>
        </div>
      </ScrollLinked>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoId={featuredId}
        title="Green Medicine SaaS Platform Walkthrough"
        category="SaaS Platform Tour"
        projectId="green-medicine"
      />
    </section>
  );
};
