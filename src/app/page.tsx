import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import TerminalBox from "@/components/TerminalBox";
import FigGradientDescent from "@/components/figs/FigGradientDescent";
import FigModuleLoop from "@/components/figs/FigModuleLoop";
import FigMasteryCurve from "@/components/figs/FigMasteryCurve";
import ProgressStats from "@/components/ProgressStats";
import CurriculumAccordion from "@/components/CurriculumAccordion";
import StatusPill from "@/components/StatusPill";
import { totalModuleCount, totalPhaseCount } from "@/lib/curriculum";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <Eyebrow className="mb-6">FIG_000 · curriculum v1.0 · light edition · MIT</Eyebrow>
        <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Math for AI
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
          Every equation, derived, solved by hand, and reproduced in Python — before you move on.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
          You don&apos;t finish a module by reading it. You solve one problem by hand and one
          problem in code, run the code wherever you want, and enter the final answers. Get both
          right, and the module unlocks the next one.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/learn/linear-algebra/vectors-and-dot-products"
            className="rounded-full bg-accent px-6 py-3 font-mono text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Start Learning
          </Link>
          <a
            href="https://github.com/Krishnandwana/math-for-ai"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-6 py-3 font-mono text-sm uppercase tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
          >
            View on GitHub
          </a>
        </div>

        <div className="mt-10 max-w-xl">
          <TerminalBox command="git clone https://github.com/Krishnandwana/math-for-ai.git" />
        </div>
      </section>

      {/* FIG diagrams */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FigGradientDescent />
          <FigModuleLoop />
          <FigMasteryCurve />
        </div>
      </section>

      {/* How this works */}
      <section className="border-y border-border bg-surface-alt">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow className="mb-4">how this works</Eyebrow>
          <h2 className="mb-8 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Reading isn&apos;t proof. Reproducing is.
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <p className="text-base leading-relaxed text-ink-muted">
              Every module runs the same loop: plain-language <strong className="text-ink">theory</strong> first,
              then the formal <strong className="text-ink">math</strong> with every symbol defined, then a fully
              worked <strong className="text-ink">example</strong> — solved on paper and in Python side by side.
            </p>
            <p className="text-base leading-relaxed text-ink-muted">
              Then it&apos;s your turn: a new hand-solving problem, and a new programming problem.
              No in-browser editor, no sandboxed execution — you run your code wherever you
              already work, and hand back the final result.
            </p>
            <p className="text-base leading-relaxed text-ink-muted">
              Final-answer grading is enough to prove understanding, because there&apos;s no way
              to get the right number without doing the actual derivation or writing the actual
              code. Both checks pass, and the next module unlocks.
            </p>
          </div>
        </div>
      </section>

      {/* Current Progress */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Eyebrow className="mb-4">current progress</Eyebrow>
        <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Where you are
        </h2>
        <ProgressStats />
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="border-t border-border bg-surface-alt scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="mb-4">curriculum</Eyebrow>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {totalPhaseCount} phases · {totalModuleCount} modules
              </h2>
              <p className="mt-2 text-sm text-ink-muted">Tap a phase to expand its modules.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill status="complete" />
              <StatusPill status="in-progress" />
              <StatusPill status="locked" />
            </div>
          </div>
          <CurriculumAccordion />
        </div>
      </section>
    </>
  );
}
