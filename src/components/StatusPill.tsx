import clsx from "clsx";
import type { ModuleStatus } from "@/lib/curriculum-status";

const LABELS: Record<ModuleStatus, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  locked: "Locked",
};

const STYLES: Record<ModuleStatus, string> = {
  complete: "border-accent bg-accent text-white",
  "in-progress": "border-warn text-warn bg-transparent",
  locked: "border-locked text-locked bg-transparent",
};

const DOT_STYLES: Record<ModuleStatus, string> = {
  complete: "bg-white",
  "in-progress": "bg-warn",
  locked: "bg-locked",
};

export default function StatusPill({
  status,
  className,
}: {
  status: ModuleStatus;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide",
        STYLES[status],
        className
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", DOT_STYLES[status])} />
      {LABELS[status]}
    </span>
  );
}
