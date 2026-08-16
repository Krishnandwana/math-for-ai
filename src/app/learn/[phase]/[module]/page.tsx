import { notFound } from "next/navigation";
import Link from "next/link";
import { curriculum, getModule } from "@/lib/curriculum";
import Card from "@/components/Card";
import Eyebrow from "@/components/Eyebrow";
import Eq from "@/components/Eq";
import InlineMD from "@/components/InlineMD";
import CodeBlock from "@/components/CodeBlock";
import ModuleStatusPill from "@/components/ModuleStatusPill";
import AssessmentForm from "@/components/AssessmentForm";
import ModuleNav from "@/components/ModuleNav";

export function generateStaticParams() {
  return curriculum.flatMap((phase) =>
    phase.modules.map((mod) => ({ phase: phase.slug, module: mod.slug }))
  );
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ phase: string; module: string }>;
}) {
  const { phase: phaseSlug, module: moduleSlug } = await params;
  const found = getModule(phaseSlug, moduleSlug);
  if (!found) notFound();
  const { phase, module: mod } = found;
  const content = mod.content;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <div className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-muted">
          <Link href="/#curriculum" className="hover:text-accent">
            Phase {String(phase.order).padStart(2, "0")}
          </Link>
          {" · "}Module {String(mod.order).padStart(2, "0")}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {mod.title}
          </h1>
          <ModuleStatusPill moduleSlug={mod.slug} />
        </div>
        <p className="mt-3 text-ink-muted">{mod.summary}</p>
      </div>

      {!content ? (
        <Card>
          <Eyebrow className="mb-4">coming soon</Eyebrow>
          <p className="text-ink-muted">
            This module hasn&apos;t been built out yet. The Linear Algebra phase is fully live —
            start there while the rest of the curriculum is under construction.
          </p>
          <Link
            href="/learn/linear-algebra/vectors-and-dot-products"
            className="mt-4 inline-block font-mono text-sm text-accent hover:underline"
          >
            Go to Linear Algebra →
          </Link>
        </Card>
      ) : null}

      {content && (
        <div className="flex flex-col gap-8">
          <Card as="section">
            <Eyebrow className="mb-4">A · Theory</Eyebrow>
            <div className="flex flex-col gap-4">
              {content.theory.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink">
                  <InlineMD text={p} />
                </p>
              ))}
            </div>
          </Card>

          <Card as="section">
            <Eyebrow className="mb-4">B · Math / Equations</Eyebrow>
            {content.mathIntro && (
              <p className="mb-4 text-base leading-relaxed text-ink">
                <InlineMD text={content.mathIntro} />
              </p>
            )}
            <div className="mb-6 flex flex-col gap-4">
              {content.equations.map((eq, i) => (
                <Eq key={i} {...eq} />
              ))}
            </div>
            <div className="rounded-lg border border-border bg-surface-alt p-4 sm:p-6">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                How to solve it, step by step
              </div>
              <ol className="flex flex-col gap-2">
                {content.howToSolve.map((step, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-ink">
                    <span className="mt-0.5 shrink-0 font-mono text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <InlineMD text={step} />
                  </li>
                ))}
              </ol>
            </div>
          </Card>

          <Card as="section">
            <Eyebrow className="mb-4">C · Worked Examples</Eyebrow>
            <h3 className="mb-3 font-display text-xl font-semibold text-ink">
              {content.workedExample.mathTitle}
            </h3>
            <ol className="mb-6 flex flex-col gap-3">
              {content.workedExample.mathSteps.map((s, i) => (
                <li key={i} className="text-base leading-relaxed text-ink">
                  <InlineMD text={s} />
                </li>
              ))}
            </ol>
            <CodeBlock
              code={content.workedExample.pythonCode}
              caption={content.workedExample.pythonCaption}
            />
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="mb-3 font-display text-xl font-semibold text-ink">
                {content.secondExample.title}
              </h3>
              <ol className="flex flex-col gap-3">
                {content.secondExample.steps.map((s, i) => (
                  <li key={i} className="text-base leading-relaxed text-ink">
                    <InlineMD text={s} />
                  </li>
                ))}
              </ol>
            </div>
          </Card>

          <Card as="section">
            <Eyebrow className="mb-4">D · Best Approaches &amp; Pitfalls</Eyebrow>
            <ul className="flex flex-col gap-3">
              {content.bestApproaches.map((tip, i) => (
                <li key={i} className="flex gap-3 text-base leading-relaxed text-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <InlineMD text={tip} />
                </li>
              ))}
            </ul>
          </Card>

          <Card id="your-turn" as="section" className="scroll-mt-20 border-2 border-accent/30 bg-accent-soft/20">
            <Eyebrow className="mb-4">E · Your Turn</Eyebrow>
            <p className="mb-6 text-sm text-ink-muted">
              Both answers must be correct to mark this module complete.
            </p>
            <div className="flex flex-col gap-6">
              <AssessmentForm
                moduleSlug={mod.slug}
                kind="hand"
                title="Hand-solving question"
                question={content.assessment.handSolving}
              />
              <AssessmentForm
                moduleSlug={mod.slug}
                kind="programming"
                title="Programming question"
                question={content.assessment.programming}
              />
            </div>
          </Card>
        </div>
      )}

      <ModuleNav moduleSlug={mod.slug} />
    </div>
  );
}
