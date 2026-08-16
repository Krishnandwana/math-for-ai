# Math for AI

A free, self-paced curriculum that teaches the math behind AI/ML — theory, formal
derivations, a worked example in both algebra and Python, then an answer-only assessment
you solve by hand and in code before a module unlocks the next one.

> **This project is for personal learning purposes only.** It was built as a self-study
> exercise to explore the math behind AI/ML and to practice building with Next.js. It is
> not an official product, is not actively maintained as a service, and comes with no
> guarantees of accuracy — always cross-check the math against a textbook or trusted
> source before relying on it.

## What it is

- **No in-browser code editor, no sandboxed execution.** You write and run Python
  wherever you already work — your own machine, a notebook, a REPL, Colab — and the app
  only checks the final answer you type in.
- **Every module follows the same shape:** Theory → Math/Equations → Worked Examples
  (math + Python) → Best Approaches → "Your Turn" assessment (one hand-solving question,
  one programming question).
- **Progress is tracked locally** in your browser's `localStorage` — nothing is sent to a
  server, there is no account system.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + [Tailwind CSS](https://tailwindcss.com/)
- [KaTeX](https://katex.org/) for equation rendering
- [Shiki](https://shiki.style/) for syntax-highlighted, read-only Python snippets
- [Zustand](https://zustand-demo.pmnd.rs/) for local progress state

## Running it locally

```sh
git clone https://github.com/Krishnandwana/math-for-ai.git
cd math-for-ai
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Status

**Linear Algebra** and **Calculus** are fully built out end-to-end. The remaining six
phases (Probability & Statistics, Optimization, Information Theory, Linear Models &
Regression, Neural Network Math, Advanced Topics) are scaffolded with titles and
descriptions and are marked "coming soon."

## License

MIT © Krish Nandwana
