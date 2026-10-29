import type { ReactNode } from "react";

type SectionBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function SectionBadge({ children, className = "" }: SectionBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--brand)] ${className}`}
    >
      {children}
    </span>
  );
}
