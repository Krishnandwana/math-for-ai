import katex from "katex";

export default function Eq({
  latex,
  label,
  note,
}: {
  latex: string;
  label?: string;
  note?: string;
}) {
  const html = katex.renderToString(latex, {
    throwOnError: false,
    displayMode: true,
    output: "html",
  });

  return (
    <div className="rounded-lg border border-border bg-surface p-4 sm:p-6">
      {label && (
        <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
          {label}
        </div>
      )}
      <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
      {note && <p className="mt-3 text-sm leading-relaxed text-ink-muted">{note}</p>}
    </div>
  );
}
