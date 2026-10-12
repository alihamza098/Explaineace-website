"use client";

import React, { useState, useEffect } from "react";
import {
  KeyRound,
  FileText,
  Video,
  Sparkles,
  CheckCircle2,
  Play,
  Pause,
  MousePointer2,
  Mic,
  Monitor,
  Volume2,
  ZoomIn,
  Sliders,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";

interface PipelineStep {
  id: number;
  title: string;
  tagline: string;
  category: string;
  icon: React.ElementType;
  deliverable: string;
  timeline: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 1,
    title: "Intake & Interface Access",
    tagline: "Briefing, test account access & user journey scoping",
    category: "Step 01 · Ingestion",
    icon: KeyRound,
    deliverable: "Scoping Brief & Test Sandbox Setup",
    timeline: "Day 1",
  },
  {
    id: 2,
    title: "Script & Storyboard Pacing",
    tagline: "Action-oriented script with timecodes & visual cues",
    category: "Step 02 · Architecture",
    icon: FileText,
    deliverable: "Word-by-Word Script & Scene Map",
    timeline: "Day 1 – 2",
  },
  {
    id: 3,
    title: "4K Capture & Studio Audio",
    tagline: "Clean screen recording with studio voiceover narration",
    category: "Step 03 · Production",
    icon: Video,
    deliverable: "4K 60FPS Raw Footage & Mastered Audio",
    timeline: "Day 2 – 3",
  },
  {
    id: 4,
    title: "Precision Post-Production",
    tagline: "Dynamic focal zooms, smoothed cursor physics & ripples",
    category: "Step 04 · The Magic",
    icon: ZoomIn,
    deliverable: "Signature Zoom & Motion Graphics Edit",
    timeline: "Day 3 – 4",
  },
  {
    id: 5,
    title: "Master Delivery & Polish",
    tagline: "Review cycles, YouTube chapters & multi-format exports",
    category: "Step 05 · Finalization",
    icon: CheckCircle2,
    deliverable: "4K Master MP4, SRT Subtitles & License",
    timeline: "Day 4 – 5",
  },
];

