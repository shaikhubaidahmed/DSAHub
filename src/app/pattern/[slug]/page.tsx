import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ProblemRow } from "@/components/problem-row";
import { PatternProgress } from "@/components/pattern-progress";
import { categorySummaries, getCategory } from "@/lib/data";

interface PatternPageProps { params: { slug: string } }

export function generateStaticParams() {
  return categorySummaries.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: PatternPageProps): Metadata {
  const category = getCategory(params.slug);
  return { title: category?.name ?? "Pattern" };
}

export default function PatternPage({ params }: PatternPageProps) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  return (
    <>
      <div className="breadcrumb"><Link href="/patterns">Patterns</Link><ChevronRight size={12} /><span>{category.name}</span></div>
      <header className="detail-head"><div><span className="eyebrow">Pattern / {String(categorySummaries.findIndex((item) => item.slug === category.slug) + 1).padStart(2, "0")}</span><h1>{category.name}</h1><div className="detail-head-meta"><span className="source-badge source-neetcode">N {category.neetcode}</span><span className="source-badge source-striver">S {category.striver}</span><span className="text-muted text-xs">{category.shared} shared</span></div></div><aside className="detail-aside"><span className="detail-aside-label">Pattern brief</span><strong>{category.count} problems</strong><p>{category.description}</p><PatternProgress problems={category.problems} /></aside></header>
      <div className="detail-section mt-10"><div className="section-heading"><div><h2>Work the sequence</h2><p>Use the status control to mark your place locally.</p></div><Link href="/problems" className="text-link">All problems <ArrowRight size={13} /></Link></div><div className="problem-list">{category.problems.map((problem, index) => <ProblemRow key={problem.id} problem={problem} index={index} />)}</div></div>
      <div className="detail-footer"><Link href="/patterns" className="pager-link"><span className="pager-label"><ArrowLeft size={12} /> Pattern map</span>Back to all patterns</Link><Link href={`/problem/${category.problems[0].slug}`} className="pager-link text-right"><span className="pager-label justify-end">Start this pattern <ArrowRight size={12} /></span>{category.problems[0].title}</Link></div>
    </>
  );
}
