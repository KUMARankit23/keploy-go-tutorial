import type { ReactNode } from "react";
import {
  Brain,
  CheckCircle2,
  Container,
  Cpu,
  Database,
  FlaskConical,
  Monitor,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  tests: FlaskConical,
  mocks: Database,
  pass: CheckCircle2,
  model: Brain,
  docker: Container,
  terminal: Terminal,
  os: Monitor,
  go: Cpu,
};

export function Cards({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Card({ title, icon, children }: { title: string; icon?: keyof typeof icons; children: ReactNode }) {
  const Icon = icon ? icons[icon] : undefined;
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition hover:border-accent/50">
      <p className="mb-1 flex items-center gap-2 font-semibold">
        {Icon && <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />}
        {title}
      </p>
      <div className="text-sm leading-6 text-muted-foreground [&_code]:text-[0.85em]">{children}</div>
    </div>
  );
}
