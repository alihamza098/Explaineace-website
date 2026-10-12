import React from "react";
import Link from "next/link";
import { Video, Star, ExternalLink, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { YoutubeIcon, WhatsAppIcon, UpworkIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";

import { BrandLogo } from "@/components/BrandLogo";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05060A] border-t border-white/[0.06] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg"
            >
              <BrandLogo size="md" />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Specialized in SaaS walkthroughs, AI UGC &amp; product ads, screencast tutorials, and custom UI motion graphics that turn viewers into paying users.
            </p>

            {/* Payment & Contract Guarantees */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Upwork Direct Contract (0% Client Fee)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Payoneer Direct Invoicing</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation & Services */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-brand-400 hover:text-brand-300 transition-colors text-sm font-medium"
                >
                  Start a Project &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Profiles & Contact */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Direct Channels & Profiles
            </h3>
            <ul className="space-y-3">
              {/* WhatsApp */}
              <li>
                <a
                  href={siteConfig.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group text-sm font-medium"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {siteConfig.whatsapp.display}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>

              {/* Fiverr Active Gig */}
              <li>
                <a
                  href={siteConfig.fiverr.gigUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-medium text-emerald-300 group-hover:text-emerald-200">Order Fiverr Gig (4.8★)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white transition-colors" />
                </a>
              </li>

              {/* Fiverr Profile 1: video_supermacy */}
              <li>
                <a
                  href={siteConfig.fiverrProfiles[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span>Fiverr: @{siteConfig.fiverrProfiles[0].username} (Level 2)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </li>

              {/* Fiverr Profile 2: explainerace */}
              <li>
                <a
                  href={siteConfig.fiverrProfiles[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span>Fiverr: @{siteConfig.fiverrProfiles[1].username}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group text-sm"
                >
                  <Mail className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span className="truncate">{siteConfig.contactEmail}</span>
                </a>
              </li>

              {/* YouTube */}
              <li>
                <a
                  href={siteConfig.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group text-sm"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-500 shrink-0" />
                  <span>YouTube: @Explainerace</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} EXPLAINERACE by Ali · Software Video Production Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-white transition-colors underline"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-400">
              Upwork Direct (0% Client Fee) · Payoneer Invoicing · Fiverr Level 2
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
