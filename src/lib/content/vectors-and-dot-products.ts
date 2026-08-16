import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "A vector is an ordered list of numbers: a point in space, a direction, or a row of features. In AI, almost everything is a vector before it's anything else — a word becomes a 768-dimensional embedding, an image patch becomes a flattened pixel vector, a hidden layer's activations are a vector of numbers.",
    "The dot product is the single most-used operation on vectors in machine learning. It takes two vectors of the same length and returns one number that measures how much they point in the same direction. Every weighted sum a neural network computes — every logit, every attention score, every layer's pre-activation — is a dot product.",
    "Geometrically, the dot product combines magnitude and alignment: two long vectors pointing the same way produce a large positive number, two vectors at right angles produce zero, and opposing vectors produce a negative number. That geometric intuition is exactly what cosine similarity formalizes.",
    "A closely related idea is projection: the dot product also tells you how much of one vector lies along the direction of another. Projecting $\\mathbf{a}$ onto $\\mathbf{b}$ answers \"if I could only keep the part of $\\mathbf{a}$ that points the way $\\mathbf{b}$ does, how much would be left?\" This is the same question a single weight in a linear layer answers about one input direction.",
    "Orthogonality — a dot product of exactly zero — is worth internalizing as a special case, not just an edge case. Independent features are often modeled as orthogonal vectors; one-hot encodings are pairwise orthogonal by construction; and orthogonal weight initialization is a real technique used to keep signals from collapsing as they pass through deep networks.",
  ],
  mathIntro:
    "For vectors in $\\mathbb{R}^n$, addition, scaling, and the dot product are defined component-wise, then combined.",
  equations: [
    {
      label: "Vector",
      latex: "\\mathbf{v} = (v_1, v_2, \\dots, v_n) \\in \\mathbb{R}^n",
      note: "An ordered list of n real numbers — a point in n-dimensional space.",
    },
    {
      label: "Dot product",
      latex: "\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^{n} a_i b_i",
      note: "Multiply corresponding components, sum the results. This is exactly what a single neuron computes: inputs dotted with weights.",
    },
    {
      label: "Euclidean norm",
      latex: "\\lVert \\mathbf{v} \\rVert = \\sqrt{\\sum_{i=1}^{n} v_i^2}",
      note: "The vector's length. Covered in depth in the Norms & Rank module — needed here only to define cosine similarity.",
    },
    {
      label: "Cosine similarity",
      latex: "\\cos\\theta = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\lVert \\mathbf{a} \\rVert \\, \\lVert \\mathbf{b} \\rVert}",
      note: "Normalizes the dot product by both magnitudes, leaving only the angle between the vectors — this is the similarity score behind embedding search and recommendation systems.",
    },
  ],
  howToSolve: [
    "Check that both vectors have the same number of components — the dot product is only defined when the dimensions match.",
    "Multiply each pair of corresponding components: first with first, second with second, and so on.",
    "Add all of those products together. That single number is the dot product.",
    "If you need the angle between the vectors, compute each vector's norm separately (square each component, sum, take the square root), then divide the dot product by the product of the two norms to get $\\cos\\theta$.",
    "Take $\\arccos$ of that ratio to recover $\\theta$ — and sanity-check the sign first: positive means acute, zero means perpendicular, negative means obtuse.",
  ],
  workedExample: {
    mathTitle: "Dot product and the angle between two vectors",
    mathSteps: [
      "Let $\\mathbf{a} = (1, 2, 3)$ and $\\mathbf{b} = (4, -1, 2)$.",
      "Dot product: $\\mathbf{a} \\cdot \\mathbf{b} = (1)(4) + (2)(-1) + (3)(2) = 4 - 2 + 6 = 8$.",
      "Norms: $\\lVert \\mathbf{a} \\rVert = \\sqrt{1+4+9} = \\sqrt{14} \\approx 3.7417$, and $\\lVert \\mathbf{b} \\rVert = \\sqrt{16+1+4} = \\sqrt{21} \\approx 4.5826$.",
      "Cosine of the angle: $\\cos\\theta = \\dfrac{8}{\\sqrt{14}\\sqrt{21}} \\approx \\dfrac{8}{17.146} \\approx 0.4666$.",
      "Angle: $\\theta = \\arccos(0.4666) \\approx 62.19^{\\circ}$ — the vectors point in broadly the same direction, but well off-axis.",
    ],
    pythonCode: `import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, -1, 2])

# a . b  -- same sum-of-products as the hand calculation
dot = np.dot(a, b)                     # 8

# ||a|| and ||b||
norm_a = np.linalg.norm(a)             # sqrt(14)
norm_b = np.linalg.norm(b)             # sqrt(21)

# cos(theta) = (a . b) / (||a|| ||b||), clipped for float safety
cos_theta = np.clip(dot / (norm_a * norm_b), -1.0, 1.0)
angle_deg = np.degrees(np.arccos(cos_theta))

print(dot, cos_theta, angle_deg)       # 8  0.4666...  62.19...`,
    pythonCaption:
      "np.dot mirrors the sum-of-products definition exactly; np.linalg.norm gives the two magnitudes; np.clip guards arccos against inputs that drift a hair outside [-1, 1] due to floating point.",
  },
  secondExample: {
    title: "A second worked example: projecting one vector onto another",
    steps: [
      "Let $\\mathbf{a} = (2, 3)$ and $\\mathbf{b} = (4, 0)$. We want to know how much of $\\mathbf{a}$ points in $\\mathbf{b}$'s direction.",
      "Dot product: $\\mathbf{a}\\cdot\\mathbf{b} = (2)(4) + (3)(0) = 8$.",
      "Squared norm of $\\mathbf{b}$: $\\lVert\\mathbf{b}\\rVert^2 = 4^2 + 0^2 = 16$.",
      "Scalar projection (length of the shadow $\\mathbf{a}$ casts on $\\mathbf{b}$): $\\operatorname{comp}_{\\mathbf{b}}(\\mathbf{a}) = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{\\lVert\\mathbf{b}\\rVert} = \\dfrac{8}{4} = 2$.",
      "Vector projection (that shadow, as an actual vector along $\\mathbf{b}$): $\\operatorname{proj}_{\\mathbf{b}}(\\mathbf{a}) = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{\\lVert\\mathbf{b}\\rVert^2}\\,\\mathbf{b} = \\dfrac{8}{16}(4,0) = (2, 0)$.",
      "Read this as: of $\\mathbf{a} = (2,3)$, exactly $(2,0)$ points along $\\mathbf{b}$'s direction — the remaining $(0,3)$ is entirely perpendicular to it. This decomposition is exactly what happens, coordinate by coordinate, when a linear layer measures an input against each of its weight directions.",
    ],
  },
  bestApproaches: [
    "Use `np.dot(a, b)` or `a @ b` instead of writing a Python loop — vectorized dot products are the difference between a training step taking milliseconds versus seconds.",
    "Always `np.clip` a cosine value to `[-1, 1]` before calling `arccos`: floating-point rounding can push a mathematically valid cosine to `1.0000000002`, which turns into `NaN`.",
    "For many pairs of vectors at once (e.g. a batch of queries against a batch of keys), compute all dot products in one matrix multiplication — `Q @ K.T` — rather than looping and calling `np.dot` per pair. This is literally the first step of attention.",
    "Watch for zero vectors when computing cosine similarity: dividing by `||v|| = 0` produces `NaN`/`inf`. Guard with a small epsilon in the denominator if zero vectors are possible in your data.",
  ],
  assessment: {
    handSolving: {
      id: "vectors-dot-hand",
      prompt:
        "Let $\\mathbf{u} = (2, 0, -1)$ and $\\mathbf{v} = (1, 3, 2)$. Compute the dot product $\\mathbf{u} \\cdot \\mathbf{v}$.",
      type: "number",
      answer: 0,
      tolerance: 0.01,
      placeholder: "e.g. 4",
      hint: "Multiply matching components — $u_1v_1$, $u_2v_2$, $u_3v_3$ — then add the three products together.",
      solutionSteps: [
        "$\\mathbf{u} \\cdot \\mathbf{v} = (2)(1) + (0)(3) + (-1)(2)$",
        "$= 2 + 0 - 2 = 0$",
        "The dot product is zero, which means $\\mathbf{u}$ and $\\mathbf{v}$ are orthogonal (perpendicular) — a very common special case worth recognizing on sight.",
      ],
    },
    programming: {
      id: "vectors-dot-programming",
      setup: "A = np.array([3, -2, 5])\nB = np.array([-1, 4, 2])",
      prompt:
        "Given the arrays above, write and run a Python script that computes the cosine similarity between A and B, rounded to 4 decimal places, and prints it. Run it in any Python environment — script, REPL, notebook, or Colab.",
      type: "number",
      answer: -0.0354,
      tolerance: 0.001,
      placeholder: "e.g. 0.1234",
      hint: "cosine_similarity = np.dot(A, B) / (np.linalg.norm(A) * np.linalg.norm(B)) — then round(result, 4).",
      solutionSteps: [
        "dot = 3(-1) + (-2)(4) + 5(2) = -3 - 8 + 10 = -1",
        "||A|| = sqrt(9 + 4 + 25) = sqrt(38) ≈ 6.1644",
        "||B|| = sqrt(1 + 16 + 4) = sqrt(21) ≈ 4.5826",
        "cosine similarity = -1 / (6.1644 × 4.5826) ≈ -1 / 28.2489 ≈ -0.0354",
      ],
    },
  },
};

export default content;
