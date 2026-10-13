import React from "react";
import Link from "next/link";
import { ExternalLink, Mail, CheckCircle2, ArrowUpRight } from "lucide-react";
import { YoutubeIcon, WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";
import { BrandLogo } from "@/components/BrandLogo";

const serviceLinks = [
  { name: "SaaS Walkthrough Videos", href: "/services/saas-walkthrough-video" },
  { name: "Screencast Tutorials", href: "/services/screencast-tutorials" },
  { name: "App Demo Videos", href: "/services/app-demo-video" },
  { name: "AI UGC & Product Ads", href: "/services/ai-ugc-ads" },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-night text-white/60 text-sm overflow-hidden">
      {/* Soft color wash at the top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-brand-600/20 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand & positioning */}
          <div className="md:col-span-5 space-y-5">
            <Link
              href="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-lg"
            >
              <BrandLogo size="md" tone="dark" />
            </Link>

            <p className="text-white/60 leading-relaxed max-w-md">
              SaaS walkthroughs, AI UGC &amp; product ads, screencast tutorials, and custom UI motion graphics that turn viewers into paying users.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Upwork Direct Contract (0% Client Fee)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-sky-300 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Payoneer Direct Invoicing
              </span>
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold text-white uppercase tracking-[0.16em] mb-5">Explore</h3>
            <ul className="space-y-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold text-white uppercase tracking-[0.16em] mb-5">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Channels */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold text-white uppercase tracking-[0.16em] mb-5">
              Direct Channels &amp; Profiles
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp: {siteConfig.whatsapp.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
                  <span className="truncate">{siteConfig.contactEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.fiverr.gigUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Order Fiverr Gig (4.8★)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.fiverrProfiles[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                >
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span>Fiverr: @{siteConfig.fiverrProfiles[0].username} (Level 2)</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.fiverrProfiles[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-400" />
                  <span>Fiverr: @{siteConfig.fiverrProfiles[1].username}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-500 shrink-0" />
                  <span>YouTube: @Explainerace</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <Link
          href="/contact"
          className="group mt-16 flex items-end justify-between gap-4 border-t border-white/10 pt-10"
          aria-label="Let's talk. Start a project with EXPLAINERACE"
        >
          <span className="font-extrabold tracking-tighter leading-[0.85] text-[16vw] md:text-[11rem] text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/10 select-none">
            Let&apos;s talk.
          </span>
          <span className="mb-4 shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-white text-ink flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
          </span>
        </Link>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>&copy; {currentYear} EXPLAINERACE by Ali · Software Video Production Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white transition-colors underline underline-offset-4">
              Privacy Policy
            </Link>
            <span>Upwork Direct (0% Client Fee) · Payoneer Invoicing · Fiverr Level 2</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
