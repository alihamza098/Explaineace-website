import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pricingTiers } from "@/data/pricing";

const links: Record<string, string> = {
  "simple-screencast": "/services/screencast-tutorials",
  "fancy-saas-explainer": "/services/saas-walkthrough-video",
  "ai-product-ugc-ads": "/services/ai-ugc-ads",
  "custom-ui-motion-explainer": "/services/explainer-video-production",
};

/** Single-video rates stay one click away: "Need just one video?" */
export const SingleVideoRates: React.FC = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {pricingTiers.map((t) => (
      <Link
        key={t.id}
        href={links[t.id] ?? "/pricing#single-video"}
        className="group flex min-h-[44px] flex-col rounded-2xl border border-paper/10 bg-ink-2 p-5 transition-colors hover:border-signal/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
      >
        <span className="text-sm font-semibold text-paper">{t.name}</span>
        <span className="mt-2 text-2xl font-semibold tracking-tight text-signal">{t.price}</span>
        <span className="text-xs text-paper-mute">{t.priceUnit}</span>
        <span className="mt-3 inline-flex items-center gap-1 text-sm text-paper-dim group-hover:text-paper">
          See the service <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </Link>
    ))}
  </div>
);
