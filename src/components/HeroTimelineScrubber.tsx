"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Sparkles, Volume2, ZoomIn, MousePointer2 } from "lucide-react";

interface Keyframe {
  id: string;
  timePct: number;
  label: string;
  tag: string;
  icon: "zoom" | "cursor" | "sparkles" | "play";
}

const KEYFRAMES: Keyframe[] = [
  { id: "kf-1", timePct: 15, label: "Workflow Hook", tag: "00:09", icon: "play" },
  { id: "kf-2", timePct: 38, label: "Focal Zoom 185%", tag: "00:23", icon: "zoom" },
  { id: "kf-3", timePct: 65, label: "Bezier Cursor Glow", tag: "00:39", icon: "cursor" },
  { id: "kf-4", timePct: 90, label: "Conversion Callout", tag: "00:54", icon: "sparkles" },
];

interface HeroTimelineScrubberProps {
  duration?: string;
  projectId: string;
}

export const HeroTimelineScrubber: React.FC<HeroTimelineScrubberProps> = ({
  duration = "01:00",
  projectId,
}) => {
  const [progress, setProgress] = useState(45);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Auto-progress playhead when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Reset when project changes
  useEffect(() => {
    setProgress(35);
  }, [projectId]);

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(newProgress);
  };

  const handleKeyframeClick = (e: React.MouseEvent, kf: Keyframe) => {
    e.stopPropagation();
    setProgress(kf.timePct);
    setActiveTooltip(kf.id);
    setTimeout(() => setActiveTooltip(null), 2500);
  };

  // Convert progress (0-100) to simulated timecode (e.g. 00:00:27:14)
  const totalSeconds = 60;
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const currentFrames = Math.floor(((progress / 100) * totalSeconds * 60) % 60);
  const formattedSecs = String(currentSeconds).padStart(2, "0");
  const formattedFrames = String(currentFrames).padStart(2, "0");
  const timecode = `00:00:${formattedSecs}:${formattedFrames}`;

  return (
    <div
      className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent pt-6 pb-2.5 px-3 sm:px-4 z-20 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Audio Waveform & Pro Track Meter */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* Play/Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-6 h-6 rounded-md bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            title={isPlaying ? "Pause timeline preview" : "Play timeline preview"}
            aria-label={isPlaying ? "Pause preview" : "Play preview"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
          </button>

          {/* Timecode display */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-white/[0.08] font-mono text-[10px] sm:text-[11px] text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{timecode}</span>
          </div>

          <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            REC 4K·60fps
          </span>
        </div>

        {/* Dynamic Simulated Audio Waveform Bars */}
        <div className="flex items-end gap-[2px] h-4 px-2 py-0.5 rounded bg-black/40 border border-white/[0.05]">
          <Volume2 className="w-3 h-3 text-slate-500 mr-1 self-center" />
          {[
            18, 45, 75, 30, 90, 60, 40, 85, 95, 50, 70, 35, 80, 65, 45, 90,
            60, 40, 75, 95, 85, 30, 65, 50,
          ].map((peak, i) => {
            // Modulate height based on playing state
            const height = isPlaying
              ? Math.max(20, (peak * ((i + Math.floor(progress)) % 5 + 1)) / 5)
              : peak * 0.4;

            return (
              <span
                key={i}
                className="w-[2px] rounded-full transition-all duration-150"
                style={{
                  height: `${height}%`,
                  backgroundColor:
                    i > 18
                      ? "rgb(239, 68, 68)"
                      : i > 12
                      ? "rgb(245, 158, 11)"
                      : "rgb(52, 211, 153)",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Scrubber Track Bar */}
      <div
        ref={progressBarRef}
        onClick={handleBarClick}
        className="relative h-2.5 bg-white/[0.12] hover:bg-white/[0.18] rounded-full cursor-pointer transition-colors group"
      >
        {/* Buffered / Background Track */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/[0.08] rounded-full"
            style={{ width: `${Math.min(100, progress + 25)}%` }}
          />
        </div>

        {/* Filled Active Progress Bar */}
        <div
          className="relative h-full bg-gradient-to-r from-brand-500 via-indigo-400 to-cyan-400 rounded-full transition-all duration-75"
          style={{ width: `${progress}%` }}
        >
          {/* Glowing Playhead Head */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_rgba(56,189,248,0.9)] border-2 border-brand-500 group-hover:scale-125 transition-transform" />
        </div>

        {/* Keyframe Diamond Markers */}
        {KEYFRAMES.map((kf) => {
          const isPassed = progress >= kf.timePct;
          const isHovered = activeTooltip === kf.id;

          return (
            <div
              key={kf.id}
              onClick={(e) => handleKeyframeClick(e, kf)}
              onMouseEnter={() => setActiveTooltip(kf.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer z-30 p-1"
              style={{ left: `${kf.timePct}%` }}
            >
              {/* Diamond marker */}
              <div
                className={`w-2.5 h-2.5 rotate-45 transition-all duration-200 ${
                  isPassed
                    ? "bg-cyan-400 ring-2 ring-cyan-400/40 scale-110 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                    : "bg-slate-400 hover:bg-white ring-1 ring-white/20"
                }`}
              />

              {/* Tooltip on hover/click */}
              {isHovered && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 pointer-events-none whitespace-nowrap bg-black/95 backdrop-blur-md border border-white/20 rounded-md px-2 py-1 text-[10px] text-white font-medium shadow-xl flex items-center gap-1.5 z-40 transition-all duration-150 animate-fade-in -translate-y-1"
                >
                  {kf.icon === "zoom" && <ZoomIn className="w-3 h-3 text-cyan-400" />}
                  {kf.icon === "cursor" && <MousePointer2 className="w-3 h-3 text-brand-400" />}
                  {kf.icon === "sparkles" && <Sparkles className="w-3 h-3 text-amber-400" />}
                  {kf.icon === "play" && <Play className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" />}
                  <span>{kf.label}</span>
                  <span className="text-slate-400 font-mono text-[9px] bg-white/10 px-1 py-0.2 rounded">
                    {kf.tag}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom track markers metadata */}
      <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-slate-400">
        <span className="hover:text-slate-200 transition-colors">00:00:00</span>
        <div className="hidden sm:flex items-center gap-6 text-[9px] uppercase tracking-wider text-slate-500">
          <span>Track 1: 4K Screen Flow</span>
          <span>Track 2: Studio Audio Bed</span>
          <span>Track 3: UI Callout Motion</span>
        </div>
        <span className="text-slate-300 font-medium">{duration}</span>
      </div>
    </div>
  );
};
