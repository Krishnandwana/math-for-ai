import { flattenModules } from "@/lib/curriculum";
import { isModuleProgressComplete, type ModuleProgressState } from "@/lib/progress-store";

export type ModuleStatus = "complete" | "in-progress" | "locked";

export function getModuleStatus(
  moduleSlug: string,
  progress: Record<string, ModuleProgressState>
): ModuleStatus {
  const flat = flattenModules();
  const idx = flat.findIndex((m) => m.moduleSlug === moduleSlug);
  if (idx === -1) return "locked";

  const entry = flat[idx];
  if (isModuleProgressComplete(progress[moduleSlug])) return "complete";
  if (!entry.hasContent) return "locked";
  if (idx === 0) return "in-progress";

  const prev = flat[idx - 1];
  if (!prev.hasContent) return "locked";
  return isModuleProgressComplete(progress[prev.moduleSlug]) ? "in-progress" : "locked";
}

export interface CurriculumStats {
  modulesCompleted: number;
  totalModules: number;
  phasesCompleted: number;
  totalPhases: number;
  handCorrect: number;
  totalHand: number;
  programmingCorrect: number;
  totalProgramming: number;
}

export function getStats(progress: Record<string, ModuleProgressState>): CurriculumStats {
  const flat = flattenModules();
  let modulesCompleted = 0;
  let handCorrect = 0;
  let programmingCorrect = 0;

  for (const m of flat) {
    const p = progress[m.moduleSlug];
    if (p?.handCorrect) handCorrect++;
    if (p?.programmingCorrect) programmingCorrect++;
    if (isModuleProgressComplete(p)) modulesCompleted++;
  }

  const phaseSlugs = Array.from(new Set(flat.map((m) => m.phaseSlug)));
  let phasesCompleted = 0;
  for (const phaseSlug of phaseSlugs) {
    const modulesInPhase = flat.filter((m) => m.phaseSlug === phaseSlug);
    if (modulesInPhase.every((m) => isModuleProgressComplete(progress[m.moduleSlug]))) {
      phasesCompleted++;
    }
  }

  return {
    modulesCompleted,
    totalModules: flat.length,
    phasesCompleted,
    totalPhases: phaseSlugs.length,
    handCorrect,
    totalHand: flat.length,
    programmingCorrect,
    totalProgramming: flat.length,
  };
}
