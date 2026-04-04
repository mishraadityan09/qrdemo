import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { useCases } from "@/lib/use-cases";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-white/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="w-fit">
            <LogoMark />
          </Link>
          <nav className="flex flex-wrap gap-2">
            {useCases.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
