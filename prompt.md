# Build Prompt: "Math for AI" — an interactive from-scratch math curriculum

Use this as a build prompt for an AI coding assistant (Claude Code, Cursor, etc.) to scaffold
and build the app. It is modeled on the layout and UI of `aiengineeringfromscratch.com`, but
**light theme only** (no dark mode toggle needed), and scoped to just the math underlying AI/ML.

---

## 1. Concept

Build a web app called **"Math for AI"** — a free, self-paced curriculum that teaches the
math behind AI/ML by making the learner **understand it, see it worked in Python, then prove
they can reproduce it themselves** — once by hand, once in code — before a module is marked
complete.

Core promise to the learner: *"You don't finish a module by reading it. You solve one problem
by hand and one problem in code, run the code wherever you want, and enter the final answers.
Get both right, and the module unlocks the next one."*

No in-browser code editor, no sandboxed execution, no test runner. The learner writes and
runs their Python anywhere (their own machine, a notebook, Colab, a REPL) — the app only
needs the **final result**.

---

## 2. Design system — light theme only

Recreate the visual language of the reference site's layout and component structure, but
constrained to a single light theme (do not build a dark-mode variant).

### 2.1 Color tokens
```
--bg:            #FDFDFB   /* warm off-white page background */
--surface:       #FFFFFF   /* cards, panels, code blocks */
--surface-alt:   #F5F5F1   /* subtle section banding, hover states */
--border:        #E4E3DC   /* hairline borders/dividers */
--ink:           #14140F   /* primary text, near-black */
--ink-muted:     #5B5B54   /* secondary text, captions, metadata */
--accent:        #1F7A4D   /* single accent — forest/terminal green, links, active states */
--accent-soft:   #E7F3EC   /* accent background tint (badges, active nav) */
--warn:          #B45309   /* "in progress" status */
--danger:        #B42318   /* incorrect-answer feedback */
--success:       #1F7A4D   /* correct-answer feedback, "complete" status */
--locked:        #A6A69C   /* planned / locked status */
```
No dark backgrounds anywhere, including code blocks — use a light syntax theme (e.g.
GitHub-Light-style) for all Python snippets.

### 2.2 Typography
- **Display/headline**: a humanist serif (e.g. Fraunces, Newsreader, or GT Sectra) for the
  hero headline and section titles — large, editorial, a little warm.
- **Body**: a neutral sans (e.g. Inter or General Sans) for theory paragraphs and UI copy.
- **Mono**: JetBrains Mono or IBM Plex Mono for *everything technical*: nav labels, eyebrow
  badges, FIG captions, equations' surrounding chrome, code blocks, status pills, the footer
  clone command, progress-bar labels.
- Small caps + letter-spacing on eyebrow/badge text (e.g. `FIG_001 · PHASE 01 · MODULE 03`).

### 2.3 Core components (reuse across the whole app)
- **Top nav**: logo mark + wordmark left, links right (`Contents`, `Topics`, `Practice`,
  `Roadmap`, `Glossary`, `About`, GitHub icon). Sticky, hairline bottom border, white bg.
- **Eyebrow badge**: small monospace pill/line above headings, e.g.
  `FIG_000 · curriculum v1.0 · light edition · MIT`.
- **FIG diagram callouts**: numbered inline illustrations (`FIG_001`, `FIG_002`...) with a
  one-line italic caption underneath — used to visualize equations, module flow, and mastery
  curves. Keep them simple SVGs, line-art style, single accent color on white.
- **Terminal/snippet box**: light card with a thin border, monospace text, a **Copy** button
  top-right — used for install/clone commands, not for runnable code.
- **Status dots/pills**: `Complete` (filled accent green), `In progress` (amber outline),
  `Locked`/`Planned` (gray outline) — used in the curriculum accordion and module headers.
- **Progress bars**: thin horizontal bars with a monospace numeric label (`12 / 40`), used in
  the "Current Progress" stat row.
- **Accordion**: phase rows that expand to reveal their modules; each module row shows its
  status pill and links to the module page.
- **Cards**: soft `--surface` panels with 1px `--border`, rounded corners (~8–10px), gentle
  shadow only on hover.

