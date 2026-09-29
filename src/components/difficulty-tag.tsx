import type { Difficulty } from "@/lib/types";

export const difficultyLabels: Record<Difficulty, string> = { easy: "Easy", medium: "Medium", hard: "Hard" };

export function DifficultyTag({ difficulty }: { difficulty?: Difficulty }) {
  if (!difficulty) return null;
  return <span className={`difficulty-tag difficulty-${difficulty}`}>{difficultyLabels[difficulty]}</span>;
}
