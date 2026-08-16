import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ModuleProgressState {
  handCorrect: boolean;
  programmingCorrect: boolean;
  handAttempts: number;
  programmingAttempts: number;
}

const emptyModuleProgress = (): ModuleProgressState => ({
  handCorrect: false,
  programmingCorrect: false,
  handAttempts: 0,
  programmingAttempts: 0,
});

interface ProgressStore {
  progress: Record<string, ModuleProgressState>;
  recordResult: (moduleSlug: string, field: "hand" | "programming", correct: boolean) => void;
  resetModule: (moduleSlug: string) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: {},
      recordResult: (moduleSlug, field, correct) =>
        set((state) => {
          const current = state.progress[moduleSlug] ?? emptyModuleProgress();
          const updated: ModuleProgressState = { ...current };
          if (field === "hand") {
            updated.handAttempts += 1;
            if (correct) updated.handCorrect = true;
          } else {
            updated.programmingAttempts += 1;
            if (correct) updated.programmingCorrect = true;
          }
          return { progress: { ...state.progress, [moduleSlug]: updated } };
        }),
      resetModule: (moduleSlug) =>
        set((state) => {
          const next = { ...state.progress };
          delete next[moduleSlug];
          return { progress: next };
        }),
    }),
    { name: "math-for-ai-progress", skipHydration: true }
  )
);

export function isModuleProgressComplete(p: ModuleProgressState | undefined): boolean {
  return !!p && p.handCorrect && p.programmingCorrect;
}
