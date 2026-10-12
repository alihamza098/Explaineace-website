import React from "react";

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
  /** "light" for use on light backgrounds, "dark" on the ink footer/stage. */
  tone?: "light" | "dark";
}

export const BrandEmblem: React.FC<{ className?: string; tone?: "light" | "dark" }> = ({
  className = "w-9 h-9",
  tone = "light",
}) => (
  <div
    className={`relative flex items-center justify-center rounded-xl p-1.5 transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-105 ${
      tone === "light"
        ? "bg-ink shadow-[0_6px_16px_-6px_rgba(30,27,75,0.6)]"
        : "bg-white shadow-[0_6px_16px_-6px_rgba(255,255,255,0.35)]"
    } ${className}`}
  >
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`emblemGrad-${tone}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>

      {/* Stylized 'E' spine & bars */}
      <path
        d="M8 8H22C24.2 8 26 9.8 26 12V13C26 14.1 25.1 15 24 15H15V21H23C24.1 21 25 21.9 25 23V25C25 26.1 24.1 27 23 27H15V33H24C25.1 33 26 33.9 26 35V36C26 38.2 24.2 40 22 40H8C6.9 40 6 39.1 6 38V10C6 8.9 6.9 8 8 8Z"
        fill={tone === "light" ? "#FFFFFF" : "#0B0D12"}
      />

      {/* Play triangle intersecting the right side */}
      <path
        d="M26 15.5L41.5 24L26 32.5V15.5Z"
        fill={`url(#emblemGrad-${tone})`}
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  showSubtitle = true,
  size = "md",
  iconOnly = false,
  tone = "light",
}) => {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const subtitleSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  return (
    <div className={`group inline-flex items-center gap-2.5 ${className}`}>
      <BrandEmblem className={iconSizes[size]} tone={tone} />

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-extrabold uppercase tracking-[0.08em] ${
              tone === "light" ? "text-ink" : "text-white"
            } ${textSizes[size]}`}
          >
            EXPLAINER
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-violet-500 to-cyan-500">
              ACE
            </span>
          </span>
          {showSubtitle && (
            <span
              className={`mt-1 tracking-[0.2em] uppercase font-semibold ${
                tone === "light" ? "text-ink-muted" : "text-white/50"
              } ${subtitleSizes[size]}`}
            >
              Software &amp; SaaS Videos
            </span>
          )}
        </div>
      )}
    </div>
  );
};
