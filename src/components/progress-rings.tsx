import { problems } from "@/data/problems";
import { countCompleted, type ProgressMap } from "@/lib/progress";
import type { Problem } from "@/lib/types";

const bySource = (source: "neetcode" | "striver") => problems.filter((problem) => problem.sources.includes(source));
const byDifficulty = (difficulty: Problem["difficulty"]) => problems.filter((problem) => problem.difficulty === difficulty);

// Each cluster is drawn outer to inner, like an activity-ring widget.
const clusters = [
  {
    key: "source",
    label: "By source",
    rings: [
      { key: "overall", label: "Overall", problems },
      { key: "neetcode", label: "NeetCode", problems: bySource("neetcode") },
      { key: "striver", label: "Striver", problems: bySource("striver") },
    ],
  },
  {
    key: "difficulty",
    label: "By difficulty",
    rings: [
      { key: "easy", label: "Easy", problems: byDifficulty("easy") },
      { key: "medium", label: "Medium", problems: byDifficulty("medium") },
      { key: "hard", label: "Hard", problems: byDifficulty("hard") },
    ],
  },
];

const RING_RADII = [52, 38, 24];
const RING_STROKE = 11;

export function ProgressRings({ progress }: { progress: ProgressMap }) {
  const completed = countCompleted(problems, progress);

  return (
    <div className="rings-widget">
      <div className="rings-head">
        <span className="rings-title">Progress</span>
        <div className="rings-count"><strong>{completed}</strong><span>/{problems.length}</span></div>
      </div>

      <div className="rings-body">
        {clusters.map((cluster) => {
          const rings = cluster.rings.map((ring) => ({ ...ring, done: countCompleted(ring.problems, progress), total: ring.problems.length }));
          return (
            <figure className="rings-cluster" key={cluster.key}>
              <svg className="rings-svg" viewBox="0 0 120 120" role="img" aria-label={`${cluster.label}: ${rings.map((ring) => `${ring.label} ${ring.done} of ${ring.total}`).join(", ")}`}>
                {rings.map((ring, index) => {
                  const radius = RING_RADII[index];
                  const circumference = 2 * Math.PI * radius;
                  const fraction = ring.total === 0 ? 0 : ring.done / ring.total;
                  return (
                    <g key={ring.key} className={`ring ring-${ring.key}`}>
                      <circle className="ring-track" cx="60" cy="60" r={radius} strokeWidth={RING_STROKE} />
                      {fraction > 0 ? (
                        <circle
                          className="ring-value"
                          cx="60"
                          cy="60"
                          r={radius}
                          strokeWidth={RING_STROKE}
                          strokeDasharray={circumference}
                          strokeDashoffset={circumference * (1 - fraction)}
                          transform="rotate(-90 60 60)"
                        />
                      ) : null}
                    </g>
                  );
                })}
              </svg>
              <ul className="rings-legend">
                {rings.map((ring) => (
                  <li key={ring.key}><i className={`rings-key ring-${ring.key}`} aria-hidden="true" />{ring.label}<b>{ring.done}/{ring.total}</b></li>
                ))}
              </ul>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
