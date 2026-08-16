import type { ReactNode } from "react";

export default function FigFrame({
  number,
  caption,
  children,
}: {
  number: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-6">
      <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">FIG_{number}</div>
      <div className="flex h-44 w-full items-center justify-center">{children}</div>
      <figcaption className="text-center text-sm italic leading-relaxed text-ink-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
