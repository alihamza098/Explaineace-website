import React from "react";
import {
  Video,
  ZoomIn,
  MousePointerClick,
  Target,
  Mic,
  Subtitles,
  Layers,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { SplitText } from "@/components/motion/SplitText";
import { Marquee } from "@/components/motion/Marquee";

interface ValueBlock {
  title: string;
  description: string;
  icon: React.ElementType;
  badge: string;
}

const BLOCKS: ValueBlock[] = [
  {
    title: "Screen Recording",
    description: "Clean high-resolution product capture in 1080p and 4K at 60 FPS without UI stutter or blurry scaling.",
    icon: Video,
    badge: "1080p / 4K",
  },
  {
    title: "Zooms & Focus",
    description: "Direct attention to important UI elements with calibrated pan & zoom sequences that eliminate squinting.",
    icon: ZoomIn,
    badge: "Focal Framing",
  },
  {
    title: "Cursor & Click Effects",
    description: "Make every interaction easy to follow through smoothed cursor acceleration and illuminated click ripples.",
    icon: MousePointerClick,
    badge: "Interaction Design",
  },
  {
    title: "Annotations",
    description: "Arrows, labels, boxes and highlights that point out key features at the exact moment they are discussed.",
    icon: Target,
    badge: "Visual Cues",
  },
  {
    title: "Voiceover",
    description: "Clear professional narration delivered with studio microphone acoustics and balanced audio leveling.",
    icon: Mic,
    badge: "Studio Audio",
  },
  {
    title: "Captions",
    description: "Accessible and easy-to-follow subtitles burned directly into video or delivered as timed .SRT files.",
    icon: Subtitles,
    badge: "A11y Compliant",
  },
  {
    title: "Motion Graphics",
    description: "Branded transitions, animated intro/outro sequences, and modern feature callouts aligned with your brand guide.",
    icon: Layers,
    badge: "Brand Polish",
  },
];

export const HowIAddValue: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-surface-night text-white overflow-hidden">
      {/* Night band: color wash + faint grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="aurora absolute -top-24 left-1/4 w-[640px] h-[360px] bg-brand-600/30 blur-[140px] rounded-full" />
        <div className="aurora-slow absolute bottom-0 right-0 w-[420px] h-[320px] bg-cyan-500/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="eyebrow mb-4 !text-brand-300">Production Craft</span>
          </Reveal>
          <SplitText
            text="More than *screen recording.*"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.05]"
            accentClassName="serif-accent text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-violet-300 to-cyan-300 pr-1"
          />
          <Reveal delay={150}>
            <p className="mt-5 text-white/60 text-sm sm:text-lg leading-relaxed">
              Anyone can hit record. Turning complicated workflows into engaging, conversion-focused video assets requires dedicated post-production craft.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BLOCKS.map((block, idx) => {
            const Icon = block.icon;
            const isWide = idx === 0;
            return (
              <Reveal
                key={block.title}
                delay={(idx % 4) * 90}
                variant="up"
                className={`h-full ${isWide ? "lg:col-span-2" : ""} ${idx === BLOCKS.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <Spotlight className="h-full group p-6 sm:p-7 rounded-3xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-2xl bg-white/[0.08] border border-white/10 text-white flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-ink group-hover:rotate-[-8deg]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-white/[0.06] text-white/60 border border-white/10">
                        {block.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-white">{block.title}</h3>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed">{block.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/[0.08] text-[11px] text-white/40 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 group-hover:animate-ping" />
                    <span>Standard on all packages</span>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Ticker of craft details */}
      <div className="relative mt-20 space-y-3">
        <Marquee
          items={["4K screen capture", "Bezier cursor smoothing", "3D focal zooms", "Click ripples", "Kinetic captions", "Studio voiceover", "Brand motion kits", ".SRT captions"]}
          itemClassName="text-sm sm:text-base font-medium text-white/70 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] whitespace-nowrap"
          duration={40}
        />
        <Marquee
          items={["SaaS onboarding", "Feature launches", "Help-desk tutorials", "App Store previews", "TikTok & Reels ads", "Investor demos", "Academy courses", "Release notes"]}
          itemClassName="text-sm sm:text-base font-medium text-white/40 px-5 py-2 rounded-full border border-white/[0.06] whitespace-nowrap"
          duration={46}
          reverse
        />
      </div>
    </section>
  );
};
