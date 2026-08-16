import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "Eigendecomposition only works cleanly on square matrices, and even then only when the matrix is diagonalizable. The singular value decomposition (SVD) works on *any* matrix — square, rectangular, singular, whatever — which is why it's the workhorse behind PCA, low-rank compression, pseudo-inverses for least squares, and recommender systems.",
    "SVD factors a matrix into a rotation, a scaling, and another rotation: $A = U\\Sigma V^{\\top}$. The columns of $V$ are directions in the input space, the columns of $U$ are the corresponding directions in the output space, and $\\Sigma$'s diagonal (the singular values) says how much each input direction gets stretched on its way to becoming an output direction.",
    "In deep learning specifically, truncated SVD is a direct tool for compressing weight matrices: keeping only the top-$k$ singular values and vectors gives the best possible rank-$k$ approximation of a matrix (the Eckart–Young theorem) — the same idea underlying low-rank adaptation methods used to fine-tune large models cheaply.",
    "It's worth connecting SVD back to the two previous modules explicitly. The singular values are the square roots of the eigenvalues of $A^\\top A$, so everything learned about solving 2×2 characteristic equations transfers directly. And the singular values are, by definition, exactly the quantity the Norms & Rank module calls rank: the number of nonzero singular values *is* the rank of $A$, and the largest singular value is the induced 2-norm of $A$ as a linear map — the tightest possible bound on how much $A$ can stretch any input vector.",
  ],
  mathIntro:
    "For any $A \\in \\mathbb{R}^{m \\times n}$, the SVD writes $A$ as a product of an orthogonal matrix, a diagonal matrix of non-negative singular values, and another orthogonal matrix.",
  equations: [
    {
      label: "SVD",
      latex: "A = U \\Sigma V^{\\top}",
      note: "$U \\in \\mathbb{R}^{m\\times m}$ and $V \\in \\mathbb{R}^{n\\times n}$ are orthogonal; $\\Sigma \\in \\mathbb{R}^{m\\times n}$ is diagonal with entries $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge 0$, the singular values.",
    },
    {
      label: "Singular values from eigenvalues",
      latex: "\\sigma_i = \\sqrt{\\lambda_i(A^{\\top}A)}",
      note: "The singular values are the square roots of the eigenvalues of $A^{\\top}A$ (equivalently $AA^{\\top}$) — this is exactly how the worked example computes them by hand.",
    },
    {
      label: "Best rank-k approximation",
      latex: "A_k = \\sum_{i=1}^{k} \\sigma_i \\, \\mathbf{u}_i \\mathbf{v}_i^{\\top}",
      note: "Keeping only the top $k$ singular value/vector triples gives the closest possible rank-$k$ matrix to $A$ (Eckart–Young theorem) — the basis for SVD-based compression.",
    },
  ],
  howToSolve: [
    "Compute $A^{\\top}A$ — this square, symmetric matrix is the key to everything else.",
    "Find the eigenvalues of $A^{\\top}A$ using the same trace/determinant shortcut from the Eigenvalues & Eigenvectors module. These eigenvalues are $\\sigma_i^2$, so take square roots — largest first — to get the singular values.",
    "Find a unit-length eigenvector of $A^{\\top}A$ for each eigenvalue. Stacked as columns (largest singular value first), these form $V$.",
    "Recover each column of $U$ via $\\mathbf{u}_i = A\\mathbf{v}_i / \\sigma_i$ — this maps each input direction to its corresponding output direction.",
    "Assemble $\\Sigma$ as the diagonal matrix of singular values, and verify by checking that $U\\Sigma V^{\\top}$ reconstructs $A$.",
  ],
  workedExample: {
    mathTitle: "SVD of a 2×2 matrix, by hand",
    mathSteps: [
      "Let $A = \\begin{pmatrix} 2 & 2 \\\\ -1 & 1 \\end{pmatrix}$.",
      "Compute $A^{\\top}A = \\begin{pmatrix} 2 & -1 \\\\ 2 & 1 \\end{pmatrix}\\begin{pmatrix} 2 & 2 \\\\ -1 & 1 \\end{pmatrix} = \\begin{pmatrix} 5 & 3 \\\\ 3 & 5 \\end{pmatrix}$.",
      "Eigenvalues of $A^{\\top}A$: trace $= 10$, det $= 25-9=16$, so $\\lambda^2 - 10\\lambda + 16 = 0 \\Rightarrow \\lambda = 8, 2$. Singular values: $\\sigma_1 = \\sqrt{8} = 2\\sqrt{2} \\approx 2.828$, $\\sigma_2 = \\sqrt{2} \\approx 1.414$.",
      "Eigenvectors of $A^{\\top}A$ give $V$: for $\\lambda=8$, $\\mathbf{v}_1 = \\tfrac{1}{\\sqrt2}(1,1)$; for $\\lambda=2$, $\\mathbf{v}_2 = \\tfrac{1}{\\sqrt2}(1,-1)$.",
      "Columns of $U$ come from $\\mathbf{u}_i = A\\mathbf{v}_i / \\sigma_i$: this gives $\\mathbf{u}_1 = (1,0)$ and $\\mathbf{u}_2 = (0,-1)$.",
      "Check: $U\\Sigma V^{\\top} = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}\\begin{pmatrix}2\\sqrt2&0\\\\0&\\sqrt2\\end{pmatrix}\\begin{pmatrix}1/\\sqrt2&1/\\sqrt2\\\\1/\\sqrt2&-1/\\sqrt2\\end{pmatrix} = \\begin{pmatrix}2&2\\\\-1&1\\end{pmatrix} = A$. ✓",
    ],
    pythonCode: `import numpy as np

A = np.array([[2, 2],
              [-1, 1]])

U, S, Vt = np.linalg.svd(A)

print(S)                        # [2.828..., 1.414...]  == sqrt(8), sqrt(2)
print(U)                        # columns match (1,0) and (0,-1), up to sign
print(Vt)                       # rows match V^T from the hand solution

# Reconstruct A to confirm the factorization
A_reconstructed = U @ np.diag(S) @ Vt
print(np.allclose(A, A_reconstructed))   # True`,
    pythonCaption:
      "np.linalg.svd returns S as a 1-D array of singular values (already sorted descending) and Vt as V transposed directly — diag(S) rebuilds the full Σ matrix for reconstruction.",
  },
  secondExample: {
    title: "A second worked example: the best rank-1 approximation, using Eckart–Young",
    steps: [
      "Reuse $A = \\begin{pmatrix}2&2\\\\-1&1\\end{pmatrix}$ from the worked example, with $\\sigma_1 = 2\\sqrt2$, $\\mathbf{u}_1=(1,0)$, $\\mathbf{v}_1 = \\tfrac{1}{\\sqrt2}(1,1)$.",
      "The best rank-1 approximation keeps only the first term: $A_1 = \\sigma_1\\,\\mathbf{u}_1\\mathbf{v}_1^{\\top}$.",
      "$\\mathbf{u}_1\\mathbf{v}_1^{\\top} = \\begin{pmatrix}1\\\\0\\end{pmatrix}\\begin{pmatrix}\\tfrac{1}{\\sqrt2} & \\tfrac{1}{\\sqrt2}\\end{pmatrix} = \\begin{pmatrix}\\tfrac{1}{\\sqrt2} & \\tfrac{1}{\\sqrt2}\\\\ 0 & 0\\end{pmatrix}$.",
      "$A_1 = 2\\sqrt2 \\begin{pmatrix}\\tfrac{1}{\\sqrt2} & \\tfrac{1}{\\sqrt2}\\\\ 0 & 0\\end{pmatrix} = \\begin{pmatrix}2 & 2\\\\ 0 & 0\\end{pmatrix}$.",
      "By the Eckart–Young theorem, the leftover error $\\lVert A - A_1\\rVert_F$ should equal the dropped singular value $\\sigma_2 = \\sqrt2$. Check: $A - A_1 = \\begin{pmatrix}0&0\\\\-1&1\\end{pmatrix}$, and $\\lVert A-A_1\\rVert_F = \\sqrt{0+0+1+1} = \\sqrt2$. ✓ — confirms $A_1$ really is the closest possible rank-1 matrix to $A$.",
    ],
  },
  bestApproaches: [
    "Singular values are always non-negative and returned sorted in descending order by convention — unlike eigenvalues, there's no sign or ordering ambiguity to handle.",
    "For a low-rank approximation, truncate: keep only the first $k$ columns of `U`, the first $k$ singular values, and the first $k$ rows of `Vt`. This gives the provably-best rank-$k$ approximation, which is exactly how SVD-based weight compression works.",
    "For PCA, compute SVD directly on the (mean-centered) data matrix rather than forming the covariance matrix and eigendecomposing it — squaring the data into a covariance matrix squares its condition number too, making eigendecomposition noticeably less numerically stable than SVD on the original data.",
    "Pass `full_matrices=False` to `np.linalg.svd` for a tall, skinny (or short, wide) matrix — it returns the reduced/\"economy\" SVD instead of full square $U$ and $V$, saving substantial memory and compute when one dimension is much larger than the other.",
  ],
  assessment: {
    handSolving: {
      id: "svd-hand",
      prompt:
        "Let $B = \\begin{pmatrix} 0 & 2 \\\\ -3 & 0 \\end{pmatrix}$. Find its singular values and enter them as a comma-separated list, largest first.",
      type: "array",
      answer: [3, 2],
      tolerance: 0.01,
      orderInsensitive: false,
      placeholder: "e.g. 3, 2",
      hint: "Compute $B^{\\top}B$ first — it comes out diagonal for this matrix, so its eigenvalues are just its diagonal entries. The singular values are their square roots.",
      solutionSteps: [
        "$B^{\\top}B = \\begin{pmatrix}0&-3\\\\2&0\\end{pmatrix}\\begin{pmatrix}0&2\\\\-3&0\\end{pmatrix} = \\begin{pmatrix}9&0\\\\0&4\\end{pmatrix}$",
        "Because $B^{\\top}B$ is already diagonal, its eigenvalues are read directly off the diagonal: 9 and 4.",
        "Singular values: $\\sqrt{9}=3$ and $\\sqrt{4}=2$. Largest first: 3, 2.",
      ],
    },
    programming: {
      id: "svd-programming",
      setup: "C = np.array([[4, 0], [3, -5]])",
      prompt:
        "Write and run a Python script that uses `np.linalg.svd` to compute the singular values of C and prints the largest one, rounded to 4 decimal places.",
      type: "number",
      answer: 6.3246,
      tolerance: 0.001,
      placeholder: "e.g. 5.1234",
      hint: "np.linalg.svd(C) returns singular values already sorted descending — the first entry of that array is the largest.",
      solutionSteps: [
        "$C^{\\top}C = \\begin{pmatrix}4&3\\\\0&-5\\end{pmatrix}\\begin{pmatrix}4&0\\\\3&-5\\end{pmatrix} = \\begin{pmatrix}25&-15\\\\-15&25\\end{pmatrix}$",
        "trace = 50, det = 625 − 225 = 400, so λ² − 50λ + 400 = 0 → λ = 40, 10.",
        "Singular values: √40 ≈ 6.3246 and √10 ≈ 3.1623. Largest ≈ 6.3246.",
      ],
    },
  },
};

export default content;
