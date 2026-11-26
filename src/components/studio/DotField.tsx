"use client";

import React, { useEffect, useRef } from "react";

/**
 * Interactive dot field behind the hero.
 *
 * - A faint grid of dots. Ripples radiate from the hero card (the "stage"), like a pulse.
 * - Dots near the pointer swell, push away slightly and tint violet; with no pointer a soft
 *   idle path stands in so the field never looks dead.
 * - The area behind the hero copy is dimmed so type stays readable.
 * - Pauses when offscreen or the tab is hidden. Reduced motion: one static frame, no loop,
 *   no pointer tracking.
 */
type Props = {
  /** Element the ripples radiate from. */
  sourceRef: React.RefObject<HTMLElement>;
  /** Element whose area is dimmed so text stays readable. */
  quietRef: React.RefObject<HTMLElement>;
};

const BASE: [number, number, number] = [150, 170, 215];
const CYAN: [number, number, number] = [34, 228, 245];
const VIOLET: [number, number, number] = [168, 85, 247];

export const DotField: React.FC<Props> = ({ sourceRef, quietRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    let mouse: [number, number] | null = null;
    let lastMove = -1e9;
    let smooth: [number, number] | null = null;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = host.clientWidth;
      H = host.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce || !running) draw(0, null);
    };

    const rel = (el: HTMLElement | null) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const h = host.getBoundingClientRect();
      return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height };
    };

    function draw(t: number, cursor: [number, number] | null) {
      const sp = W < 760 ? 20 : 24;
      ctx!.clearRect(0, 0, W, H);
      const s = rel(sourceRef.current);
      const q = rel(quietRef.current);
      const src: [number, number] = s ? [s.x + s.w / 2, s.y + s.h / 2] : [W * 0.72, H * 0.5];
      const P = 2.2; // ripple period (s)
      const speed = 520;
      const life = 2.8;
      const sigma2 = 2 * 150 * 150;
      const cols = Math.ceil(W / sp) + 1;
      const rows = Math.ceil(H / sp) + 1;
      const ox = (W - (cols - 1) * sp) / 2;
      const oy = (H - (rows - 1) * sp) / 2;
      const base = ((t % P) + P) % P;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          let x = ox + i * sp;
          let y = oy + j * sp;
          let sw = 0;
          if (cursor) {
            const dx = x - cursor[0];
            const dy = y - cursor[1];
            const d2 = dx * dx + dy * dy;
            sw = Math.exp(-d2 / sigma2);
            const d = Math.sqrt(d2) || 1;
            x += (dx / d) * 14 * sw;
            y += (dy / d) * 14 * sw;
          }
          const ddx = x - src[0];
          const ddy = y - src[1];
          const d0 = Math.sqrt(ddx * ddx + ddy * ddy);
          let ring = 0;
          for (let k = 0; k < 3; k++) {
            const age = base + k * P;
            if (age > life) continue;
            const g = (d0 - age * speed) / 46;
            ring += Math.exp(-g * g) * (1 - age / life) ** 2;
          }
          let a = 0.16 + 0.34 * ring + 0.4 * sw;
          if (q) {
            // dim behind the copy so text stays readable
            const qx = (x - (q.x + q.w / 2)) / (q.w * 0.62);
            const qy = (y - (q.y + q.h / 2)) / (q.h * 0.62);
            a *= 1 - 0.82 * Math.exp(-(qx * qx + qy * qy) * 1.6);
          }
          a *= Math.min(1, Math.min(x, W - x) / 140, Math.min(y, H - y) / 100) ** 0.8;
          if (a <= 0.01) continue;
          const mRing = Math.min(1, ring * 0.9);
          const mCur = Math.min(1, sw * 1.2);
          const target = mCur > mRing ? VIOLET : CYAN;
          const m = Math.max(mRing, mCur);
          const r = Math.round(BASE[0] + (target[0] - BASE[0]) * m);
          const g2 = Math.round(BASE[1] + (target[1] - BASE[1]) * m);
          const b = Math.round(BASE[2] + (target[2] - BASE[2]) * m);
          ctx!.fillStyle = `rgba(${r},${g2},${b},${Math.min(1, a).toFixed(3)})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 1.2 + 3 * sw + 2 * ring, 0, 6.2832);
          ctx!.fill();
        }
      }
    }

    const idle = (t: number): [number, number] => {
      const a = (2 * Math.PI * t) / 16;
      return [W / 2 + 0.32 * W * Math.sin(a + 0.6), H * 0.55 + 0.22 * H * Math.sin(2 * a)];
    };

    const frame = (now: number) => {
      raf = 0;
      if (!running) return;
      const sec = (now - start) / 1000;
      const target = mouse && now - lastMove < 3000 ? mouse : idle(sec);
      smooth = smooth ? [smooth[0] + (target[0] - smooth[0]) * 0.12, smooth[1] + (target[1] - smooth[1]) * 0.12] : target;
      draw(sec, smooth);
      raf = requestAnimationFrame(frame);
    };

    const setRunning = () => {
      const want = !reduce && visible && !document.hidden;
      if (want && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!want && running) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse = [e.clientX - r.left, e.clientY - r.top];
      lastMove = performance.now();
    };
    const onLeave = () => {
      mouse = null;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      setRunning();
    });
    io.observe(host);
    document.addEventListener("visibilitychange", setRunning);
    window.addEventListener("resize", resize);
    if (!reduce) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    }
    resize();
    setRunning();

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", setRunning);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [sourceRef, quietRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
};
