import type { Problem, ProblemStatus } from "@/lib/types";

export const PROGRESS_STORAGE_KEY = "dsa-hub-progress";

export type ProgressMap = Record<string, ProblemStatus>;

export function getProblemStatus(progress: ProgressMap, problemId: string): ProblemStatus {
  return progress[problemId] ?? "not-started";
}

export function countCompleted(problems: Problem[], progress: ProgressMap) {
  return problems.filter((problem) => progress[problem.id] === "completed").length;
}

export function progressPercent(completed: number, total: number) {
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}
