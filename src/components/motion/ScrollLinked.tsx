"use client";

import React, { useEffect, useRef } from "react";

interface ScrollLinkedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Viewport fraction (from the top) where progress reaches 1.
   * Progress starts at 0 when the element's top enters the bottom of the viewport.
   */
  end?: number;
}

/**
 * Publishes the element's scroll progress as the CSS variable `--p` (0 → 1),
 * so children can drive transforms, clip-paths and line draws purely in CSS.
 * One passive listener + rAF, no layout thrash beyond a single rect read.
 */
export const ScrollLinked: React.FC<ScrollLinkedProps> = ({
  children,
  end = 0.35,
  className = "",
  style,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;
      const stop = vh * end;
      const raw = (start - rect.top) / (start - stop);
      const p = Math.min(1, Math.max(0, raw));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [end]);

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {children}
    </div>
  );
};
