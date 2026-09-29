import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PlatformLinks } from "@/components/platform-links";
import { SourceBadges } from "@/components/source-badges";
import { StatusSelect } from "@/components/status-select";
import { CompactProblemLink } from "@/components/problem-row";
import { categorySummaries, getAdjacentProblems, getProblem } from "@/lib/data";
import { problems } from "@/data/problems";

interface ProblemPageProps { params: { slug: string } }

export function generateStaticParams() {
  return problems.map((problem) => ({ slug: problem.slug }));
}

export function generateMetadata({ params }: ProblemPageProps): Metadata {
  const problem = getProblem(params.slug);
  return {
    title: problem?.title ?? "Problem",
    description: problem ? `${problem.title} in ${problem.category}. Practice with the preserved NeetCode and Striver references.` : undefined,
  };
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const problem = getProblem(params.slug);
  if (!problem) notFound();
  const adjacent = getAdjacentProblems(problem);
  const related = problems.filter((candidate) => candidate.category === problem.category && candidate.slug !== problem.slug).slice(0, 4);

  return (
    <>
      <div className="breadcrumb"><Link href="/patterns">Patterns</Link><ChevronRight size={12} /><Link href={`/pattern/${categorySummaries.find((category) => category.name === problem.category)?.slug}`}>{problem.category}</Link><ChevronRight size={12} /><span>{problem.title}</span></div>
      <header className="detail-head"><div><span className="eyebrow">Problem / {String(problems.findIndex((item) => item.id === problem.id) + 1).padStart(3, "0")}</span><h1>{problem.title}</h1><div className="detail-head-meta"><SourceBadges sources={problem.sources} /><span className="text-muted text-xs">{problem.category}</span><StatusSelect problem={problem} /></div></div><aside className="detail-aside"><span className="detail-aside-label">Practice links</span><strong>Start with the canonical page.</strong><PlatformLinks links={problem.links} /></aside></header>
      <div className="detail-grid"><div><section className="detail-section"><h2>Practice</h2><div className="resource-panel"><PlatformLinks links={problem.links} /></div></section>{problem.note ? <section className="detail-section"><h2>Source note</h2><div className="variant-note">{problem.note}</div></section> : null}<section className="detail-section"><h2>Related in {problem.category}</h2><div className="related-list">{related.map((item) => <CompactProblemLink key={item.id} problem={item} />)}</div></section></div><aside><div className="panel"><div className="panel-heading"><h3>Keep the thread</h3><p>Move through this pattern in source order.</p></div><div className="compact-list"><div className="compact-problem-link"><span className="compact-problem-copy"><span className="compact-problem-title">Source markers</span><span className="compact-problem-category">{problem.sources.map((source) => source === "neetcode" ? "NeetCode" : "Striver").join(" + ")}</span></span><SourceBadges sources={problem.sources} /></div><div className="compact-problem-link"><span className="compact-problem-copy"><span className="compact-problem-title">Pattern</span><span className="compact-problem-category">{problem.category}</span></span><ChevronRight size={15} /></div></div></div></aside></div>
      <div className="detail-footer"><div>{adjacent.previous ? <Link href={`/problem/${adjacent.previous.slug}`} className="pager-link"><span className="pager-label"><ArrowLeft size={12} /> Previous</span>{adjacent.previous.title}</Link> : <span />}</div><div className="text-right">{adjacent.next ? <Link href={`/problem/${adjacent.next.slug}`} className="pager-link"><span className="pager-label justify-end">Next <ArrowRight size={12} /></span>{adjacent.next.title}</Link> : null}</div></div>
    </>
  );
}