### 2.4 Home page layout (top to bottom, mirroring the reference site)
1. **Nav bar** (sticky).
2. **Eyebrow badge** above the hero.
3. **Hero**: large serif headline "Math for AI", one-line subhead ("Every equation, derived,
   solved by hand, and reproduced in Python — before you move on."), byline, two CTAs
   (`Start Learning` primary / `View on GitHub` ghost).
4. **Snippet box** (optional): a copyable install/clone command if the project is open-source.
5. **Three FIG diagrams** in a row (or stacked on mobile): e.g. a gradient-descent step
   diagram, a "module loop" diagram (Theory → Math → Worked Example → Your Turn), and a
   mastery-over-time curve.
6. **"How this works"** section: 2–3 short paragraphs explaining the theory → math → worked
   example → hand-solve → code-solve loop, and why final-answer-only grading is enough to
   prove understanding.
7. **"Current Progress"** stat row: Modules Completed, Phases Completed, Hand-Solved Correct,
   Programming Answers Correct — each as a labeled progress bar.
8. **Curriculum** section: phase/module counts in the header, instruction text ("Tap a phase
   to expand"), a legend row (`Complete` / `In progress` / `Locked`), then the accordion of
   phases → modules.
9. **Colophon footer**: clone/install command box, one-line license/credit, footer nav links.

### 2.5 Module page layout
- Slim header: breadcrumb (`Phase 01 · Module 03`), title, status pill.
- Sections in fixed order, each a clearly labeled card: **Theory → Math/Equations → Worked
  Examples (math + Python) → Best Approaches → Your Turn (assessment)**.
- Equations in bordered light cards with generous padding, rendered via KaTeX.
- Python worked-example blocks are **read-only, light-themed, syntax-highlighted, with a
  copy button** — never an editor.
- The "Your Turn" assessment section is visually distinct (accent-tinted card border) with
  two stacked sub-cards: hand-solving question and programming question (see §4).

---

## 3. Curriculum structure (phases)

1. **Linear Algebra for AI** — vectors, matrices, dot products, matrix multiplication,
   eigenvalues/eigenvectors, SVD, norms, rank
2. **Calculus for AI** — derivatives, partial derivatives, gradients, chain rule, Jacobians,
   Hessians, Taylor series
3. **Probability & Statistics** — distributions, expectation/variance, Bayes' theorem,
   MLE/MAP, entropy, KL divergence
4. **Optimization** — gradient descent variants, convexity, Lagrange multipliers,
   constrained optimization, learning rate schedules
5. **Information Theory** — entropy, cross-entropy, mutual information, softmax derivation
6. **Linear Models & Regression Math** — least squares, normal equations, regularization
   (L1/L2), bias-variance tradeoff
7. **Neural Network Math** — forward pass, backprop derivation, activation derivatives,
   weight initialization math
8. **Advanced Topics** — attention/softmax math, positional encodings, PCA, matrix
   factorization, numerical stability

Each phase contains 4–8 modules.

---

## 4. Module template (every module follows this exact shape)

### A. Theory
Plain-language explanation: what the concept is, why it matters for AI, where it shows up
in real models. Intuition before formalism.

### B. Math / Equations
Formal definitions, LaTeX-rendered equations, step-by-step derivations, every symbol defined.

### C. Worked Sample Questions
- One fully solved **math example**, every algebraic step shown.
- One fully solved **Python example** shown as a **static, read-only code block** (not an
  editor) — idiomatic NumPy/PyTorch, comments mapping each line back to the math above.
  The learner is meant to read it, and optionally copy-paste it into their own environment
  to run and experiment with — the app does not execute it.

### D. Best Approaches / Common Pitfalls
Numerical stability tricks, vectorization tips, common sign/index errors, how the concept
is typically implemented in real ML libraries.

### E. "Your Turn" — Module Assessment (required to mark the module complete)
Two questions, both **answer-only**, no code editor and no in-app execution:

1. **Hand-solving question** — a new problem (not the worked example) the learner solves on
   paper/mentally. A single input field for the final answer (plus optional fields for key
   intermediate values if useful for partial feedback). Numeric answers accept a small
   tolerance (e.g. ±0.01); symbolic answers accept common equivalent forms.
2. **Programming question** — a short problem statement (e.g. "Given matrix A and vector b
   below, write and run a Python script that computes X. Run it in your own environment —
   any Python install, notebook, or Colab works.") with one plain input field for the final
   result the learner's program printed. Support common result shapes: a number, a list/array
   (comma-separated), or a short string — validated with tolerance/normalization rules
   appropriate to the expected type.

Both answers must be correct before the module flips from "in progress" to "complete."
Show clear right/wrong feedback per field. On a wrong answer, give a hint, not the solution.
Reveal the full worked solution only after a correct submission, or after the learner
explicitly clicks "show solution" (which should NOT mark the module complete).

---

## 5. Answer-checking logic (no execution engine needed)

- Store the correct final answer per question, with a **type**: `number`, `array`, `string`,
  or `symbolic`.
- `number`: compare with an absolute/relative tolerance (e.g. `abs(a-b) < 1e-2`).
- `array`: parse comma/space-separated input into a list, compare element-wise with tolerance,
  order-sensitive unless the question says otherwise.
- `symbolic`: normalize simple equivalent forms (e.g. fractions vs decimals) before comparing;
  keep this scope small — most AI-math answers are numeric.
- `string`: case-insensitive, whitespace-trimmed exact or regex match for short text answers.
- No sandboxing, no Pyodide, no Monaco editor, no hidden test suite — this removes the need
  for any code execution backend entirely. The app is a content + answer-checking app only.

---

## 6. UX / interaction requirements

- Progress persisted per module (local storage minimum; optional account sync later).
- Curriculum accordion shows live status pills that update the moment an assessment passes.
- "Current Progress" stat bars update in real time.
- Assessment inputs give immediate inline feedback (correct/incorrect) without a page reload.
- Retry is unlimited, but track attempt count and offer a hint after 2 wrong attempts.
- Fully responsive; no component in this app requires desktop-only tooling (since there's no
  code editor, mobile users can complete a module end-to-end on a phone).

---

## 7. Tone / content style

- Terse, precise, engineer-to-engineer tone — no fluff, no hype.
- Every equation gets a one-line intuition before or after it.
- Prefer worked derivations over "trust me" formulas.
- Connect every topic explicitly to where it's used in AI (e.g. "this Jacobian is exactly
  what autograd computes when you call `.backward()`").

---

## 8. Suggested tech stack

- Frontend: Next.js/React + Tailwind, using the light-only design tokens in §2.1.
- Math rendering: KaTeX.
- Code display: a static syntax highlighter (e.g. Shiki or Prism) in read-only mode — no
  editor library needed.
- State/progress: local storage by default; optional Postgres + auth for cross-device sync.
- Content authoring: MDX per module, enforcing the A–E section structure (§4) via a schema/
  frontmatter contract so every module is structurally consistent.
- No backend execution service required — this significantly simplifies hosting (can ship as
  a static site + a thin API only for optional account/progress sync).

---

## 9. Deliverable for the first build pass

Scaffold the app shell (nav, home page per §2.4, phase/module routing, progress state) and
fully build out **one complete phase (Linear Algebra for AI, 5 modules)** end-to-end,
including working answer-only assessments for both the hand-solving and programming
questions, before templating the rest.