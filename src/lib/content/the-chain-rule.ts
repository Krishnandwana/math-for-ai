import type { ModuleContent } from "@/lib/types";

const content: ModuleContent = {
  theory: [
    "The chain rule differentiates a composition of functions: if $y = f(g(x))$, then $y$ changes with $x$ in two stages — first through how $g$ responds to $x$, then through how $f$ responds to $g$'s output. The chain rule says those two rates simply multiply.",
    "This single rule *is* backpropagation. A neural network is nothing but a long composition of functions — layer after layer, each one a function of the previous layer's output. Computing how the loss responds to an early layer's weights means multiplying local derivatives all the way back through every layer in between, exactly as the chain rule prescribes.",
    "Autograd frameworks implement this literally: each operation in a computation graph remembers its own local derivative, and `.backward()` walks the graph from output to input, multiplying local derivatives by the upstream gradient at each step. There is no separate 'backprop algorithm' beyond the chain rule applied mechanically and efficiently.",
    "The multivariable version matters just as much: when an intermediate value depends on several inputs, or an output depends on an intermediate value through multiple paths, the total derivative sums a chain-rule term for every path. Missing a path is a common source of incorrect hand-derived gradients.",
  ],
  mathIntro:
    "The chain rule differentiates compositions by multiplying the derivative of the outer function by the derivative of the inner one.",
  equations: [
    {
      label: "Chain rule",
      latex: "\\frac{d}{dx} f(g(x)) = f'(g(x)) \\cdot g'(x)",
      note: "Differentiate the outer function at the inner function's value, then multiply by the inner function's own derivative.",
    },
    {
      label: "Leibniz notation",
      latex: "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
      note: "The same rule, written so the intermediate variable $u = g(x)$ visibly cancels — helpful for chains of more than two functions.",
    },
    {
      label: "Multivariable chain rule",
      latex: "\\frac{dz}{dt} = \\frac{\\partial f}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial f}{\\partial y}\\frac{dy}{dt}",
      note: "When $z=f(x,y)$ and both $x$ and $y$ depend on $t$, sum one chain-rule term per path from $t$ to $z$.",
    },
  ],
  howToSolve: [
    "Identify the outer and inner functions in the composition — rewrite the expression as $y = f(g(x))$ if it isn't already visibly in that form.",
    "Differentiate the outer function with respect to its immediate argument (treating $g(x)$ as a single variable), then separately differentiate the inner function with respect to $x$.",
    "Multiply the two results together: $dy/dx = f'(g(x)) \\cdot g'(x)$.",
    "For a chain of more than two functions, repeat the multiplication step by step — either working from the outermost function inward, or backward from the output if you're thinking in terms of a computation graph.",
    "Substitute the point of interest only at the very end, once the full symbolic derivative has been assembled.",
  ],
  workedExample: {
    mathTitle: "Differentiating a composite function",
    mathSteps: [
      "Let $y = (3x^2+1)^4$. Treat the inner function $u = 3x^2+1$ as its own variable, so $y = u^4$.",
      "$dy/du = 4u^3$. $du/dx = 6x$.",
      "Chain rule: $dy/dx = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx} = 4u^3 \\cdot 6x = 24x\\,u^3$.",
      "At $x=1$: $u = 3(1)^2+1 = 4$, so $dy/dx = 24(1)(4^3) = 24 \\cdot 64 = 1536$.",
    ],
    pythonCode: `import sympy as sp

x = sp.symbols('x')
y = (3*x**2 + 1)**4

dy_dx = sp.diff(y, x)
value_at_1 = dy_dx.subs(x, 1)

print(dy_dx)         # 24*x*(3*x**2 + 1)**3
print(value_at_1)    # 1536`,
    pythonCaption:
      "sp.diff applies the chain rule automatically for composite expressions like this — matching the u-substitution done by hand, term for term.",
  },
  secondExample: {
    title: "A second worked example: chaining local derivatives, exactly like backprop",
    steps: [
      "Model a tiny 3-stage computation graph, exactly like a network's forward pass: $h(x)=2x$, $g(u)=u^2$, $f(v)=v+3$, with $z = f(g(h(x)))$.",
      "Forward pass at $x=1$: $h = 2(1) = 2$, then $g = h^2 = 4$, then $z = f = g+3 = 7$.",
      "Backward pass, multiplying local derivatives step by step — exactly what autograd does: $dz/dv = f'(v) = 1$.",
      "$dz/du = \\dfrac{dz}{dv}\\cdot\\dfrac{dv}{du} = 1 \\cdot g'(u) = 1 \\cdot 2u = 2(2) = 4$ (using $u=h=2$).",
      "$dz/dx = \\dfrac{dz}{du}\\cdot\\dfrac{du}{dx} = 4 \\cdot h'(x) = 4 \\cdot 2 = 8$.",
      "Check against the fully expanded form: $z = (2x)^2+3 = 4x^2+3$, so $dz/dx = 8x$, and at $x=1$ that's $8$ — matches. This local-derivative-times-upstream-gradient chain, applied stage by stage, is exactly backpropagation.",
    ],
  },
  bestApproaches: [
    "This is literally what `.backward()` does in PyTorch or TensorFlow: multiply local derivatives backward through the computation graph, one operation at a time, accumulating the product.",
    "A common by-hand mistake: differentiating the inner function but forgetting to multiply by its own derivative — e.g. writing $\\frac{d}{dx}\\sin(3x) = \\cos(3x)$ instead of the correct $3\\cos(3x)$.",
    "Vanishing and exploding gradients in deep networks are a direct consequence of the chain rule: multiplying many local derivatives together (one per layer) shrinks the product toward zero if each is smaller than 1, or blows it up if each is larger than 1.",
    "For a value that depends on the input through several intermediate paths, sum a separate chain-rule term for each path — dropping a path is a common source of incorrect hand-derived gradients.",
  ],
  assessment: {
    handSolving: {
      id: "chain-rule-hand",
      prompt: "Let $y = (2x-5)^3$. Find $dy/dx$ at $x=3$.",
      type: "number",
      answer: 6,
      tolerance: 0.01,
      placeholder: "e.g. 12",
      hint: "Let u = 2x-5, so y = u³. Find dy/du and du/dx separately, then multiply.",
      solutionSteps: [
        "u = 2x-5, so y = u³. dy/du = 3u², du/dx = 2.",
        "dy/dx = 3u² · 2 = 6u².",
        "At x=3: u = 2(3)-5 = 1, so dy/dx = 6(1)² = 6.",
      ],
    },
    programming: {
      id: "chain-rule-programming",
      setup: "import sympy as sp\nx = sp.symbols('x')\ny = (x**2 + 3)**5",
      prompt:
        "Write and run a Python script that uses sympy to differentiate y with respect to x, evaluates the derivative at x = 1, and prints the result.",
      type: "number",
      answer: 2560,
      tolerance: 0.01,
      placeholder: "e.g. 100",
      hint: "sp.diff(y, x) applies the chain rule automatically; then substitute x=1 with .subs(x, 1).",
      solutionSteps: [
        "dy/dx = 5(x²+3)⁴ · 2x = 10x(x²+3)⁴ (chain rule: outer power rule times inner derivative 2x).",
        "At x=1: (1+3)⁴ = 4⁴ = 256, so dy/dx = 10(1)(256) = 2560.",
      ],
    },
  },
};

export default content;
