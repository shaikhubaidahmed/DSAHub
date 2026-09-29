"use client";

import { Check, Circle, Clock3 } from "lucide-react";
import { useProgress } from "@/components/providers";
import { getProblemStatus, statusLabel } from "@/lib/progress";
import type { Problem, ProblemStatus } from "@/lib/types";

const icons = {
  "not-started": Circle,
  "in-progress": Clock3,
  completed: Check,
};

export function StatusSelect({ problem }: { problem: Problem }) {
  const { progress, setStatus } = useProgress();
  const status = getProblemStatus(progress, problem.id);
  const Icon = icons[status];

  return (
    <label className={`status-select status-${status}`}>
      <Icon size={14} aria-hidden="true" />
      <span className="sr-only">Status for {problem.title}</span>
      <select value={status} onChange={(event) => setStatus(problem.id, event.target.value as ProblemStatus)} aria-label={`Status for ${problem.title}`}>
        {Object.entries(statusLabel).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
    </label>
  );
}
