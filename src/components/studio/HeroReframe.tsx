"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Hero motion: a title sequence that explains the offer.
 *
 * One 16:9 product film plays an action (bars grow, cursor glides with a
 * trail, Export is clicked, ripple, success). Then a 1:1 and a 9:16 cut arc
 * out of it, each recomposed (kinetic captions in the vertical). An editor
 * timeline underneath fills with a clip per cut while a playhead sweeps.
 * Formats are colour-coded: 16:9 cyan, 1:1 indigo, 9:16 violet.
 *
 * Depth: the stack sits in a perspective scene that tilts gently toward the
 * pointer (fine pointers only). Everything animates transform/opacity only,
 * pauses on user pause / offscreen / hidden tab, and shows the finished
 * composition as a still under prefers-reduced-motion (no animation, no tilt).
 */
export const HeroReframe: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);

    // Pointer parallax (fine pointers, motion allowed). Sets two CSS variables.
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--ry", `${tx * 9}deg`);
      el.style.setProperty("--rx", `${ty * -7}deg`);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      tx = ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    if (fine && !mq.matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const paused = userPaused || !visible || tabHidden;
  const bars = [42, 58, 50, 74, 66, 90, 80];

  return (
    <div className="relative">
      <div
        ref={ref}
        className="hr-stage select-none"
        data-paused={paused}
        role="img"
        aria-label="Animation: a 16:9 product film clicks Export, then a 1:1 feature spotlight and a 9:16 action close-up are cut from it and placed on an editing timeline."
      >
        <div className="hr-glow" aria-hidden />
        <div className="hr-scene">
          {/* ---------- 16:9 master ---------- */}
          <div className="hr-layer" style={{ transform: "translateZ(0px)" }}>
            <div className="hr-frame hr-master hr-c-cyan" style={{ left: "2cqw", top: "6cqw", width: "66cqw", aspectRatio: "16 / 9" }}>
              <div className="absolute inset-y-0 left-0 border-r border-paper/10 bg-[#0B1020]" style={{ width: "19cqw" }}>
                <span className="absolute rounded-full" style={{ left: "2.4cqw", top: "2.6cqw", width: "2.6cqw", height: "2.6cqw", background: "linear-gradient(135deg,#22E4F5,#6366F1)" }} />
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
                {bars.map((v, i) => (
                  <span
                    key={i}
                    className={`hr-bar-col flex-1 ${i === 5 ? "bg-signal" : "bg-paper/25"}`}
                    style={{ height: `${v}%`, borderRadius: "0.6cqw", ["--i" as string]: i }}
                  />
                ))}
              </div>
              <span className="hr-btn absolute flex items-center justify-center bg-signal font-bold text-signal-ink" style={{ right: "3cqw", top: "2.6cqw", width: "15cqw", height: "6cqw", fontSize: "2.6cqw", borderRadius: "1.6cqw" }}>
                Export
              </span>
              <span className="hr-ripple absolute rounded-full border-2 border-signal" style={{ right: "7.5cqw", top: "2.6cqw", width: "6cqw", height: "6cqw" }} aria-hidden />
              <span className="hr-toast absolute flex items-center bg-paper font-semibold text-signal-ink" style={{ right: "3cqw", bottom: "2.6cqw", gap: "1cqw", padding: "1.2cqw 2cqw", fontSize: "2.4cqw", borderRadius: "1.4cqw" }}>
                <span className="flex items-center justify-center rounded-full bg-signal" style={{ width: "3cqw", height: "3cqw" }}>✓</span>
                Report exported
              </span>
              {/* cursor + two trailing ghosts */}
              {[0, 1, 2].map((g) => (
                <svg key={g} className={`hr-cursor hr-cursor-${g} absolute left-0 top-0`} style={{ width: "4.4cqw", height: "4.4cqw" }} viewBox="0 0 24 24" aria-hidden>
                  <path d="M3 2l17 8.5-7.2 1.9-3.3 7.1z" fill={g === 0 ? "#EEF3FF" : "#22E4F5"} stroke="#05070D" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              ))}
              <span className="hr-sheen" aria-hidden />
            </div>
            <span className="hr-tag hr-tag-cyan" style={{ left: "2cqw", top: "2cqw" }}>16:9 · Full workflow</span>
          </div>

          {/* ---------- 1:1 spotlight ---------- */}
          <div className="hr-layer" style={{ transform: "translateZ(36px)" }}>
            <div className="hr-arc-x hr-arc-sq">
              <div className="hr-frame hr-square hr-c-iris" style={{ left: "16cqw", top: "44cqw", width: "34cqw", aspectRatio: "1 / 1" }}>
                <p className="absolute font-bold leading-[1.05] tracking-tight text-paper" style={{ left: "7cqw", right: "7cqw", top: "8cqw", fontSize: "9cqw" }}>
                  Export a weekly report in <span className="hr-grad">one click.</span>
                </p>
                <div className="absolute flex items-end border border-paper/10 bg-ink-3" style={{ left: "7cqw", right: "7cqw", top: "58cqw", height: "24cqw", borderRadius: "4cqw", gap: "3cqw", padding: "3.5cqw" }}>
                  {[50, 70, 58, 90, 76].map((v, i) => (
                    <span key={i} className={`flex-1 ${i === 3 ? "bg-iris" : "bg-paper/25"}`} style={{ height: `${v}%`, borderRadius: "1cqw" }} />
                  ))}
                </div>
                <span className="absolute flex items-center justify-center bg-iris font-bold text-white" style={{ right: "7cqw", top: "44cqw", width: "30cqw", height: "10cqw", fontSize: "5.4cqw", borderRadius: "3cqw" }}>
                  Export
                </span>
                <span className="hr-sheen" aria-hidden />
              </div>
              <span className="hr-tag hr-tag-late hr-tag-iris" style={{ left: "16cqw", top: "79.5cqw" }}>1:1 · Feature spotlight</span>
            </div>
          </div>

          {/* ---------- 9:16 close-up ---------- */}
          <div className="hr-layer" style={{ transform: "translateZ(70px)" }}>
            <div className="hr-arc-x hr-arc-tall">
              <div className="hr-frame hr-tall hr-c-violet" style={{ left: "74cqw", top: "6cqw", width: "24cqw", aspectRatio: "9 / 16" }}>
                <p className="absolute font-bold leading-[1.02] tracking-tight text-paper" style={{ left: "8cqw", right: "8cqw", top: "10cqw", fontSize: "12cqw" }}>
                  <span className="hr-word" style={{ ["--w" as string]: 0 }}>Export</span>
                  <br />
                  <span className="hr-word" style={{ ["--w" as string]: 1 }}>your</span>{" "}
                  <span className="hr-word" style={{ ["--w" as string]: 2 }}>weekly</span>
                  <br />
                  <span className="hr-word hr-grad" style={{ ["--w" as string]: 3 }}>report</span>
                </p>
                <div className="absolute flex items-end border border-paper/10 bg-ink-3" style={{ left: "8cqw", right: "8cqw", top: "58cqw", height: "56cqw", borderRadius: "6cqw", gap: "4cqw", padding: "6cqw" }}>
                  {[45, 62, 52, 88, 70].map((v, i) => (
                    <span key={i} className={`flex-1 ${i === 3 ? "bg-violet" : "bg-paper/25"}`} style={{ height: `${v}%`, borderRadius: "2cqw" }} />
                  ))}
                </div>
                <span className="hr-thumb absolute flex items-center justify-center font-bold text-white" style={{ left: "8cqw", right: "8cqw", top: "134cqw", height: "20cqw", fontSize: "9cqw", borderRadius: "6cqw", background: "linear-gradient(135deg,#6366F1,#A855F7)" }}>
                  Export
                </span>
                <span className="hr-sheen" aria-hidden />
              </div>
              <span className="hr-tag hr-tag-late hr-tag-violet" style={{ left: "74cqw", top: "50cqw" }}>9:16 · Close-up</span>
            </div>
          </div>
        </div>

        {/* ---------- editor timeline ---------- */}
        <div className="hr-timeline" aria-hidden>
          {[
            ["16:9", "hr-clip-cyan hr-clip-a"],
            ["1:1", "hr-clip-iris hr-clip-b"],
            ["9:16", "hr-clip-violet hr-clip-c"],
          ].map(([label, cls]) => (
            <div key={label} className="hr-track">
              <span className="hr-track-label">{label}</span>
              <span className={`hr-clip ${cls}`} />
            </div>
          ))}
          <span className="hr-playhead" />
        </div>
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
