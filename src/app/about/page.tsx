import Eyebrow from "@/components/Eyebrow";

export const metadata = { title: "About — Math for AI" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Eyebrow className="mb-4">about</Eyebrow>
      <h1 className="mb-6 font-display text-4xl font-semibold tracking-tight text-ink">
        Why this exists
      </h1>
      <div className="flex flex-col gap-5 text-base leading-relaxed text-ink-muted">
        <p>
          Most ML material either stays purely conceptual — analogies and diagrams, no math — or
          drops straight into notation with no bridge back to intuition. Math for AI is built to
          sit in between: plain-language theory, the actual math with every symbol defined, a
          fully worked example in both algebra and Python, and then a check that you can
          reproduce it yourself.
        </p>
        <p>
          <strong className="text-ink">The rule for every module is the same:</strong> you don&apos;t
          finish by reading it. You solve one new problem by hand and one new problem in code, run
          the code wherever you want — your own machine, a notebook, a REPL, Colab — and enter the
          final answers here. Get both right, and the next module unlocks.
        </p>
        <p>
          There&apos;s no in-browser code editor and nothing executes inside the app. That&apos;s
          deliberate: grading the final answer is enough to prove you did the work, because there&apos;s
          no way to arrive at the right number without actually deriving it or actually writing
          the code that computes it. It also means the app is just static content plus
          answer-checking — no execution backend, nothing to sandbox.
        </p>
        <p>
          The curriculum currently covers eight phases, from linear algebra up through the math
          specific to modern transformer architectures. Linear Algebra is fully built out end to
          end; the rest are scaffolded and shipping next, in order.
        </p>
        <p className="font-mono text-sm text-ink-muted">MIT licensed. Built for engineers learning the math behind AI.</p>
      </div>
    </div>
  );
}
