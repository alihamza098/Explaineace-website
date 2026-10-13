"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";

/** Fixed bottom bar for phones: quote + WhatsApp. Constant size, no scroll logic. */
export const MobileCtaBar: React.FC = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/95 border border-surface-border shadow-lift p-1.5">
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink text-white text-sm font-semibold py-3"
        >
          <span>Get a quote</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href={siteConfig.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 text-white text-sm font-semibold px-5 py-3"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
