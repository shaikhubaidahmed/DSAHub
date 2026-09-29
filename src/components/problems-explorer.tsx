"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { problems } from "@/data/problems";
import { categorySummaries } from "@/lib/data";
import { useProgress } from "@/components/providers";
import { ProblemRow } from "@/components/problem-row";

export function ProblemsExplorer() {
  const { progress } = useProgress();
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [sort, setSort] = useState("collection");

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery) setQuery(initialQuery);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matchingProblems = problems.filter((problem) => {
      const matchesQuery = !normalized || [problem.title, problem.category, problem.sources.join(" "), Object.keys(problem.links).join(" ")].join(" ").toLowerCase().includes(normalized);
      const matchesSource = source === "all" || problem.sources.includes(source as "neetcode" | "striver") || (source === "shared" && problem.sources.length === 2);
      const matchesCategory = category === "all" || problem.category === category;
      const matchesStatus = status === "all" || (progress[problem.id] ?? "not-started") === status;
      const matchesPlatform = platform === "all" || Boolean(problem.links[platform as keyof typeof problem.links]);
      return matchesQuery && matchesSource && matchesCategory && matchesStatus && matchesPlatform;
    });
    return matchingProblems.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "pattern") return `${a.category}${a.title}`.localeCompare(`${b.category}${b.title}`);
      return problems.indexOf(a) - problems.indexOf(b);
    });
  }, [category, platform, progress, query, sort, source, status]);

  const clearFilters = () => { setQuery(""); setSource("all"); setCategory("all"); setStatus("all"); setPlatform("all"); setSort("collection"); };

  return (
    <>
      <header className="page-intro"><div><span className="eyebrow">Collection / 01</span><h1>Problem explorer</h1><p>Search by title, pattern, or source. Every row keeps the original NeetCode and Striver relationship visible.</p></div><div className="page-intro-aside"><strong>{filtered.length}</strong><span>matching entries</span></div></header>
      <div className="filter-bar" role="search" aria-label="Filter problems">
        <label className="filter-input flex items-center gap-2"><Search size={15} className="text-muted" /><span className="sr-only">Search problems</span><input className="w-full bg-transparent outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, topic, or source" /></label>
        <label><span className="sr-only">Source</span><select className="filter-select w-full" value={source} onChange={(event) => setSource(event.target.value)}><option value="all">All sources</option><option value="neetcode">NeetCode</option><option value="striver">Striver</option><option value="shared">Shared</option></select></label>
        <label><span className="sr-only">Pattern</span><select className="filter-select w-full" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All patterns</option>{categorySummaries.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}</select></label>
        <label><span className="sr-only">Status</span><select className="filter-select w-full" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All status</option><option value="not-started">Not started</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select></label>
        <label><span className="sr-only">Platform</span><select className="filter-select w-full" value={platform} onChange={(event) => setPlatform(event.target.value)}><option value="all">All platforms</option><option value="leetcode">LeetCode</option><option value="gfg">GFG</option><option value="takeuforward">Striver / TUF</option><option value="neetcode">NeetCode</option><option value="youtube">YouTube</option></select></label>
        <label><span className="sr-only">Sort problems</span><select className="filter-select w-full" value={sort} onChange={(event) => setSort(event.target.value)}><option value="collection">Collection order</option><option value="title">Title A–Z</option><option value="pattern">Pattern order</option></select></label>
      </div>
      <div className="explorer-toolbar"><span><strong>{filtered.length}</strong> of {problems.length} entries</span><button className="clear-button" type="button" onClick={clearFilters}><Filter size={12} aria-hidden="true" /> Clear filters</button></div>
      <div className="problem-list">{filtered.length ? filtered.map((problem, index) => <ProblemRow key={problem.id} problem={problem} index={index} />) : <div className="empty-state"><strong>No problems match those filters.</strong>Try a broader title, pattern, or source.</div>}</div>
    </>
  );
}
