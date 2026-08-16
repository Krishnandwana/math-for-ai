import Link from "next/link";
import { flattenModules } from "@/lib/curriculum";

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d={direction === "left" ? "M14 6l-6 6 6 6" : "M10 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ModuleNav({ moduleSlug }: { moduleSlug: string }) {
  const flat = flattenModules();
  const idx = flat.findIndex((m) => m.moduleSlug === moduleSlug);
  if (idx === -1) return null;

  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <div className="mt-10 flex items-stretch justify-between gap-4">
      {prev ? (
        <Link
          href={`/learn/${prev.phaseSlug}/${prev.moduleSlug}`}
          className="group flex flex-1 flex-col gap-1 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-accent/40"
        >
          <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            <Arrow direction="left" /> Previous
          </span>
          <span className="truncate text-sm font-medium text-ink group-hover:text-accent">
            {prev.moduleTitle}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/learn/${next.phaseSlug}/${next.moduleSlug}`}
          className="group flex flex-1 flex-col items-end gap-1 rounded-lg border border-border bg-surface px-4 py-3 text-right transition-colors hover:border-accent/40"
        >
          <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Next <Arrow direction="right" />
          </span>
          <span className="truncate text-sm font-medium text-ink group-hover:text-accent">
            {next.moduleTitle}
            {!next.hasContent && " (coming soon)"}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
