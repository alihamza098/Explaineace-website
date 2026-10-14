import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Video,
  Star,
  Quote,
  Sliders,
  TrendingUp,
} from "lucide-react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return { title: "Project Not Found" };

  const canonicalUrl = `${siteConfig.siteUrl}/work/${project.id}`;

  return {
    title: `${project.title} SaaS Walkthrough Video Case Study`,
    description: `Watch the ${project.title} video case study produced by Ali. Specs, UI zooms, client outcome, and full production breakdown. Request your quote today.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} SaaS Walkthrough Video Case Study | EXPLAINERACE`,
      description: `Watch the ${project.title} video case study produced by Ali. Specs, UI zooms, client outcome, and full production breakdown. Request your quote today.`,
      url: canonicalUrl,
      type: "video.other",
      images: [
        {
          url: project.thumbnail,
          width: 1280,
          height: 720,
          alt: `${project.title} - Video Case Study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} SaaS Walkthrough Video Case Study | EXPLAINERACE`,
      description: `Watch the ${project.title} video case study produced by Ali. Specs, UI zooms, client outcome, and full production breakdown. Request your quote today.`,
      images: [project.thumbnail],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  // Find 3 related projects in same or similar category
  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .sort((a, b) => (a.category === project.category ? -1 : 1))
    .slice(0, 3);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${project.videoId}?rel=0&modestbranding=1`;

  // ISO 8601 duration approximation for schema
  let isoDuration = "PT1M30S";
  if (project.duration) {
    const parts = project.duration.split(":");
    if (parts.length === 2) {
      isoDuration = `PT${parts[0]}M${parts[1]}S`;
    }
  }

  // VideoObject JSON-LD Schema
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${project.title} SaaS Walkthrough Video Case Study`,
    description: project.description,
    thumbnailUrl: [project.thumbnail],
    uploadDate: "2026-01-15T08:00:00+00:00",
    duration: isoDuration,
    embedUrl: embedUrl,
    contentUrl: project.videoUrl,
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.siteUrl}/logo.png`,
      },
    },
    author: {
      "@type": "Person",
      name: "Ali",
      jobTitle: "SaaS Video Specialist",
      url: `${siteConfig.siteUrl}/about`,
    },
  };

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
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
        name: "Work Portfolio",
        item: `${siteConfig.siteUrl}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${siteConfig.siteUrl}/work/${project.id}`,
      },
    ],
  };

  // Matching Service page link based on category
  const getMatchingService = () => {
    switch (project.category) {
      case "Promo":
      case "SaaS":
        return {
          href: "/services/saas-walkthrough-video",
          label: "SaaS Walkthrough Video Service",
        };
      case "Tutorials":
      case "Training":
        return {
          href: "/services/screencast-tutorials",
          label: "Screencast Video Production Service",
        };
      case "Mobile Apps":
      case "Web Apps":
        return {
          href: "/services/app-demo-video",
          label: "App Demo Video Service",
        };
      case "AI UGC & Product Ads":
        return {
          href: "/services/ai-ugc-ads",
          label: "AI UGC & Product Ads Service",
        };
      default:
        return {
          href: "/services/saas-walkthrough-video",
          label: "SaaS Walkthrough Video Service",
        };
    }
  };

  const matchingService = getMatchingService();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="pt-28 sm:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-ink-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/work" className="hover:text-ink transition-colors">
              Work
            </Link>
            <span>/</span>
            <span className="text-brand-600 font-medium truncate max-w-[200px] sm:max-w-none">
              {project.title}
            </span>
          </nav>

          {/* Project Header Meta */}
          <div className="max-w-4xl mb-8">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-500/20 text-brand-600 border border-brand-500/30">
                {project.category}
              </span>
              <span className="text-xs text-ink-muted bg-ink/[0.05] px-2.5 py-1 rounded-full border border-surface-border">
                {project.industry}
              </span>
              {project.duration && (
                <span className="text-xs text-ink-muted flex items-center gap-1 bg-ink/[0.05] px-2.5 py-1 rounded-full border border-surface-border">
                  <Clock className="w-3 h-3 text-ink-muted" />
                  <span>{project.duration}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
              {project.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Embedded Video Showcase */}
          <div className="relative rounded-2xl overflow-hidden aspect-video w-full max-w-5xl bg-black border border-white/[0.1] shadow-2xl mb-14">
            <iframe
              src={embedUrl}
              title={`${project.title} Video Showcase`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Case Study Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 max-w-6xl">
            {/* Left Column: Detailed Case Study breakdown */}
            <div className="lg:col-span-8 space-y-10">
              {/* Overview */}
              <section className="p-7 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-3">
                <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-600" />
                  <span>Project Overview & Core Mission</span>
                </h2>
                <p className="text-ink-soft text-sm sm:text-base leading-relaxed">
                  {project.caseStudy.overview}
                </p>
              </section>

              {/* Challenge & Approach */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="p-7 rounded-2xl bg-surface-card border border-surface-border space-y-2.5">
                  <h3 className="text-base font-semibold text-amber-600">
                    The Product Challenge
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    {project.caseStudy.challenge}
                  </p>
                </section>

                <section className="p-7 rounded-2xl bg-surface-card border border-surface-border space-y-2.5">
                  <h3 className="text-base font-semibold text-brand-600">
                    The Production Approach
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    {project.caseStudy.approach}
                  </p>
                </section>
              </div>

              {/* Production Techniques Applied */}
              <section className="p-7 sm:p-8 rounded-2xl bg-surface-card border border-surface-border">
                <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-accent-cyan" />
                  <span>Production Craft & Technical Execution Details</span>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.caseStudy.production.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-start gap-2.5 text-sm text-ink-soft"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Client Outcome & User Experience */}
              <section className="p-7 sm:p-8 rounded-2xl bg-gradient-to-br from-surface-card via-surface-card to-brand-50 border border-brand-500/20 space-y-3">
                <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Client Outcome & Conversion Lift</span>
                </h2>
                <p className="text-ink-soft text-sm sm:text-base leading-relaxed">
                  {project.caseStudy.clientOutcome || project.caseStudy.finalResult}
                </p>
                {project.caseStudy.finalResult && project.caseStudy.clientOutcome && (
                  <p className="text-ink-muted text-xs sm:text-sm leading-relaxed pt-1">
                    {project.caseStudy.finalResult}
                  </p>
                )}
              </section>

              {/* Verified Client Testimonial if present */}
              {project.caseStudy.testimonial && (
                <section className="p-7 sm:p-8 rounded-2xl bg-surface-card border border-emerald-500/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-emerald-400" />
                      <span>Verified Client Feedback ({project.caseStudy.testimonial.rating}★)</span>
                    </span>
                    <Quote className="w-5 h-5 text-emerald-400/40" />
                  </div>
                  <blockquote className="text-sm sm:text-base text-ink italic leading-relaxed">
                    &ldquo;{project.caseStudy.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="text-xs text-ink-muted">
                    <strong className="text-ink block font-semibold">
                      {project.caseStudy.testimonial.author}
                    </strong>
                    <span>{project.caseStudy.testimonial.role}</span>
                  </div>
                </section>
              )}

              {/* Service Mapping Internal Link */}
              <div className="p-6 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 block">
                    Interested in this video format?
                  </span>
                  <p className="text-sm font-semibold text-ink mt-0.5">
                    Explore our dedicated {matchingService.label} with transparent pricing.
                  </p>
                </div>
                <Link
                  href={matchingService.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 px-4 py-2.5 rounded-full shrink-0 transition-colors shadow-glow"
                >
                  <span>Explore Service Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Project Sidebar Info & Video Specs */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Project Information
                </h3>

                <div>
                  <p className="text-xs text-ink-muted">Client / Product</p>
                  <p className="text-sm font-semibold text-ink mt-0.5">{project.client}</p>
                </div>

                <div>
                  <p className="text-xs text-ink-muted">Industry</p>
                  <p className="text-sm font-semibold text-ink mt-0.5">{project.industry}</p>
                </div>

                {/* Technical Video Specifications */}
                {project.caseStudy.videoSpecs && (
                  <div className="pt-2 border-t border-surface-border space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-brand-600" />
                      <span>Production Specs</span>
                    </p>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-ink-muted block">Resolution</span>
                        <span className="text-ink font-medium">{project.caseStudy.videoSpecs.resolution}</span>
                      </div>
                      <div>
                        <span className="text-ink-muted block">Frame Rate</span>
                        <span className="text-ink font-medium">{project.caseStudy.videoSpecs.fps}</span>
                      </div>
                      <div>
                        <span className="text-ink-muted block">Audio Engineering</span>
                        <span className="text-ink font-medium">{project.caseStudy.videoSpecs.audio}</span>
                      </div>
                      <div>
                        <span className="text-ink-muted block">Turnaround</span>
                        <span className="text-emerald-600 font-medium">{project.caseStudy.videoSpecs.turnaround}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs text-ink-muted">Services Delivered</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs text-brand-600 bg-brand-500/10 border border-brand-500/20 px-2.5 py-0.5 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-ink-muted">Tags</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs text-ink-muted bg-ink/[0.05] px-2 py-0.5 rounded-md"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-border space-y-2.5">
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-ink/[0.06] hover:bg-ink/[0.1] text-xs font-medium text-ink flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Open on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href={`/contact?package=${encodeURIComponent(project.title)}`}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-glow transition-all"
                  >
                    <span>Request Similar Video</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={
                      project.category === "Mobile Apps" || project.id.includes("bloom")
                        ? "/services/app-demo-video"
                        : project.category === "Tutorials" || project.category === "Training"
                        ? "/services/screencast-tutorials"
                        : project.category === "AI UGC & Product Ads" || project.id.includes("ai")
                        ? "/services/ai-ugc-ads"
                        : "/services/saas-walkthrough-video"
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-xs font-semibold text-brand-600 flex items-center justify-center gap-1.5 border border-brand-500/30 transition-colors"
                  >
                    <span>
                      Explore {
                        project.category === "Mobile Apps" || project.id.includes("bloom")
                          ? "App Demo Video Service"
                          : project.category === "Tutorials" || project.category === "Training"
                          ? "Screencast Production Service"
                          : project.category === "AI UGC & Product Ads" || project.id.includes("ai")
                          ? "AI UGC & Ad Service"
                          : "SaaS Walkthrough Video Service"
                      }
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/pricing"
                    className="w-full py-2.5 px-4 rounded-xl bg-ink/[0.04] hover:bg-ink/[0.08] text-xs font-medium text-ink-soft flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Transparent Pricing</span>
                  </Link>
                </div>
              </div>

              {/* Verified Seller Trust Box (Plain Text - No AggregateRating Schema) */}
              <div className="p-5 rounded-2xl bg-surface-subtle/80 border border-surface-border text-xs text-ink-muted space-y-2">
                <div className="flex items-center gap-2 text-ink font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Fiverr Seller (5.0★)</span>
                </div>
                <p className="leading-relaxed">
                  All production was created directly by Ali. 5.0/5 average across 18 verified Fiverr reviews.
                </p>
                <a
                  href={siteConfig.fiverr.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:text-ink underline text-xs font-medium inline-block pt-1"
                >
                  Verify Reviews on Fiverr Profile &rarr;
                </a>
              </div>
            </aside>
          </div>

          {/* Related Projects Section */}
          <section className="mt-20 pt-16 border-t border-surface-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink">
                  Related Software Walkthroughs
                </h2>
                <p className="text-sm text-ink-muted mt-1">
                  More examples in {project.category} and related disciplines.
                </p>
              </div>
              <Link
                href="/work"
                className="text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors flex items-center gap-1"
              >
                <span>View All {projects.length}</span>
                <span>&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/work/${rp.id}`}
                  className="group p-5 rounded-2xl bg-surface-card border border-surface-border hover:border-brand-500/40 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-600">
                      {rp.category}
                    </span>
                    <h3 className="font-semibold text-base text-ink group-hover:text-brand-700 transition-colors mt-2.5 line-clamp-1">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-ink-muted mt-2 line-clamp-2 leading-relaxed">
                      {rp.description}
                    </p>
                  </div>
                  <span className="mt-4 text-[11px] text-brand-600 font-medium inline-flex items-center gap-1">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
