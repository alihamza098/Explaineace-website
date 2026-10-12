"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProcessInfographic } from "@/components/ProcessInfographic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ScrollLinked } from "@/components/motion/ScrollLinked";
import { processSteps } from "@/data/process";

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-surface-subtle overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="aurora absolute top-1/3 left-1/3 w-[700px] h-[350px] bg-brand-200/40 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Reveal>
            <span className="eyebrow mb-4">Interactive Production Pipeline</span>
          </Reveal>
          <SplitText
            text="From product to *polished video.*"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-ink leading-[1.05]"
          />
          <Reveal delay={150}>
            <p className="mt-5 text-ink-muted text-sm sm:text-lg leading-relaxed">
              Watch how raw software interfaces transform into dynamic, high-converting product walkthroughs with zero hassle for your team.
            </p>
          </Reveal>
        </div>

        {/* Scroll-drawn step rail */}
        <ScrollLinked end={0.45} className="relative max-w-5xl mx-auto mb-14">
          <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-6 h-[2px] bg-ink/[0.08] rounded-full overflow-hidden">
            <div className="scroll-draw h-full bg-gradient-to-r from-brand-600 via-violet-500 to-cyan-500" />
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {processSteps.map((step, idx) => (
              <Reveal as="li" key={step.number} delay={idx * 140} className="relative text-left md:text-center flex md:block gap-4">
                <div className="relative z-10 shrink-0 md:mx-auto w-12 h-12 rounded-full bg-white border border-surface-border shadow-card flex items-center justify-center text-sm font-bold text-ink">
                  {step.number}
                </div>
                <div className="md:mt-5">
                  <h3 className="text-base font-semibold text-ink tracking-tight">{step.title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-ink-muted leading-relaxed md:px-2">{step.deliverable}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </ScrollLinked>

        <Reveal variant="clip" delay={120} className="max-w-5xl mx-auto mb-12">
          <ProcessInfographic />
        </Reveal>

        <div className="text-center">
          <Link
            href="/process"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-white hover:bg-ink transition-all duration-300 px-6 py-3 rounded-full bg-white border border-surface-border shadow-card"
          >
            <span>Read the full step-by-step breakdown &amp; FAQs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
