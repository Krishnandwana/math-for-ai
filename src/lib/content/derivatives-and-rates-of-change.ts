import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "A derivative measures how fast a function's output changes as its input changes — the slope of the curve at a single point. In AI, the function is almost always a loss function, and the input is a model parameter: the derivative answers \"if I nudge this one weight slightly, how much does the loss move?\"",
    "That question, answered for every parameter at once, is exactly what training a model does. Every optimizer — SGD, Adam, RMSProp — is built on the same primitive: compute the derivative of the loss with respect to each parameter, then move the parameter a little in the direction that decreases the loss.",
    "Formally, the derivative is defined as a limit: shrink the step size $h$ toward zero and watch what the average rate of change over that tiny interval converges to. In practice you rarely evaluate that limit directly — a small set of rules (power rule, product rule, quotient rule, chain rule) let you differentiate almost any expression symbolically, term by term.",
    "It helps to keep both a geometric and an algebraic picture in mind at once: geometrically, $f'(x)$ is the slope of the line tangent to the curve at $x$; algebraically, it's the coefficient that tells you how much $f(x+h)$ changes for a small change $h$. Both pictures point at the same number.",
  ],
  mathIntro:
    "The derivative is defined as a limit, but a handful of rules let you compute it symbolically without ever evaluating that limit directly.",
  equations: [
    {
      label: "Definition (limit)",
      latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
      note: "The slope of the secant line through $(x, f(x))$ and $(x+h, f(x+h))$, as $h$ shrinks to zero.",
    },
    {
      label: "Power rule",
      latex: "\\frac{d}{dx}\\, x^n = n x^{n-1}",
      note: "The workhorse rule — differentiates any polynomial term.",
    },
    {
      label: "Product rule",
      latex: "(fg)' = f'g + fg'",
      note: "Differentiating a product of two functions — never just $f'g'$.",
    },
    {
      label: "Quotient rule",
      latex: "\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}",
      note: "A special case of the product rule applied to $f \\cdot g^{-1}$.",
    },
  ],
  howToSolve: [
    "Identify which rule applies to each term: the power rule for a single $x^n$ term, the product rule if two functions of $x$ are multiplied together, the quotient rule if one is divided by another.",
    "For a sum of terms, differentiate each term independently and add the results — the derivative of a sum is the sum of the derivatives.",
    "For a product of two functions $u(x)v(x)$, apply $(uv)' = u'v + uv'$ directly rather than expanding the product first, unless the expansion is trivial.",
    "Simplify the resulting expression fully before substituting any specific value of $x$.",
    "If a numeric value is required at a particular point, substitute that point only after the derivative has been found symbolically — never differentiate a number.",
  ],
  workedExample: {
    mathTitle: "Differentiating a polynomial and evaluating it at a point",
    mathSteps: [
      "Let $f(x) = 3x^4 - 5x^2 + 7x - 2$.",
      "Differentiate term by term using the power rule: $\\frac{d}{dx}(3x^4) = 12x^3$, $\\frac{d}{dx}(-5x^2) = -10x$, $\\frac{d}{dx}(7x) = 7$, and $\\frac{d}{dx}(-2) = 0$.",
      "$f'(x) = 12x^3 - 10x + 7$.",
      "Evaluate at $x=2$: $f'(2) = 12(2)^3 - 10(2) + 7 = 12(8) - 20 + 7 = 96 - 20 + 7 = 83$.",
      "This slope, 83, says that near $x=2$, a small increase in $x$ produces roughly an 83-times-larger increase in $f(x)$ — the curve is steep there.",
    ],
    pythonCode: `import sympy as sp

x = sp.symbols('x')
f = 3*x**4 - 5*x**2 + 7*x - 2

f_prime = sp.diff(f, x)          # 12*x**3 - 10*x + 7
slope_at_2 = f_prime.subs(x, 2)  # 83

print(f_prime, slope_at_2)`,
    pythonCaption:
      "sp.diff differentiates symbolically, term by term, the same way as the hand calculation; .subs plugs in x=2 only after the derivative expression is fully built.",
  },
  secondExample: {
    title: "A second worked example: the product rule, and a critical point",
    steps: [
      "Let $f(x) = (x^2+1)(x^3-2x)$. Rather than expanding first, apply the product rule directly with $u = x^2+1$, $v = x^3-2x$.",
      "$u' = 2x$. $v' = 3x^2 - 2$.",
      "$f'(x) = u'v + uv' = 2x(x^3-2x) + (x^2+1)(3x^2-2)$.",
      "Evaluate at $x=1$: $u(1)=2$, $v(1)=1-2=-1$, $u'(1)=2$, $v'(1)=3-2=1$.",
      "$f'(1) = u'(1)v(1) + u(1)v'(1) = (2)(-1) + (2)(1) = -2 + 2 = 0$ — the tangent line is flat at $x=1$, a critical point of $f$.",
      "Check by expanding first: $f(x) = x^5 - x^3 - 2x$, so $f'(x) = 5x^4 - 3x^2 - 2$, and $f'(1) = 5-3-2 = 0$. Matches — the product rule saves you from expanding messy products, especially once the factors stop being simple polynomials.",
    ],
  },
  bestApproaches: [
    "Autodiff frameworks (PyTorch, TensorFlow) compute derivatives like these automatically via `.backward()` — but knowing the underlying rules lets you sanity-check a suspicious gradient by hand or with finite differences.",
    "The most common by-hand bug is differentiating a product's factors independently: $(fg)' \\neq f'g'$. Always apply the product rule explicitly.",
    "For numerical gradient checking, the central difference $\\frac{f(x+h)-f(x-h)}{2h}$ is far more accurate than the one-sided version $\\frac{f(x+h)-f(x)}{h}$ — its error shrinks as $O(h^2)$ instead of $O(h)$.",
    "The power rule still applies for negative or fractional exponents (e.g. $\\frac{d}{dx}x^{-1} = -x^{-2}$, $\\frac{d}{dx}\\sqrt{x} = \\frac{1}{2}x^{-1/2}$) — don't assume it's only for positive integers.",
  ],
  assessment: {
    handSolving: {
      id: "derivatives-hand",
      prompt: "Let $g(x) = 2x^3 - 4x + 1$. Find $g'(3)$.",
      type: "number",
      answer: 50,
      tolerance: 0.01,
      placeholder: "e.g. 12",
      hint: "First differentiate symbolically using the power rule: $g'(x) = 6x^2 - 4$. Then substitute $x=3$.",
      solutionSteps: [
        "$g'(x) = 6x^2 - 4$",
        "$g'(3) = 6(9) - 4 = 54 - 4 = 50$",
      ],
    },
    programming: {
      id: "derivatives-programming",
      setup: "import sympy as sp\nx = sp.symbols('x')\nh = x**4 - 6*x**2 + 8*x",
      prompt:
        "Write and run a Python script that symbolically differentiates h(x) with sympy, evaluates the derivative at x = -1, and prints the result.",
      type: "number",
      answer: 16,
      tolerance: 0.01,
      placeholder: "e.g. 4",
      hint: "sp.diff(h, x) gives h'(x) symbolically; then .subs(x, -1) evaluates it at that point.",
      solutionSteps: [
        "h'(x) = 4x^3 - 12x + 8",
        "h'(-1) = 4(-1)^3 - 12(-1) + 8 = -4 + 12 + 8 = 16",
      ],
    },
  },
};

export default content;
