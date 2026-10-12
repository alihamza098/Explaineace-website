"use client";

import React, { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Delay in ms before the element animates in once visible. */
  delay?: number;
  /** Animation variant. */
  variant?: "up" | "fade" | "scale" | "left" | "right" | "clip" | "words";
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Scroll-triggered entrance animation. Content is always server-rendered
 * (SEO-safe); it is only hidden when JS is running (`html.js`), and
 * reduced-motion users see it immediately.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  variant = "up",
  className = "",
  as: Tag = "div",
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      data-reveal={variant}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Component>
  );
};
