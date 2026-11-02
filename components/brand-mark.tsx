import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="overflow-hidden rounded-[1.2rem] shadow-[0_18px_36px_rgba(15,23,42,0.14)]">
        <Image
          src="/plainqr-mark.svg"
          alt={`${siteConfig.name} logo`}
          width={44}
          height={44}
          priority
          className="h-11 w-11"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate font-display text-lg tracking-[-0.04em] text-slate-950 sm:text-xl">
          {siteConfig.name}
        </p>
        <p className="hidden text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500 sm:block">
          Clean codes, fast
        </p>
      </div>
    </div>
  );
}
