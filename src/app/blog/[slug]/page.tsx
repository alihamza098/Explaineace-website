import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Star,
  ExternalLink,
} from "lucide-react";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/siteConfig";
import { BlogVideoEmbed } from "@/components/BlogVideoEmbed";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found | EXPLAINERACE" };

  const canonicalUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | EXPLAINERACE`,
    description: post.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.brandName,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.featuredImage,
          width: 1280,
          height: 720,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Schema.org BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${siteConfig.siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.siteUrl}/blog/${post.slug}`,
    },
  };

  // Schema.org FAQPage for rich search engine snippets
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // Schema.org BreadcrumbList
  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />

      <article className="pt-28 sm:pt-36 pb-24 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-600/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted hover:text-ink transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all insights</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-6 mb-12 border-b border-surface-border pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-600 border border-brand-500/30">
                {post.category}
              </span>
              <span className="text-xs text-ink-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-ink-muted" />
                {post.readingTime}
              </span>
              <span className="text-xs text-ink-muted flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-ink-muted" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
              {post.headline}
            </p>

            {/* Author Byline */}
            <div className="flex items-center gap-3.5 pt-2">
              <div className="w-10 h-10 rounded-full bg-brand-600/30 border border-brand-500/40 overflow-hidden flex items-center justify-center font-bold text-ink text-sm">
                Ali
              </div>
              <div>
                <span className="block text-sm font-semibold text-ink">
                  {post.author.name}
                </span>
                <span className="block text-xs text-ink-muted">
                  {post.author.role} · 175+ Reviews (4.8★)
                </span>
              </div>
            </div>
          </header>

          {/* Quick Summary Callout */}
          <div className="p-6 sm:p-7 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-12 shadow-glow">
            <div className="flex items-center gap-2 text-brand-600 font-bold text-sm mb-3">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <span>{post.content.summaryBox.headline}</span>
            </div>
            <ul className="space-y-2">
              {post.content.summaryBox.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Intro Paragraphs */}
          <div className="space-y-5 text-base sm:text-lg text-ink leading-relaxed mb-14">
            {post.content.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Body Sections */}
          <div className="space-y-16">
            {post.content.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight border-l-2 border-brand-500 pl-4">
                  {section.heading}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-ink-soft leading-relaxed">
                  {section.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Video Embed if present */}
                {section.video && (
                  <BlogVideoEmbed
                    videoId={section.video.videoId}
                    title={section.video.title}
                    subtitle={section.video.subtitle}
                    category={section.video.category}
                    duration={section.video.duration}
                    projectId={section.video.projectId}
                  />
                )}

                {/* Table if present */}
                {section.table && (
                  <div className="my-8 overflow-x-auto rounded-2xl border border-surface-border bg-surface-card shadow-card">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-surface-subtle border-b border-surface-border text-ink-soft">
                        <tr>
                          {section.table.headers.map((h, i) => (
                            <th key={i} className="py-3.5 px-4 font-semibold uppercase tracking-wider text-[11px] text-brand-600">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/[0.06]">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-ink/[0.02] transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`py-3.5 px-4 ${cIdx === 0 ? "font-semibold text-ink" : "text-ink-soft"}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* List items if present */}
                {section.listItems && (
                  <ul className="space-y-3 pl-2">
                    {section.listItems.map((li, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-ink">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Callout box if present */}
                {section.callout && (
                  <div className="p-5 rounded-2xl bg-surface-card border border-surface-border flex items-start gap-3.5 my-6">
                    <ShieldCheck className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-accent-cyan">
                        {section.callout.title}
                      </span>
                      <p className="text-xs sm:text-sm text-ink-soft mt-1 leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive In-Article FAQ */}
          <div className="mt-20 pt-12 border-t border-surface-border">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Frequently Asked Questions
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
                Common questions about SaaS video pricing
              </h3>
            </div>

            <div className="space-y-4">
              {post.content.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-2"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <h4 className="text-base font-semibold text-ink">
                      {faq.q}
                    </h4>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed pl-8">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="mt-16 p-8 rounded-3xl bg-surface-card border border-surface-border shadow-card flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-glow">
              Ali
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-lg font-bold text-ink">Written by Ali</h4>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-400" /> Level 2 Seller (4.8★)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Founder of EXPLAINERACE and dedicated software video specialist with over 175+ verified client engagements on Fiverr. Specializing in UI zooms, screen recording physics, and instructional SaaS tours.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
                <Link href="/about" className="text-brand-600 hover:text-ink underline">
                  Read Full Bio →
                </Link>
                <Link href="/work" className="text-brand-600 hover:text-ink underline">
                  View 27 Video Projects →
                </Link>
              </div>
            </div>
          </div>

          {/* Contextual Service & Case Study Links */}
          <div className="mt-14 p-6 sm:p-7 rounded-2xl bg-surface-card border border-surface-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Explore Production Services
              </span>
              <p className="text-sm text-ink-soft">
                Compare dedicated production packages, rates, and verified video deliverables.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <Link
                href="/services/saas-walkthrough-video"
                className="px-3.5 py-2 rounded-xl bg-ink/[0.05] hover:bg-ink/[0.1] text-xs font-semibold text-ink border border-surface-border transition-colors"
              >
                SaaS Walkthroughs
              </Link>
              <Link
                href="/services/screencast-tutorials"
                className="px-3.5 py-2 rounded-xl bg-ink/[0.05] hover:bg-ink/[0.1] text-xs font-semibold text-ink border border-surface-border transition-colors"
              >
                Screencast Tutorials
              </Link>
              <Link
                href="/services/app-demo-video"
                className="px-3.5 py-2 rounded-xl bg-ink/[0.05] hover:bg-ink/[0.1] text-xs font-semibold text-ink border border-surface-border transition-colors"
              >
                App Demos
              </Link>
              <Link
                href="/pricing"
                className="px-3.5 py-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-xs font-semibold text-brand-600 border border-brand-500/30 transition-colors"
              >
                Transparent Pricing
              </Link>
            </div>
          </div>

          {/* Sticky Conversion Action Banner */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-900/60 via-surface-card to-surface-subtle border border-brand-500/40 text-center shadow-glow">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan">
              Ready for a transparent quote?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink mt-2">
              Get an agency-quality video without the 5-figure price tag.
            </h3>
            <p className="mt-3 text-sm text-ink-soft max-w-xl mx-auto">
              Message me directly with your SaaS URL and length requirements for an honest, fast quote.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 px-7 py-3.5 rounded-full shadow-glow"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={siteConfig.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-6 py-3.5 rounded-full transition-colors"
              >
                <span>WhatsApp Instant Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
