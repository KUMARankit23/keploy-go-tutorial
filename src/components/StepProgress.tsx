"use client";

import { resetSteps, useDoneSteps } from "./progress";

/** "N of M steps done" summary with a progress bar and a reset link. */
export function StepProgress({ ids }: { ids: string[] }) {
  const done = useDoneSteps().filter((id) => ids.includes(id)).length;
  const total = ids.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="not-prose mb-8 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="font-semibold text-navy">
          {done === total && total > 0 ? "All steps done" : `${done} of ${total} steps done`}
        </p>
        {done > 0 && (
          <button
            type="button"
            onClick={resetSteps}
            className="text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-accent-text"
          >
            Reset progress
          </button>
        )}
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label="Tutorial progress"
        className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
      >
        <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Tick each step as you finish it. Progress is saved in this browser only.
      </p>
    </div>
  );
}
