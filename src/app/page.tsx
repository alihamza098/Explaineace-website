import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { StudioHero } from "@/components/studio/StudioHero";
import { SelectedFilms } from "@/components/studio/SelectedFilms";
import { FormatShowcase } from "@/components/studio/FormatShowcase";
import { PackageCards } from "@/components/studio/PackageCards";
import { PublishingSection } from "@/components/studio/PublishingSection";
import { InquiryBuilder } from "@/components/studio/InquiryBuilder";
import { CampaignProvider } from "@/components/studio/CampaignProvider";
import { StudioSection } from "@/components/studio/StudioSection";
import { SingleVideoRates } from "@/components/studio/SingleVideoRates";

export const metadata: Metadata = {
  title: "Product Films, Social Edits & Tutorials for Software",
  description:
    "Launch films, narrated walkthroughs and three social edits per campaign — each in 16:9, 1:1 and 9:16. Packages from $249, with optional posting. By ExplainerAce.",
  alternates: { canonical: "https://explainerace.com/" },
};

export default function HomePage() {
  return (
    <div className="studio bg-ink text-paper">
      <CampaignProvider>
        {/* 1. Hero */}
        <StudioHero />

        {/* 2. Selected films */}
        <StudioSection
          id="films"
          eyebrow="Selected films"
          title="Real films, made for software."
          intro="Three projects from the portfolio, one for each job: a launch promo, a mobile UI film and a narrated walkthrough."
          tone="raised"
        >
          <SelectedFilms />
        </StudioSection>

        {/* 3. One feature. Three frames. */}
        <StudioSection
          id="three-frames"
          eyebrow="How a campaign is cut"
          title="One feature. Three frames."
          intro="Watch one product action — exporting a weekly report — become three different compositions. Switch the format, then replay the action."
        >
          <FormatShowcase />
        </StudioSection>

        {/* 4. Packages */}
        <StudioSection
          id="packages"
          eyebrow="Campaign packages · introductory prices (USD)"
          title="What exactly you receive, and what it costs."
          intro="Each package is a main film plus distinct social edits, every edit delivered in three formats. File counts are listed in full — nothing is hidden in the small print."
          tone="raised"
        >
          <PackageCards source="home" />
          <p className="mt-8 text-sm text-paper-dim">
            Need just one video?{" "}
            <Link href="/pricing#single-video" className="font-medium text-paper underline decoration-signal underline-offset-4 hover:text-signal">
              See single-video rates
            </Link>
            .
          </p>
        </StudioSection>

        {/* 5. Optional publishing */}
        <StudioSection
          id="publishing"
          eyebrow="After approval"
          title="Who hits publish?"
          intro="Publishing is optional. Either you post the finished files yourself, or we do it on a calendar you approve."
        >
          <PublishingSection source="home" />
        </StudioSection>

        {/* 6. Inquiry */}
        <StudioSection
          id="inquiry"
          headingId="inquiry-title"
          headingTabIndex
          eyebrow="Project inquiry"
          title="Start with a short brief."
          intro="Your package and publishing choice carry over from above. You can change either one here."
          tone="raised"
        >
          <InquiryBuilder />
        </StudioSection>

        {/* Single-video rates */}
        <StudioSection
          id="single-video"
          eyebrow="Single videos"
          title="Need just one video?"
          intro="Single-video work is still available at flat rates."
        >
          <SingleVideoRates />
        </StudioSection>
      </CampaignProvider>
    </div>
  );
}
