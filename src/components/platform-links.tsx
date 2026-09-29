import { ArrowUpRight } from "lucide-react";
import type { ProblemLinks } from "@/lib/types";

const platformLabels: Record<keyof ProblemLinks, string> = {
  leetcode: "LeetCode",
  gfg: "GFG",
  neetcode: "NeetCode",
  takeuforward: "Striver",
  youtube: "YouTube",
};

export function PlatformLinks({ links, compact = false }: { links: ProblemLinks; compact?: boolean }) {
  const order: (keyof ProblemLinks)[] = ["leetcode", "gfg", "takeuforward", "neetcode", "youtube"];
  return (
    <div className={`platform-links ${compact ? "is-compact" : ""}`}>
      {order.filter((platform) => links[platform]).map((platform) => (
        <a key={platform} href={links[platform]} target="_blank" rel="noreferrer" className={`platform-link platform-${platform}`}>
          {platformLabels[platform]} <ArrowUpRight size={12} aria-hidden="true" /><span className="sr-only">Opens in a new tab</span>
        </a>
      ))}
    </div>
  );
}
