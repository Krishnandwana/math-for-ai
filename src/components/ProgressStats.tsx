"use client";

import { useProgressStore } from "@/lib/progress-store";
import { getStats } from "@/lib/curriculum-status";
import ProgressBar from "@/components/ProgressBar";

export default function ProgressStats() {
  const progress = useProgressStore((s) => s.progress);
  const stats = getStats(progress);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ProgressBar label="Modules completed" value={stats.modulesCompleted} total={stats.totalModules} />
      <ProgressBar label="Phases completed" value={stats.phasesCompleted} total={stats.totalPhases} />
      <ProgressBar label="Hand-solved correct" value={stats.handCorrect} total={stats.totalHand} />
      <ProgressBar
        label="Programming answers correct"
        value={stats.programmingCorrect}
        total={stats.totalProgramming}
      />
    </div>
  );
}
