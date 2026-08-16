import type { ReactNode } from "react";
import clsx from "clsx";

export default function Card({
  children,
  className,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={clsx(
        "rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-sm sm:p-6",
        className
      )}
    >
      {children}
    </Tag>
  );
}
