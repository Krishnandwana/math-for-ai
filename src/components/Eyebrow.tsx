import type { ReactNode } from "react";
import clsx from "clsx";

export default function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted",
        className
      )}
    >
      {children}
    </div>
  );
}
