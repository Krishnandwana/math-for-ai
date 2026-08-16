import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "A norm is a single number that measures a vector's size. Which norm you pick changes what \"size\" means, and that choice quietly shapes a lot of ML behavior: L2 regularization (weight decay) penalizes the Euclidean norm of the weights and tends to shrink everything a little; L1 regularization penalizes the sum of absolute values and tends to push weights to exactly zero, producing sparsity.",
    "Gradient clipping — a standard trick for training stability, especially in RNNs and transformers — rescales the gradient when its norm exceeds a threshold, protecting against exploding updates. That's a direct, practical use of the vector norm covered here.",
    "Rank measures something different: not size, but how much *independent* information a matrix's rows or columns carry. A weight matrix's rank bounds how much information can pass through that layer. Low-rank structure is exploited directly in techniques like LoRA, which fine-tunes large models by learning only a low-rank update to each weight matrix instead of the full matrix.",
    "The three norms disagree on purpose. For a fixed vector, $\\lVert\\mathbf{v}\\rVert_\\infty \\le \\lVert\\mathbf{v}\\rVert_2 \\le \\lVert\\mathbf{v}\\rVert_1$ always holds — L1 is the most sensitive to spreading a fixed magnitude across many components, L∞ the least. That's why L1 regularization (which effectively penalizes the L1 norm of the weights) has a stronger sparsity-inducing effect than L2 for the same total penalty budget.",
    "It's worth building the same two-sided intuition for rank as for eigenvalues: a full-rank matrix loses no information (it's invertible, if square), while a rank-deficient matrix collapses some input directions to zero — information about the input along those directions is destroyed and cannot be recovered downstream, no matter how the rest of the network is built.",
  ],
  mathIntro:
    "Norms generalize the idea of a vector's \"length\"; rank generalizes the idea of how many genuinely independent directions a matrix's rows or columns span.",
  equations: [
    {
      label: "L2 (Euclidean) norm",
      latex: "\\lVert \\mathbf{v} \\rVert_2 = \\sqrt{\\sum_i v_i^2}",
      note: "Straight-line length — the default \"norm\" when none is specified.",
    },
    {
      label: "L1 norm",
      latex: "\\lVert \\mathbf{v} \\rVert_1 = \\sum_i |v_i|",
      note: "Sum of absolute values. Its geometry (a diamond, not a circle) is what makes L1 regularization produce exact zeros.",
    },
    {
      label: "L∞ norm",
      latex: "\\lVert \\mathbf{v} \\rVert_\\infty = \\max_i |v_i|",
      note: "The single largest magnitude component — used when you care about worst-case, not total, size.",
    },
    {
      label: "Rank",
      latex: "\\operatorname{rank}(A) = \\dim(\\text{column space of } A)",
      note: "The number of linearly independent rows (equivalently, columns) of $A$ — equal to the number of nonzero singular values (see the SVD module).",
    },
  ],
  howToSolve: [
    "To compute a norm, first pin down which one is being asked for: L1 sums absolute values, L2 sums squares then takes one square root at the end, L∞ takes the single largest absolute value.",
    "Apply that rule component by component. For L2 specifically, don't take a square root per component — square everything first, sum the squares, then take exactly one square root at the very end.",
    "Sanity-check with $\\lVert\\mathbf{v}\\rVert_\\infty \\le \\lVert\\mathbf{v}\\rVert_2 \\le \\lVert\\mathbf{v}\\rVert_1$: if your three computed values don't respect that ordering, recheck the arithmetic.",
    "To compute rank by hand, run Gaussian elimination: repeatedly subtract a multiple of one row from another to zero out the entries below each pivot (leading nonzero entry).",
    "Continue until the matrix is in row-echelon form — each row's pivot sits strictly to the right of the pivot above it, and any all-zero rows sit at the bottom.",
    "Count the remaining nonzero rows. That count is the rank.",
  ],
  workedExample: {
    mathTitle: "Computing three norms, and the rank of a matrix",
    mathSteps: [
      "Let $\\mathbf{v} = (3, -4, 12)$.",
      "$\\lVert \\mathbf{v} \\rVert_1 = |3| + |-4| + |12| = 3 + 4 + 12 = 19$.",
      "$\\lVert \\mathbf{v} \\rVert_2 = \\sqrt{3^2 + (-4)^2 + 12^2} = \\sqrt{9+16+144} = \\sqrt{169} = 13$.",
      "$\\lVert \\mathbf{v} \\rVert_\\infty = \\max(3, 4, 12) = 12$.",
      "Now let $A = \\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}$. Row 2 is exactly $2 \\times$ row 1, so the rows are linearly dependent — only one independent direction survives. $\\operatorname{rank}(A) = 1$.",
    ],
    pythonCode: `import numpy as np

v = np.array([3, -4, 12])
print(np.linalg.norm(v, ord=1))        # 19.0
print(np.linalg.norm(v, ord=2))        # 13.0  (ord=2 is the default)
print(np.linalg.norm(v, ord=np.inf))   # 12.0

A = np.array([[1, 2],
              [2, 4]])
print(np.linalg.matrix_rank(A))        # 1`,
    pythonCaption:
      "`np.linalg.norm`'s `ord` argument selects which norm to compute; `matrix_rank` computes rank numerically via SVD under the hood rather than exact row reduction.",
  },
  secondExample: {
    title: "A second worked example: rank via Gaussian elimination",
    steps: [
      "Let $C = \\begin{pmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 3 \\\\ 3 & 6 & 5 \\end{pmatrix}$ — unlike the worked example, no row is an obvious multiple of another, so elimination is needed.",
      "$R_2 \\leftarrow R_2 - 2R_1$: $(2,4,3) - 2(1,2,1) = (0,0,1)$.",
      "$R_3 \\leftarrow R_3 - 3R_1$: $(3,6,5) - 3(1,2,1) = (0,0,2)$.",
      "$R_3 \\leftarrow R_3 - 2R_2$ (using the new $R_2$): $(0,0,2) - 2(0,0,1) = (0,0,0)$.",
      "Row-echelon form: $\\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix}$ — two nonzero rows survive, so $\\operatorname{rank}(C) = 2$.",
      "This is the general method any rank computation reduces to: eliminate until the zero rows fall out, then count what's left.",
    ],
  },
  bestApproaches: [
    "`np.linalg.matrix_rank` determines rank via a numerical tolerance on singular values (see the SVD module), not exact symbolic row reduction — a matrix that's mathematically rank-deficient may compute as full rank if noise pushes a singular value just above the tolerance, and vice versa. Pass an explicit `tol` if the default is too loose or too strict for your data.",
    "PyTorch's `torch.nn.utils.clip_grad_norm_` clips using the global L2 norm across *all* parameters combined by default, not per-parameter — know which one your framework does, since they behave very differently.",
    "L1's sparsity-inducing effect comes from its non-differentiable corner at zero — subgradient methods (or a proximal step, as in ISTA/soft-thresholding) are what actually push a coordinate to exactly zero, not plain gradient descent on a smooth approximation.",
    "When comparing vector sizes across very different scales (e.g. gradients from different layers), be explicit about which norm you're using — L2 and L∞ can rank the same set of vectors differently.",
  ],
  assessment: {
    handSolving: {
      id: "norms-hand",
      prompt:
        "Let $\\mathbf{w} = (1, -2, 2)$. Compute the L2 norm $\\lVert \\mathbf{w} \\rVert_2$.",
      type: "number",
      answer: 3,
      tolerance: 0.01,
      placeholder: "e.g. 4",
      hint: "Square each component, sum the squares, then take the square root.",
      solutionSteps: [
        "$\\lVert \\mathbf{w} \\rVert_2 = \\sqrt{1^2 + (-2)^2 + 2^2} = \\sqrt{1+4+4} = \\sqrt{9} = 3$",
      ],
    },
    programming: {
      id: "norms-programming",
      setup: "P = np.array([[1, 2, 3], [2, 4, 6], [1, 1, 1]])",
      prompt:
        "Write and run a Python script that computes the rank of P using NumPy and prints it.",
      type: "number",
      answer: 2,
      tolerance: 0.01,
      placeholder: "e.g. 3",
      hint: "np.linalg.matrix_rank(P) — check whether any row is a linear combination of the others first, to sanity-check the library's answer.",
      solutionSteps: [
        "Row 2 = 2 × Row 1, so rows 1 and 2 are linearly dependent.",
        "Row 3 = (1,1,1) is not a scalar multiple of row 1 = (1,2,3), so it contributes a second independent direction.",
        "Only 2 independent rows survive: rank(P) = 2.",
      ],
    },
  },
};

export default content;
