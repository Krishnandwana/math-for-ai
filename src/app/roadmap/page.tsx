import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import Eyebrow from "@/components/Eyebrow";

export const metadata = { title: "Roadmap — Math for AI" };

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Eyebrow className="mb-4">roadmap</Eyebrow>
      <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-ink">
        Curriculum roadmap
      </h1>
      <p className="mb-10 max-w-2xl text-ink-muted">
        Phases are built and released in order. Linear Algebra is fully live; everything after it
        is scaffolded and shipping next.
      </p>

      <ol className="relative flex flex-col gap-8 border-l border-border pl-8">
        {curriculum.map((phase) => {
          const isLive = phase.modules.some((m) => m.content);
          return (
            <li key={phase.slug} className="relative">
              <span
                className={`absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full ${
                  isLive ? "bg-accent" : "border-2 border-locked bg-surface"
                }`}
              />
              <div className="mb-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Phase {String(phase.order).padStart(2, "0")} · {phase.modules.length} modules ·{" "}
                {isLive ? "live" : "planned"}
              </div>
              <h2 className="mb-1 font-display text-xl font-semibold text-ink">{phase.title}</h2>
              <p className="text-sm leading-relaxed text-ink-muted">{phase.description}</p>
              {isLive && (
                <Link
                  href="/learn/linear-algebra/vectors-and-dot-products"
                  className="mt-2 inline-block font-mono text-xs uppercase tracking-wide text-accent hover:underline"
                >
                  Start this phase →
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
