"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { events, trackEvent } from "@/lib/analytics";

/**
 * "One feature. Three frames." — an original, clearly labelled interactive
 * studio demo (no matching client masters/cuts exist in the repo).
 *
 * One product action (export the weekly report) is composed three different
 * ways. Each frame is its own layout — not a crop — built with container-query
 * units so type stays readable at any size. Only transform/opacity animate
 * (plus the frame outline, which scales with transform).
 */
type Fmt = "16:9" | "1:1" | "9:16";
type Phase = "rest" | "moving" | "press" | "done";

const FORMATS: {
  id: Fmt;
  name: string;
  tag: string;
  purpose: string;
  change: string;
  use: string;
}[] = [
  {
    id: "16:9",
    name: "Full workflow",
    tag: "Landscape master",
    purpose: "Shows where the feature lives: sidebar → Reports → Weekly report → Export.",
    change: "The whole workspace stays in frame so a viewer sees the route to the button.",
    use: "Website, YouTube, launch page, sales decks",
  },
  {
    id: "1:1",
    name: "Feature spotlight",
    tag: "Square social edit",
    purpose: "Recomposed around the report card. Navigation drops away and the headline moves into the square.",
    change: "Less interface, one idea: this card, this button.",
    use: "Feed posts on LinkedIn, X and Instagram",
  },
  {
    id: "9:16",
    name: "Action close-up",
    tag: "Vertical social edit",
    purpose: "Opens on “Export your weekly report”, brings the button into thumb reach, ends on a readable success state.",
    change: "A tall close-up built for a phone held in one hand.",
    use: "Reels, Shorts, TikTok and Stories",
  },
];

const bars = [42, 58, 50, 74, 66, 90, 80];

const Bars: React.FC<{ h: string; gap: string; w: string; label: string }> = ({ h, gap, w, label }) => (
  <div className="flex items-end" style={{ height: h, gap }} aria-hidden>
    {bars.map((v, i) => (
      <div key={i} className="flex flex-col items-center justify-end" style={{ width: w, height: "100%" }}>
        <div
          className={i === 5 ? "bg-signal" : "bg-paper/25"}
          style={{ height: `${v}%`, width: "100%", borderRadius: "0.6cqw" }}
        />
        <span className="text-paper-mute" style={{ fontSize: label, lineHeight: 1.6 }}>
          {"MTWTFSS"[i]}
        </span>
      </div>
    ))}
  </div>
);

