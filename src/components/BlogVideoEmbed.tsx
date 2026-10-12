"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import { VideoModal } from "@/components/VideoModal";

export interface BlogVideoProps {
  videoId: string;
  title: string;
  subtitle?: string;
  category?: string;
  duration?: string;
  projectId?: string;
}

export const BlogVideoEmbed: React.FC<BlogVideoProps> = ({
  videoId,
  title,
  subtitle,
  category = "Featured Video",
  duration,
  projectId,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="my-10 rounded-2xl p-1 bg-gradient-to-b from-brand-500/30 via-ink/5 to-transparent shadow-card">
      <div className="rounded-[15px] overflow-hidden bg-surface-card border border-surface-border">
        {/* Video Thumbnail Screen */}
        <div
          className="relative aspect-video w-full bg-black cursor-pointer group overflow-hidden"
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setModalOpen(true);
            }
          }}
          aria-label={`Play ${title}`}
        >
          <Image
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 900px) 100vw, 800px"
            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-brand-300 border border-brand-500/30 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-accent-cyan" />
              <span>{category}</span>
            </span>

            {duration && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/70 backdrop-blur-md text-white border border-white/10">
                {duration}
              </span>
            )}
          </div>

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-brand-600/90 text-white flex items-center justify-center shadow-glow-lg group-hover:scale-110 group-hover:bg-brand-500 transition-all duration-300">
              <Play className="w-7 h-7 fill-ink translate-x-0.5" />
            </div>
          </div>

          {/* Bottom Title bar on video */}
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <p className="text-ink font-bold text-sm sm:text-base drop-shadow-md line-clamp-1">
              {title}
            </p>
          </div>
        </div>

        {/* Video Caption Bar & Link */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-subtle/80 border-t border-surface-border">
          <div>
            <span className="text-xs font-semibold text-ink-muted block">
              {subtitle || "Watch the authentic video production sample:"}
            </span>
            <p className="text-sm font-bold text-ink mt-0.5">{title}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {projectId && (
              <Link
                href={`/work/${projectId}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-ink bg-ink/[0.06] hover:bg-ink/[0.12] border border-surface-border px-3.5 py-2 rounded-full transition-colors"
              >
                <span>View Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 px-3.5 py-2 rounded-full shadow-glow transition-all active:scale-95"
            >
              <Play className="w-3 h-3 fill-ink" />
              <span>Watch Video</span>
            </button>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoId={videoId}
        title={title}
        category={category}
        projectId={projectId}
      />
    </div>
  );
};
