import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categorySummaries } from "@/lib/data";

export const metadata: Metadata = { title: "Patterns" };

export default function PatternsPage() {
  return (
    <>
      <header className="page-intro"><div><span className="eyebrow">Map / 17 patterns</span><h1>Patterns, not piles.</h1><p>Choose a mental model before choosing a problem. Each group follows the source order and keeps shared entries unified.</p></div><div className="page-intro-aside"><strong>{categorySummaries.length}</strong><span>pattern groups</span></div></header>
      <div className="pattern-grid">
        {categorySummaries.map((category, index) => <Link key={category.slug} href={`/pattern/${category.slug}`} className="pattern-card"><div className="pattern-card-top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight size={15} /></div><h2>{category.name}</h2><p>{category.description}</p><div className="pattern-card-footer"><span><strong>{category.count}</strong> problems</span><span><strong>{category.shared}</strong> shared</span></div></Link>)}
      </div>
    </>
  );
}
