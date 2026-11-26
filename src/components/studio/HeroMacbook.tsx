"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Hero 3D piece: a MacBook-style laptop turning slowly, its screen looping a
 * product-UI demo.
 *
 * - The still poster is always in the DOM (first paint, reduced motion,
 *   no-WebGL, three.js still loading). The canvas fades in over it.
 * - Rendering pauses when the user pauses, the hero is offscreen, or the tab
 *   is hidden. Reduced motion never starts the loop.
 * - three.js is imported on demand, after idle, so copy and CTAs paint first.
 */
type Status = "poster" | "loading" | "live" | "failed";

export const HeroMacbook: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("poster");
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);
  const hiddenTabRef = useRef(false);
  const startLoopRef = useRef<() => void>(() => {});

  const shouldRun = () => !pausedRef.current && visibleRef.current && !hiddenTabRef.current;

  useEffect(() => {
    pausedRef.current = userPaused;
    if (shouldRun()) startLoopRef.current();
  }, [userPaused]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return; // still poster only

    let disposed = false;
    let raf = 0;
    let last = 0;
    let scene: import("./macbookScene").MacbookScene | null = null;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let idleHandle: number | undefined;

    const loop = (now: number) => {
      raf = 0;
      if (disposed || !scene || !shouldRun()) return;
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      scene.frame(dt);
      raf = requestAnimationFrame(loop);
    };
    startLoopRef.current = () => {
      if (!scene || raf) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      hiddenTabRef.current = document.hidden;
      if (shouldRun()) startLoopRef.current();
    };
    document.addEventListener("visibilitychange", onVisibility);

    io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (shouldRun()) startLoopRef.current();
      },
      { threshold: 0.05 },
    );
    if (wrapRef.current) io.observe(wrapRef.current);

    const boot = async () => {
      try {
        const probe = document.createElement("canvas");
        const gl = probe.getContext("webgl2") || probe.getContext("webgl");
        if (!gl) throw new Error("no webgl");
        setStatus("loading");
        const mod = await import("./macbookScene");
        if (disposed || !hostRef.current) return;
        scene = mod.createMacbookScene(hostRef.current);
        const fit = () => {
          const r = hostRef.current!.getBoundingClientRect();
          scene!.resize(Math.max(1, r.width), Math.max(1, r.height));
        };
        fit();
        ro = new ResizeObserver(fit);
        ro.observe(hostRef.current);
        scene.still();
        setStatus("live");
        if (shouldRun()) startLoopRef.current();
      } catch {
        if (!disposed) setStatus("failed");
      }
    };

    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    if (ric) idleHandle = ric(boot, { timeout: 1500 });
    else idleHandle = window.setTimeout(boot, 400);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
      ro?.disconnect();
      const cic = (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
      if (idleHandle !== undefined) (cic ? cic(idleHandle) : clearTimeout(idleHandle));
      scene?.dispose();
      scene = null;
      startLoopRef.current = () => {};
    };
  }, []);

  const toggle = useCallback(() => setUserPaused((p) => !p), []);
  const live = status === "live";

  return (
    <div ref={wrapRef} className="relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[6/5] select-none">
      {/* Still poster: always present, never a layout shift */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-macbook.webp"
        alt="A MacBook showing a product dashboard with a weekly report export finishing, lit by a soft lime reflection."
        width={1200}
        height={1000}
        decoding="async"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
          live ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={hostRef}
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-500 ${live ? "opacity-100" : "opacity-0"}`}
      />

      {!reduced && status !== "failed" && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Play laptop animation" : "Pause laptop animation"}
          className="absolute bottom-2 right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-ink/80 text-paper backdrop-blur-sm transition-colors hover:border-lime hover:text-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
        >
          {userPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
        </button>
      )}

      {status === "failed" && (
        <p className="absolute bottom-2 left-2 right-2 text-center text-[11px] text-paper-mute">
          3D preview unavailable on this device — showing the still frame.
        </p>
      )}
    </div>
  );
};
