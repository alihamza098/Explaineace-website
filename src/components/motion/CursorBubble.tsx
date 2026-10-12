"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * A soft "Play" bubble that trails the pointer whenever it hovers an element
 * marked with `data-cursor="play"`. Desktop (fine pointer) only.
 */
export const CursorBubble: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("Play");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let frame = 0;

    const loop = () => {
      // Critically damped follow for a buttery trail
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.setProperty("--cx", `${cx.toFixed(1)}px`);
      el.style.setProperty("--cy", `${cy.toFixed(1)}px`);
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        setLabel(target.dataset.cursor === "play" ? "Play" : target.dataset.cursor || "View");
        el.dataset.active = "true";
      } else {
        el.dataset.active = "false";
      }
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      el.dataset.active = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-bubble hidden md:block" data-active="false" aria-hidden="true">
      <div className="cursor-bubble-inner flex items-center gap-1.5 rounded-full bg-white/95 text-ink px-4 py-2.5 text-xs font-semibold shadow-lift backdrop-blur">
        <Play className="w-3.5 h-3.5 fill-brand-600 text-brand-600" />
        <span>{label}</span>
      </div>
    </div>
  );
};
