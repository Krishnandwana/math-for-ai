import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "A Taylor series approximates a function near a chosen point using nothing but its derivatives *at that point*: the value, the slope, the curvature, and so on, each contributing one more term of a polynomial that matches the original function increasingly well close to the expansion point.",
    "The first-order Taylor expansion — value plus slope times distance — is exactly the tangent line (or tangent plane, in higher dimensions). This is why gradient descent works at all: each step trusts a first-order (linear) approximation of the loss near the current parameters, and takes a small step downhill within the region where that approximation is still accurate.",
    "The second-order expansion adds a curvature term built from the Hessian. This is the basis of Newton's method and quasi-Newton optimizers, which use curvature information to take smarter steps than gradient descent's purely linear view — often converging in far fewer iterations, at the cost of computing or approximating the Hessian.",
    "The approximation's error grows with distance from the expansion point, governed by the size of the higher-order derivatives that were dropped. This is precisely why gradient descent needs a small learning rate: step too far, and you leave the region where the linear approximation the whole method is built on still holds.",
  ],
  mathIntro:
    "Each additional term in a Taylor expansion uses one more derivative at the expansion point $a$, and one higher power of the distance $(x-a)$.",
  equations: [
    {
      label: "Full Taylor series",
      latex: "f(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\frac{f'''(a)}{3!}(x-a)^3 + \\cdots",
      note: "An infinite sum, built entirely from derivatives evaluated at the single point $a$.",
    },
    {
      label: "First-order (linear) approximation",
      latex: "f(x) \\approx f(a) + f'(a)(x-a)",
      note: "The tangent line at $a$ — exactly what one gradient-descent step trusts.",
    },
    {
      label: "Second-order approximation",
      latex: "f(x) \\approx f(a) + f'(a)(x-a) + \\tfrac{1}{2}f''(a)(x-a)^2",
      note: "Adds a curvature correction — the basis of Newton's method.",
    },
    {
      label: "Multivariable second-order",
      latex: "f(\\mathbf{x}) \\approx f(\\mathbf{a}) + \\nabla f(\\mathbf{a}) \\cdot (\\mathbf{x}-\\mathbf{a}) + \\tfrac{1}{2}(\\mathbf{x}-\\mathbf{a})^{\\top} H(\\mathbf{a}) (\\mathbf{x}-\\mathbf{a})",
      note: "The gradient plays the role of $f'(a)$, and the Hessian plays the role of $f''(a)$.",
    },
  ],
  howToSolve: [
    "Compute the function's value and however many derivatives you need at the expansion point $a$ — the first derivative for a linear approximation, the second as well for a quadratic one.",
    "Assemble the Taylor polynomial term by term: $f(a)$, plus $f'(a)(x-a)$, plus $f''(a)/2! \\cdot (x-a)^2$, and so on — each term uses one more derivative and one higher power of $(x-a)$.",
    "To estimate $f$ at a nearby point, substitute $(x-a)$ into the polynomial you just built — don't recompute derivatives at the new point, only at $a$.",
    "For a multivariable function, replace $f'(a)(x-a)$ with $\\nabla f(a)\\cdot(\\mathbf{x}-\\mathbf{a})$, and the quadratic term with $\\tfrac{1}{2}(\\mathbf{x}-\\mathbf{a})^{\\top}H(\\mathbf{a})(\\mathbf{x}-\\mathbf{a})$.",
    "Sanity-check by comparing the approximation to the true function value where possible — the gap should shrink as more terms are added or the step gets smaller.",
  ],
  workedExample: {
    mathTitle: "Approximating a square root with first- and second-order Taylor expansions",
    mathSteps: [
      "Approximate $f(x)=\\sqrt{x}$ near $a=4$.",
      "$f(4)=2$. $f'(x)=\\tfrac{1}{2\\sqrt{x}}$, so $f'(4)=1/4=0.25$. $f''(x)=-\\tfrac{1}{4}x^{-3/2}$, so $f''(4) = -\\tfrac{1}{4\\cdot 8} = -1/32 = -0.03125$.",
      "First-order approximation: $f(x) \\approx f(4) + f'(4)(x-4) = 2 + 0.25(x-4)$. Estimate $f(4.2)$: $2 + 0.25(0.2) = 2.05$.",
      "Second-order approximation adds curvature: $f(x) \\approx 2 + 0.25(x-4) - 0.015625(x-4)^2$.",
      "Estimate $f(4.2)$: $2.05 - 0.015625(0.2)^2 = 2.05 - 0.000625 = 2.049375$ — much closer to the true value $\\sqrt{4.2}\\approx 2.049390$ than the first-order estimate.",
    ],
    pythonCode: `import numpy as np

def f(x):
    return np.sqrt(x)

a = 4.0
f_a = f(a)                          # 2.0
f_prime_a = 0.5 / np.sqrt(a)        # 0.25
f_double_prime_a = -0.25 / a**1.5   # -0.03125

dx = 4.2 - a
first_order = f_a + f_prime_a * dx
second_order = first_order + 0.5 * f_double_prime_a * dx**2

print(first_order, second_order, f(4.2))
# 2.05  2.049375  2.0493901...`,
    pythonCaption:
      "The derivatives at a=4 are computed once, matching the by-hand formulas exactly; second_order refines first_order with the curvature term, closing most of the gap to the true value.",
  },
  secondExample: {
    title: "A second worked example: why gradient descent needs small steps",
    steps: [
      "Let $f(x,y) = x^2 + 2y^2$, and consider the point $\\mathbf{a}=(1,1)$, where $f(1,1) = 1+2 = 3$ and $\\nabla f(1,1) = (2x, 4y)\\big|_{(1,1)} = (2,4)$.",
      "A gradient-descent-style step moves to a nearby point, say $(0.9,\\, 1.05)$, i.e. $\\Delta = (-0.1,\\, 0.05)$.",
      "First-order Taylor prediction: $f(0.9,1.05) \\approx f(1,1) + \\nabla f(1,1)\\cdot\\Delta = 3 + (2)(-0.1) + (4)(0.05) = 3 - 0.2 + 0.2 = 3.0$.",
      "True value: $f(0.9,1.05) = 0.81 + 2(1.1025) = 0.81 + 2.205 = 3.015$.",
      "The linear approximation ($3.0$) is close to the true value ($3.015$) precisely because the step was small — this is exactly why gradient descent uses small learning rates: the first-order approximation it implicitly relies on only stays accurate in a small neighborhood around the current point.",
    ],
  },
  bestApproaches: [
    "Gradient descent is, at its core, repeatedly trusting a first-order Taylor approximation of the loss and stepping downhill within the approximation's region of validity — which is exactly why too-large a learning rate causes divergence: the step leaves the region where the linear approximation is trustworthy.",
    "Second-order methods (Newton's method, L-BFGS) use the quadratic Taylor term to account for curvature, often converging in far fewer iterations — at the cost of computing or approximating the Hessian.",
    "A second-order approximation's error shrinks roughly with the *cube* of the distance from the expansion point — small steps aren't just convenient, they're mathematically necessary for the approximation to hold.",
    "For Taylor terms beyond first or second order, don't hand-differentiate — use `sympy.series` for symbolic Taylor expansions of arbitrary order.",
  ],
  assessment: {
    handSolving: {
      id: "taylor-hand",
      prompt:
        "Use a first-order Taylor expansion of $f(x)=\\ln(x)$ near $a=1$ to estimate $f(1.2)$.",
      type: "number",
      answer: 0.2,
      tolerance: 0.01,
      placeholder: "e.g. 0.15",
      hint: "f(1)=0 and f'(x)=1/x, so f'(1)=1. The linear approximation is f(x) ≈ f(1) + f'(1)(x-1).",
      solutionSteps: [
        "f(1) = ln(1) = 0. f'(x) = 1/x, so f'(1) = 1.",
        "Linear approximation: f(x) ≈ 0 + 1(x-1) = x-1.",
        "f(1.2) ≈ 1.2 - 1 = 0.2.",
      ],
    },
    programming: {
      id: "taylor-programming",
      setup: "import numpy as np\ndef f(x):\n    return np.exp(x)\na = 0.0",
      prompt:
        "Every derivative of e^x is e^x itself, so f(a) = f'(a) = f''(a) = 1 at a = 0. Write a Python script that builds the second-order Taylor approximation of f around a = 0 and evaluates it at x = 0.3. Print the result.",
      type: "number",
      answer: 1.345,
      tolerance: 0.001,
      placeholder: "e.g. 1.3",
      hint: "second_order = f(a) + f'(a)*(x-a) + 0.5*f''(a)*(x-a)**2, with a=0 and f(a)=f'(a)=f''(a)=1.",
      solutionSteps: [
        "With a=0: f(x) ≈ 1 + 1·x + 0.5·1·x² = 1 + x + 0.5x².",
        "At x=0.3: 1 + 0.3 + 0.5(0.09) = 1 + 0.3 + 0.045 = 1.345.",
      ],
    },
  },
};

export default content;
