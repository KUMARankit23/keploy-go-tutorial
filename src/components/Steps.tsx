import type { ReactNode } from "react";
import { slugify } from "@/content/toc";

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="not-prose my-8 ml-0 list-none space-y-0 border-l-2 border-border pl-0 [counter-reset:step]">
      {children}
    </ol>
  );
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  const id = slugify(title);
  return (
    <li className="relative pb-10 pl-10 last:pb-2 [counter-increment:step]">
      <span
        aria-hidden
        className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-background font-mono text-sm font-semibold text-accent before:content-[counter(step)]"
      />
      <h3 id={id} className="group mb-3 mt-1 scroll-mt-24 text-lg font-semibold tracking-tight">
        {title}
        <a
          href={`#${id}`}
          aria-label="Link to this step"
          className="heading-anchor ml-2 text-muted-foreground opacity-0 transition group-hover:opacity-100"
        >
          #
        </a>
      </h3>
      <div className="prose-doc text-[0.95rem] leading-7 text-foreground/90 [&>p]:my-3 [&>ul]:my-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:my-3 [&>ol]:list-decimal [&>ol]:pl-6 [&_figure]:my-4">
        {children}
      </div>
    </li>
  );
}
