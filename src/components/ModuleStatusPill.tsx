"use client";

import { useProgressStore } from "@/lib/progress-store";
import { getModuleStatus } from "@/lib/curriculum-status";
import StatusPill from "@/components/StatusPill";

export default function ModuleStatusPill({ moduleSlug }: { moduleSlug: string }) {
  const progress = useProgressStore((s) => s.progress);
  return <StatusPill status={getModuleStatus(moduleSlug, progress)} />;
}
