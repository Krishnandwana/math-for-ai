import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "A partial derivative extends the derivative to functions of several variables: to find $\\partial f/\\partial x$, treat every other variable as a constant and differentiate normally with respect to $x$ alone. A real loss function depends on millions or billions of parameters simultaneously — a partial derivative isolates, one at a time, how the loss responds to nudging a single one of them while every other parameter stays frozen.",
    "Stack every partial derivative of a scalar function into one vector and you get the gradient, $\\nabla f$. The gradient is the multivariable generalization of \"slope,\" and it has a precise geometric meaning: it points in the direction of steepest ascent. Gradient descent works by stepping in exactly the opposite direction, $-\\nabla f$, because that's the direction of steepest descent.",
    "This is where the Vectors & Dot Products module pays off directly: the rate of change of $f$ along any arbitrary direction $\\mathbf{u}$ (not just along an axis) is the directional derivative $\\nabla f \\cdot \\mathbf{u}$ — a plain dot product between the gradient and a unit direction vector.",
    "In practice, you never hand-compute the gradient of a real neural network's loss — autograd does it via backpropagation, covered in the Chain Rule module. But every entry of a PyTorch `.grad` tensor is exactly a partial derivative in the sense defined here: the loss's sensitivity to one parameter, holding all the others fixed at that instant.",
  ],
  mathIntro:
    "For a function of several variables, each partial derivative measures sensitivity along one axis; the gradient collects all of them into a single vector.",
  equations: [
    {
      label: "Partial derivative",
      latex: "\\frac{\\partial f}{\\partial x_i} = \\lim_{h \\to 0} \\frac{f(\\dots, x_i+h, \\dots) - f(\\dots, x_i, \\dots)}{h}",
      note: "Every variable except $x_i$ is held fixed while taking the limit.",
    },
    {
      label: "Gradient",
      latex: "\\nabla f = \\left( \\frac{\\partial f}{\\partial x_1}, \\dots, \\frac{\\partial f}{\\partial x_n} \\right)",
      note: "The vector of all partial derivatives — points in the direction of steepest ascent of $f$.",
    },
    {
      label: "Directional derivative",
      latex: "D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}, \\quad \\lVert \\mathbf{u} \\rVert = 1",
      note: "The rate of change of $f$ along unit direction $\\mathbf{u}$ — a dot product between the gradient and the direction.",
    },
  ],
  howToSolve: [
    "To find $\\partial f/\\partial x_i$, treat every other variable as a fixed constant and differentiate with respect to $x_i$ using the ordinary single-variable rules.",
    "Repeat for every variable to build the full gradient vector $\\nabla f = (\\partial f/\\partial x_1, \\dots, \\partial f/\\partial x_n)$.",
    "Substitute a specific point's coordinates into each partial derivative only after all the symbolic differentiation is done.",
    "For a directional derivative along a vector $\\mathbf{v}$, first normalize it to a unit vector: $\\mathbf{u} = \\mathbf{v} / \\lVert\\mathbf{v}\\rVert$.",
    "Compute $D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}$ — an ordinary dot product between the gradient and the unit direction.",
  ],
  workedExample: {
    mathTitle: "Computing a gradient at a point",
    mathSteps: [
      "Let $f(x,y) = x^2y + 3xy^2 - y^3$.",
      "$\\partial f/\\partial x$ (treat $y$ as constant): $2xy + 3y^2$.",
      "$\\partial f/\\partial y$ (treat $x$ as constant): $x^2 + 6xy - 3y^2$.",
      "Evaluate at $(1,2)$: $\\partial f/\\partial x = 2(1)(2)+3(2)^2 = 4+12 = 16$. $\\partial f/\\partial y = 1^2 + 6(1)(2) - 3(2)^2 = 1+12-12 = 1$.",
      "$\\nabla f(1,2) = (16, 1)$ — the direction of steepest ascent from that point; moving along $(-16,-1)$ decreases $f$ fastest locally.",
    ],
    pythonCode: `import sympy as sp

x, y = sp.symbols('x y')
f = x**2*y + 3*x*y**2 - y**3

grad = [sp.diff(f, var) for var in (x, y)]
grad_at_point = [g.subs({x: 1, y: 2}) for g in grad]

print(grad)            # [2*x*y + 3*y**2, x**2 + 6*x*y - 3*y**2]
print(grad_at_point)   # [16, 1]`,
    pythonCaption:
      "Each entry of grad is computed with sp.diff, one variable at a time — exactly the same partial derivatives as the hand calculation, then evaluated at the point.",
  },
  secondExample: {
    title: "A second worked example: the directional derivative",
    steps: [
      "Using $\\nabla f(1,2) = (16, 1)$ from the worked example, find the rate of change of $f$ at $(1,2)$ in the direction of $\\mathbf{v} = (3,4)$.",
      "Normalize $\\mathbf{v}$ to a unit vector first: $\\lVert\\mathbf{v}\\rVert = \\sqrt{9+16} = 5$, so $\\mathbf{u} = (3/5, 4/5)$.",
      "Directional derivative: $D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u} = (16)(3/5) + (1)(4/5) = 48/5 + 4/5 = 52/5 = 10.4$.",
      "Compare to the maximum possible rate of increase, $\\lVert\\nabla f\\rVert = \\sqrt{16^2+1^2} = \\sqrt{257} \\approx 16.03$ — direction $(3,4)$ captures a good portion of the steepest-ascent rate, but not all of it, since $(3,4)$ isn't perfectly aligned with $(16,1)$.",
    ],
  },
  bestApproaches: [
    "Autograd computes exact partial derivatives for every parameter simultaneously via backpropagation — you almost never hand-differentiate a real loss function, but each entry of the resulting gradient tensor is exactly the concept defined here.",
    "The gradient points toward steepest *ascent*. Gradient descent moves along $-\\nabla f$ specifically because that's steepest *descent* — getting this sign backwards is the single most common gradient-descent bug.",
    "Always normalize a direction vector before computing a directional derivative — using a non-unit vector silently scales the result by $\\lVert\\mathbf{v}\\rVert$, giving the wrong number without any error being raised.",
    "Numerical gradient checking (finite differences on each parameter) is slow — it needs two function evaluations per parameter — but remains the standard way to validate that a hand-derived or autodiff gradient is implemented correctly.",
  ],
  assessment: {
    handSolving: {
      id: "gradients-hand",
      prompt:
        "Let $g(x,y) = 3x^2y - 2xy^2 + y$. Find $\\nabla g$ at $(2,-1)$ and enter it as a comma-separated list, in the order $(\\partial g/\\partial x, \\partial g/\\partial y)$.",
      type: "array",
      answer: [-14, 21],
      tolerance: 0.01,
      orderInsensitive: false,
      placeholder: "e.g. -14, 21",
      hint: "Differentiate with respect to x holding y fixed, then with respect to y holding x fixed, then substitute the point into each.",
      solutionSteps: [
        "∂g/∂x = 6xy - 2y². At (2,-1): 6(2)(-1) - 2(-1)² = -12 - 2 = -14.",
        "∂g/∂y = 3x² - 4xy + 1. At (2,-1): 3(4) - 4(2)(-1) + 1 = 12 + 8 + 1 = 21.",
        "∇g(2,-1) = (-14, 21).",
      ],
    },
    programming: {
      id: "gradients-programming",
      setup: "import sympy as sp\nx, y = sp.symbols('x y')\nh = x**3*y**2 - 4*x*y",
      prompt:
        "Compute the gradient of h(x,y) with sympy, evaluate it at (x, y) = (1, 2), and print the two components as a list.",
      type: "array",
      answer: [4, 0],
      tolerance: 0.01,
      orderInsensitive: false,
      placeholder: "e.g. 4, 0",
      hint: "[sp.diff(h, x), sp.diff(h, y)] gives the gradient symbolically; substitute x=1, y=2 into each component.",
      solutionSteps: [
        "∂h/∂x = 3x²y² - 4y. At (1,2): 3(1)(4) - 4(2) = 12 - 8 = 4.",
        "∂h/∂y = 2x³y - 4x. At (1,2): 2(1)(2) - 4(1) = 4 - 4 = 0.",
        "∇h(1,2) = (4, 0).",
      ],
    },
  },
};

export default content;