const Cursor: React.FC<{ size: string }> = ({ size }) => (
  <svg
    className="fx-cursor pointer-events-none absolute left-0 top-0 z-30 drop-shadow"
    style={{ width: size, height: size }}
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path d="M3 2l17 8.5-7.2 1.9-3.3 7.1z" fill="#F4F0E6" stroke="#0B0B0A" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const ExportLabel: React.FC<{ icon: string }> = ({ icon }) => (
  <>
    <span className="fx-idle absolute inset-0 flex items-center justify-center">Export</span>
    <span className="fx-done absolute inset-0 flex items-center justify-center">{icon} Exported</span>
  </>
);

export const FormatShowcase: React.FC = () => {
  const [fmt, setFmt] = useState<Fmt>("16:9");
  const [phase, setPhase] = useState<Phase>("rest");
  const [frame, setFrame] = useState<{ sx: number; sy: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const reduced = useRef(false);
  const started = useRef(false);

  const clear = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback(() => {
    clear();
    if (reduced.current) {
      setPhase("done");
      return;
    }
    setPhase("rest");
    const at = (ms: number, p: Phase) => timers.current.push(window.setTimeout(() => setPhase(p), ms));
    at(120, "moving");
    at(1250, "press");
    at(1520, "done");
  }, []);

  // Frame outline scale (transform) derived from the stage's measured size.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      if (!W || !H) return;
      let w: number;
      let h: number;
      if (fmt === "16:9") {
        w = Math.min(W, (H * 16) / 9);
        h = (w * 9) / 16;
      } else if (fmt === "1:1") {
        w = h = Math.min(W, H);
      } else {
        h = Math.min(H, (W * 16) / 9);
        w = (h * 9) / 16;
      }
      setFrame({ sx: w / W, sy: h / H });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fmt]);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          play();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [play]);

  const choose = (next: Fmt) => {
    if (next === fmt) return;
    setFmt(next);
    trackEvent(events.formatSelect, { format: next });
    clear();
    setPhase("rest");
    started.current = true;
    // Let the frame settle before the action runs in the new composition.
    timers.current.push(window.setTimeout(play, reduced.current ? 0 : 520));
  };

  const replay = () => {
    trackEvent(events.formatReplay, { format: fmt });
    play();
  };

  const onTabKey = (e: React.KeyboardEvent, idx: number) => {
    let n = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (idx + 1) % 3;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (idx + 2) % 3;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = 2;
    if (n < 0) return;
    e.preventDefault();
    choose(FORMATS[n].id);
    requestAnimationFrame(() => document.getElementById(`fmt-tab-${FORMATS[n].id}`)?.focus());
  };

  const active = FORMATS.find((f) => f.id === fmt)!;
  const act = (id: Fmt) => id === fmt;

  return (
    <div ref={rootRef} data-phase={phase} data-format={fmt} className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12">
      {/* Controls: stationary — the stage below has a fixed height, so nothing here moves */}
      <div>
        <div role="tablist" aria-label="Video format" className="grid grid-cols-3 gap-2 lg:grid-cols-1">
          {FORMATS.map((f, i) => {
            const on = f.id === fmt;
            return (
              <button
                key={f.id}
                id={`fmt-tab-${f.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="fmt-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => choose(f.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`flex min-h-[56px] flex-col justify-center rounded-xl border px-3 py-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal lg:min-h-[72px] lg:px-5 ${
                  on ? "border-signal bg-signal/[0.08]" : "border-paper/10 bg-ink-2 hover:border-paper/30"
                }`}
              >
                <span className={`text-base font-semibold lg:text-lg ${on ? "text-signal" : "text-paper"}`}>{f.id}</span>
                <span className="text-xs leading-tight text-paper-dim lg:text-sm">{f.name}</span>
              </button>
            );
          })}
        </div>

        <div id="fmt-panel" role="tabpanel" aria-labelledby={`fmt-tab-${fmt}`} className="mt-6 min-h-[15rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
            {active.id} · {active.tag}
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-paper">{active.name}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-paper">{active.purpose}</p>
          <p className="mt-2 text-sm leading-relaxed text-paper-dim">{active.change}</p>
          <p className="mt-4 text-sm text-paper-dim">
            <span className="font-medium text-paper">Where it plays:</span> {active.use}
          </p>
          <p className="mt-4 rounded-xl bg-ink-2 p-4 text-sm leading-relaxed text-paper-dim">
            <span className="font-medium text-paper">What you pay for:</span> a separate composition for each format,
            not a crop. Every social edit in a campaign package is delivered in all three.
          </p>
        </div>
      </div>

      {/* Stage */}
      <div>
        <div
          ref={stageRef}
          className="fx-stage relative mx-auto h-[420px] w-full overflow-hidden rounded-2xl border border-paper/10 bg-[radial-gradient(90%_80%_at_50%_0%,rgba(244,240,230,0.05),transparent_70%)] bg-ink-2 sm:h-[460px] lg:h-[500px]"
          style={{ containerType: "size" }}
        >
          {/* ---------------- 16:9 full workflow ---------------- */}
          <section
            className="fx-layer"
            data-fmt="16:9"
            data-active={act("16:9")}
            aria-hidden={!act("16:9")}
            aria-label="16:9 full workflow composition"
            style={
              {
                "--c0x": "58cqw", "--c0y": "34cqw", "--c1x": "92.5cqw", "--c1y": "7cqw",
              } as React.CSSProperties
            }
          >
            <div className="absolute bottom-0 left-0 top-0 border-r border-paper/10 bg-[#161412]" style={{ width: "19cqw", padding: "2.2cqw" }}>
              <div className="flex items-center" style={{ gap: "1cqw", marginBottom: "3.4cqw" }}>
                <span className="rounded-full bg-signal" style={{ width: "2.4cqw", height: "2.4cqw" }} />
                <span className="font-bold text-paper" style={{ fontSize: "max(11px,2.6cqw)" }}>Pulse</span>
              </div>
              {["Overview", "Reports", "Teams", "Billing", "Settings"].map((n) => (
                <div
                  key={n}
                  className={`${n === "Reports" ? "bg-signal/15 text-signal" : "text-paper-mute"} fx-in`}
                  style={{ fontSize: "max(9px,2.2cqw)", padding: "1.1cqw 1.2cqw", borderRadius: "0.8cqw", marginBottom: "0.5cqw" }}
                >
                  {n}
                </div>
              ))}
            </div>
            <div className="fx-in absolute" style={{ left: "22cqw", top: "3cqw" }}>
              <p className="text-paper-mute" style={{ fontSize: "max(9px,2cqw)" }}>Reports / Weekly report</p>
              <p className="font-bold text-paper" style={{ fontSize: "max(13px,3.6cqw)", lineHeight: 1.2 }}>Weekly report</p>
            </div>
            <div className="fx-in absolute" style={{ left: "22cqw", right: "3cqw", top: "13cqw", height: "21cqw" }}>
              <div className="h-full rounded-[1.4cqw] border border-paper/10 bg-ink-3" style={{ padding: "2cqw" }}>
                <Bars h="100%" gap="2cqw" w="8.8cqw" label="max(8px,1.7cqw)" />
              </div>
            </div>
            <div className="fx-in absolute grid grid-cols-3" style={{ left: "22cqw", right: "3cqw", top: "36.5cqw", gap: "1.6cqw" }}>
              {[["Active users", "12,480"], ["Signups", "+18%"], ["Retention", "91%"]].map(([a, b]) => (
                <div key={a} className="rounded-[1.2cqw] border border-paper/10 bg-ink-3" style={{ padding: "1cqw 1.4cqw" }}>
                  <p className="text-paper-mute" style={{ fontSize: "max(8px,1.8cqw)" }}>{a}</p>
                  <p className="font-bold text-paper" style={{ fontSize: "max(11px,3.2cqw)" }}>{b}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={replay}
              tabIndex={act("16:9") ? 0 : -1}
              aria-label="Export weekly report (plays the action)"
              className="fx-btn fx-in absolute z-20 font-bold"
              style={{ right: "3cqw", top: "2.6cqw", width: "15cqw", height: "6cqw", fontSize: "max(10px,2.5cqw)" }}
            >
              <span className="fx-ring" aria-hidden />
              <ExportLabel icon="✓" />
            </button>
            <div className="fx-ok absolute flex items-center rounded-[1.4cqw] bg-paper font-semibold text-signal-ink" style={{ right: "3cqw", bottom: "3cqw", padding: "1.4cqw 2cqw", gap: "1cqw", fontSize: "max(10px,2.4cqw)" }}>
              <span className="flex items-center justify-center rounded-full bg-signal" style={{ width: "3cqw", height: "3cqw" }}>✓</span>
              Weekly report exported
            </div>
            <Cursor size="4.4cqw" />
          </section>

          {/* ---------------- 1:1 feature spotlight ---------------- */}
          <section
            className="fx-layer"
            data-fmt="1:1"
            data-active={act("1:1")}
            aria-hidden={!act("1:1")}
            aria-label="1:1 feature spotlight composition"
            style={{ "--c0x": "44cqw", "--c0y": "66cqw", "--c1x": "83cqw", "--c1y": "46cqw" } as React.CSSProperties}
          >
            <div className="fx-in absolute flex items-center" style={{ left: "6cqw", top: "5cqw", gap: "1.4cqw" }}>
              <span className="rounded-full bg-signal" style={{ width: "3.4cqw", height: "3.4cqw" }} />
              <span className="font-bold text-paper" style={{ fontSize: "max(13px,4cqw)" }}>Pulse</span>
            </div>
            <h4 className="fx-in absolute font-bold tracking-tight text-paper" style={{ left: "6cqw", right: "6cqw", top: "13cqw", fontSize: "max(20px,8.4cqw)", lineHeight: 1.05 }}>
              Export a weekly report in one click.
            </h4>
            <div className="fx-in absolute rounded-[3cqw] border border-paper/10 bg-ink-3" style={{ left: "6cqw", right: "6cqw", top: "37cqw", height: "46cqw", padding: "4cqw" }}>
              <p className="font-bold text-paper" style={{ fontSize: "max(13px,4.4cqw)" }}>Weekly report</p>
              <div style={{ marginTop: "5cqw" }}>
                <Bars h="22cqw" gap="2.6cqw" w="9cqw" label="max(10px,2.6cqw)" />
              </div>
            </div>
            <button
              type="button"
              onClick={replay}
              tabIndex={act("1:1") ? 0 : -1}
              aria-label="Export weekly report (plays the action)"
              className="fx-btn fx-in absolute z-20 font-bold"
              style={{ right: "10cqw", top: "40cqw", width: "27cqw", height: "9cqw", fontSize: "max(13px,4.2cqw)" }}
            >
              <span className="fx-ring" aria-hidden />
              <ExportLabel icon="✓" />
            </button>
            <div className="fx-ok absolute flex items-center justify-center rounded-full bg-paper font-semibold text-signal-ink" style={{ left: "6cqw", right: "6cqw", bottom: "5cqw", height: "9cqw", gap: "2cqw", fontSize: "max(12px,4cqw)" }}>
              <span className="flex items-center justify-center rounded-full bg-signal" style={{ width: "5cqw", height: "5cqw" }}>✓</span>
              Exported · weekly-report.pdf
            </div>
            <Cursor size="6cqw" />
          </section>

          {/* ---------------- 9:16 action close-up ---------------- */}
          <section
            className="fx-layer"
            data-fmt="9:16"
            data-active={act("9:16")}
            aria-hidden={!act("9:16")}
            aria-label="9:16 action close-up composition"
            style={{ "--c0x": "70cqw", "--c0y": "100cqw", "--c1x": "74cqw", "--c1y": "150cqw" } as React.CSSProperties}
          >
            <p className="fx-in absolute font-bold leading-[1.05] tracking-tight text-paper" style={{ left: "7cqw", right: "7cqw", top: "9cqw", fontSize: "max(21px,11cqw)" }}>
              Export your weekly report
            </p>
            {/* report card: shrinks away once exported */}
            <div className="fx-in fx-fade absolute rounded-[5cqw] border border-paper/10 bg-ink-3" style={{ left: "7cqw", right: "7cqw", top: "42cqw", height: "42cqw", padding: "5cqw" }}>
              <p className="font-bold text-paper" style={{ fontSize: "max(13px,6cqw)" }}>Weekly report</p>
              <div style={{ marginTop: "4cqw" }}>
                <Bars h="21cqw" gap="2.4cqw" w="8.8cqw" label="max(9px,3.2cqw)" />
              </div>
            </div>
            {/* success close-up */}
            <div className="fx-ok absolute flex flex-col items-center text-center" style={{ left: "7cqw", right: "7cqw", top: "46cqw" }}>
              <span className="flex items-center justify-center rounded-full bg-signal text-signal-ink" style={{ width: "24cqw", height: "24cqw", fontSize: "14cqw" }}>✓</span>
              <p className="font-bold text-paper" style={{ marginTop: "5cqw", fontSize: "max(20px,10cqw)", lineHeight: 1.05 }}>Report exported</p>
              <p className="rounded-full bg-paper/10 text-paper" style={{ marginTop: "4cqw", padding: "2cqw 4cqw", fontSize: "max(12px,5.4cqw)" }}>weekly-report.pdf · ready</p>
            </div>
            {/* thumb zone */}
            <div className="fx-in pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-signal/[0.12] to-transparent" style={{ height: "62cqw" }} />
            <p className="fx-in fx-idle-only absolute text-signal/80" style={{ left: "7cqw", top: "122cqw", fontSize: "max(11px,4.6cqw)" }}>
              Thumb-reach zone
            </p>
            <button
              type="button"
              onClick={replay}
              tabIndex={act("9:16") ? 0 : -1}
              aria-label="Export weekly report (plays the action)"
              className="fx-btn fx-in absolute z-20 font-bold"
              style={{ left: "7cqw", right: "7cqw", top: "134cqw", height: "20cqw", fontSize: "max(17px,8cqw)" }}
            >
              <span className="fx-ring" aria-hidden />
              <ExportLabel icon="✓" />
            </button>
            <Cursor size="9cqw" />
          </section>

          {/* Frame boundary: animates between compositions with transform only */}
          <div
            aria-hidden
            className="fx-guide pointer-events-none absolute inset-0 z-40 rounded-[14px] border-2 border-signal/80"
            style={{ transform: frame ? `scale(${frame.sx}, ${frame.sy})` : "scale(1)", opacity: frame ? 1 : 0 }}
          />

          <span className="pointer-events-none absolute left-3 top-3 z-50 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium text-paper-dim backdrop-blur-sm">
            Studio sample · not client work
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-[32rem] text-xs leading-relaxed text-paper-mute">
            An original interactive demo with a made-up product (“Pulse”). It shows how we reframe one action for three
            screens; it is not a commissioned client project.
          </p>
          <button
            type="button"
            onClick={replay}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-paper/25 px-5 text-sm font-semibold text-paper transition-colors hover:border-signal hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            {phase === "done" ? "Replay the action" : phase === "rest" ? "Play the action" : "Playing…"}
          </button>
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {phase === "done" ? "Success: weekly report exported." : ""}
        </p>
      </div>
    </div>
  );
};
