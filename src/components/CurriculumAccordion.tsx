"use client";

import { useState } from "react";
import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import { useProgressStore } from "@/lib/progress-store";
import { getModuleStatus } from "@/lib/curriculum-status";
import StatusPill from "@/components/StatusPill";

export default function CurriculumAccordion() {
  const [openPhase, setOpenPhase] = useState<string | null>(curriculum[0]?.slug ?? null);
  const progress = useProgressStore((s) => s.progress);

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface">
      {curriculum.map((phase) => {
        const isOpen = openPhase === phase.slug;
        const completedCount = phase.modules.filter(
          (m) => getModuleStatus(m.slug, progress) === "complete"
        ).length;

        return (
          <div key={phase.slug}>
            <button
              type="button"
              onClick={() => setOpenPhase(isOpen ? null : phase.slug)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
              <div className="min-w-0">
                <div className="mb-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                  Phase {String(phase.order).padStart(2, "0")} · {phase.modules.length} modules
                </div>
                <h3 className="truncate font-display text-lg font-semibold text-ink sm:text-xl">
                  {phase.title}
                </h3>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="hidden font-mono text-xs text-ink-muted sm:inline">
                  {completedCount} / {phase.modules.length}
                </span>
                <ChevronIcon open={isOpen} />
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-border bg-surface-alt/40 px-5 pb-4 sm:px-6">
                <p className="py-3 text-sm leading-relaxed text-ink-muted">{phase.description}</p>
                <ul className="flex flex-col gap-2 pb-2">
                  {phase.modules.map((mod) => {
                    const status = getModuleStatus(mod.slug, progress);
                    const hasContent = !!mod.content;
                    return (
                      <li key={mod.slug}>
                        <Link
                          href={`/learn/${phase.slug}/${mod.slug}`}
                          className={`flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-accent/40 ${
                            hasContent ? "" : "opacity-70"
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="truncate font-medium text-ink">{mod.title}</div>
                            <div className="truncate text-sm text-ink-muted">{mod.summary}</div>
                          </div>
                          <StatusPill status={status} className="shrink-0" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-5 w-5 text-ink-muted transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
