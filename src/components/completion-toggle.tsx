"use client";

import { Check } from "lucide-react";
import { useProgress } from "@/components/providers";
import { getProblemStatus } from "@/lib/progress";
import type { Problem } from "@/lib/types";

export function CompletionToggle({ problem }: { problem: Problem }) {
  const { progress, setStatus } = useProgress();
  const completed = getProblemStatus(progress, problem.id) === "completed";

  return (
    <button
      type="button"
      className={`completion-toggle ${completed ? "is-completed" : ""}`}
      aria-pressed={completed}
      aria-label={completed ? `Mark ${problem.title} as not completed` : `Mark ${problem.title} as completed`}
      title={completed ? "Completed — click to undo" : "Mark as completed"}
      onClick={() => setStatus(problem.id, completed ? "not-started" : "completed")}
    >
      <span className="completion-box" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>
    </button>
  );
}
