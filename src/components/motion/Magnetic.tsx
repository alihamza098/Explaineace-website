"use client";

import React, { useRef } from "react";

interface MagneticProps {
  children: React.ReactNode;
  /** How far (as a fraction of the pointer offset) the element follows the pointer. */
  strength?: number;
  className?: string;
}

/** Pulls its child toward the pointer on hover and springs back on leave. */
export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.3, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transition = "transform 0.15s ease-out";
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)";
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
};
