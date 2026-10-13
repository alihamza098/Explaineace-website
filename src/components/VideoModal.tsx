"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setMounted(true), []);

  // Move focus into the dialog on open, keep Tab inside it, and restore focus on close
  useEffect(() => {
    if (!isOpen || !mounted) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      opener?.focus?.();
    };
  }, [isOpen, mounted]);

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

  if (!mounted || !isOpen || (!videoId && !videoUrl)) return null;

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

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-border bg-white">
          <div className="flex items-center gap-2.5 truncate mr-4">
            {category && (
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                {category}
              </span>
            )}
            <h2
              id="video-modal-title"
              className="text-sm sm:text-base font-semibold text-ink truncate"
            >
              {title || "Portfolio Video"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {projectId && (
              <Link
                href={`/work/${projectId}`}
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft hover:text-white bg-surface-subtle hover:bg-ink px-3 py-1.5 rounded-full transition-colors"
              >
                <span>Case Study</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
            <button
              ref={closeRef}
              onClick={onClose}
              className="p-1.5 rounded-full text-ink-muted hover:text-white hover:bg-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
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
            <div className="w-full h-full flex flex-col items-center justify-center text-white/60 p-6 text-center">
              <Sparkles className="w-8 h-8 text-brand-400 mb-2" />
              <p className="text-sm">Video stream preview unavailable</p>
            </div>
          )}
        </div>

        {/* Footer info in modal */}
        <div className="px-5 py-3 bg-white border-t border-surface-border flex items-center justify-between text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Recorded in native 1080p · Edited by Ali</span>
          </div>
          {projectId && (
            <Link
              href={`/work/${projectId}`}
              onClick={onClose}
              className="text-brand-600 hover:text-brand-700 font-medium sm:hidden flex items-center gap-1"
            >
              <span>View Case Study</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
