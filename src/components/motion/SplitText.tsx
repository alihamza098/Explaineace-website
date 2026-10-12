import React from "react";

interface SplitTextProps {
  /** Plain text. Wrap a phrase in *asterisks* to render it as the serif accent. */
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  accentClassName?: string;
  delay?: number;
}

/** Headline with an optional accent phrase; word-by-word animation removed. */
export const SplitText: React.FC<SplitTextProps> = ({
  text,
  as: Tag = "h2",
  className = "",
  accentClassName = "serif-accent text-brand-600",
}) => {
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  const El = Tag as React.ElementType;
  return (
    <El className={className}>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className={accentClassName}>
            {part.slice(1, -1)}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </El>
  );
};
