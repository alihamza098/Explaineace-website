"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/data/siteConfig";
import { BrandLogo } from "@/components/BrandLogo";
import { Magnetic } from "@/components/motion/Magnetic";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pill, setPill] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Condense after the first scroll, hide while scrolling down, reveal on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 240 && y > lastY + 4);
      if (Math.abs(y - lastY) > 4) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock page scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const movePill = (target: HTMLElement) => {
    const nav = navRef.current;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    setPill({ left: rect.left - navRect.left, width: rect.width, visible: true });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border border-surface-border shadow-card pl-4 pr-2 py-2"
              : "bg-transparent border border-transparent px-0 py-0"
          }`}
        >
          {/* Brand */}
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg"
            aria-label="EXPLAINERACE Home"
          >
            <BrandLogo size={scrolled ? "sm" : "md"} showSubtitle={!scrolled} />
          </Link>

          {/* Desktop navigation with a pill that glides to the hovered link */}
          <nav
            ref={navRef}
            onMouseLeave={() => setPill((p) => ({ ...p, visible: false }))}
            className="hidden md:flex relative items-center gap-0.5"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 bottom-0 rounded-full bg-ink/[0.06] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
            />
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={(e) => movePill(e.currentTarget)}
                  onFocus={(e) => movePill(e.currentTarget)}
                  className={`relative z-10 text-sm px-3.5 lg:px-4 py-2 rounded-full transition-colors duration-200 ${
                    isActive ? "text-ink font-semibold" : "text-ink-muted hover:text-ink font-medium"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1 h-1 rounded-full bg-brand-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full text-emerald-600 hover:bg-emerald-50 border border-surface-border bg-white flex items-center justify-center transition-colors"
              title="Chat directly on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            <Magnetic strength={0.25}>
              <Link
                href="/contact"
                className="btn-sheen group inline-flex items-center gap-2 text-sm font-semibold text-white bg-ink hover:bg-brand-700 pl-4 pr-3.5 py-2.5 rounded-full shadow-glow transition-colors duration-300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Magnetic>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-ink bg-white border border-surface-border shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden fixed inset-x-3 top-[72px] origin-top rounded-3xl bg-white border border-surface-border shadow-lift p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="flex flex-col">
          {siteConfig.navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                tabIndex={mobileMenuOpen ? 0 : -1}
                style={{ transitionDelay: mobileMenuOpen ? `${80 + i * 40}ms` : "0ms" }}
                className={`flex items-center justify-between text-2xl font-semibold tracking-tight px-2 py-2.5 border-b border-surface-border last:border-0 transition-all duration-500 ${
                  mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                } ${isActive ? "text-brand-600" : "text-ink"}`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-ink-faint" />
              </Link>
            );
          })}
          <div className="pt-4 mt-2 flex flex-col gap-2.5">
            <Link
              href="/contact"
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="w-full py-3.5 rounded-full text-white bg-ink font-semibold text-sm flex items-center justify-center gap-2"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="w-full py-3 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200 font-medium text-sm flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp {siteConfig.whatsapp.display}</span>
            </a>
            <a
              href={siteConfig.fiverr.gigUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-subtle text-ink-soft text-xs font-medium"
            >
              <span>Order via Fiverr Gig · Level 2 · 4.8★</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
