"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Project, CategoryFilter } from "@/types";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

interface VideoGridProps {
  projects: Project[];
  isHomeView?: boolean;
  title?: string;
  subtitle?: string;
}

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Promo",
  "SaaS",
  "AI UGC & Product Ads",
  "Web Apps",
  "Mobile Apps",
  "Tutorials",
  "Training",
  "Explainers",
];

export const VideoGrid: React.FC<VideoGridProps> = ({
  projects,
  isHomeView = false,
  title = "Selected Work",
  subtitle = "A selection of software tutorials, app demos, walkthroughs and training videos.",
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Sort projects respecting optional order field, else preserving array order
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });
  }, [projects]);

  // Filter projects by category and optional search term
  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [sortedProjects, selectedCategory, searchQuery]);

  // Display limited items on home page if requested
  const displayProjects = isHomeView
    ? filteredProjects.slice(0, 6)
    : filteredProjects;

  return (
    <section id="work" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Reveal>
              <span className="eyebrow mb-4">Portfolio Showcase</span>
            </Reveal>
            <SplitText
              text={title}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-ink leading-[1.05]"
            />
            <Reveal delay={150}>
              <p className="mt-4 text-sm sm:text-base text-ink-muted max-w-2xl">
                {subtitle}
              </p>
            </Reveal>
          </div>

          {/* Search bar */}
          <Reveal delay={200} className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search software or feature..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-surface-border rounded-full text-ink placeholder-ink-faint shadow-sm focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
            />
          </Reveal>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-ink text-white shadow-glow border border-ink scale-[1.03]"
                    : "bg-white text-ink-soft hover:text-ink hover:border-ink/20 border border-surface-border"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-surface-subtle text-ink-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Video Grid */}
        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayProjects.map((project, idx) => (
              // Keyed by filter so cards re-stagger in when the category changes
              <Reveal key={`${selectedCategory}-${project.id}`} delay={(idx % 3) * 90} variant="scale" className="h-full">
                <VideoCard
                  project={project}
                  onPlay={(proj) => setActiveModalProject(proj)}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-surface-border rounded-3xl">
            <p className="text-ink-muted text-sm">
              No videos found matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-3 text-xs text-brand-600 hover:text-brand-700 underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Home Page "View All Work" CTA */}
        {isHomeView && projects.length > 6 && (
          <div className="mt-12 text-center">
            <Link
              href="/work"
              className="btn-sheen inline-flex items-center gap-2 text-sm font-semibold text-white bg-ink hover:bg-brand-700 px-7 py-4 rounded-full transition-colors duration-300 group shadow-glow"
            >
              <span>Explore All {projects.length} Portfolio Videos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={Boolean(activeModalProject)}
        onClose={() => setActiveModalProject(null)}
        videoId={activeModalProject?.videoId}
        videoUrl={activeModalProject?.videoUrl}
        title={activeModalProject?.title}
        category={activeModalProject?.category}
        projectId={activeModalProject?.id}
      />
    </section>
  );
};
