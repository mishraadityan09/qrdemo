import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="soft-rise rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
        Lost The Scan
      </div>
      <h1 className="mt-6 text-balance font-display text-4xl tracking-[-0.04em] text-slate-950 sm:text-5xl">
        This page is not part of {siteConfig.name}.
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
        The route does not exist, but the generator is still one tap away.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]"
        >
          Open The Generator
        </Link>
        <Link
          href="/#faq"
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/85 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
        >
          Read The Basics
        </Link>
      </div>
    </section>
  );
}
