"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  ArrowRight,
  Star,
  Monitor,
  MousePointer2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Clapperboard,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { projects } from "@/data/projects";
import { VideoModal } from "@/components/VideoModal";
import { HeroTimelineScrubber } from "@/components/HeroTimelineScrubber";
import { WordRotator } from "@/components/motion/WordRotator";
import { Magnetic } from "@/components/motion/Magnetic";
import { ScrollLinked } from "@/components/motion/ScrollLinked";
import { Parallax } from "@/components/motion/Parallax";

const ROTATING_WORDS = ["SaaS walkthroughs", "screencast tutorials", "AI UGC ads", "app demos", "UI explainers"];

export const Hero: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const galleryVideos = projects.slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeProject = galleryVideos[currentIndex] || galleryVideos[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : galleryVideos.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev < galleryVideos.length - 1 ? prev + 1 : 0));
  };

  const scrollGallery = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Ambient pastel mesh + grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid" />
        <Parallax speed={0.25} className="absolute inset-0">
          <div className="aurora absolute top-[2%] left-1/2 -translate-x-1/2 w-[720px] h-[420px] bg-brand-300/40 blur-[120px] rounded-full" />
          <div className="aurora-slow absolute top-[18%] right-[-6%] w-[380px] h-[380px] bg-cyan-200/60 blur-[110px] rounded-full" />
          <div className="aurora absolute top-[30%] left-[-8%] w-[360px] h-[360px] bg-fuchsia-200/50 blur-[110px] rounded-full" />
        </Parallax>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust badge */}
        <div className="flex justify-center mb-7 fade-up">
          <a
            href={siteConfig.fiverr.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full bg-white/80 border border-surface-border shadow-card backdrop-blur-md max-w-full hover:shadow-lift transition-shadow"
          >
            <span className="flex -space-x-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="text-xs font-semibold text-ink">4.8</span>
            <span className="text-xs text-ink-faint">·</span>
            <span className="text-xs text-ink-soft font-medium whitespace-nowrap">157 Fiverr reviews</span>
            <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
              Level 2
            </span>
            <ArrowRight className="w-3 h-3 text-ink-faint group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-[-0.035em] text-ink break-words">
            <span className="line-mask">
              <span className="line-rise" style={{ "--d": "80ms" } as React.CSSProperties}>
                Software is complicated.
              </span>
            </span>
            <span className="line-mask">
              <span className="line-rise" style={{ "--d": "220ms" } as React.CSSProperties}>
                <span className="serif-accent text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-violet-500 to-cyan-500 pr-2">
                  Your videos
                </span>{" "}
                shouldn&apos;t be.
              </span>
            </span>
          </h1>

          <h2
            className="fade-up mt-6 text-lg sm:text-2xl font-medium text-ink-soft tracking-tight"
            style={{ "--d": "380ms" } as React.CSSProperties}
          >
            <span className="sr-only">SaaS walkthroughs, screencast tutorials &amp; explainer videos for software teams. </span>
            <span aria-hidden="true" className="text-balance">
              I make{" "}
              <WordRotator words={ROTATING_WORDS} className="font-semibold text-ink" /> for software teams.
            </span>
          </h2>

          <p
            className="fade-up mt-4 text-sm sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto"
            style={{ "--d": "480ms" } as React.CSSProperties}
          >
            {siteConfig.subheadline}
          </p>

          {/* CTAs */}
          <div
            className="fade-up mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ "--d": "580ms" } as React.CSSProperties}
          >
            <Magnetic className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="btn-sheen w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-ink hover:bg-brand-700 px-7 py-4 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Link
                href="/work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-ink bg-white hover:bg-surface-hover border border-surface-border px-7 py-4 rounded-full shadow-card transition-all duration-300"
              >
                <Play className="w-4 h-4 text-brand-600 fill-brand-600" />
                <span>Explore Portfolio</span>
              </Link>
            </Magnetic>
          </div>

          <p
            className="fade-up mt-5 text-xs text-ink-faint"
            style={{ "--d": "680ms" } as React.CSSProperties}
          >
            From $120 / 60s · Drafts in 48–72h · Upwork Direct with 0% client fee
          </p>
        </div>

        {/* Hero stage */}
        <div className="stage-enter mt-14 sm:mt-20 max-w-5xl mx-auto w-full relative">
          <ScrollLinked end={0.55} className="relative">
            {/* Floating badges */}
            <div className="hidden lg:flex items-center gap-2 absolute -top-6 -left-10 z-30 px-3.5 py-2 rounded-2xl bg-white border border-surface-border shadow-lift text-xs text-ink font-semibold float-slow">
              <span className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                <Clapperboard className="w-4 h-4" />
              </span>
              <span>
                Native 4K Screencasts
                <span className="block text-[10px] font-medium text-ink-muted">60 FPS · no UI stutter</span>
              </span>
            </div>
            <div
              style={{ animationDelay: "-3s" }}
              className="hidden lg:flex items-center gap-2 absolute top-1/3 -right-12 z-30 px-3.5 py-2 rounded-2xl bg-white border border-surface-border shadow-lift text-xs text-ink font-semibold float-slow"
            >
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </span>
              <span>
                Fast 48h Turnaround
                <span className="block text-[10px] font-medium text-ink-muted">Draft → review → final</span>
              </span>
            </div>

            <div className="scroll-tilt">
              {/* Main stage window */}
              <div
                data-cursor="play"
                className="relative rounded-[22px] p-1.5 sm:p-2 bg-white/70 border border-surface-border shadow-stage backdrop-blur group cursor-pointer w-full"
                onClick={() => setModalOpen(true)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-surface-night w-full">
                  {/* Titlebar */}
                  <div className="h-10 sm:h-11 bg-[#12141B] px-3 sm:px-4 flex items-center justify-between border-b border-white/[0.06] overflow-hidden">
                    <div className="flex items-center gap-1.5 sm:gap-2 truncate mr-2 min-w-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shrink-0" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] shrink-0" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] shrink-0" />
                      <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-medium text-white/60 truncate flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                        <span className="font-semibold text-white truncate">{activeProject.client}</span>
                        <span className="truncate hidden sm:inline text-white/40">— {activeProject.title}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.06] text-white/60 font-mono hidden sm:inline">
                        {currentIndex + 1} / {galleryVideos.length}
                      </span>
                      <span className="text-emerald-300 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 text-[10px] sm:text-[11px] font-medium whitespace-nowrap">
                        4K / 60 FPS
                      </span>
                    </div>
                  </div>

                  {/* Canvas */}
                  <div className="relative aspect-video w-full bg-surface-night overflow-hidden">
                    <div key={activeProject.id} className="ken-burns absolute inset-0">
                      <Image
                        src={`https://img.youtube.com/vi/${activeProject.videoId}/maxresdefault.jpg`}
                        alt={activeProject.title}
                        fill
                        priority
                        sizes="(max-width: 1200px) 100vw, 1024px"
                        className="object-cover"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/20" />

                    <div className="absolute top-4 left-4 hidden sm:flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="font-medium">
                        {activeProject.id === "prim-automation"
                          ? "Focal Zoom: 185% on Workflow Canvas"
                          : "Focal Zoom: 180% on UI Highlights"}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs text-ink font-semibold shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                      <span>{activeProject.category}</span>
                    </div>

                    <div className="absolute bottom-24 right-4 hidden sm:flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white shadow-lg">
                      <MousePointer2 className="w-3.5 h-3.5 text-brand-300" />
                      <span className="font-medium">Cursor Stabilization & Click Ripples</span>
                    </div>

                    {/* Demo cursor */}
                    <div className="demo-cursor absolute z-10 pointer-events-none hidden sm:block" aria-hidden="true">
                      <span className="demo-cursor-ripple absolute -left-4 -top-4 w-8 h-8 rounded-full border-2 border-cyan-300 bg-cyan-300/20" />
                      <MousePointer2 className="relative w-6 h-6 text-white fill-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
                    </div>

                    {/* Center play */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-white/40 animate-ping [animation-duration:2.4s]" />
                        <button
                          type="button"
                          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-ink flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                          aria-label={`Play ${activeProject.title}`}
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-ink ml-1" />
                        </button>
                      </div>
                      <div className="hidden sm:block mt-4 space-y-1">
                        <span className="inline-block text-[11px] sm:text-xs font-semibold text-white tracking-wide uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                          Click to Watch · {activeProject.duration}
                        </span>
                        <p className="text-xs sm:text-sm text-white/85 font-medium drop-shadow-md">
                          {activeProject.title}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white hover:text-ink border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 z-20"
                      aria-label="Previous video in gallery"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white hover:text-ink border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:scale-110 z-20"
                      aria-label="Next video in gallery"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="hidden sm:block">
                      <HeroTimelineScrubber projectId={activeProject.id} duration={activeProject.duration} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollLinked>

          {/* Gallery strip */}
          <div className="mt-6 rounded-3xl p-4 sm:p-5 bg-white/80 backdrop-blur border border-surface-border shadow-card">
            <div className="flex items-center justify-between gap-4 mb-3.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-ink">Featured gallery</span>
                <span className="text-xs text-ink-muted hidden sm:inline truncate">— click any video to put it on stage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollGallery("left")}
                  className="w-8 h-8 rounded-full bg-surface-subtle hover:bg-ink hover:text-white text-ink-soft flex items-center justify-center transition-colors"
                  aria-label="Scroll gallery left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollGallery("right")}
                  className="w-8 h-8 rounded-full bg-surface-subtle hover:bg-ink hover:text-white text-ink-soft flex items-center justify-center transition-colors"
                  aria-label="Scroll gallery right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex items-stretch gap-3 overflow-x-auto pb-1 scrollbar-none snap-x">
              {galleryVideos.map((project, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`group/thumb shrink-0 w-48 sm:w-56 text-left rounded-2xl p-2 transition-all duration-300 snap-start border ${
                      isSelected
                        ? "bg-brand-50 border-brand-300 ring-2 ring-brand-500/20"
                        : "bg-surface-subtle/60 hover:bg-white border-transparent hover:border-surface-border hover:shadow-card"
                    }`}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-night mb-2">
                      <Image
                        src={`https://img.youtube.com/vi/${project.videoId}/mqdefault.jpg`}
                        alt={project.title}
                        fill
                        sizes="240px"
                        className="object-cover transition-transform duration-700 group-hover/thumb:scale-110"
                      />
                      {isSelected ? (
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-white text-[10px] font-bold text-brand-700 uppercase tracking-wider shadow flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          On Stage
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-full bg-white text-ink flex items-center justify-center">
                            <Play className="w-3.5 h-3.5 fill-ink ml-0.5" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-mono text-white">
                        {project.duration}
                      </div>
                    </div>
                    <div className="space-y-0.5 px-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-semibold text-brand-600 truncate">{project.category}</span>
                        <span className="text-[10px] text-ink-faint truncate">{project.client}</span>
                      </div>
                      <p className={`text-xs font-semibold line-clamp-1 ${isSelected ? "text-ink" : "text-ink-soft"}`}>
                        {project.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capability sub-bar */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { k: "Featured Tool", v: activeProject.client },
              { k: "Post-Production", v: "Zooms & Cursors" },
              { k: "Audio Quality", v: "Studio Voiceover" },
              { k: "Platform Proof", v: "157 Reviews (4.8★)", accent: true },
            ].map((item) => (
              <div key={item.k} className="p-3 rounded-2xl bg-white/70 border border-surface-border">
                <p className="text-[11px] text-ink-muted">{item.k}</p>
                <p className={`text-xs sm:text-sm font-semibold mt-0.5 truncate ${item.accent ? "text-emerald-600" : "text-ink"}`}>
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
