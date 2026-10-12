import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Clock, Calendar, ArrowRight, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Blog & Video Strategy Insights | EXPLAINERACE",
  description:
    "Expert guides, pricing breakdowns, and production strategies for SaaS explainer videos, software walkthroughs, and app demos by Ali.",
  alternates: {
    canonical: "https://explainerace.com/blog",
  },
  openGraph: {
    title: "Blog & Video Strategy Insights | EXPLAINERACE",
    description:
      "Expert guides, pricing breakdowns, and production strategies for SaaS explainer videos, software walkthroughs, and app demos by Ali.",
    url: `${siteConfig.siteUrl}/blog`,
    siteName: siteConfig.brandName,
    type: "website",
    images: [
      {
        url: "https://img.youtube.com/vi/W6-glP7Ct5o/hqdefault.jpg",
        width: 1280,
        height: 720,
        alt: "EXPLAINERACE Blog & Strategy Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Video Strategy Insights | EXPLAINERACE",
    description:
      "Expert guides, pricing breakdowns, and production strategies for SaaS explainer videos, software walkthroughs, and app demos by Ali.",
    images: ["https://img.youtube.com/vi/W6-glP7Ct5o/hqdefault.jpg"],
  },
};

export default function BlogListingPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-accent-cyan/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-accent-cyan" />
            <span>SaaS Video Resources & Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-tight">
            How to explain software that sells.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Practical guides on pricing, scripting, screen recording craft, and onboarding psychology to turn complex software into clear, high-converting video.
          </p>
        </div>

        {/* Featured Post Hero */}
        {blogPosts.length > 0 && (
          <div className="mb-14">
            {blogPosts.slice(0, 1).map((post) => (
              <div
                key={post.slug}
                className="group relative rounded-3xl bg-surface-card border border-surface-border hover:border-brand-500/40 transition-all duration-300 overflow-hidden shadow-card hover:shadow-glow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-600 border border-brand-500/30">
                        Featured · {post.category}
                      </span>
                      <span className="text-xs text-ink-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-ink-muted" />
                        {post.readingTime}
                      </span>
                      <span className="text-xs text-ink-muted flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-ink-muted" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-ink group-hover:text-brand-700 transition-colors leading-tight">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-surface-subtle text-[11px] font-medium text-ink-muted border border-surface-border"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-6 py-3 rounded-full transition-all duration-200 shadow-glow"
                      >
                        <span>Read Complete Guide</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative aspect-video rounded-2xl overflow-hidden border border-surface-border bg-white">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 450px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                        Comprehensive Guide
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Articles Grid */}
        {blogPosts.length > 1 && (
          <div className="space-y-8 mb-20">
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                All Strategy Guides & Case Studies
              </h3>
              <span className="text-xs text-ink-muted font-medium">
                {blogPosts.length} articles published
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {blogPosts.slice(1).map((post) => (
                <div
                  key={post.slug}
                  className="group rounded-3xl bg-surface-card border border-surface-border hover:border-brand-500/40 transition-all duration-300 overflow-hidden shadow-card flex flex-col justify-between"
                >
                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-surface-border bg-white mb-4">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 550px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-brand-300 border border-white/10">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-ink-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-ink-muted" />
                        {post.readingTime}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h4 className="text-xl font-bold text-ink group-hover:text-brand-700 transition-colors leading-snug">
                        {post.title}
                      </h4>
                    </Link>

                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-surface-subtle text-[10px] font-medium text-ink-muted border border-surface-border"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-surface-border">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 hover:text-ink transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Read Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Block */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-50 via-surface-card to-surface-subtle border border-brand-500/30 text-center max-w-4xl mx-auto shadow-glow">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Have a project in mind?
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-ink mt-2">
            Let&apos;s turn your software into a high-converting video.
          </h3>
          <p className="mt-3 text-sm text-ink-soft max-w-xl mx-auto">
            Get an exact, transparent quote within hours. No agencies, no bloated markups—direct collaboration with Ali.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-6 py-3.5 rounded-full shadow-glow"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-6 py-3.5 rounded-full transition-colors"
            >
              <span>Quick WhatsApp DM</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
