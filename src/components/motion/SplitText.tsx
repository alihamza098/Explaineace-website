import React from "react";
import { Reveal } from "@/components/motion/Reveal";

interface SplitTextProps {
  /** Plain text; words are split on spaces. Wrap a phrase in *asterisks* to render it as the serif accent. */
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  accentClassName?: string;
  delay?: number;
}

/**
 * Headline whose words rise out of individual masks with a stagger when
 * scrolled into view. The full sentence is server-rendered, so crawlers and
 * no-JS visitors read it normally.
 */
export const SplitText: React.FC<SplitTextProps> = ({
  text,
  as = "h2",
  className = "",
  accentClassName = "serif-accent text-brand-600",
  delay = 0,
}) => {
  let index = 0;
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);

  return (
    <Reveal as={as} variant="words" delay={delay} className={className}>
      {parts.map((part, partIdx) => {
        const isAccent = part.startsWith("*") && part.endsWith("*");
        const words = (isAccent ? part.slice(1, -1) : part).split(" ").filter(Boolean);
        return (
          <React.Fragment key={partIdx}>
            {words.map((word, wordIdx) => {
              const i = index++;
              return (
                <React.Fragment key={`${partIdx}-${wordIdx}`}>
                  <span className="split-word">
                    <span
                      className={isAccent ? accentClassName : undefined}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      {word}
                    </span>
                  </span>{" "}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </Reveal>
  );
};
