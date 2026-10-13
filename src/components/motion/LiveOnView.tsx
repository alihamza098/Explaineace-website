"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Wraps a section and exposes `data-live` so looping CSS animations inside
 * (see `.cv` rules in globals.css) only run while the section is on screen.
 */
export const LiveOnView: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-live={live} {...rest}>
      {children}
    </div>
  );
};
