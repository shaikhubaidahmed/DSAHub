"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { categorySummaries, collectionTotals } from "@/lib/data";
import { countCompleted, progressPercent } from "@/lib/progress";
import { problems } from "@/data/problems";
import { useProgress } from "@/components/providers";
import { ProgressRing } from "@/components/progress-ring";
import { ProgressRings } from "@/components/progress-rings";

export function ProgressDashboard() {
  const { progress, resetProgress } = useProgress();
  const completed = countCompleted(problems, progress);
  const confirmReset = () => { if (window.confirm("Reset all locally saved progress?")) resetProgress(); };

  return (
    <>
      <header className="page-intro"><div><span className="eyebrow">Review / local only</span><h1>Make the work visible.</h1><p>Progress is persisted in this browser with no account and no network. Use the pattern breakdown to choose what to practice next.</p></div><div className="page-intro-aside"><strong>{completed}</strong><span>completed problems</span></div></header>
      <div className="progress-overview"><div className="progress-card primary"><ProgressRings progress={progress} /></div><div className="progress-card"><div className="progress-card-label">Completed</div><div className="progress-card-value">{progressPercent(completed, collectionTotals.total)}%</div><div className="progress-card-copy">{completed} of {collectionTotals.total} problems.</div></div><div className="progress-card"><div className="progress-card-label">Remaining</div><div className="progress-card-value">{collectionTotals.total - completed}</div><div className="progress-card-copy">Plenty of runway.</div></div></div>
      <div className="section-heading"><div><h2>Pattern breakdown</h2><p>Completion updates as you mark problem statuses in the explorer.</p></div><button className="reset-progress" type="button" onClick={confirmReset}><RotateCcw size={12} /> Reset local progress</button></div>
      <div className="progress-table"><div className="progress-row progress-row-head"><div>Pattern</div><div>Completed</div><div>Remaining</div><div>Problems</div><div>Progress</div></div>{categorySummaries.map((category) => { const done = countCompleted(category.problems, progress); const percentage = progressPercent(done, category.count); return <div className="progress-row" key={category.slug}><div><div className="progress-pattern-name"><Link href={`/pattern/${category.slug}`}>{category.name}</Link></div><div className="progress-pattern-meta">N {category.neetcode} · S {category.striver} · {category.shared} shared</div></div><div>{done}</div><div>{category.count - done}</div><div>{category.count}</div><div><ProgressRing value={percentage} /></div></div>; })}</div>
      <div className="detail-footer"><Link className="pager-link" href="/problems"><span className="pager-label">Next move <ArrowRight size={12} /></span>Open the problem explorer</Link></div>
    </>
  );
}
