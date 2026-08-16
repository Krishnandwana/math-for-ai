import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "A matrix is a grid of numbers — but functionally, it's a linear transformation. Every fully-connected layer in a neural network is a matrix: it takes an input vector and produces an output vector via $y = Wx + b$. The weight matrix $W$ encodes what that layer does to its input.",
    "Matrix multiplication is how transformations compose. Stacking two linear layers means multiplying their weight matrices; running a batch of examples through a layer means multiplying a batch matrix by a weight matrix. Understanding matmul mechanically — which row meets which column — is the single most load-bearing piece of arithmetic in deep learning.",
    "The shape-compatibility rule (inner dimensions must match) is not a technicality to memorize — it's the reason shape mismatches are the most common runtime error when building models, and the first thing to check when a network won't run.",
    "It helps to hold two views of a matrix at once. Read left to right, a matrix is a batch of row vectors; read top to bottom, it's a batch of column vectors. A matrix-vector product $A\\mathbf{x}$ is a special case of matrix-matrix multiplication where the 'batch' on the right has just one column — this is exactly the shape of a single example passing through a dense layer.",
    "The identity matrix $I$ (ones on the diagonal, zeros elsewhere) is the multiplicative do-nothing: $AI = IA = A$ for any compatible $A$. It shows up constantly as a baseline — residual connections, for instance, can be read as learning a small correction to the identity transformation rather than a transformation from scratch.",
  ],
  mathIntro:
    "A matrix $A \\in \\mathbb{R}^{m \\times n}$ has $m$ rows and $n$ columns. Multiplying $A$ by $B$ requires $A$'s column count to match $B$'s row count.",
  equations: [
    {
      label: "Matrix–vector product",
      latex: "(A\\mathbf{x})_i = \\sum_{j=1}^{n} A_{ij} x_j",
      note: "Row $i$ of the output is the dot product of $A$'s $i$-th row with $\\mathbf{x}$.",
    },
    {
      label: "Matrix–matrix product",
      latex: "(AB)_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}",
      note: "Entry $(i,j)$ of the product is the dot product of row $i$ of $A$ with column $j$ of $B$. Requires $A \\in \\mathbb{R}^{m\\times n}$, $B \\in \\mathbb{R}^{n\\times p}$, giving $AB \\in \\mathbb{R}^{m\\times p}$.",
    },
    {
      label: "Transpose",
      latex: "(A^{\\top})_{ij} = A_{ji}",
      note: "Flips rows and columns. $AB \\neq BA$ in general, and $(AB)^{\\top} = B^{\\top}A^{\\top}$ — the order reverses.",
    },
  ],
  howToSolve: [
    "Check shape compatibility first: if the left matrix is $m \\times n$ and the right is $p \\times q$, you need $n = p$ — the left's column count must equal the right's row count. The result will be $m \\times q$.",
    "To fill in entry $(i,j)$ of the result, take row $i$ of the left matrix and column $j$ of the right matrix.",
    "Multiply the two vectors component-wise, then sum the products — this is exactly a dot product, and it's the same operation the Vectors & Dot Products module covers in isolation.",
    "Repeat for every $(i,j)$ pair until the whole output matrix is filled in. Working row by row (all of row 1's outputs, then all of row 2's, ...) is usually the least error-prone order by hand.",
    "As a sanity check, verify the final shape matches $m \\times q$ before trusting any of the entries.",
  ],
  workedExample: {
    mathTitle: "Multiplying two 2×2 matrices",
    mathSteps: [
      "Let $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 5 & 6 \\\\ 7 & 8 \\end{pmatrix}$.",
      "Entry $(1,1)$: row 1 of $A$ dotted with column 1 of $B$ = $(1)(5) + (2)(7) = 5 + 14 = 19$.",
      "Entry $(1,2)$: row 1 of $A$ dotted with column 2 of $B$ = $(1)(6) + (2)(8) = 6 + 16 = 22$.",
      "Entry $(2,1)$: row 2 of $A$ dotted with column 1 of $B$ = $(3)(5) + (4)(7) = 15 + 28 = 43$.",
      "Entry $(2,2)$: row 2 of $A$ dotted with column 2 of $B$ = $(3)(6) + (4)(8) = 18 + 32 = 50$.",
      "$AB = \\begin{pmatrix} 19 & 22 \\\\ 43 & 50 \\end{pmatrix}$",
    ],
    pythonCode: `import numpy as np

A = np.array([[1, 2],
              [3, 4]])
B = np.array([[5, 6],
              [7, 8]])

# @ is matrix multiplication in NumPy -- same as np.matmul(A, B)
# NOT the same as A * B, which multiplies element-wise
AB = A @ B

print(AB)
# [[19 22]
#  [43 50]]`,
    pythonCaption:
      "`@` performs true matrix multiplication; `*` would multiply element-wise and silently give the wrong answer — this is the single most common matmul bug.",
  },
  secondExample: {
    title: "A second worked example: a matrix-vector product, as a linear layer",
    steps: [
      "Let $W = \\begin{pmatrix} 1 & 0 & 2 \\\\ -1 & 3 & 0 \\end{pmatrix}$, $\\mathbf{x} = (2, 1, 1)$, and bias $\\mathbf{b} = (0, -1)$ — exactly the shape of a small linear layer mapping 3 inputs to 2 outputs.",
      "Row 1 of $W\\mathbf{x}$: $(1)(2) + (0)(1) + (2)(1) = 2 + 0 + 2 = 4$.",
      "Row 2 of $W\\mathbf{x}$: $(-1)(2) + (3)(1) + (0)(1) = -2 + 3 + 0 = 1$.",
      "So $W\\mathbf{x} = (4, 1)$.",
      "Add the bias: $\\mathbf{y} = W\\mathbf{x} + \\mathbf{b} = (4, 1) + (0, -1) = (4, 0)$.",
      "This is precisely what `nn.Linear(3, 2)` computes for one input vector — every dense layer's forward pass is this same calculation, just at a larger scale and applied to a whole batch at once.",
    ],
  },
  bestApproaches: [
    "Use `@` (or `np.matmul`) for matrix multiplication and reserve `*` for element-wise products — mixing them up is silent and produces plausible-looking wrong numbers, not an error.",
    "For batched operations (a stack of matrices, as in a mini-batch), use `np.matmul`/`torch.bmm`/`torch.matmul`'s broadcasting instead of looping over the batch in Python — broadcasting pushes the loop into optimized C/CUDA code.",
    "When a shape mismatch error appears, check dimensions in this order: does the inner dimension of the left operand match the inner dimension of the right operand? A `(32, 128) @ (128, 64)` works; a `(32, 128) @ (64, 128)` doesn't — you likely need `.T` on the right operand.",
    "For complex contractions (batched, multi-index), `np.einsum` is often clearer and sometimes faster than chained `@` and `.transpose()` calls, since it makes every index explicit.",
  ],
  assessment: {
    handSolving: {
      id: "matrices-matmul-hand",
      prompt:
        "Let $C = \\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix}$ and $D = \\begin{pmatrix} 4 & 1 \\\\ 0 & 2 \\end{pmatrix}$. Compute $CD$ and enter the four entries in row-major order (top-left, top-right, bottom-left, bottom-right) as a comma-separated list.",
      type: "array",
      answer: [8, 2, 4, 7],
      tolerance: 0.01,
      orderInsensitive: false,
      placeholder: "e.g. 8, 2, 4, 7",
      hint: "Entry (row i, col j) of the product is row i of C dotted with column j of D. Compute all four entries the same way as the worked example.",
      solutionSteps: [
        "(1,1): (2)(4) + (0)(0) = 8",
        "(1,2): (2)(1) + (0)(2) = 2",
        "(2,1): (1)(4) + (3)(0) = 4",
        "(2,2): (1)(1) + (3)(2) = 1 + 6 = 7",
        "$CD = \\begin{pmatrix} 8 & 2 \\\\ 4 & 7 \\end{pmatrix}$",
      ],
    },
    programming: {
      id: "matrices-matmul-programming",
      setup:
        "A = np.array([[1, -1], [2, 0], [3, 1]])   # shape (3, 2)\nB = np.array([[2, 1, 0], [0, 1, -1]])     # shape (2, 3)",
      prompt:
        "Given the arrays above, write and run a Python script that computes $C = AB$ (shape (3, 3)), then prints the sum of all nine entries of $C$ as a single number.",
      type: "number",
      answer: 18,
      tolerance: 0.01,
      placeholder: "e.g. 12",
      hint: "First compute C = A @ B, a 3x3 matrix. Then use C.sum() to add every entry.",
      solutionSteps: [
        "C = A @ B = [[2, 0, 1], [4, 2, 0], [6, 4, -1]]",
        "Row sums: 2+0+1 = 3, 4+2+0 = 6, 6+4-1 = 9",
        "Total: 3 + 6 + 9 = 18",
      ],
    },
  },
};

export default content;
