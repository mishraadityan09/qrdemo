import type { ReactNode } from "react";

type UseCaseBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function UseCaseBadge({ children, className = "" }: UseCaseBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border border-[var(--brand)]/15 bg-[var(--brand-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)] ${className}`}
    >
      {children}
    </span>
  );
}
