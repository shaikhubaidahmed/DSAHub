export type ProblemSource = "neetcode" | "striver";

export type Platform = "leetcode" | "gfg" | "neetcode" | "takeuforward" | "neetcodeVideo" | "striverVideo";

export type ProblemStatus = "not-started" | "completed";

export type Difficulty = "easy" | "medium" | "hard";

export interface ProblemLinks {
  leetcode?: string;
  gfg?: string;
  neetcode?: string;
  takeuforward?: string;
  neetcodeVideo?: string;
  striverVideo?: string;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  category: string;
  sources: ProblemSource[];
  links: ProblemLinks;
  difficulty?: Difficulty;
  note?: string;
}

export interface CategorySummary {
  name: string;
  slug: string;
  description: string;
  count: number;
  neetcode: number;
  striver: number;
  shared: number;
  problems: Problem[];
}
