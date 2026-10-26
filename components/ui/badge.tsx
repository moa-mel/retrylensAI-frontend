import type { HTMLAttributes } from "react";

type BadgeTone = "neutral" | "success" | "danger" | "warning";

export function Badge({ tone = "neutral", className = "", ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  const toneClass = tone === "neutral" ? "" : `badge-${tone}`;
  return <span className={`badge ${toneClass} ${className}`.trim()} {...props} />;
}