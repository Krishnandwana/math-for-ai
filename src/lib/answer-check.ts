import type { Question } from "@/lib/types";

export interface CheckResult {
  correct: boolean;
  parsed: boolean;
  message?: string;
}

const DEFAULT_TOLERANCE = 0.01;

function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : null;
}

function parseFraction(raw: string): number | null {
  const trimmed = raw.trim();
  const fractionMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);
    if (denominator !== 0) return numerator / denominator;
    return null;
  }
  return parseNumber(trimmed);
}

function parseNumberArray(raw: string): number[] | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const parts = trimmed
    .split(/[,\s]+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (parts.length === 0) return null;
  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isFinite(n))) return null;
  return nums;
}

function normalizeString(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}

export function checkAnswer(question: Question, rawInput: string): CheckResult {
  const tolerance = question.tolerance ?? DEFAULT_TOLERANCE;

  switch (question.type) {
    case "number": {
      const value = parseNumber(rawInput);
      if (value === null) {
        return { correct: false, parsed: false, message: "Enter a number." };
      }
      const answer = question.answer as number;
      const correct = Math.abs(value - answer) <= tolerance;
      return { correct, parsed: true };
    }

    case "array": {
      const values = parseNumberArray(rawInput);
      if (values === null) {
        return {
          correct: false,
          parsed: false,
          message: "Enter numbers separated by commas or spaces.",
        };
      }
      const answer = question.answer as number[];
      if (values.length !== answer.length) {
        return {
          correct: false,
          parsed: true,
          message: `Expected ${answer.length} value${answer.length === 1 ? "" : "s"}, got ${values.length}.`,
        };
      }
      const a = question.orderInsensitive ? [...values].sort((x, y) => x - y) : values;
      const b = question.orderInsensitive ? [...answer].sort((x, y) => x - y) : answer;
      const correct = a.every((v, i) => Math.abs(v - b[i]) <= tolerance);
      return { correct, parsed: true };
    }

    case "string": {
      if (rawInput.trim() === "") {
        return { correct: false, parsed: false, message: "Enter an answer." };
      }
      const normalizedInput = normalizeString(rawInput);
      const answers = Array.isArray(question.answer)
        ? (question.answer as string[])
        : [question.answer as string];
      const correct = answers.some((a) => normalizeString(a) === normalizedInput);
      return { correct, parsed: true };
    }

    case "symbolic": {
      if (rawInput.trim() === "") {
        return { correct: false, parsed: false, message: "Enter an answer." };
      }
      const answers = Array.isArray(question.answer)
        ? (question.answer as string[])
        : [question.answer as string];

      const inputAsNumber = parseFraction(rawInput);
      const correct = answers.some((a) => {
        const answerAsNumber = parseFraction(a);
        if (inputAsNumber !== null && answerAsNumber !== null) {
          return Math.abs(inputAsNumber - answerAsNumber) <= tolerance;
        }
        return normalizeString(a).replace(/\s+/g, "") === normalizeString(rawInput).replace(/\s+/g, "");
      });
      return { correct, parsed: true };
    }

    default:
      return { correct: false, parsed: false, message: "Unsupported question type." };
  }
}
