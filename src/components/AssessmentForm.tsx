"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import type { Question } from "@/lib/types";
import { checkAnswer } from "@/lib/answer-check";
import { useProgressStore } from "@/lib/progress-store";
import { getModuleStatus } from "@/lib/curriculum-status";
import InlineMD from "@/components/InlineMD";

export default function AssessmentForm({
  moduleSlug,
  kind,
  question,
  title,
}: {
  moduleSlug: string;
  kind: "hand" | "programming";
  question: Question;
  title: string;
}) {
  const progress = useProgressStore((s) => s.progress);
  const recordResult = useProgressStore((s) => s.recordResult);
  const progressEntry = progress[moduleSlug];

  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean; message?: string } | null>(null);
  const [solutionOpen, setSolutionOpen] = useState(false);

  const locked = getModuleStatus(moduleSlug, progress) === "locked";
  const alreadyCorrect = kind === "hand" ? !!progressEntry?.handCorrect : !!progressEntry?.programmingCorrect;
  const attempts = kind === "hand" ? progressEntry?.handAttempts ?? 0 : progressEntry?.programmingAttempts ?? 0;
  const showHint = attempts >= 2 && !alreadyCorrect && feedback?.correct !== true;
  const solutionVisible = alreadyCorrect || solutionOpen;
  const disabled = locked || alreadyCorrect;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (locked) return;
    const result = checkAnswer(question, value);
    setFeedback({ correct: result.correct, message: result.message });
    recordResult(moduleSlug, kind, result.correct);
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="font-mono text-xs uppercase tracking-widest text-ink-muted">{title}</h4>
        {alreadyCorrect && (
          <span className="font-mono text-xs uppercase tracking-wide text-success">✓ Correct</span>
        )}
      </div>

      {question.setup && (
        <pre className="mb-3 overflow-x-auto rounded-md border border-border bg-surface-alt p-3 font-mono text-xs text-ink">
          {question.setup}
        </pre>
      )}

      <p className="mb-4 text-base leading-relaxed text-ink">
        <InlineMD text={question.prompt} />
      </p>

      {locked && (
        <p className="mb-4 rounded-md border border-locked/40 bg-surface-alt p-3 text-sm leading-relaxed text-ink-muted">
          <span className="font-mono text-xs uppercase tracking-wide text-locked">Locked </span>
          Complete the previous module to unlock submissions here. You can still read everything
          on this page.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={question.placeholder}
          disabled={disabled}
          className={clsx(
            "flex-1 rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm text-ink outline-none transition-colors focus:border-accent disabled:opacity-60"
          )}
        />
        <button
          type="submit"
          disabled={disabled || value.trim() === ""}
          className="rounded-md bg-accent px-5 py-2 font-mono text-xs uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Check answer
        </button>
      </form>

      {feedback && (
        <p
          className={clsx(
            "mt-3 font-mono text-sm",
            feedback.correct ? "text-success" : "text-danger"
          )}
        >
          {feedback.correct ? "Correct." : feedback.message ?? "Not quite — try again."}
        </p>
      )}

      {showHint && (
        <p className="mt-3 rounded-md border border-warn/30 bg-warn/5 p-3 text-sm leading-relaxed text-ink">
          <span className="font-mono text-xs uppercase tracking-wide text-warn">Hint </span>
          <InlineMD text={question.hint} />
        </p>
      )}

      <div className="mt-4">
        {!solutionVisible ? (
          <button
            type="button"
            onClick={() => setSolutionOpen(true)}
            className="font-mono text-xs uppercase tracking-wide text-ink-muted underline decoration-dotted hover:text-accent"
          >
            Show solution
          </button>
        ) : (
          <div className="rounded-md border border-border bg-surface-alt p-4">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              Full solution
            </div>
            <ol className="flex flex-col gap-2">
              {question.solutionSteps.map((step, i) => (
                <li key={i} className="text-sm leading-relaxed text-ink">
                  <InlineMD text={step} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
