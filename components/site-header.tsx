import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/68 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8">
        <div className="min-w-0">
          <Link href="/" className="w-fit">
            <BrandMark />
          </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/85 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="shrink-0">
          <Link
            href="#generator"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)] sm:px-5"
          >
            <span className="sm:hidden">Create</span>
            <span className="hidden sm:inline">Try it now</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
