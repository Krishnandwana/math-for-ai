import type { Phase } from "@/lib/types";
import vectorsAndDotProducts from "@/lib/content/vectors-and-dot-products";
import matricesAndMatrixMultiplication from "@/lib/content/matrices-and-matrix-multiplication";
import eigenvaluesAndEigenvectors from "@/lib/content/eigenvalues-and-eigenvectors";
import normsAndRank from "@/lib/content/norms-and-rank";
import singularValueDecomposition from "@/lib/content/singular-value-decomposition";
import derivativesAndRatesOfChange from "@/lib/content/derivatives-and-rates-of-change";
import partialDerivativesAndGradients from "@/lib/content/partial-derivatives-and-gradients";
import theChainRule from "@/lib/content/the-chain-rule";
import jacobiansAndHessians from "@/lib/content/jacobians-and-hessians";
import taylorSeriesApproximation from "@/lib/content/taylor-series-approximation";

export const curriculum: Phase[] = [
  {
    slug: "linear-algebra",
    title: "Linear Algebra for AI",
    description:
      "Vectors, matrices, dot products, matrix multiplication, eigenvalues/eigenvectors, SVD, norms, rank — the arithmetic every model layer is built from.",
    order: 1,
    modules: [
      {
        slug: "vectors-and-dot-products",
        title: "Vectors & Dot Products",
        summary:
          "What a vector is, and why the dot product is the single most-used operation in ML.",
        order: 1,
        content: vectorsAndDotProducts,
      },
      {
        slug: "matrices-and-matrix-multiplication",
        title: "Matrices & Matrix Multiplication",
        summary:
          "Matrices as linear transformations, and the mechanics of matmul that every layer relies on.",
        order: 2,
        content: matricesAndMatrixMultiplication,
      },
      {
        slug: "eigenvalues-and-eigenvectors",
        title: "Eigenvalues & Eigenvectors",
        summary:
          "The directions a matrix doesn't rotate, and why they reveal a matrix's structure.",
        order: 3,
        content: eigenvaluesAndEigenvectors,
      },
      {
        slug: "norms-and-rank",
        title: "Norms & Rank",
        summary:
          "Measuring vector size for regularization and clipping; measuring matrix information content.",
        order: 4,
        content: normsAndRank,
      },
      {
        slug: "singular-value-decomposition",
        title: "Singular Value Decomposition",
        summary:
          "Factoring any matrix into rotation-scale-rotation — the basis of PCA and low-rank compression.",
        order: 5,
        content: singularValueDecomposition,
      },
    ],
  },
  {
    slug: "calculus",
    title: "Calculus for AI",
    description:
      "Derivatives, partial derivatives, gradients, chain rule, Jacobians, Hessians, Taylor series — the machinery behind every `.backward()` call.",
    order: 2,
    modules: [
      {
        slug: "derivatives-and-rates-of-change",
        title: "Derivatives & Rates of Change",
        summary: "How a function's output responds to a small change in its input.",
        order: 1,
        content: derivativesAndRatesOfChange,
      },
      {
        slug: "partial-derivatives-and-gradients",
        title: "Partial Derivatives & Gradients",
        summary: "Extending derivatives to many inputs, and assembling the gradient vector.",
        order: 2,
        content: partialDerivativesAndGradients,
      },
      {
        slug: "the-chain-rule",
        title: "The Chain Rule",
        summary: "Composing derivatives through layers — the mathematical core of backprop.",
        order: 3,
        content: theChainRule,
      },
      {
        slug: "jacobians-and-hessians",
        title: "Jacobians & Hessians",
        summary: "Matrices of first and second derivatives for vector-valued functions.",
        order: 4,
        content: jacobiansAndHessians,
      },
      {
        slug: "taylor-series-approximation",
        title: "Taylor Series Approximation",
        summary: "Locally approximating a function with polynomials — the basis of optimization theory.",
        order: 5,
        content: taylorSeriesApproximation,
      },
    ],
  },
  {
    slug: "probability-statistics",
    title: "Probability & Statistics",
    description:
      "Distributions, expectation/variance, Bayes' theorem, MLE/MAP, entropy, KL divergence — the language of uncertainty models are built to handle.",
    order: 3,
    modules: [
      {
        slug: "probability-distributions",
        title: "Probability Distributions",
        summary: "Discrete and continuous distributions used throughout ML: Bernoulli, Gaussian, and more.",
        order: 1,
      },
      {
        slug: "expectation-and-variance",
        title: "Expectation & Variance",
        summary: "Summarizing a distribution's center and spread.",
        order: 2,
      },
      {
        slug: "bayes-theorem",
        title: "Bayes' Theorem",
        summary: "Updating beliefs given evidence — the foundation of Bayesian ML.",
        order: 3,
      },
      {
        slug: "maximum-likelihood-estimation",
        title: "Maximum Likelihood Estimation",
        summary: "Fitting model parameters by maximizing the probability of observed data.",
        order: 4,
      },
      {
        slug: "map-estimation",
        title: "MAP Estimation",
        summary: "MLE plus a prior — where regularization and Bayesian inference meet.",
        order: 5,
      },
      {
        slug: "entropy-and-uncertainty",
        title: "Entropy & Uncertainty",
        summary: "Quantifying how unpredictable a distribution is.",
        order: 6,
      },
    ],
  },
  {
    slug: "optimization",
    title: "Optimization",
    description:
      "Gradient descent variants, convexity, Lagrange multipliers, constrained optimization, learning rate schedules — how models actually learn.",
    order: 4,
    modules: [
      {
        slug: "gradient-descent-variants",
        title: "Gradient Descent Variants",
        summary: "SGD, momentum, Adam — the family of algorithms behind every training loop.",
        order: 1,
      },
      {
        slug: "convexity-and-critical-points",
        title: "Convexity & Critical Points",
        summary: "Minima, maxima, saddle points, and why convexity makes optimization tractable.",
        order: 2,
      },
      {
        slug: "lagrange-multipliers",
        title: "Lagrange Multipliers",
        summary: "Optimizing a function subject to equality constraints.",
        order: 3,
      },
      {
        slug: "constrained-optimization",
        title: "Constrained Optimization",
        summary: "KKT conditions and optimizing under inequality constraints.",
        order: 4,
      },
      {
        slug: "learning-rate-schedules",
        title: "Learning Rate Schedules",
        summary: "Warmup, decay, and cyclical schedules — tuning the single most sensitive hyperparameter.",
        order: 5,
      },
    ],
  },
  {
    slug: "information-theory",
    title: "Information Theory",
    description:
      "Entropy, cross-entropy, mutual information, softmax derivation — the theory underlying every classification loss function.",
    order: 5,
    modules: [
      {
        slug: "entropy-and-information",
        title: "Entropy & Information",
        summary: "Measuring the information content of a distribution, in bits or nats.",
        order: 1,
      },
      {
        slug: "cross-entropy-loss",
        title: "Cross-Entropy Loss",
        summary: "The distance between predicted and true distributions — and the standard classification loss.",
        order: 2,
      },
      {
        slug: "mutual-information",
        title: "Mutual Information",
        summary: "How much knowing one variable tells you about another.",
        order: 3,
      },
      {
        slug: "softmax-derivation",
        title: "Softmax Derivation",
        summary: "Deriving softmax from first principles, and its gradient with cross-entropy.",
        order: 4,
      },
    ],
  },
  {
    slug: "linear-models-regression",
    title: "Linear Models & Regression Math",
    description:
      "Least squares, normal equations, regularization (L1/L2), bias-variance tradeoff — the math behind the simplest models that still power real systems.",
    order: 6,
    modules: [
      {
        slug: "least-squares-regression",
        title: "Least Squares Regression",
        summary: "Fitting a line (or hyperplane) by minimizing squared error.",
        order: 1,
      },
      {
        slug: "normal-equations",
        title: "Normal Equations",
        summary: "Solving least squares in closed form, directly from calculus.",
        order: 2,
      },
      {
        slug: "l1-and-l2-regularization",
        title: "L1 & L2 Regularization",
        summary: "Penalizing model complexity to control overfitting — Lasso and Ridge.",
        order: 3,
      },
      {
        slug: "bias-variance-tradeoff",
        title: "Bias-Variance Tradeoff",
        summary: "Decomposing generalization error into bias, variance, and irreducible noise.",
        order: 4,
      },
      {
        slug: "logistic-regression-math",
        title: "Logistic Regression Math",
        summary: "From linear scores to probabilities via the sigmoid, and its likelihood-based loss.",
        order: 5,
      },
    ],
  },
  {
    slug: "neural-network-math",
    title: "Neural Network Math",
    description:
      "Forward pass, backprop derivation, activation derivatives, weight initialization math — assembling every prior phase into a working network.",
    order: 7,
    modules: [
      {
        slug: "the-forward-pass",
        title: "The Forward Pass",
        summary: "Composing linear layers and nonlinearities into a full network computation.",
        order: 1,
      },
      {
        slug: "backpropagation-derivation",
        title: "Backpropagation Derivation",
        summary: "Deriving backprop as repeated application of the chain rule through a computation graph.",
        order: 2,
      },
      {
        slug: "activation-function-derivatives",
        title: "Activation Function Derivatives",
        summary: "The derivatives of ReLU, sigmoid, tanh, and GELU that backprop actually uses.",
        order: 3,
      },
      {
        slug: "weight-initialization-math",
        title: "Weight Initialization Math",
        summary: "Xavier and He initialization, derived from keeping activation variance stable across layers.",
        order: 4,
      },
      {
        slug: "loss-landscapes-and-critical-points",
        title: "Loss Landscapes & Critical Points",
        summary: "What the geometry of a high-dimensional loss surface looks like, and why it's not as scary as it sounds.",
        order: 5,
      },
    ],
  },
  {
    slug: "advanced-topics",
    title: "Advanced Topics",
    description:
      "Attention/softmax math, positional encodings, PCA, matrix factorization, numerical stability — the math specific to modern transformer architectures.",
    order: 8,
    modules: [
      {
        slug: "attention-and-softmax-math",
        title: "Attention & Softmax Math",
        summary: "Deriving scaled dot-product attention term by term.",
        order: 1,
      },
      {
        slug: "positional-encodings",
        title: "Positional Encodings",
        summary: "Injecting sequence order into a position-agnostic attention mechanism.",
        order: 2,
      },
      {
        slug: "principal-component-analysis",
        title: "Principal Component Analysis",
        summary: "Finding the directions of maximum variance in data, via eigenvectors or SVD.",
        order: 3,
      },
      {
        slug: "matrix-factorization",
        title: "Matrix Factorization",
        summary: "Decomposing a matrix into a product of low-rank factors, as in recommender systems.",
        order: 4,
      },
      {
        slug: "numerical-stability",
        title: "Numerical Stability",
        summary: "Log-sum-exp, float precision, and the tricks that keep large-scale training from blowing up.",
        order: 5,
      },
    ],
  },
];

export function getPhase(phaseSlug: string) {
  return curriculum.find((p) => p.slug === phaseSlug);
}

export function getModule(phaseSlug: string, moduleSlug: string) {
  const phase = getPhase(phaseSlug);
  const mod = phase?.modules.find((m) => m.slug === moduleSlug);
  return phase && mod ? { phase, module: mod } : undefined;
}

export interface FlatModule {
  phaseSlug: string;
  phaseTitle: string;
  moduleSlug: string;
  moduleTitle: string;
  hasContent: boolean;
  index: number;
}

export function flattenModules(): FlatModule[] {
  const flat: FlatModule[] = [];
  let index = 0;
  for (const phase of [...curriculum].sort((a, b) => a.order - b.order)) {
    for (const mod of [...phase.modules].sort((a, b) => a.order - b.order)) {
      flat.push({
        phaseSlug: phase.slug,
        phaseTitle: phase.title,
        moduleSlug: mod.slug,
        moduleTitle: mod.title,
        hasContent: !!mod.content,
        index: index++,
      });
    }
  }
  return flat;
}

export const totalModuleCount = curriculum.reduce((sum, p) => sum + p.modules.length, 0);
export const totalPhaseCount = curriculum.length;
