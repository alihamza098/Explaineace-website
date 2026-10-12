import React from "react";

interface ParallaxProps {
  children?: React.ReactNode;
  speed?: number;
  className?: string;
}

/** Pass-through wrapper (scroll parallax removed). */
export const Parallax: React.FC<ParallaxProps> = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);
