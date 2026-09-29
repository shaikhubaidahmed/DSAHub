import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { Problem } from "@/lib/types";
import { PlatformLinks } from "@/components/platform-links";
import { SourceBadges } from "@/components/source-badges";
import { CompletionToggle } from "@/components/completion-toggle";
import { DifficultyTag } from "@/components/difficulty-tag";

export function ProblemRow({ problem, index }: { problem: Problem; index: number }) {
  return (
    <article className="problem-row">
      <div className="problem-index">{String(index + 1).padStart(3, "0")}</div>
      <div className="problem-main">
        <div className="problem-title-line">
          <Link href={`/problem/${problem.slug}`} className="problem-title">{problem.title}</Link>
          <SourceBadges sources={problem.sources} />
          <DifficultyTag difficulty={problem.difficulty} />
        </div>
        <div className="problem-meta"><span>{problem.category}</span>{problem.note ? <span className="note-marker">Variant note</span> : null}</div>
      </div>
      <PlatformLinks links={problem.links} compact />
      <CompletionToggle problem={problem} />
      <Link href={`/problem/${problem.slug}`} className="row-arrow" aria-label={`Open ${problem.title}`}><ChevronRight size={17} /></Link>
    </article>
  );
}

export function CompactProblemLink({ problem }: { problem: Problem }) {
  return (
    <Link href={`/problem/${problem.slug}`} className="compact-problem-link">
      <span className="compact-problem-copy"><span className="compact-problem-title">{problem.title}</span><span className="compact-problem-category">{problem.category}</span></span>
      <ArrowUpRight size={15} />
    </Link>
  );
}
