import React from "react";

interface WordRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

/** Shows the first word statically (rotation animation removed). */
export const WordRotator: React.FC<WordRotatorProps> = ({ words, className = "" }) => (
  <span className={className}>{words[0]}</span>
);
