import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "An eigenvector of a matrix $A$ is a direction that $A$ doesn't rotate — it only stretches or shrinks it. The eigenvalue is that stretch factor. Almost every matrix that shows up repeatedly in AI math (covariance matrices, Hessians, adjacency matrices) is best understood through its eigenvectors, because they reveal the matrix's intrinsic axes.",
    "This shows up directly: PCA finds the eigenvectors of a data's covariance matrix (the directions of greatest variance); the Hessian's eigenvalues near a critical point tell you whether optimization landed in a minimum, a maximum, or a saddle; the largest eigenvalue of a weight matrix bounds how much a layer can amplify its input, which matters for training stability.",
    "You rarely compute eigenvalues by hand in practice — libraries do it numerically — but the by-hand derivation is short for small matrices and builds the intuition needed to read what a library's output actually means.",
    "The sign and magnitude of an eigenvalue both carry meaning. A large positive eigenvalue means the matrix strongly stretches along that direction; a negative eigenvalue means it stretches *and* flips that direction; an eigenvalue near zero means the matrix nearly collapses that direction to nothing — which is exactly the situation that makes a matrix hard to invert.",
    "Eigenvalues also generalize a familiar 1-D idea. For a scalar function, the second derivative tells you whether you're at a minimum, maximum, or neither. For a multivariable function, that role is played by the Hessian's eigenvalues: all positive means a local minimum, all negative means a local maximum, and a mix of signs means a saddle point — the geometry that makes non-convex neural network loss landscapes so much harder to reason about than a single parabola.",
  ],
  mathIntro:
    "For a square matrix $A$, we look for nonzero vectors $\\mathbf{v}$ that $A$ only scales.",
  equations: [
    {
      label: "Eigenvalue equation",
      latex: "A\\mathbf{v} = \\lambda \\mathbf{v}",
      note: "$\\mathbf{v} \\neq \\mathbf{0}$ is the eigenvector, $\\lambda$ (a scalar) is the eigenvalue.",
    },
    {
      label: "Characteristic equation",
      latex: "\\det(A - \\lambda I) = 0",
      note: "Rearranging $A\\mathbf{v} = \\lambda \\mathbf{v}$ gives $(A - \\lambda I)\\mathbf{v} = 0$, which has a nonzero solution only when this determinant vanishes — solving it for $\\lambda$ gives every eigenvalue.",
    },
    {
      label: "Eigendecomposition",
      latex: "A = Q \\Lambda Q^{-1}",
      note: "When $A$ has $n$ linearly independent eigenvectors, $Q$'s columns are those eigenvectors and $\\Lambda$ is diagonal with the eigenvalues — this re-expresses $A$ entirely in terms of its own natural axes.",
    },
  ],
  howToSolve: [
    "Form $A - \\lambda I$ by subtracting $\\lambda$ from each entry on the main diagonal, leaving the off-diagonal entries unchanged.",
    "Set $\\det(A - \\lambda I) = 0$. For a 2×2 matrix this simplifies to $\\lambda^2 - \\operatorname{tr}(A)\\lambda + \\det(A) = 0$, where $\\operatorname{tr}(A)$ is the sum of the diagonal entries.",
    "Solve the resulting polynomial for $\\lambda$ — factor it if the roots are clean integers, otherwise use the quadratic formula. Each root is an eigenvalue.",
    "For each eigenvalue $\\lambda$, substitute it back into $(A - \\lambda I)\\mathbf{v} = 0$. The system is singular by construction, so it reduces to a single independent equation relating $v_1$ and $v_2$ — pick any nonzero solution.",
    "If a unit-length eigenvector is required, divide by its norm: $\\mathbf{v} / \\lVert\\mathbf{v}\\rVert$.",
  ],
  workedExample: {
    mathTitle: "Eigenvalues and eigenvectors of a 2×2 matrix",
    mathSteps: [
      "Let $A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$.",
      "Characteristic equation: $\\det \\begin{pmatrix} 4-\\lambda & 1 \\\\ 2 & 3-\\lambda \\end{pmatrix} = (4-\\lambda)(3-\\lambda) - 2 = 0$.",
      "Expand: $\\lambda^2 - 7\\lambda + 12 - 2 = \\lambda^2 - 7\\lambda + 10 = 0$, which factors as $(\\lambda - 5)(\\lambda - 2) = 0$, so $\\lambda_1 = 5$, $\\lambda_2 = 2$.",
      "For $\\lambda_1 = 5$: solve $(A - 5I)\\mathbf{v} = 0 \\Rightarrow \\begin{pmatrix} -1 & 1 \\\\ 2 & -2 \\end{pmatrix}\\mathbf{v} = 0 \\Rightarrow -v_1 + v_2 = 0$, so $\\mathbf{v}_1 = (1, 1)$.",
      "For $\\lambda_2 = 2$: solve $(A - 2I)\\mathbf{v} = 0 \\Rightarrow \\begin{pmatrix} 2 & 1 \\\\ 2 & 1 \\end{pmatrix}\\mathbf{v} = 0 \\Rightarrow 2v_1 + v_2 = 0$, so $\\mathbf{v}_2 = (1, -2)$.",
    ],
    pythonCode: `import numpy as np

A = np.array([[4, 1],
              [2, 3]])

eigenvalues, eigenvectors = np.linalg.eig(A)

print(eigenvalues)     # [5. 2.]  (order not guaranteed in general)
print(eigenvectors)    # columns are unit-length eigenvectors,
                        # matching (1,1)/sqrt(2) and (1,-2)/sqrt(5)
                        # up to an arbitrary sign flip`,
    pythonCaption:
      "NumPy returns unit-normalized eigenvectors as columns of a matrix — same directions as the hand solution, just rescaled to length 1 (and possibly sign-flipped).",
  },
  secondExample: {
    title: "A second worked example: the trace-determinant shortcut, and a negative eigenvalue",
    steps: [
      "For any 2×2 matrix, the characteristic equation always simplifies to $\\lambda^2 - \\operatorname{tr}(A)\\lambda + \\det(A) = 0$ — worth memorizing so you can skip the full determinant expansion.",
      "Let $B = \\begin{pmatrix} 1 & 2 \\\\ 2 & -2 \\end{pmatrix}$.",
      "$\\operatorname{tr}(B) = 1 + (-2) = -1$. $\\det(B) = (1)(-2) - (2)(2) = -2 - 4 = -6$.",
      "Characteristic equation: $\\lambda^2 - (-1)\\lambda + (-6) = \\lambda^2 + \\lambda - 6 = 0$.",
      "Factor: $(\\lambda + 3)(\\lambda - 2) = 0$, so $\\lambda = -3$ or $\\lambda = 2$.",
      "One eigenvalue is negative and one is positive: $B$ stretches by a factor of 2 along one direction, and stretches by a factor of 3 *while flipping* along the other — a shape no single positive scaling factor could describe.",
    ],
  },
  bestApproaches: [
    "For symmetric matrices (covariance matrices, Gram matrices, real Hessians of smooth functions), use `np.linalg.eigh` instead of `np.linalg.eig` — it's faster, numerically more stable, and guarantees real, sorted eigenvalues instead of a possibly-complex dtype.",
    "Eigenvectors are only defined up to sign and scale: `v` and `-v` are equally valid. Never write code that depends on a particular sign coming back from an eigensolver.",
    "`np.linalg.eig` does not guarantee any particular ordering of eigenvalues — sort explicitly (`np.argsort`) if you need the largest or smallest.",
    "A matrix close to non-diagonalizable (a small gap between eigenvalues, or a defective matrix) makes eigendecomposition numerically unstable — small input perturbations cause large changes in the computed eigenvectors. This is one reason PCA implementations often prefer SVD over explicit eigendecomposition of the covariance matrix.",
  ],
  assessment: {
    handSolving: {
      id: "eigen-hand",
      prompt:
        "Let $M = \\begin{pmatrix} 5 & 4 \\\\ 1 & 2 \\end{pmatrix}$. Find both eigenvalues of $M$ and enter them as a comma-separated list, in either order.",
      type: "array",
      answer: [6, 1],
      tolerance: 0.01,
      orderInsensitive: true,
      placeholder: "e.g. 6, 1",
      hint: "Set up $\\det(M - \\lambda I) = 0$: $(5-\\lambda)(2-\\lambda) - 4 = 0$. Expand into a quadratic in $\\lambda$ and factor it.",
      solutionSteps: [
        "$(5-\\lambda)(2-\\lambda) - (4)(1) = 0$",
        "$10 - 5\\lambda - 2\\lambda + \\lambda^2 - 4 = 0 \\Rightarrow \\lambda^2 - 7\\lambda + 6 = 0$",
        "Factor: $(\\lambda - 6)(\\lambda - 1) = 0$",
        "Eigenvalues: $\\lambda = 6$ and $\\lambda = 1$.",
      ],
    },
    programming: {
      id: "eigen-programming",
      setup: "N = np.array([[2, 0, 0], [0, 3, 4], [0, 4, 9]])",
      prompt:
        "N is symmetric. Write and run a Python script that computes its eigenvalues with `np.linalg.eigh` and prints the largest one.",
      type: "number",
      answer: 11,
      tolerance: 0.01,
      placeholder: "e.g. 9",
      hint: "np.linalg.eigh(N) returns eigenvalues already sorted in ascending order — the largest is the last element.",
      solutionSteps: [
        "N is block-diagonal: the (0,0) entry (value 2) is decoupled from the 2×2 block [[3,4],[4,9]].",
        "Eigenvalues of the block: trace = 12, det = 27 − 16 = 11, so λ² − 12λ + 11 = 0 → (λ−11)(λ−1) = 0 → λ = 11, 1.",
        "Full eigenvalue set of N: {2, 11, 1}. The largest is 11.",
      ],
    },
  },
};

export default content;
