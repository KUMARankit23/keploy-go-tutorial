import { Children, isValidElement, type ReactNode } from "react";
import { slugify } from "@/content/toc";
import { StepCheck } from "./StepCheck";
import { StepProgress } from "./StepProgress";

export function Steps({ children }: { children: ReactNode }) {
  const ids = Children.toArray(children)
    .filter((c): c is React.ReactElement<{ title: string }> => isValidElement(c) && typeof (c.props as { title?: unknown }).title === "string")
    .map((c) => slugify(c.props.title));

  return (
    <>
      <StepProgress ids={ids} />
      <ol className="not-prose my-8 ml-0 list-none space-y-0 border-l-2 border-accent/30 pl-0 [counter-reset:step]">
        {children}
      </ol>
    </>
  );
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  const id = slugify(title);
  return (
    <li className="group/step relative pb-10 pl-10 last:pb-2 [counter-increment:step]">
      <span
        aria-hidden
        className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-white shadow-md ring-4 ring-background transition-transform group-hover/step:scale-110 before:content-[counter(step)]"
      />
      <div className="mb-3 mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3 id={id} className="group scroll-mt-24 text-xl font-bold tracking-tight text-navy">
          {title}
          <a
            href={`#${id}`}
            aria-label="Link to this step"
            className="heading-anchor ml-2 text-muted-foreground opacity-0 transition group-hover:opacity-100"
          >
            #
          </a>
        </h3>
        <StepCheck id={id} title={title} />
      </div>
      <div className="prose-doc text-[0.95rem] leading-7 text-foreground/90 [&>p]:my-3 [&>ul]:my-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:my-3 [&>ol]:list-decimal [&>ol]:pl-6 [&_figure]:my-4">
        {children}
      </div>
    </li>
  );
}
