import React from "react";
import type { Metadata } from "next";
import { VideoGrid } from "@/components/VideoGrid";
import { projects } from "@/data/projects";
import { CTA } from "@/components/CTA";
import { Layers, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Demo Video Portfolio | 27 Software Walkthroughs & Explainers",
  description:
    "Explore 27 verified product demo videos, SaaS walkthroughs, and screencast explainers by Ali. Watch real client case studies and request your video quote.",
  alternates: {
    canonical: "https://explainerace.com/work",
  },
  openGraph: {
    title: "Product Demo Video Portfolio | 27 Software Walkthroughs & Explainers | EXPLAINERACE",
    description:
      "Explore 27 verified product demo videos, SaaS walkthroughs, and screencast explainers by Ali. Watch real client case studies and request your video quote.",
    url: "https://explainerace.com/work",
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/kqmPTZOBv9k/hqdefault.jpg",
        width: 1280,
        height: 720,
        alt: "Product Demo Video Portfolio - EXPLAINERACE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Demo Video Portfolio | 27 Software Walkthroughs & Explainers | EXPLAINERACE",
    description:
      "Explore 27 verified product demo videos, SaaS walkthroughs, and screencast explainers by Ali. Watch real client case studies and request your video quote.",
    images: ["https://img.youtube.com/vi/kqmPTZOBv9k/hqdefault.jpg"],
  },
};

export default function WorkPage() {
  return (
    <div className="pt-28 sm:pt-36">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>27 Verified Portfolio Projects</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
            Software Tutorials, App Demos & SaaS Walkthroughs.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Browse genuine screencast videos created for healthcare portals, fintech exchanges, AI automation tools, mobile applications, and B2B SaaS platforms.
          </p>
        </div>
      </div>

      {/* Full Video Grid with Search & Filters */}
      <VideoGrid
        projects={projects}
        isHomeView={false}
        title="All Projects"
        subtitle="Filter by application category or use search to find specific software features."
      />

      {/* Conversion Section */}
      <CTA />
    </div>
  );
}
