"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { HeroReframe } from "./HeroReframe";

/**
 * Hero film loop (rendered MP4/WebM + poster in /public/hero/).
 *
 * - Poster paints first; video loads after idle (preload="none" until then).
 * - Pause control; pauses when offscreen or the tab is hidden.
 * - Reduced motion: poster only, video never plays.
 * - If the files are missing or fail to load, the CSS animation takes over so
 *   the hero is never empty.
 */
const BASE = "/hero/hero-export-loop";

export const HeroVideo: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(rm);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    if (wrapRef.current) io.observe(wrapRef.current);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    // Start loading the video only once the page is idle (copy + CTAs paint first).
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(() => setArmed(true), { timeout: 1500 }) : window.setTimeout(() => setArmed(true), 400);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (!w.requestIdleCallback) clearTimeout(id);
    };
  }, []);

  const shouldPlay = !reduced && !userPaused && visible && !tabHidden && ready;
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shouldPlay) v.play().catch(() => setFailed(true));
    else v.pause();
  }, [shouldPlay]);

  if (failed) return <HeroReframe />;

  return (
    <div ref={wrapRef} className="relative w-full aspect-video overflow-hidden rounded-2xl border border-paper/10 bg-ink-2 shadow-[0_30px_80px_-30px_rgba(34,228,245,0.25)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}-poster.png`}
        alt="Product film frame: a 16:9 report screen with a 1:1 and a 9:16 cut beside it."
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {armed && !reduced && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={`${BASE}-1080p.webm`} type="video/webm" />
          <source src={`${BASE}-1080p.mp4`} type="video/mp4" />
        </video>
      )}
      {!reduced && ready && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Play hero video" : "Pause hero video"}
          className="absolute bottom-3 right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-ink/80 text-paper backdrop-blur-sm transition-colors hover:border-signal hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          {userPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
        </button>
      )}
    </div>
  );
};
