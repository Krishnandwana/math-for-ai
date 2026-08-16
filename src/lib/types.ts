export type QuestionType = "number" | "array" | "string" | "symbolic";

export interface Question {
  id: string;
  prompt: string;
  setup?: string;
  type: QuestionType;
  answer: number | number[] | string | string[];
  tolerance?: number;
  orderInsensitive?: boolean;
  placeholder?: string;
  hint: string;
  solutionSteps: string[];
}

export interface Assessment {
  handSolving: Question;
  programming: Question;
}

export interface EquationBlock {
  label?: string;
  latex: string;
  note?: string;
}

export interface WorkedExample {
  mathTitle: string;
  mathSteps: string[];
  pythonCode: string;
  pythonCaption: string;
}

export interface SecondExample {
  title: string;
  steps: string[];
}

export interface ModuleContent {
  theory: string[];
  mathIntro?: string;
  equations: EquationBlock[];
  howToSolve: string[];
  workedExample: WorkedExample;
  secondExample: SecondExample;
  bestApproaches: string[];
  assessment: Assessment;
}

export interface ModuleMeta {
  slug: string;
  title: string;
  summary: string;
  order: number;
  content?: ModuleContent;
}

export interface Phase {
  slug: string;
  title: string;
  description: string;
  order: number;
  modules: ModuleMeta[];
}
