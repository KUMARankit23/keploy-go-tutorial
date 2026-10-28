import type { ComponentProps, ReactElement, ReactNode } from "react";
import { CopyButton } from "./CopyButton";

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  const el = node as ReactElement<{ children?: ReactNode }>;
  return el.props ? extractText(el.props.children) : "";
}

export function Pre({ children, ...props }: ComponentProps<"pre">) {
  const text = extractText(children);
  return (
    <div className="group relative">
      <CopyButton text={text} />
      <pre {...props}>{children}</pre>
    </div>
  );
}
