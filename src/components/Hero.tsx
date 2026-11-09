"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { projects } from "@/data/projects";
import { VideoModal } from "@/components/VideoModal";

export const Hero: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const motionProject = projects.find((p) => p.id === "orbitra-one-saas-promo");
  const otherProjects = projects.filter((p) => p.id !== "orbitra-one-saas-promo");
  const galleryVideos = [motionProject, ...otherProjects].filter(Boolean).slice(0, 10) as typeof projects;

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeProject = galleryVideos[currentIndex] || galleryVideos[0];

  const scrollGallery = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Ambient background glow contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid" />
        <div className="aurora absolute top-[8%] left-1/2 -translate-x-1/2 w-[640px] h-[380px] bg-brand-600/20 blur-[120px] rounded-full" />
        <div className="aurora-slow absolute top-1/3 right-[-5%] w-[340px] h-[340px] bg-accent-cyan/15 blur-[110px] rounded-full" />
        <div className="aurora absolute top-[45%] left-[-8%] w-[320px] h-[320px] bg-accent-purple/10 blur-[110px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Badge */}
        <div className="flex justify-center mb-6 fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-card/90 border border-white/[0.08] shadow-sm backdrop-blur-md max-w-full">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-white ml-1">4.8</span>
            </div>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-300 font-medium whitespace-nowrap">
              157 Fiverr Reviews
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
              Level 2
            </span>
          </div>
        </div>

        {/* Central Headline & Copy */}
        <div className="relative text-center max-w-4xl mx-auto py-4 sm:py-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1] break-words">
            <span className="line-mask">
              <span className="line-rise" style={{ "--d": "80ms" } as React.CSSProperties}>
                Software is complicated.
              </span>
            </span>
            <span className="line-mask">
              <span
                className="line-rise text-shimmer bg-clip-text text-transparent"
                style={{ "--d": "220ms", backgroundImage: "linear-gradient(90deg,#A5B4FC,#C7D2FE,#38BDF8,#A5B4FC)" } as React.CSSProperties}
              >
                Your videos shouldn&apos;t be.
              </span>
            </span>
          </h1>

          <h2 className="fade-up mt-4 text-base sm:text-xl font-semibold text-brand-300" style={{ "--d": "380ms" } as React.CSSProperties}>
            SaaS walkthroughs, screencast tutorials &amp; explainer videos for software teams
          </h2>

          <p className="fade-up mt-3 text-sm sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto" style={{ "--d": "480ms" } as React.CSSProperties}>
            {siteConfig.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="fade-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4" style={{ "--d": "580ms" } as React.CSSProperties}>
            <Link
              href="/work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] px-7 py-3.5 rounded-full backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              <Play className="w-4 h-4 text-accent-cyan fill-accent-cyan" />
              <span>Explore Portfolio</span>
            </Link>

            <Link
              href="/contact"
              className="beam-border w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-7 py-3.5 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Hero Visual: Featured Project Showcase */}
        <div className="stage-enter mt-10 sm:mt-14 max-w-5xl mx-auto w-full space-y-6 relative">
          {/* Floating Pro Badges */}
          <div className="hidden lg:flex items-center gap-2 absolute -top-4 -left-4 z-30 px-3.5 py-1.5 rounded-full bg-[#0A0D14]/90 border border-brand-500/30 backdrop-blur-md shadow-glow text-xs text-brand-300 font-semibold float-slow">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span>✦ Featured Walkthrough</span>
          </div>

          <div
            style={{ animationDelay: "-3s" }}
            className="hidden lg:flex items-center gap-2 absolute -top-4 -right-4 z-30 px-3.5 py-1.5 rounded-full bg-[#0A0D14]/90 border border-emerald-500/30 backdrop-blur-md shadow-glow text-xs text-emerald-400 font-semibold float-slow"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Zestbrief · AI Meeting SaaS</span>
          </div>

          {/* Main Showcase Video Container */}
          <div className="relative w-full">
            {/* Dynamic Ambient Motion Aura Glow */}
            <div className="absolute -inset-1.5 sm:-inset-3 bg-gradient-to-r from-brand-600/30 via-accent-cyan/25 to-accent-purple/30 rounded-3xl blur-2xl opacity-75 pointer-events-none -z-10" />

            <div className="relative rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-2xl w-full">
              {/* Seamless Video Frame */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/[0.1] w-full">
                {/* Featured Project Video Stream (YouTube, seamless muted loop) */}
                <div className="relative aspect-video w-full bg-[#0A0D14] overflow-hidden">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/M5CJdH4k8wU?autoplay=1&mute=1&loop=1&playlist=M5CJdH4k8wU&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1"
                    title="Zestbrief — AI Meeting Summaries & Action Items SaaS Walkthrough"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    loading="eager"
                  />

                  {/* Subtle edge vignette for polished SaaS contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Video Gallery Carousel Strip */}
          <div className="rounded-2xl p-4 sm:p-5 bg-surface-card/80 border border-white/[0.08] shadow-card">
            {/* Gallery Control Bar */}
            <div className="flex items-center justify-between gap-4 mb-3.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-400" />
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  Featured Gallery
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  — Scroll or click any video to preview
                </span>
              </div>

              {/* Gallery Scroll Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollGallery("left")}
                  className="w-7 h-7 rounded-lg bg-surface-subtle hover:bg-surface-hover border border-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Scroll gallery left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollGallery("right")}
                  className="w-7 h-7 rounded-lg bg-surface-subtle hover:bg-surface-hover border border-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Scroll gallery right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Thumbnails */}
            <div
              ref={scrollRef}
              className="flex items-stretch gap-3 overflow-x-auto pb-2 scrollbar-none snap-x"
            >
              {galleryVideos.map((project, idx) => {
                const isSelected = idx === currentIndex;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setModalOpen(true);
                    }}
                    className={`shrink-0 w-48 sm:w-56 text-left rounded-xl p-2 transition-all duration-200 snap-start border cursor-pointer ${
                      isSelected
                        ? "bg-brand-950/60 border-brand-500 ring-2 ring-brand-500/40 shadow-glow"
                        : "bg-surface-subtle/70 hover:bg-surface-hover border-white/[0.06] hover:border-white/20"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-2">
                      <Image
                        src={`https://img.youtube.com/vi/${project.videoId}/mqdefault.jpg`}
                        alt={project.title}
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors" />

                      {isSelected ? (
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-brand-600 text-[10px] font-bold text-white uppercase tracking-wider shadow">
                          On Stage
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100">
                          <div className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center">
                            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-300">
                        {project.duration}
                      </div>
                    </div>

                    {/* Card Meta */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-medium text-brand-400 truncate">
                          {project.category}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate">
                          {project.client}
                        </span>
                      </div>
                      <p className={`text-xs font-semibold line-clamp-1 ${isSelected ? "text-white" : "text-slate-300"}`}>
                        {project.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-bar with key capabilities */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 sm:p-3 rounded-xl bg-surface-card/50 border border-white/[0.04]">
              <p className="text-[11px] text-slate-400">Featured Tool</p>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">{activeProject.client}</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-surface-card/50 border border-white/[0.04]">
              <p className="text-[11px] text-slate-400">Post-Production</p>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">Zooms & Cursors</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-surface-card/50 border border-white/[0.04]">
              <p className="text-[11px] text-slate-400">Audio Quality</p>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">Studio Voiceover</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-surface-card/50 border border-white/[0.04]">
              <p className="text-[11px] text-slate-400">Platform Proof</p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-400 mt-0.5">157 Reviews (4.8★)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Player for active project */}
      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoId={activeProject.videoId}
        videoUrl={activeProject.videoUrl}
        title={activeProject.title}
        category={activeProject.category}
        projectId={activeProject.id}
      />
    </section>
  );
};
