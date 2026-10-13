import React from "react";
import { Hero } from "@/components/Hero";
import { VideoGrid } from "@/components/VideoGrid";
import { WhatICreate } from "@/components/WhatICreate";
import { FeaturedVideo } from "@/components/FeaturedVideo";
import { HowIAddValue } from "@/components/HowIAddValue";
import { TrustBlock } from "@/components/TrustBlock";
import { ReviewWall } from "@/components/ReviewWall";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { AboutPreview } from "@/components/AboutPreview";
import { HomeFaq } from "@/components/HomeFaq";
import { CTA } from "@/components/CTA";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://explainerace.com/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Selected Work (Data-Driven Video Grid with Filters) */}
      <VideoGrid
        projects={projects}
        isHomeView={true}
        title="Selected Work"
        subtitle="A selection of software tutorials, app demos, walkthroughs and training videos."
      />

      {/* 3. Production Craft (More than screen recording) */}
      <HowIAddValue />

      {/* 3. What I Create (6 Service Categories) */}
      <WhatICreate />

      {/* 4. Featured Video (Immersive Cinematic Showcase) */}
      <FeaturedVideo />

      {/* 6. Verified Trust Signals (Fiverr Level 2, 4.8★, 175 Reviews) */}
      <TrustBlock />

      <ReviewWall />

      {/* 7. 4-Step Production Process */}
      <ProcessTimeline />

      {/* 8. About Preview */}
      <AboutPreview />

      {/* 9. Frequently Asked Questions (Hiring, Cost & Screencast turnaround) */}
      <HomeFaq />

      {/* 10. Final Conversion CTA */}
      <CTA />
    </>
  );
}
