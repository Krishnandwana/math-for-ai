import CopyButton from "@/components/CopyButton";

export default function TerminalBox({ command, label = "shell" }: { command: string; label?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border bg-surface-alt px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">{label}</span>
        <CopyButton text={command} />
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-sm text-ink">
        <code>{command}</code>
      </pre>
    </div>
  );
}
