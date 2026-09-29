"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { problems } from "@/data/problems";
import { categorySummaries } from "@/lib/data";
import { useProgress } from "@/components/providers";
import { ProblemRow } from "@/components/problem-row";
import { FilterSelect } from "@/components/filter-select";

export function ProblemsExplorer() {
  const { progress } = useProgress();
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [sort, setSort] = useState("collection");

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery) setQuery(initialQuery);
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matchingProblems = problems.filter((problem) => {
      const matchesQuery = !normalized || [problem.title, problem.category, problem.sources.join(" "), problem.difficulty ?? "", Object.keys(problem.links).join(" ")].join(" ").toLowerCase().includes(normalized);
      const matchesSource = source === "all" || problem.sources.includes(source as "neetcode" | "striver") || (source === "shared" && problem.sources.length === 2);
      const matchesCategory = category === "all" || problem.category === category;
      const matchesDifficulty = difficulty === "all" || problem.difficulty === difficulty;
      const matchesStatus = status === "all" || (progress[problem.id] ?? "not-started") === status;
      const matchesPlatform = platform === "all" || (platform === "video" ? Boolean(problem.links.neetcodeVideo || problem.links.striverVideo) : Boolean(problem.links[platform as keyof typeof problem.links]));
      return matchesQuery && matchesSource && matchesCategory && matchesDifficulty && matchesStatus && matchesPlatform;
    });
    return matchingProblems.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "pattern") return `${a.category}${a.title}`.localeCompare(`${b.category}${b.title}`);
      return problems.indexOf(a) - problems.indexOf(b);
    });
  }, [category, difficulty, platform, progress, query, sort, source, status]);

  const clearFilters = () => { setQuery(""); setSource("all"); setCategory("all"); setStatus("all"); setPlatform("all"); setDifficulty("all"); setSort("collection"); };

  return (
    <>
      <header className="page-intro"><div><span className="eyebrow">Collection / 01</span><h1>Problem explorer</h1><p>Search by title, pattern, or source. Every row keeps the original NeetCode and Striver relationship visible.</p></div><div className="page-intro-aside"><strong>{filtered.length}</strong><span>matching entries</span></div></header>
      <div className="filter-bar" role="search" aria-label="Filter problems">
        <label className="filter-input flex items-center gap-2"><Search size={15} className="text-muted" /><span className="sr-only">Search problems</span><input className="w-full bg-transparent outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, topic, or source" /></label>
        <FilterSelect label="Source" value={source} onChange={setSource} options={[{ value: "all", label: "All sources" }, { value: "neetcode", label: "NeetCode" }, { value: "striver", label: "Striver" }, { value: "shared", label: "Shared" }]} />
        <FilterSelect label="Pattern" value={category} onChange={setCategory} options={[{ value: "all", label: "All patterns" }, ...categorySummaries.map((item) => ({ value: item.name, label: item.name }))]} />
        <FilterSelect label="Difficulty" value={difficulty} onChange={setDifficulty} options={[{ value: "all", label: "All difficulty" }, { value: "easy", label: "Easy" }, { value: "medium", label: "Medium" }, { value: "hard", label: "Hard" }]} />
        <FilterSelect label="Status" value={status} onChange={setStatus} options={[{ value: "all", label: "All status" }, { value: "completed", label: "Completed" }, { value: "not-started", label: "Not completed" }]} />
        <FilterSelect label="Platform" value={platform} onChange={setPlatform} options={[{ value: "all", label: "All platforms" }, { value: "leetcode", label: "LeetCode" }, { value: "gfg", label: "GFG" }, { value: "takeuforward", label: "Striver / TUF" }, { value: "neetcode", label: "NeetCode" }, { value: "video", label: "Any video" }, { value: "neetcodeVideo", label: "NeetCode video" }, { value: "striverVideo", label: "Striver video" }]} />
        <FilterSelect label="Sort problems" value={sort} onChange={setSort} options={[{ value: "collection", label: "Collection order" }, { value: "title", label: "Title A–Z" }, { value: "pattern", label: "Pattern order" }]} />
      </div>
      <div className="explorer-toolbar"><span><strong>{filtered.length}</strong> of {problems.length} entries</span><button className="clear-button" type="button" onClick={clearFilters}><Filter size={12} aria-hidden="true" /> Clear filters</button></div>
      <div className="problem-list">{filtered.length ? filtered.map((problem, index) => <ProblemRow key={problem.id} problem={problem} index={index} />) : <div className="empty-state"><strong>No problems match those filters.</strong>Try a broader title, pattern, or source.</div>}</div>
    </>
  );
}
