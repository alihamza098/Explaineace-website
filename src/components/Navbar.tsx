"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, Menu, X, ArrowRight, ExternalLink, Video, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";

import { BrandLogo } from "@/components/BrandLogo";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    // Static, constant-size header: it never hides, resizes or restyles on scroll.
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0A] border-b border-white/[0.08] py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: EXPLAINERACE */}
        <Link
          href="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg"
          aria-label="EXPLAINERACE Home"
        >
          <BrandLogo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-card/60 border border-white/[0.06] rounded-full px-3 py-1 backdrop-blur-md">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold bg-brand-600/35 border border-brand-500/50 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions (WhatsApp Quick Chat + Start a Project) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={siteConfig.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#F4F0E6] hover:text-white px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.14] transition-colors flex items-center gap-1.5"
            title="Chat directly on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#F4F0E6]" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/#inquiry"
            className="group relative inline-flex items-center gap-2 text-xs font-semibold text-[#1F0A02] bg-[#FF6B3D] hover:bg-[#ff8660] px-4 py-2.5 rounded-full transition-colors duration-200"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bg-[#08090E]/98 backdrop-blur-xl border-b border-white/[0.08] p-6 shadow-2xl animate-fade-in">
          <nav className="flex flex-col gap-2">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "text-white bg-brand-600/30 border border-brand-500/40"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/[0.08] flex flex-col gap-3">
              <a
                href={siteConfig.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-xl text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-medium text-sm flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp ({siteConfig.whatsapp.display})</span>
              </a>

              <Link
                href="/#inquiry"
                className="w-full text-center py-3.5 rounded-xl text-[#1F0A02] bg-[#FF6B3D] font-semibold text-sm flex items-center justify-center gap-2"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
                <a
                  href={siteConfig.fiverr.gigUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 font-medium transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Order via Fiverr Gig</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </a>
                <a
                  href={siteConfig.fiverrProfiles[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300"
                >
                  <span>Fiverr: @{siteConfig.fiverrProfiles[0].username}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={siteConfig.fiverrProfiles[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300"
                >
                  <span>Fiverr: @{siteConfig.fiverrProfiles[1].username} ({siteConfig.fiverrProfiles[1].rating}★ · {siteConfig.fiverrProfiles[1].reviewsCount} reviews)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
