"use client";

import { useProgress } from "@/components/providers";
import { countCompleted, progressPercent } from "@/lib/progress";
import type { Problem } from "@/lib/types";
import { ProgressRing } from "@/components/progress-ring";

export function PatternProgress({ problems }: { problems: Problem[] }) {
  const { progress } = useProgress();
  const completed = countCompleted(problems, progress);
  return <ProgressRing value={progressPercent(completed, problems.length)} label={`${completed} completed`} />;
}
