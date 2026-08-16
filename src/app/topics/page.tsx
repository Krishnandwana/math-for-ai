import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import Eyebrow from "@/components/Eyebrow";
import Card from "@/components/Card";

export const metadata = { title: "Topics — Math for AI" };

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Eyebrow className="mb-4">topics</Eyebrow>
      <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-ink">
        Browse by subject
      </h1>
      <p className="mb-10 max-w-2xl text-ink-muted">
        The curriculum organized as eight subject areas, from linear algebra up to the math
        specific to modern transformer architectures.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {curriculum.map((phase) => (
          <Card key={phase.slug} as="article" className="flex flex-col">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              Phase {String(phase.order).padStart(2, "0")} · {phase.modules.length} modules
            </div>
            <h2 className="mb-2 font-display text-xl font-semibold text-ink">{phase.title}</h2>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-muted">{phase.description}</p>
            <Link
              href={`/#curriculum`}
              className="font-mono text-xs uppercase tracking-wide text-accent hover:underline"
            >
              View modules →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
