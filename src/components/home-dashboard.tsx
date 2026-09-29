"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Layers3 } from "lucide-react";
import { categorySummaries, collectionTotals } from "@/lib/data";
import { countCompleted, countInProgress, progressPercent } from "@/lib/progress";
import { problems } from "@/data/problems";
import { useProgress } from "@/components/providers";
import { CompactProblemLink } from "@/components/problem-row";
import { ProgressBar } from "@/components/progress-bar";

export function HomeDashboard() {
  const { progress } = useProgress();
  const completed = countCompleted(problems, progress);
  const inProgress = countInProgress(problems, progress);
  const nextProblems = problems.filter((problem) => progress[problem.id] !== "completed").slice(0, 5);
  const completion = progressPercent(completed, collectionTotals.total);

  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Field notes / DSA practice system</span>
            <h1 className="display-title">Build the habit.<br /><em>Keep the signal.</em></h1>
            <p className="lede">A deliberate path through the deduplicated NeetCode 150 and Striver patterns reference. Browse by idea, practice by pattern, and keep your own progress local.</p>
            <div className="hero-actions">
              <Link href="/problems" className="button-primary">Open problem explorer <ArrowRight size={15} /></Link>
              <Link href="/patterns" className="button-secondary">Browse patterns</Link>
            </div>
          </div>
          <aside className="hero-side">
            <span className="hero-side-label">Collection size</span>
            <div className="hero-side-number">{collectionTotals.total}</div>
            <p className="hero-side-copy">verified entries, organized into {categorySummaries.length} pattern groups.</p>
            <ProgressBar value={completion} label={`${completed} completed`} />
          </aside>
        </div>
      </section>

      <section className="home-stats" aria-label="Collection totals">
        <div className="stat-block"><div className="stat-kicker">Total entries</div><div className="stat-value">{collectionTotals.total}</div><div className="stat-caption">Deduplicated reference</div></div>
        <div className="stat-block"><div className="stat-kicker">NeetCode</div><div className="stat-value">{collectionTotals.neetcode}</div><div className="stat-caption">Explicit N markers</div></div>
        <div className="stat-block"><div className="stat-kicker">Striver</div><div className="stat-value">{collectionTotals.striver}</div><div className="stat-caption">Explicit S markers</div></div>
        <div className="stat-block"><div className="stat-kicker">Shared</div><div className="stat-value">{collectionTotals.shared}</div><div className="stat-caption">Both source badges</div></div>
      </section>
      <p className="source-note">The PDF headline says 179 Striver entries, while its explicit badges account for 178. The hub uses the problem-level badges as the source of truth.</p>

      <section className="home-section">
        <div className="section-heading"><div><h2>Pick a pattern</h2><p>Strong hierarchy, practical repetition, no noise.</p></div><Link className="text-link" href="/patterns">View all patterns <ArrowRight size={13} /></Link></div>
        <div className="category-grid">
          {categorySummaries.slice(0, 6).map((category, index) => <Link className="category-card" href={`/pattern/${category.slug}`} key={category.slug}><span className="category-number">{String(index + 1).padStart(2, "0")}</span><span className="category-count">{category.count} problems</span><h3>{category.name}</h3><p>{category.description}</p><ArrowRight className="category-card-arrow" size={16} /></Link>)}
        </div>
      </section>

      <section className="home-section split-section">
        <div>
          <div className="section-heading"><div><h2>Keep moving</h2><p>{inProgress ? `${inProgress} problem${inProgress === 1 ? "" : "s"} in progress.` : "Start with the first unresolved problem."}</p></div></div>
          <div className="panel"><div className="panel-heading"><h3>Next in the queue</h3><p>Continue from the collection order whenever you need a nudge.</p></div><div className="compact-list">{nextProblems.map((problem) => <CompactProblemLink key={problem.id} problem={problem} />)}</div></div>
        </div>
        <div>
          <div className="section-heading"><div><h2>What is tracked</h2><p>Saved only in this browser.</p></div></div>
          <div className="panel"><div className="panel-heading"><h3><CheckCircle2 size={16} /> Your practice state</h3><p>Not started, in progress, and completed statuses persist locally with no account.</p></div><div className="compact-list"><div className="compact-problem-link"><span className="compact-problem-copy"><span className="compact-problem-title">Completed</span><span className="compact-problem-category">{completed} / {collectionTotals.total} problems</span></span><strong>{completion}%</strong></div><div className="compact-problem-link"><span className="compact-problem-copy"><span className="compact-problem-title">Patterns</span><span className="compact-problem-category">{categorySummaries.length} focused groups</span></span><Layers3 size={16} /></div><div className="compact-problem-link"><span className="compact-problem-copy"><span className="compact-problem-title">Platforms</span><span className="compact-problem-category">LeetCode first, source links preserved</span></span><BookOpen size={16} /></div></div></div>
        </div>
      </section>
    </>
  );
}
