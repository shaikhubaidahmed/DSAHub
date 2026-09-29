export type ProblemSource = "neetcode" | "striver";

export type Platform = "leetcode" | "gfg" | "neetcode" | "takeuforward" | "youtube";

export type ProblemStatus = "not-started" | "in-progress" | "completed";

export interface ProblemLinks {
  leetcode?: string;
  gfg?: string;
  neetcode?: string;
  takeuforward?: string;
  youtube?: string;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  category: string;
  sources: ProblemSource[];
  links: ProblemLinks;
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
