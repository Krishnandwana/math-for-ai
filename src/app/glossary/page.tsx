import Eyebrow from "@/components/Eyebrow";
import InlineMD from "@/components/InlineMD";

export const metadata = { title: "Glossary — Math for AI" };

const TERMS: { term: string; definition: string }[] = [
  {
    term: "Vector",
    definition: "An ordered list of numbers, $\\mathbf{v} = (v_1, \\dots, v_n)$ — a point, direction, or feature representation.",
  },
  {
    term: "Dot product",
    definition: "$\\mathbf{a}\\cdot\\mathbf{b} = \\sum_i a_ib_i$ — measures alignment between two vectors; the core operation of every weighted sum in a network.",
  },
  {
    term: "Cosine similarity",
    definition: "The dot product normalized by both vectors' magnitudes; ranges from -1 to 1 and ignores scale entirely.",
  },
  {
    term: "Matrix multiplication",
    definition: "Combining two matrices where entry $(i,j)$ of the result is the dot product of row $i$ of the left matrix and column $j$ of the right matrix.",
  },
  {
    term: "Eigenvector / eigenvalue",
    definition: "A direction $\\mathbf{v}$ that a matrix $A$ only rescales ($A\\mathbf{v}=\\lambda\\mathbf{v}$), and the scale factor $\\lambda$ it applies.",
  },
  {
    term: "Norm",
    definition: "A single number measuring a vector's size — L1 (sum of absolute values), L2 (Euclidean length), or L∞ (max absolute value) are the common choices.",
  },
  {
    term: "Rank",
    definition: "The number of linearly independent rows or columns in a matrix — a measure of how much distinct information it carries.",
  },
  {
    term: "Singular value decomposition (SVD)",
    definition: "Factoring any matrix as $A = U\\Sigma V^\\top$, a rotation, a scaling, and another rotation — works on matrices eigendecomposition can't handle.",
  },
  {
    term: "Gradient",
    definition: "The vector of partial derivatives of a function — points in the direction of steepest increase; optimization moves against it.",
  },
  {
    term: "Cross-entropy",
    definition: "A measure of the distance between a predicted probability distribution and the true one — the standard classification loss.",
  },
];

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Eyebrow className="mb-4">glossary</Eyebrow>
      <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight text-ink">
        Terms &amp; definitions
      </h1>
      <p className="mb-10 max-w-2xl text-ink-muted">
        Short, precise definitions for the terms used across the curriculum. Growing as more
        phases go live.
      </p>
      <dl className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface">
        {TERMS.map((t) => (
          <div key={t.term} className="p-5 sm:p-6">
            <dt className="mb-1.5 font-display text-lg font-semibold text-ink">{t.term}</dt>
            <dd className="text-sm leading-relaxed text-ink-muted">
              <InlineMD text={t.definition} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
