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
import { LiveOnView } from "@/components/motion/LiveOnView";

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


/* ---- Live mini motion-graphics, one per card (pure CSS, see .cv rules in globals.css) ---- */
const Frame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`cv relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] ${className}`} aria-hidden="true">
    {children}
  </div>
);

const MockUi: React.FC = () => (
  <div className="absolute inset-3 rounded-xl bg-[#0f1220] border border-white/10 overflow-hidden">
    <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-white/10">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
      <span className="w-1.5 h-1.5 rounded-full bg-amber-300/80" />
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
    </div>
    <div className="p-2.5 grid grid-cols-3 gap-2">
      <div className="col-span-1 space-y-1.5">
        <div className="h-2 rounded bg-white/15" />
        <div className="h-2 rounded bg-white/10 w-4/5" />
        <div className="h-2 rounded bg-white/10 w-3/5" />
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-2">
        <div className="h-9 rounded-md bg-brand-500/40" />
        <div className="h-9 rounded-md bg-white/10" />
        <div className="h-9 rounded-md bg-white/10" />
        <div className="h-9 rounded-md bg-cyan-400/30" />
      </div>
    </div>
  </div>
);

const RecordingVisual: React.FC = () => (
  <Frame className="h-40 sm:h-44">
    <MockUi />
    <div className="cv-scan absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
    <div className="absolute top-4 left-5 flex items-center gap-1.5 text-[10px] font-mono text-white">
      <span className="cv-rec-dot w-2 h-2 rounded-full bg-rose-500" />
      REC 00:42:18
    </div>
    <div className="absolute top-3.5 right-5 h-5 w-14 text-[10px] font-semibold">
      <span className="cv-res-a absolute inset-0 flex items-center justify-center rounded-full bg-white/90 text-ink">1080p</span>
      <span className="cv-res-b absolute inset-0 flex items-center justify-center rounded-full bg-cyan-300 text-ink">4K 60</span>
    </div>
    <div className="absolute bottom-3 left-5 right-5 h-1 rounded-full bg-white/10 overflow-hidden">
      <div className="cv-progress h-full bg-gradient-to-r from-brand-400 to-cyan-300" />
    </div>
  </Frame>
);

const ZoomVisual: React.FC = () => (
  <Frame className="h-32">
    <div className="cv-zoom-inner absolute inset-0">
      <MockUi />
      <div className="cv-zoom-ring absolute rounded-md border-2 border-cyan-300 shadow-[0_0_0_999px_rgba(11,13,18,0.35)]" style={{ left: "58%", top: "38%", width: "28%", height: "30%" }} />
    </div>
  </Frame>
);

const CursorVisual: React.FC = () => (
  <Frame className="h-32">
    <MockUi />
    <span className="cv-click absolute w-6 h-6 rounded-full border-2 border-cyan-300" style={{ left: "64%", top: "30%" }} />
    <span className="cv-click-b absolute w-6 h-6 rounded-full border-2 border-brand-300" style={{ left: "32%", top: "57%" }} />
    <svg className="cv-cursor absolute left-0 top-0 w-5 h-5 drop-shadow-lg" viewBox="0 0 24 24" fill="white" stroke="#0B0D12" strokeWidth="1.5">
      <path d="M4 3l16 7-7 2-2 7z" />
    </svg>
  </Frame>
);

const AnnotationVisual: React.FC = () => (
  <Frame className="h-32">
    <MockUi />
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" fill="none" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round">
      <rect className="cv-draw" pathLength={1} x="118" y="44" width="52" height="30" rx="5" />
      <path className="cv-draw" pathLength={1} d="M52 96 C 80 96, 96 84, 116 72" />
      <path className="cv-draw" pathLength={1} d="M108 72 L116 72 L113 80" />
    </svg>
    <span className="cv-label absolute left-4 bottom-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-300 text-ink">Key feature</span>
  </Frame>
);

const VoiceVisual: React.FC = () => (
  <Frame className="h-32 flex items-center justify-center">
    <div className="flex items-center gap-1 h-16">
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="cv-bar w-1 rounded-full bg-gradient-to-t from-brand-400 to-cyan-300"
          style={{ ["--i" as string]: i, height: `${28 + ((i * 37) % 36)}px` }}
        />
      ))}
    </div>
  </Frame>
);

const CaptionVisual: React.FC = () => (
  <Frame className="h-32 flex items-end justify-center pb-6">
    <MockUi />
    <div className="relative z-10 flex flex-wrap justify-center gap-y-1 px-4 text-sm font-bold bg-black/55 backdrop-blur-sm rounded-lg py-1.5 mx-3">
      {["Every", "step", "made", "easy", "to", "follow"].map((w, i) => (
        <span key={w} className="cv-word" style={{ ["--i" as string]: i }}>{w}</span>
      ))}
    </div>
  </Frame>
);

const MotionVisual: React.FC = () => (
  <Frame className="h-32 flex items-center justify-center">
    <div className="relative w-24 h-16">
      {[
        "bg-brand-500/70",
        "bg-violet-400/60",
        "bg-cyan-300/60",
      ].map((c, i) => (
        <span
          key={i}
          className={`cv-layer absolute inset-0 rounded-xl border border-white/30 ${c} backdrop-blur-sm`}
          style={{ ["--i" as string]: i + 1, transform: `translate(${i * 4}px, ${-i * 4}px)` }}
        />
      ))}
    </div>
  </Frame>
);

const VISUALS = [RecordingVisual, ZoomVisual, CursorVisual, AnnotationVisual, VoiceVisual, CaptionVisual, MotionVisual];

export const HowIAddValue: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-surface-night text-white overflow-hidden">
      {/* Night band: color wash + faint grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="aurora absolute -top-24 left-1/4 w-[640px] h-[360px] bg-brand-600/30 blur-[140px] rounded-full" />
        <div className="aurora-slow absolute bottom-0 right-0 w-[420px] h-[320px] bg-cyan-500/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      </div>

      <LiveOnView className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
            const Visual = VISUALS[idx];
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
                    <div className="mb-5">
                      <Visual />
                    </div>
                    <div className="flex items-center justify-between mb-5">
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
      </LiveOnView>

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
