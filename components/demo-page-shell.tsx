import type { ReactNode } from "react";
import Link from "next/link";
import { UseCaseBadge } from "@/components/use-case-badge";

type DemoPageShellProps = {
  badge: string;
  title: string;
  description: string;
  helperText: string;
  formSlot: ReactNode;
  previewSlot: ReactNode;
  qrSlot: ReactNode;
};

export function DemoPageShell({
  badge,
  title,
  description,
  helperText,
  formSlot,
  previewSlot,
  qrSlot,
}: DemoPageShellProps) {
  return (
    <div className="flex flex-1 flex-col gap-8 py-8 sm:py-10">
      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <span aria-hidden="true">&lt;-</span>
          Back to overview
        </Link>
        <div className="space-y-4">
          <UseCaseBadge>{badge}</UseCaseBadge>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {description}
            </p>
          </div>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
                Demo Inputs
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Live QR data
              </h2>
            </div>
            <div className="rounded-full bg-[var(--brand-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
              Active
            </div>
          </div>
          <div className="mt-6 grid gap-4">{formSlot}</div>
          <div className="mt-6 rounded-3xl border border-dashed border-[var(--brand)]/35 bg-[var(--brand-soft)]/45 p-4">
            <p className="text-sm leading-7 text-slate-700">{helperText}</p>
          </div>
          <p className="mt-5 text-sm font-medium text-slate-500">
            QR output updates live as you edit the fields.
          </p>
        </div>

        <div className="grid gap-6">
          {previewSlot}
          {qrSlot}
        </div>
      </section>
    </div>
  );
}
