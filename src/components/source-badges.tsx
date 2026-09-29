import type { ProblemSource } from "@/lib/types";

const labels: Record<ProblemSource, string> = { neetcode: "N", striver: "S" };

export function SourceBadges({ sources }: { sources: ProblemSource[] }) {
  return (
    <span className="source-badges" aria-label={`Sources: ${sources.map((source) => source === "neetcode" ? "NeetCode" : "Striver").join(" and ")}`}>
      {sources.map((source) => <span key={source} className={`source-badge source-${source}`}>{labels[source]}</span>)}
    </span>
  );
}
