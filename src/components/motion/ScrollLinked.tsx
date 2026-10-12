import React from "react";

interface ScrollLinkedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  end?: number;
}

/** Static wrapper: scroll-linked effects removed, progress is fixed at 1 (final state). */
export const ScrollLinked: React.FC<ScrollLinkedProps> = ({
  children,
  end: _end,
  className = "",
  style,
  ...rest
}) => (
  <div className={className} style={{ ...style, ["--p" as string]: 1 }} {...rest}>
    {children}
  </div>
);
