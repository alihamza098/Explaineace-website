"use client";

import React, { useEffect, useState } from "react";

interface WordRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

/** Cycles through words with a vertical slot-machine swap. First word is server-rendered. */
export const WordRotator: React.FC<WordRotatorProps> = ({ words, interval = 2400, className = "" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  const prev = (index - 1 + words.length) % words.length;

  return (
    <span className={`word-rotator ${className}`} aria-live="polite">
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index || undefined}
          data-state={i === index ? "in" : i === prev ? "out" : "next"}
          className="whitespace-nowrap"
        >
          {word}
        </span>
      ))}
    </span>
  );
};
