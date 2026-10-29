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
    <div className="brand-card group p-5">
      <p className="mb-2 flex items-center gap-2.5 font-bold text-navy">
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        )}
        {title}
      </p>
      <div className="text-sm leading-6 text-muted-foreground [&_code]:text-[0.85em]">{children}</div>
    </div>
  );
}