export const ProcessInfographic: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-cycle through the pipeline
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // tick every 50ms
    const totalDuration = 5500; // 5.5s per step
    const stepIncrement = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr + 1) % PIPELINE_STEPS.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  const currentStepData = PIPELINE_STEPS[activeStep];

  return (
    <div className="w-full">
      {/* Visual Infographic Lab Shell */}
      <div className="rounded-[28px] p-1.5 bg-white border border-surface-border shadow-stage">
        <div className="rounded-[22px] bg-[#0A0D16] border border-white/[0.08] overflow-hidden">
          {/* Top Bar / Production Dashboard Header */}
          <div className="h-12 bg-[#0E121F] px-4 sm:px-6 flex items-center justify-between border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block" />
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-brand-400" />
                <span>EXPLAINERACE · Visual Production Engine</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-slate-300 transition-colors"
                title={isPlaying ? "Pause auto-rotation" : "Play auto-rotation"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 text-brand-400" />
                    <span className="hidden sm:inline text-[11px]">Auto Cycle</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    <span className="hidden sm:inline text-[11px]">Paused</span>
                  </>
                )}
              </button>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-[10px] font-bold text-brand-300 font-mono whitespace-nowrap">
                STAGE {activeStep + 1} OF 5
              </span>
            </div>
          </div>

          {/* Pipeline Steps Tracker Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-white/[0.08] bg-[#0C0F1A]">
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepClick(idx)}
                  className={`relative p-3.5 sm:p-4 text-left transition-all duration-200 border-r last:border-r-0 border-white/[0.04] ${
                    isActive
                      ? "bg-brand-950/40 text-white"
                      : "hover:bg-white/[0.02] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-brand-600 text-white shadow-glow"
                          : isPast
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-white/[0.06] text-slate-400"
                      }`}
                    >
                      {isPast ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                      0{step.id}
                    </span>
                  </div>

                  <p className="text-xs font-semibold truncate leading-tight">
                    {step.title}
                  </p>

                  {/* Active Step Progress Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-600">
                      <div
                        className="h-full bg-cyan-400 transition-all ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Infographic Stage Viewport */}
          <div className="p-6 sm:p-10 relative min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
            {/* STAGE 1: Intake & Interface Access */}
            {activeStep === 0 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
                      {currentStepData.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">
                      Frictionless Client Onboarding & Security
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Zero Data Leak Risk</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Visual Infographic Diagram */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="p-4 rounded-2xl bg-[#141724] border border-white/[0.06] space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-brand-400" />
                          <span>Credentials & Test Data Handshake</span>
                        </span>
                        <span className="text-emerald-400 text-[11px] font-mono">CONNECTED</span>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0B0E18] border border-white/[0.04] text-xs">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-slate-300">Staging sandbox or demo account access configured</span>
                        </div>

                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0B0E18] border border-white/[0.04] text-xs">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-slate-300">Target audience identified (SaaS users, buyers, or agents)</span>
                        </div>

                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0B0E18] border border-white/[0.04] text-xs">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-slate-300">Brand logos, primary fonts & hex color codes loaded</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stat Callout */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-950/40 to-[#121520] border border-brand-500/30 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-brand-400 font-bold">
                        Client Time Commitment
                      </span>
                      <div className="text-3xl font-extrabold text-white">
                        ~15 Minutes
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        You don&apos;t need to write lengthy briefs. Simply share your test URL and 3 to 5 key features you want to showcase. Ali handles the rest.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#141724] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                      <span>Timeline:</span>
                      <span className="text-white font-semibold">{currentStepData.timeline}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: Script & Storyboard Pacing */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
                      {currentStepData.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">
                      Visual Journey Mapping & Narrative Script
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold shrink-0">
                    <FileText className="w-4 h-4" />
                    <span>Timecoded Scene Roadmap</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Script & Timeline Infographic */}
                  <div className="md:col-span-7 space-y-2.5">
                    <div className="p-4 rounded-2xl bg-[#141724] border border-white/[0.06] space-y-3">
                      <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                        <span>Paced Action Timeline</span>
                        <span className="text-brand-400 font-mono text-[11px]">135 WPM Voice Cadence</span>
                      </div>

                      {/* Visual Timeline Nodes */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B0E18] border-l-2 border-l-cyan-400 border border-white/[0.04]">
                          <span className="font-mono text-[11px] text-cyan-400 font-bold w-12">00:00</span>
                          <span className="text-xs text-white font-medium">Hook & Core Problem Statement</span>
                        </div>
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B0E18] border-l-2 border-l-brand-400 border border-white/[0.04]">
                          <span className="font-mono text-[11px] text-brand-400 font-bold w-12">00:35</span>
                          <span className="text-xs text-white font-medium">Navigating to Dashboard & Key Inputs</span>
                        </div>
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B0E18] border-l-2 border-l-indigo-400 border border-white/[0.04]">
                          <span className="font-mono text-[11px] text-indigo-400 font-bold w-12">01:15</span>
                          <span className="text-xs text-white font-medium">Execution Flow, Automation & Result</span>
                        </div>
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B0E18] border-l-2 border-l-emerald-400 border border-white/[0.04]">
                          <span className="font-mono text-[11px] text-emerald-400 font-bold w-12">01:50</span>
                          <span className="text-xs text-white font-medium">Summary & Conversion Call-to-Action</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Teleprompter Script Snippet */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="p-4 rounded-2xl bg-[#121520] border border-white/[0.08] space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Action-Oriented Narration Style
                      </span>
                      <blockquote className="text-xs text-slate-300 italic bg-[#0B0E18] p-3 rounded-xl border border-white/[0.04] leading-relaxed">
                        &ldquo;Instead of navigating five different menus, your team can trigger the entire workflow with a single click right from the canvas.&rdquo;
                      </blockquote>
                      <p className="text-[11px] text-slate-400">
                        No corporate fluff or filler words. Every sentence is synced to exact screen actions.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#141724] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                      <span>Key Output:</span>
                      <span className="text-white font-semibold">{currentStepData.deliverable}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: 4K Capture & Studio Audio */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
                      {currentStepData.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">
                      Lossless 4K Screen Recording & Studio Voiceover
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold shrink-0">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>4K 60FPS Lossless Capture</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Audio & Video Visualizer */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="p-5 rounded-2xl bg-[#090C16] border border-white/[0.08] relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-2 text-white font-semibold">
                          <Mic className="w-3.5 h-3.5 text-brand-400" />
                          <span>Voiceover Audio Waveform Sync</span>
                        </span>
                        <span className="text-emerald-400 font-mono text-[11px]">-14 LUFS (Balanced)</span>
                      </div>

                      {/* Animated Audio Equalizer Bars */}
                      <div className="h-16 flex items-end gap-1.5 p-2 bg-[#060810] rounded-xl border border-white/[0.04]">
                        {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 60, 100, 50, 70, 85, 45, 90, 65, 75, 40].map(
                          (height, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-brand-600 to-cyan-400 rounded-sm transition-all duration-300"
                              style={{
                                height: isPlaying ? `${Math.max(20, (height + (i % 3) * 10) % 100)}%` : `${height}%`,
                              }}
                            />
                          )
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Native Retina 3840×2160</span>
                        <span>Zero Frame Drops · Lossless Bitrate</span>
                      </div>
                    </div>
                  </div>

                  {/* Audio Standards */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="p-4 rounded-2xl bg-[#121520] border border-white/[0.08] space-y-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Acoustic Specifications
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Professional condenser microphone</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>De-essed, noise-gated & compressed</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Subtle royalty-free background music bed</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#141724] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                      <span>Timeline:</span>
                      <span className="text-white font-semibold">{currentStepData.timeline}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 4: Precision Post-Production (The Signature Magic) */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">
                      {currentStepData.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">
                      Focal Zooms, Cursor Physics & Motion Tracking
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold shrink-0">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>The Visual Signature</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Editor Simulation Canvas */}
                  <div className="md:col-span-7">
                    <div className="p-4 rounded-2xl bg-[#090C16] border border-white/[0.08] relative aspect-video flex items-center justify-center overflow-hidden">
                      {/* Grid background representing video editor */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

                      {/* Dynamic Zoom Bracket Box */}
                      <div className="relative z-10 p-5 rounded-2xl border-2 border-dashed border-cyan-400 bg-cyan-400/5 text-center space-y-2 shadow-glow-cyan max-w-xs">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-400 text-[10px] font-bold">
                          <ZoomIn className="w-3 h-3" />
                          <span>Focal Zoom: 185%</span>
                        </div>
                        <p className="text-xs font-bold text-white">
                          Targeted Interface Detail
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Smooth optical zoom eliminates viewer distraction
                        </p>
                      </div>

                      {/* Animated Cursor & Ripple */}
                      <div className="absolute top-1/3 right-1/4 z-20 flex items-center gap-2">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full border-2 border-brand-400 animate-ping absolute -inset-2" />
                          <MousePointer2 className="w-5 h-5 text-brand-400 fill-brand-400 drop-shadow-lg" />
                        </div>
                        <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] text-white border border-white/10 backdrop-blur">
                          Click Ripple
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Post-Production Capabilities */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="p-4 rounded-2xl bg-[#121520] border border-white/[0.08] space-y-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Advanced Editing Suite
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span><strong>Smoothed Cursor Physics:</strong> Removes jerky hand movements for clean visual paths.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                          <span><strong>Adaptive Zooms:</strong> Centers user attention on the exact button or form field.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span><strong>Callout Overlays:</strong> Highlight badges, key shortcuts, and UI pointers.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#141724] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                      <span>Key Output:</span>
                      <span className="text-white font-semibold">{currentStepData.deliverable}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 5: Master Delivery & Polish */}
            {activeStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                      {currentStepData.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">
                      Master Files, Revisions & Complete Rights
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Production Complete</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Delivery Manifest */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="p-4 rounded-2xl bg-[#141724] border border-white/[0.06] space-y-2.5">
                      <span className="text-xs font-semibold text-slate-300 block">
                        Final Delivery Manifest (Ready to Publish)
                      </span>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E18] border border-white/[0.04] text-xs">
                          <span className="text-white font-medium flex items-center gap-2">
                            <Monitor className="w-3.5 h-3.5 text-brand-400" />
                            <span>Master Video (4K Widescreen MP4)</span>
                          </span>
                          <span className="text-emerald-400 font-mono text-[11px]">3840×2160 UHD</span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E18] border border-white/[0.04] text-xs">
                          <span className="text-white font-medium flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-cyan-400" />
                            <span>SRT Subtitles & YouTube Timestamps</span>
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">Included</span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E18] border border-white/[0.04] text-xs">
                          <span className="text-white font-medium flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Full Commercial & Broadcast License</span>
                          </span>
                          <span className="text-emerald-400 font-mono text-[11px]">Perpetual</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revisions & Guarantee */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-[#121520] border border-emerald-500/30 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                        100% Satisfaction Guarantee
                      </span>
                      <div className="text-xl font-bold text-white">
                        Dedicated Revisions Included
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Need adjustments to pacing, audio balance, or callout timing? Every package includes dedicated revision cycles until it represents your software perfectly.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#141724] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                      <span>Ready in:</span>
                      <span className="text-emerald-400 font-semibold font-mono">48h – 4 Days</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Timeline Controls & Navigation */}
            <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {PIPELINE_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeStep
                        ? "w-8 bg-brand-500"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Jump to stage ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep((curr) =>
                      curr > 0 ? curr - 1 : PIPELINE_STEPS.length - 1
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-[#141724] hover:bg-[#181C2E] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Previous Stage
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep((curr) => (curr + 1) % PIPELINE_STEPS.length)
                  }
                  className="px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow transition-all"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
