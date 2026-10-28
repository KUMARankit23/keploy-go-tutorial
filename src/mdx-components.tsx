import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { Pre } from "@/components/Pre";
import { Callout } from "@/components/Callout";
import { Steps, Step } from "@/components/Steps";
import { Tabs, Tab } from "@/components/Tabs";
import { FileTree } from "@/components/FileTree";
import { Terminal } from "@/components/Terminal";
import { Cards, Card } from "@/components/Cards";
import { Stats } from "@/components/Stats";
import { RecordReplayDiagram } from "@/components/Diagram";
import { Hero } from "@/components/Hero";

function Heading(level: 2 | 3) {
  const Tag = level === 2 ? "h2" : "h3";
  const cls =
    level === 2
      ? "group mt-16 mb-5 text-[1.75rem] font-extrabold tracking-tight text-navy first:mt-0 after:mt-3 after:block after:h-1 after:w-12 after:rounded-full after:bg-accent dark:text-accent"
      : "group mt-8 mb-3 text-xl font-bold tracking-tight text-navy";
  return function H({ id, children, ...rest }: ComponentProps<"h2">) {
    return (
      <Tag id={id} className={cls} {...rest}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            aria-label="Link to this section"
            className="heading-anchor ml-2 text-muted-foreground opacity-0 transition group-hover:opacity-100"
          >
            #
          </a>
        )}
      </Tag>
    );
  };
}

const components: MDXComponents = {
  h2: Heading(2),
  h3: Heading(3),
  p: (props) => <p className="my-4 leading-7 text-foreground/90" {...props} />,
  ul: (props) => <ul className="my-4 list-disc space-y-1.5 pl-6 leading-7" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-1.5 pl-6 leading-7" {...props} />,
  li: (props) => <li className="pl-1 marker:text-accent" {...props} />,
  a: ({ href, ...props }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className="font-semibold text-accent-text underline decoration-accent/50 underline-offset-4 transition hover:text-accent hover:decoration-accent"
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...props}
      />
    );
  },
  strong: (props) => <strong className="font-semibold text-navy" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-4 border-accent pl-4 italic text-muted-foreground" {...props} />
  ),
  hr: () => <hr className="my-12 border-border" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-border bg-muted px-4 py-2.5 text-left font-bold text-navy" {...props} />
  ),
  td: (props) => <td className="border-b border-border px-4 py-2.5 align-top" {...props} />,
  pre: Pre,
  Callout,
  Steps,
  Step,
  Tabs,
  Tab,
  FileTree,
  Terminal,
  Cards,
  Card,
  Stats,
  RecordReplayDiagram,
  Hero,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
