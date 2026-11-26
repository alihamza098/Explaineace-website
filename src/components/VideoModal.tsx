"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
  videoUrl?: string;
  title?: string;
  category?: string;
  projectId?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoId,
  videoUrl,
  title,
  category,
  projectId,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || (!videoId && !videoUrl)) return null;

  // Extract YouTube ID if not directly provided
  let embedUrl = "";
  if (videoId) {
    embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  } else if (videoUrl && videoUrl.includes("youtube.com")) {
    const extracted = videoUrl.match(/(?:v=|\/)([\w-]{11})(?:\?|&|$)/)?.[1];
    if (extracted) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${extracted}?autoplay=1&rel=0&modestbranding=1`;
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface-card border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-surface/80">
          <div className="flex items-center gap-2.5 truncate mr-4">
            {category && (
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {category}
              </span>
            )}
            <h2
              id="video-modal-title"
              className="text-sm sm:text-base font-semibold text-white truncate"
            >
              {title || "Portfolio Video"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {projectId && (
              <Link
                href={`/work/${projectId}`}
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Case Study</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Close video dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Responsive Video Container */}
        <div className="relative aspect-video w-full bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || "Software walkthrough video"}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
              <Sparkles className="w-8 h-8 text-brand-400 mb-2" />
              <p className="text-sm">Video stream preview unavailable</p>
            </div>
          )}
        </div>

        {/* Footer info in modal */}
        <div className="px-5 py-3 bg-surface/50 border-t border-white/[0.06] flex flex-wrap gap-y-2 items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Recorded in native 1080p · Edited by Ali</span>
          </div>
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white underline underline-offset-4"
            >
              Video not loading? Watch on YouTube
            </a>
          )}
          {projectId && (
            <Link
              href={`/work/${projectId}`}
              onClick={onClose}
              className="text-brand-400 hover:text-brand-300 font-medium sm:hidden flex items-center gap-1"
            >
              <span>View Case Study</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
