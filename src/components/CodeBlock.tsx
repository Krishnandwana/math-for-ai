import { codeToHtml } from "shiki";
import CopyButton from "@/components/CopyButton";

export default async function CodeBlock({
  code,
  lang = "python",
  caption,
}: {
  code: string;
  lang?: string;
  caption?: string;
}) {
  const html = await codeToHtml(code, { lang, theme: "github-light" });

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border bg-surface-alt px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">{lang}</span>
        <CopyButton text={code} />
      </div>
      <div
        className="shiki-wrapper overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption && (
        <p className="border-t border-border px-4 py-2 text-sm italic leading-relaxed text-ink-muted">
          {caption}
        </p>
      )}
    </div>
  );
}
