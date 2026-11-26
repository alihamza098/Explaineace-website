"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Video poster with a useful fallback. If the thumbnail host is blocked or the
 * image fails, a typographic title card renders instead — the surrounding
 * link/button keeps working either way.
 */
export const Poster: React.FC<{
  videoId: string;
  title: string;
  label?: string;
  className?: string;
  quality?: "hqdefault" | "maxresdefault" | "mqdefault";
  eager?: boolean;
}> = ({ videoId, title, label, className = "", quality = "hqdefault", eager }) => {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // The error can fire before hydration attaches onError (blocked host), so re-check.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-ink-3 ${className}`}>
      {/* Fallback title card sits underneath so a slow image never shows blank */}
      <div className="absolute inset-0 flex flex-col justify-end bg-[radial-gradient(120%_90%_at_20%_0%,rgba(255, 107, 61,0.16),transparent_55%)] p-4">
        {label && <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-signal">{label}</span>}
        <span className="line-clamp-2 text-sm font-semibold text-paper">{title}</span>
      </div>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={`https://img.youtube.com/vi/${videoId}/${quality}.jpg`}
          alt=""
          width={480}
          height={360}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
};
