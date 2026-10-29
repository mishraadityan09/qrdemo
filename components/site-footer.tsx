import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-white/65 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-medium text-slate-900">{siteConfig.name}</p>
          <p className="mt-1 max-w-xl leading-7 text-slate-600">
            Anonymous-first QR creation for links, Wi-Fi, contacts, files, and other everyday handoff moments.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link href="#generator" className="transition hover:text-slate-950">
            Create
          </Link>
          <Link href="#templates" className="transition hover:text-slate-950">
            Uses
          </Link>
          <Link href="#faq" className="transition hover:text-slate-950">
            FAQ
          </Link>
          <span className="rounded-full border border-[var(--border)] bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            PNG + SVG
          </span>
        </div>
      </div>
    </footer>
  );
}
