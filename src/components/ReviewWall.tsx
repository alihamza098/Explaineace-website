import React from "react";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { reviews, Review } from "@/data/reviews";
import { siteConfig } from "@/data/siteConfig";
import { Reveal } from "@/components/motion/Reveal";

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <li className="w-[300px] sm:w-[360px] shrink-0 p-6 rounded-3xl bg-white border border-surface-border shadow-card whitespace-normal">
    <div className="flex items-center gap-0.5 mb-3" aria-label={`${review.rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.round(review.rating) ? "fill-amber-400 text-amber-400" : "text-ink-faint"}`}
        />
      ))}
      <span className="ml-1.5 text-xs font-semibold text-ink-soft">{review.rating.toFixed(1)}</span>
    </div>
    <p className="text-sm text-ink leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
    <div className="mt-4 pt-4 border-t border-surface-border text-xs">
      <p className="font-semibold text-ink">{review.author}</p>
      <p className="text-ink-muted mt-0.5">{review.role}</p>
    </div>
  </li>
);

const Row: React.FC<{ items: Review[]; reverse?: boolean; duration: number }> = ({ items, reverse, duration }) => (
  <div
    className="marquee group relative flex overflow-hidden"
    data-reverse={reverse || undefined}
    style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
  >
    {[false, true].map((hidden) => (
      <ul
        key={String(hidden)}
        className="marquee-track flex shrink-0 items-stretch gap-4 pr-4"
        aria-hidden={hidden || undefined}
      >
        {items.map((r, i) => (
          <ReviewCard key={`${r.author}-${i}`} review={r} />
        ))}
      </ul>
    ))}
  </div>
);

export const ReviewWall: React.FC = () => {
  if (reviews.length === 0) return null;
  // Interleave so both rows mix Fiverr and case-study reviews
  const rowA = reviews.filter((_, i) => i % 2 === 0);
  const rowB = reviews.filter((_, i) => i % 2 === 1);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" aria-labelledby="reviews-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow mb-4">Client Reviews</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="reviews-title" className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-ink leading-[1.05]">
              What clients say <span className="serif-accent text-brand-600">after delivery.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-ink-muted text-base sm:text-lg">
              Verified buyer reviews from Fiverr, quoted word for word.
            </p>
          </Reveal>
        </div>
        <Reveal delay={250}>
          <a
            href={siteConfig.fiverrProfiles[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink bg-white hover:bg-ink hover:text-white border border-surface-border px-5 py-3 rounded-full shadow-card transition-all"
          >
            <span>Read all reviews on Fiverr</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Reveal>
      </div>

      <div className="space-y-4">
        <Row items={rowA} duration={60} />
        <Row items={rowB} reverse duration={70} />
      </div>
    </section>
  );
};
