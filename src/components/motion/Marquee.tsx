import React from "react";

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
  /** Seconds per loop. */
  duration?: number;
}

/** Infinite horizontal ticker with faded edges. Pauses on hover. */
export const Marquee: React.FC<MarqueeProps> = ({
  items,
  className = "",
  itemClassName = "text-xs text-ink-soft bg-white border border-surface-border px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-sm",
  reverse = false,
  duration = 32,
}) => {
  const row = (hidden: boolean) => (
    <ul className="marquee-track flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item}
          className={itemClassName}
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`marquee group relative flex overflow-hidden ${className}`}
      data-reverse={reverse || undefined}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      {row(false)}
      {row(true)}
    </div>
  );
};
