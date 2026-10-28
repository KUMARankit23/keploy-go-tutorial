import type { ReactNode } from "react";
import { Info, Lightbulb, AlertTriangle, OctagonAlert, Sparkles } from "lucide-react";
import clsx from "clsx";

type CalloutType = "info" | "tip" | "warning" | "danger" | "aha";

const config: Record<
  CalloutType,
  { icon: typeof Info; label: string; box: string; icn: string }
> = {
  info: {
    icon: Info,
    label: "Note",
    box: "border-l-sky-500 bg-sky-500/5",
    icn: "text-sky-500",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    box: "border-l-emerald-500 bg-emerald-500/5",
    icn: "text-emerald-500",
  },
  warning: {
    icon: AlertTriangle,
    label: "Heads up",
    box: "border-l-amber-500 bg-amber-500/5",
    icn: "text-amber-500",
  },
  danger: {
    icon: OctagonAlert,
    label: "Careful",
    box: "border-l-rose-500 bg-rose-500/5",
    icn: "text-rose-500",
  },
  aha: {
    icon: Sparkles,
    label: "A-ha moment",
    box: "border-l-accent bg-accent-soft",
    icn: "text-accent",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const c = config[type];
  const Icon = c.icon;
  return (
    <aside
      role="note"
      className={clsx(
        "not-prose my-6 flex gap-3 rounded-xl border border-border border-l-4 p-4 text-[0.95rem] leading-relaxed shadow-[var(--shadow-card)]",
        c.box
      )}
    >
      <Icon className={clsx("mt-0.5 h-5 w-5 shrink-0", c.icn)} aria-hidden />
      <div className="min-w-0 [&_p]:my-0 [&_p+p]:mt-2 [&_code]:text-[0.85em] [&_a]:underline [&_a]:underline-offset-4">
        <p className="mb-1! font-bold text-navy">{title ?? c.label}</p>
        {children}
      </div>
    </aside>
  );
}
