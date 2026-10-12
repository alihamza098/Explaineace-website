import React from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/** Pass-through wrapper (pointer-follow effect removed). */
export const Magnetic: React.FC<MagneticProps> = ({ children, className = "" }) => (
  <div className={`inline-block ${className}`}>{children}</div>
);
