import { Folder, FileText } from "lucide-react";

type Node = { name: string; note?: string; children?: Node[] };

function Entry({ node, depth }: { node: Node; depth: number }) {
  const isDir = !!node.children;
  return (
    <li>
      <div
        className="flex items-center gap-2 py-0.5 font-mono text-[13px]"
        style={{ paddingLeft: `${depth * 1.25}rem` }}
      >
        {isDir ? (
          <Folder className="h-4 w-4 shrink-0 text-accent" />
        ) : (
          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <span className={isDir ? "font-medium" : ""}>{node.name}</span>
        {node.note && <span className="ml-2 font-sans text-xs text-muted-foreground">— {node.note}</span>}
      </div>
      {node.children && (
        <ul>
          {node.children.map((c) => (
            <Entry key={c.name} node={c} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function FileTree({ tree }: { tree: Node[] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <ul>
        {tree.map((n) => (
          <Entry key={n.name} node={n} depth={0} />
        ))}
      </ul>
    </div>
  );
}
