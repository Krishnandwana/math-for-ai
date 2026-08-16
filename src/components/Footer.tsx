import Link from "next/link";
import TerminalBox from "@/components/TerminalBox";

const LINKS = [
  { href: "/#curriculum", label: "Contents" },
  { href: "/topics", label: "Topics" },
  { href: "/practice", label: "Practice" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 max-w-xl">
          <TerminalBox
            label="clone"
            command="git clone https://github.com/Krishnandwana/math-for-ai.git && cd math-for-ai && npm install && npm run dev"
          />
        </div>
        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-ink-muted">
            MIT licensed · Math for AI · curriculum v1.0 · light edition
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-wide text-ink-muted transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
