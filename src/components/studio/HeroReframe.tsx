"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Hero motion: one product action becomes three cuts.
 * A 16:9 master plays the action (cursor -> Export -> success). Then a 1:1 and
 * a 9:16 frame peel off it and settle beside it, each recomposed. ~12s loop.
 *
 * Purpose: it demonstrates the offer ("one film, social edits in 3 formats").
 * Transform/opacity only. Pauses on user pause, offscreen, or hidden tab.
 * With reduced motion the CSS never animates and the finished composition
 * shows as a still.
 */
export const HeroReframe: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    if (ref.current) io.observe(ref.current);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const paused = userPaused || !visible || tabHidden;

  return (
    <div className="relative">
      <div
        ref={ref}
        className="hr-stage select-none"
        data-paused={paused}
        role="img"
        aria-label="Animation: one 16:9 product film with an Export click is reframed into a 1:1 feature spotlight and a 9:16 action close-up."
      >
        {/* 16:9 master */}
        <div className="hr-frame hr-master" style={{ left: "2cqw", top: "6cqw", width: "66cqw", aspectRatio: "16 / 9" }}>
          <div className="absolute inset-y-0 left-0 border-r border-paper/10 bg-[#161412]" style={{ width: "19cqw" }}>
            <span className="absolute rounded-full bg-signal" style={{ left: "2.4cqw", top: "2.6cqw", width: "2.6cqw", height: "2.6cqw" }} />
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={i === 1 ? "bg-signal/25" : "bg-paper/10"}
                style={{ position: "absolute", left: "2.4cqw", right: "2.4cqw", top: `${10 + i * 6.5}cqw`, height: "3.6cqw", borderRadius: "0.8cqw" }}
              />
            ))}
          </div>
          <p className="absolute font-bold text-paper" style={{ left: "22cqw", top: "3cqw", fontSize: "3.4cqw" }}>
            Weekly report
          </p>
          <div className="absolute flex items-end border border-paper/10 bg-ink-3" style={{ left: "22cqw", right: "3cqw", top: "12cqw", height: "24cqw", gap: "2cqw", padding: "2cqw", borderRadius: "1.4cqw" }}>
            {[42, 58, 50, 74, 66, 90, 80].map((v, i) => (
              <span key={i} className={`flex-1 ${i === 5 ? "bg-signal" : "bg-paper/25"}`} style={{ height: `${v}%`, borderRadius: "0.6cqw" }} />
            ))}
          </div>
          <span className="hr-btn absolute flex items-center justify-center bg-signal font-bold text-signal-ink" style={{ right: "3cqw", top: "2.6cqw", width: "15cqw", height: "6cqw", fontSize: "2.6cqw", borderRadius: "1.6cqw" }}>
            Export
          </span>
          <span className="hr-toast absolute flex items-center bg-paper font-semibold text-signal-ink" style={{ right: "3cqw", bottom: "2.6cqw", gap: "1cqw", padding: "1.2cqw 2cqw", fontSize: "2.4cqw", borderRadius: "1.4cqw" }}>
            <span className="flex items-center justify-center rounded-full bg-signal text-white" style={{ width: "3cqw", height: "3cqw" }}>✓</span>
            Report exported
          </span>
          <svg className="hr-cursor absolute left-0 top-0" style={{ width: "4.4cqw", height: "4.4cqw" }} viewBox="0 0 24 24" aria-hidden>
            <path d="M3 2l17 8.5-7.2 1.9-3.3 7.1z" fill="#F4F0E6" stroke="#0B0B0A" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="hr-tag" style={{ left: "2cqw", top: "2cqw" }}>16:9 · Full workflow</span>

        {/* 1:1 spotlight */}
        <div className="hr-frame hr-square" style={{ left: "16cqw", top: "44cqw", width: "34cqw", aspectRatio: "1 / 1" }}>
          <p className="absolute font-bold leading-[1.05] tracking-tight text-paper" style={{ left: "7cqw", right: "7cqw", top: "8cqw", fontSize: "9cqw" }}>
            Export a weekly report in one click.
          </p>
          <div className="absolute border border-paper/10 bg-ink-3" style={{ left: "7cqw", right: "7cqw", top: "46cqw", height: "30cqw", borderRadius: "4cqw" }} />
          <span className="absolute flex items-center justify-center bg-signal font-bold text-signal-ink" style={{ right: "11cqw", top: "50cqw", width: "30cqw", height: "10cqw", fontSize: "5.4cqw", borderRadius: "3cqw" }}>
            Export
          </span>
        </div>
        <span className="hr-tag hr-tag-late" style={{ left: "16cqw", top: "79.5cqw" }}>1:1 · Feature spotlight</span>

        {/* 9:16 close-up */}
        <div className="hr-frame hr-tall" style={{ left: "74cqw", top: "6cqw", width: "24cqw", aspectRatio: "9 / 16" }}>
          <p className="absolute font-bold leading-[1.05] tracking-tight text-paper" style={{ left: "8cqw", right: "8cqw", top: "10cqw", fontSize: "11cqw" }}>
            Export your weekly report
          </p>
          <span className="absolute flex items-center justify-center bg-signal font-bold text-signal-ink" style={{ left: "8cqw", right: "8cqw", top: "134cqw", height: "20cqw", fontSize: "9cqw", borderRadius: "6cqw" }}>
            Export
          </span>
        </div>
        <span className="hr-tag hr-tag-late" style={{ left: "74cqw", top: "50cqw" }}>9:16 · Close-up</span>

        <div className="hr-bar" aria-hidden />
      </div>

      {!reduced && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Play hero animation" : "Pause hero animation"}
          className="absolute -bottom-2 right-0 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-ink/80 text-paper backdrop-blur-sm transition-colors hover:border-signal hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          {userPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
        </button>
      )}
    </div>
  );
};
