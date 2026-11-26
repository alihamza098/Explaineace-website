"use client";

import React, { useCallback, useRef, useState } from "react";
import { VideoModal } from "@/components/VideoModal";
import { projects } from "@/data/projects";
import { events, trackEvent } from "@/lib/analytics";

/**
 * On-demand film player. The YouTube iframe is only mounted after a click
 * (VideoModal renders nothing while closed). Focus returns to the trigger on
 * close so keyboard users land where they left off.
 */
export function useFilmPlayer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const active = projects.find((p) => p.id === activeId) ?? null;

  const open = useCallback((projectId: string, source: string) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setActiveId(projectId);
    trackEvent(events.filmPlay, { project: projectId, source });
  }, []);

  const close = useCallback(() => {
    setActiveId(null);
    const el = triggerRef.current;
    if (el && document.contains(el)) setTimeout(() => el.focus(), 0);
  }, []);

  const modal = active ? (
    <VideoModal
      isOpen
      onClose={close}
      videoId={active.videoId}
      videoUrl={active.videoUrl}
      title={active.title}
      category={active.category}
      projectId={active.id}
    />
  ) : null;

  return { open, modal };
}
