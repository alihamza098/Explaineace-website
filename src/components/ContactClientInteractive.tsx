"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { pricingTiers } from "@/data/pricing";

export function PackageNoticeBanner() {
  const searchParams = useSearchParams();
  const packageParam = searchParams?.get("package");

  const matchedTier = pricingTiers.find(
    (tier) =>
      tier.id === packageParam ||
      tier.id.toLowerCase() === packageParam?.toLowerCase()
  );

  if (!matchedTier) return null;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-brand-600/20 text-brand-600 flex items-center justify-center font-bold shrink-0">
          <Sparkles className="w-5 h-5 text-accent-cyan" />
        </div>
        <div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-brand-600 block">
            Selected Package from Pricing
          </span>
          <h4 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
            <span>{matchedTier.name}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
              {matchedTier.price}
            </span>
          </h4>
        </div>
      </div>
      <Link
        href="/pricing"
        className="text-xs text-ink-soft hover:text-ink underline font-medium self-start sm:self-auto"
      >
        Change Package &rarr;
      </Link>
    </div>
  );
}

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
      <button
        type="button"
        onClick={handleCopy}
        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-ink/[0.08] hover:bg-ink/[0.14] text-ink text-xs font-semibold border border-surface-border transition-all"
        aria-label="Copy email address"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-ink-soft" />
            <span>Copy Email</span>
          </>
        )}
      </button>

      <a
        href={`mailto:${siteConfig.contactEmail}?subject=Software%20Video%20Project%20Inquiry%20-%20EXPLAINERACE`}
        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-sm"
      >
        <span>Open Email Client</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
