import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Parallax } from "@/components/motion/Parallax";

export const AboutPreview: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait card */}
          <Reveal variant="clip" className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-[2rem] overflow-hidden bg-gradient-to-br from-brand-600 via-violet-600 to-cyan-500 shadow-stage">
              <Parallax speed={-0.08} className="absolute inset-[-10%]">
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:18px_18px]" />
              </Parallax>
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Founder</span>
                  <span className="text-xs font-mono text-white/70">@{siteConfig.fiverr.username}</span>
                </div>
                <div>
                  <span className="block text-[7rem] sm:text-[9rem] leading-[0.8] font-bold tracking-[-0.06em]">Ali</span>
                  <span className="mt-3 block text-sm font-medium text-white/85">
                    Software tutorial &amp; SaaS video specialist
                  </span>
                </div>
              </div>
              <div className="float-slow absolute top-1/2 -right-3 sm:right-4 bg-white px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-700 shadow-lift flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Level 2 Seller
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <span className="eyebrow">About The Specialist</span>
            </Reveal>
            <SplitText
              text="Helping software teams *explain what they build.*"
              className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-ink leading-[1.05]"
            />

            <Reveal delay={150} className="relative pl-8 border-l-2 border-brand-200">
              <span aria-hidden="true" className="serif-accent absolute -left-5 -top-4 text-6xl leading-none text-brand-600 bg-background px-1">&ldquo;</span>
              <div className="space-y-4 text-ink-soft text-base sm:text-lg leading-relaxed">
                <p>
                  I&apos;m Ali, a video specialist focused on software tutorials, app demos, walkthroughs and instructional content.
                </p>
                <p>
                  I help SaaS companies, startups, software teams and app developers turn complicated products and workflows into clear, professional videos.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250} className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="btn-sheen group inline-flex items-center gap-2 text-sm font-semibold text-white bg-ink hover:bg-brand-700 px-6 py-3.5 rounded-full transition-colors duration-300 shadow-glow"
              >
                <span>Learn More About Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink px-4 py-3 transition-colors"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat group-hover:bg-[length:100%_1px] transition-[background-size] duration-500">
                  See 27 Verified Examples
                </span>
                <span>&rarr;</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
