"use client";

import { useState } from "react";
import clsx from "clsx";

export default function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={clsx(
        "font-mono text-xs uppercase tracking-wide text-accent transition-colors hover:text-ink",
        className
      )}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
