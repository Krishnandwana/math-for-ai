import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "The gradient handles scalar-valued functions — one output, many inputs. But every layer in a neural network maps a vector to another vector: many inputs, many outputs. The Jacobian generalizes the gradient to exactly this case: it's the matrix whose rows are the gradients of each output component with respect to every input.",
    "Backpropagation through a layer is, mechanically, multiplying the upstream gradient by that layer's Jacobian. In practice, autograd never forms the full Jacobian matrix explicitly — it computes vector-Jacobian products directly, which cost about the same as a single forward pass regardless of how large the full matrix would be.",
    "The Hessian takes a different generalization: it's the matrix of *second* partial derivatives of a scalar function, describing local curvature rather than local slope. This connects directly back to the Eigenvalues & Eigenvectors module — the Hessian's eigenvalues classify a critical point as a minimum, maximum, or saddle, which is exactly why non-convex loss landscapes are so much harder to reason about than a single parabola.",
    "Second-order optimizers (Newton's method, quasi-Newton methods like L-BFGS) use the Hessian, or a cheap approximation to it, to take smarter steps than plain gradient descent — a direct application of the curvature information this module covers.",
  ],
  mathIntro:
    "The Jacobian generalizes the gradient to vector-valued functions; the Hessian generalizes the second derivative to scalar functions of many variables.",
  equations: [
    {
      label: "Jacobian",
      latex: "J_{ij} = \\frac{\\partial f_i}{\\partial x_j}, \\quad f: \\mathbb{R}^n \\to \\mathbb{R}^m",
      note: "An $m \\times n$ matrix — row $i$ is the gradient of output component $f_i$ with respect to every input.",
    },
    {
      label: "Hessian",
      latex: "H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}, \\quad f: \\mathbb{R}^n \\to \\mathbb{R}",
      note: "An $n \\times n$ matrix of second partial derivatives. By Clairaut's theorem, mixed partials are equal for smooth $f$, so $H$ is always symmetric.",
    },
    {
      label: "Critical point classification",
      latex: "\\det(H) < 0 \\Rightarrow \\text{saddle}; \\quad \\det(H) > 0,\\, \\operatorname{tr}(H) > 0 \\Rightarrow \\text{local min}",
      note: "The same trace/determinant shortcut from the Eigenvalues module, applied to the Hessian at a critical point.",
    },
  ],
  howToSolve: [
    "For a Jacobian, list every output component of the function; for each one, compute its partial derivative with respect to every input — each output becomes one row of the matrix.",
    "For a Hessian, start from the gradient of the scalar function, then differentiate each component of that gradient with respect to every variable again — each gives one row of the Hessian.",
    "Use Clairaut's theorem as a check: mixed second partials are equal ($\\partial^2f/\\partial x\\partial y = \\partial^2f/\\partial y\\partial x$) for smooth functions, so a correctly computed Hessian is always symmetric.",
    "To classify a critical point with a 2×2 Hessian, use the trace/determinant shortcut: $\\det(H)<0$ means a saddle; $\\det(H)>0$ with $\\operatorname{tr}(H)>0$ means a local minimum; $\\det(H)>0$ with $\\operatorname{tr}(H)<0$ means a local maximum.",
    "Substitute numerical values only after every partial derivative has been computed symbolically.",
  ],
  workedExample: {
    mathTitle: "Computing a Jacobian for a vector-valued function",
    mathSteps: [
      "Let $f(x,y) = (x^2y,\\ x+y^3)$, a function from $\\mathbb{R}^2$ to $\\mathbb{R}^2$.",
      "Row 1 (partials of $f_1 = x^2y$): $\\partial f_1/\\partial x = 2xy$, $\\partial f_1/\\partial y = x^2$.",
      "Row 2 (partials of $f_2 = x+y^3$): $\\partial f_2/\\partial x = 1$, $\\partial f_2/\\partial y = 3y^2$.",
      "$J(x,y) = \\begin{pmatrix} 2xy & x^2 \\\\ 1 & 3y^2 \\end{pmatrix}$.",
      "At $(1,2)$: $J = \\begin{pmatrix} 2(1)(2) & 1^2 \\\\ 1 & 3(2)^2 \\end{pmatrix} = \\begin{pmatrix} 4 & 1 \\\\ 1 & 12 \\end{pmatrix}$.",
    ],
    pythonCode: `import sympy as sp

x, y = sp.symbols('x y')
f1 = x**2 * y
f2 = x + y**3

J = sp.Matrix([f1, f2]).jacobian([x, y])
J_at_point = J.subs({x: 1, y: 2})

print(J)             # Matrix([[2*x*y, x**2], [1, 3*y**2]])
print(J_at_point)    # Matrix([[4, 1], [1, 12]])`,
    pythonCaption:
      "sympy's .jacobian() builds exactly the matrix from the hand calculation — one row per output component, one column per input variable.",
  },
  secondExample: {
    title: "A second worked example: the Hessian, and classifying critical points",
    steps: [
      "Let $f(x,y) = x^3 - 3xy + y^2$. Find its critical points by setting both partials to zero: $\\partial f/\\partial x = 3x^2-3y=0 \\Rightarrow y=x^2$, and $\\partial f/\\partial y = -3x+2y=0 \\Rightarrow y=1.5x$.",
      "Combine: $x^2 = 1.5x \\Rightarrow x(x-1.5)=0 \\Rightarrow x=0$ or $x=1.5$, giving critical points $(0,0)$ and $(1.5,\\, 2.25)$.",
      "The Hessian is $H(x,y) = \\begin{pmatrix} 6x & -3 \\\\ -3 & 2 \\end{pmatrix}$.",
      "At $(0,0)$: $H = \\begin{pmatrix} 0 & -3 \\\\ -3 & 2 \\end{pmatrix}$. $\\det(H) = (0)(2)-(-3)(-3) = -9 < 0$, so the eigenvalues have opposite signs — $(0,0)$ is a saddle point.",
      "At $(1.5,\\,2.25)$: $H = \\begin{pmatrix} 9 & -3 \\\\ -3 & 2 \\end{pmatrix}$. $\\det(H) = 18-9=9>0$ and $\\operatorname{tr}(H)=11>0$, so both eigenvalues are positive — $(1.5,\\,2.25)$ is a local minimum.",
      "This is exactly how second-order optimality is checked in general: compute the Hessian at a critical point, then read off its eigenvalue signs.",
    ],
  },
  bestApproaches: [
    "Autograd never forms a full Jacobian explicitly during backprop — it computes vector-Jacobian products ($v^{\\top}J$), which cost about the same as one forward pass regardless of how large the full matrix would be.",
    "Exact Hessians are rarely computed for large neural networks (an $n\\times n$ matrix for $n$ parameters is infeasible at scale); optimizers like Adam use cheap diagonal approximations to curvature instead of the true Hessian.",
    "The Hessian's symmetry (Clairaut's theorem) is a useful sanity check — if a hand-derived or coded Hessian isn't symmetric, there's a bug somewhere in the derivation.",
    "The 2×2 det/trace classification generalizes to $n\\times n$ via the full set of eigenvalue signs: all positive is a minimum, all negative is a maximum, mixed signs is a saddle.",
  ],
  assessment: {
    handSolving: {
      id: "jacobian-hand",
      prompt:
        "Let $f(x,y) = (xy,\\ x^2-y)$. Compute the Jacobian at $(2,1)$ and enter the four entries in row-major order (top-left, top-right, bottom-left, bottom-right) as a comma-separated list.",
      type: "array",
      answer: [1, 2, 4, -1],
      tolerance: 0.01,
      orderInsensitive: false,
      placeholder: "e.g. 1, 2, 4, -1",
      hint: "Row 1 is the gradient of f1=xy; row 2 is the gradient of f2=x²-y. Differentiate each with respect to x, then y.",
      solutionSteps: [
        "∂f1/∂x = y, ∂f1/∂y = x. ∂f2/∂x = 2x, ∂f2/∂y = -1.",
        "J(x,y) = [[y, x], [2x, -1]].",
        "At (2,1): J = [[1, 2], [4, -1]].",
      ],
    },
    programming: {
      id: "hessian-programming",
      setup: "import sympy as sp\nx, y = sp.symbols('x y')\nf = x**2*y - y**3",
      prompt:
        "f is a scalar function. Write and run a Python script that computes its Hessian matrix using sympy (sp.hessian(f, [x, y])), evaluates it at (x, y) = (1, 1), and prints the determinant of the resulting matrix.",
      type: "number",
      answer: -16,
      tolerance: 0.01,
      placeholder: "e.g. -4",
      hint: "sp.hessian(f, [x, y]) builds the full Hessian symbolically; substitute the point, then use .det() on the resulting matrix.",
      solutionSteps: [
        "∂f/∂x = 2xy, ∂f/∂y = x² - 3y².",
        "∂²f/∂x² = 2y, ∂²f/∂x∂y = 2x, ∂²f/∂y² = -6y.",
        "H = [[2y, 2x], [2x, -6y]]. At (1,1): [[2, 2], [2, -6]].",
        "det(H) = (2)(-6) - (2)(2) = -12 - 4 = -16.",
      ],
    },
  },
};

export default content;
