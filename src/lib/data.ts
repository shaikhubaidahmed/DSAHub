import { problems } from "@/data/problems";
import type { CategorySummary, Problem } from "@/lib/types";

const categoryDescriptions: Record<string, string> = {
  "Arrays & Hashing": "Build the foundations: frequency maps, prefix ideas, and array invariants.",
  "Two Pointers": "Learn to move through ordered data with deliberate left and right boundaries.",
  "Sliding Window": "Turn contiguous range problems into a sequence of efficient local updates.",
  "Stacks & Queues": "Recognize monotonic structure, parsing patterns, and stateful one-pass scans.",
  "Binary Search": "Search sorted spaces, answer feasibility questions, and tame rotated data.",
  "Linked Lists": "Practice pointer choreography, in-place transformations, and cache design.",
  "Binary Trees & BSTs": "Traverse, serialize, and reason about recursive structure with confidence.",
  "Heaps & Priority Queues": "Keep the next best candidate close with heaps, streams, and scheduling.",
  "Recursion & Backtracking": "Explore decision trees cleanly while pruning work that cannot succeed.",
  Tries: "Use prefix structure to make string lookup, counting, and XOR queries precise.",
  "Graphs: Traversal & Connectivity": "Move from traversal to components, cycles, ordering, and connectivity.",
  "Graphs: Paths & Spanning Trees": "Compare shortest paths, minimum spanning trees, and union-find thinking.",
  "Dynamic Programming": "Model overlapping subproblems and make state transitions explicit.",
  "Greedy & Intervals": "Choose local decisions that stay globally safe across schedules and ranges.",
  "Math & Geometry": "Translate spatial and numerical constraints into compact algorithms.",
  "Bit Manipulation": "Use binary representation to compress state and expose useful invariants.",
  "String Matching": "Understand classic pattern matching algorithms beyond library calls.",
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const categorySummaries: CategorySummary[] = Array.from(
  new Set(problems.map((problem) => problem.category)),
).map((name) => {
  const categoryProblems = problems.filter((problem) => problem.category === name);
  return {
    name,
    slug: slugify(name),
    description: categoryDescriptions[name] ?? "A focused set of high-value DSA practice problems.",
    count: categoryProblems.length,
    neetcode: categoryProblems.filter((problem) => problem.sources.includes("neetcode")).length,
    striver: categoryProblems.filter((problem) => problem.sources.includes("striver")).length,
    shared: categoryProblems.filter((problem) => problem.sources.length === 2).length,
    problems: categoryProblems,
  };
});

export const collectionTotals = {
  total: problems.length,
  neetcode: problems.filter((problem) => problem.sources.includes("neetcode")).length,
  striver: problems.filter((problem) => problem.sources.includes("striver")).length,
  shared: problems.filter((problem) => problem.sources.length === 2).length,
};

export function getCategory(slug: string) {
  return categorySummaries.find((category) => category.slug === slug);
}

export function getProblem(slug: string) {
  return problems.find((problem) => problem.slug === slug);
}

export function getAdjacentProblems(problem: Problem) {
  const siblings = problems.filter((candidate) => candidate.category === problem.category);
  const index = siblings.findIndex((candidate) => candidate.slug === problem.slug);
  return {
    previous: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined,
  };
}
