import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import Eyebrow from "@/components/Eyebrow";
import Card from "@/components/Card";
import InlineMD from "@/components/InlineMD";

export const metadata = { title: "Practice — Math for AI" };

export default function PracticePage() {
  const liveModules = curriculum.flatMap((phase) =>
    phase.modules
      .filter((m) => m.content)
      .map((m) => ({ phase, module: m }))
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Eyebrow className="mb-4">practice</Eyebrow>
      <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-ink">
        Every assessment, in one place
      </h1>
      <p className="mb-10 max-w-2xl text-ink-muted">
        Each module ends with two answer-only questions — one solved by hand, one solved in code.
        Jump straight to any of them below.
      </p>

      <div className="flex flex-col gap-5">
        {liveModules.map(({ phase, module: mod }) => (
          <Card key={mod.slug} as="article">
            <div className="mb-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              {phase.title}
            </div>
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">{mod.title}</h2>
            <div className="mb-4 flex flex-col gap-2 text-sm text-ink-muted">
              <p>
                <span className="font-mono text-xs uppercase text-ink-muted">Hand: </span>
                <InlineMD text={mod.content!.assessment.handSolving.prompt} />
              </p>
              <p>
                <span className="font-mono text-xs uppercase text-ink-muted">Code: </span>
                <InlineMD text={mod.content!.assessment.programming.prompt} />
              </p>
            </div>
            <Link
              href={`/learn/${phase.slug}/${mod.slug}#your-turn`}
              className="font-mono text-xs uppercase tracking-wide text-accent hover:underline"
            >
              Attempt this module →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
