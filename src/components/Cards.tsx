import type { ReactNode } from "react";

export function Cards({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Card({ title, icon, children }: { title: string; icon?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition hover:border-accent/50">
      <p className="mb-1 flex items-center gap-2 font-semibold">
        {icon && <span aria-hidden>{icon}</span>}
        {title}
      </p>
      <div className="text-sm leading-6 text-muted-foreground [&_code]:text-[0.85em]">{children}</div>
    </div>
  );
}
