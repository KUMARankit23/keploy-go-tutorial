"use client";

import { Check } from "lucide-react";
import clsx from "clsx";
import { setStepDone, useDoneSteps } from "./progress";

/** Checkbox-style button that marks a tutorial step as done. */
export function StepCheck({ id, title }: { id: string; title: string }) {
  const done = useDoneSteps().includes(id);
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={done}
      aria-label={done ? `Mark "${title}" as not done` : `Mark "${title}" as done`}
      onClick={() => setStepDone(id, !done)}
      className={clsx(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold transition",
        done
          ? "border-accent bg-accent text-white hover:bg-accent-hover hover:shadow-md"
          : "border-border bg-card text-muted-foreground hover:border-accent hover:bg-accent-soft hover:text-accent-text"
      )}
    >
      <Check className="h-3.5 w-3.5" />
      {done ? "Done" : "Mark done"}
    </button>
  );
}
