import katex from "katex";

interface Token {
  type: "text" | "bold" | "code" | "math";
  value: string;
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const regex = /\$([^$]+)\$|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input))) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: input.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) tokens.push({ type: "math", value: match[1] });
    else if (match[2] !== undefined) tokens.push({ type: "bold", value: match[2] });
    else if (match[3] !== undefined) tokens.push({ type: "code", value: match[3] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < input.length) {
    tokens.push({ type: "text", value: input.slice(lastIndex) });
  }
  return tokens;
}

export default function InlineMD({ text, className }: { text: string; className?: string }) {
  const tokens = tokenize(text);
  return (
    <span className={className}>
      {tokens.map((token, idx) => {
        if (token.type === "math") {
          const html = katex.renderToString(token.value, {
            throwOnError: false,
            output: "html",
          });
          return <span key={idx} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        if (token.type === "bold") {
          return <strong key={idx}>{token.value}</strong>;
        }
        if (token.type === "code") {
          return (
            <code
              key={idx}
              className="rounded bg-surface-alt px-1 py-0.5 font-mono text-[0.9em] text-ink"
            >
              {token.value}
            </code>
          );
        }
        return <span key={idx}>{token.value}</span>;
      })}
    </span>
  );
}
