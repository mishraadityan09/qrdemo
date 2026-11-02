import type { RefObject } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Copy, Download, FileImage, FileType2, QrCode, Save } from "lucide-react";
import type { ContactPreviewSurface, QrPreviewDetail } from "@/lib/qr-types";

type QrPreviewCardProps = {
  title: string;
  badge: string;
  summary: string;
  details: QrPreviewDetail[];
  qrSrc: string;
  qrValue: string;
  downloadPngLabel?: string;
  captureRef?: RefObject<HTMLDivElement | null>;
  invalidMessage: string;
  canGenerate: boolean;
  copyState: "idle" | "done";
  downloadState: "idle" | "png" | "svg";
  previewSurface?: ContactPreviewSurface;
  onCopy: () => Promise<void>;
  onDownloadPng: () => Promise<void>;
  onDownloadSvg: () => Promise<void>;
};

export function QrPreviewCard({
  title,
  badge,
  summary,
  details,
  qrSrc,
  qrValue,
  downloadPngLabel = "Download PNG",
  captureRef,
  invalidMessage,
  canGenerate,
  copyState,
  downloadState,
  previewSurface,
  onCopy,
  onDownloadPng,
  onDownloadSvg,
}: QrPreviewCardProps) {
  const themeMap = {
    person: {
      card: "bg-[linear-gradient(135deg,#f0f9e8,#ffffff)]",
      accent: "bg-[linear-gradient(135deg,#54753f,#8fb06f)]",
      badge: "bg-lime-50 text-lime-700 border-lime-200",
    },
    business: {
      card: "bg-[linear-gradient(135deg,#e9fbf4,#ffffff)]",
      accent: "bg-[linear-gradient(135deg,#2f6b5a,#5b9d84)]",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    creator: {
      card: "bg-[linear-gradient(135deg,#fff2dc,#ffffff)]",
      accent: "bg-[linear-gradient(135deg,#785a22,#d69b3f)]",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
    },
  } as const;

  const previewTheme = previewSurface ? themeMap[previewSurface.template] : null;

  return (
    <div className="rounded-[1.8rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff,#f6f8f3)] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--brand)]">
            Live Preview
          </p>
          <h3 className="mt-3 font-display text-[1.55rem] tracking-[-0.05em] text-slate-950 sm:text-[2rem]">
            {title}
          </h3>
        </div>
        <div className="inline-flex self-start rounded-full border border-[var(--border)] bg-white/92 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:self-auto sm:px-4 sm:text-xs">
          {badge}
        </div>
      </div>

      <div className="mt-6 rounded-[1.7rem] border border-[var(--border)] bg-white/92 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.04)] sm:p-5">
        {previewSurface && previewTheme ? (
          <>
            <div
              ref={captureRef}
              className={`rounded-[1.6rem] border border-[var(--border)] p-3.5 sm:p-5 ${previewTheme.card}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <span className={`inline-flex rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${previewTheme.badge}`}>
                    {previewSurface.eyebrow}
                  </span>
                  <h4 className="mt-4 text-balance font-display text-[1.8rem] leading-[0.95] tracking-[-0.05em] text-slate-950 sm:text-[2.25rem]">
                    {previewSurface.title}
                  </h4>
                  <p className="mt-2 text-sm font-medium text-slate-700">{previewSurface.subtitle}</p>
                </div>
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-[1.1rem] text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:h-[3.75rem] sm:w-[3.75rem] sm:rounded-[1.2rem] sm:text-lg ${previewTheme.accent}`}
                >
                  {previewSurface.avatarLabel}
                </div>
              </div>

              {previewSurface.description ? (
                <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:leading-7">
                  {previewSurface.description}
                </p>
              ) : null}

              <div className="mt-6 grid gap-4 2xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] 2xl:gap-5">
                <div className={`min-w-0 rounded-[1.4rem] p-4 text-white ${previewTheme.accent}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                    After scan
                  </p>
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-[1rem] bg-white/12 px-4 py-3 text-sm font-semibold text-white">
                      {previewSurface.primaryActionLabel}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                      <Save className="h-3.5 w-3.5" />
                      {previewSurface.secondaryActionLabel}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {previewSurface.landingChips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/80"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-w-0 rounded-[1.4rem] border border-[var(--border)] bg-white/92 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Scan card
                  </p>
                  <div className="mt-4 flex justify-center">
                    {canGenerate && qrSrc ? (
                      <Image
                        src={qrSrc}
                        alt={`${title} QR code`}
                        width={320}
                        height={320}
                        unoptimized
                        className="h-auto w-full max-w-[12.5rem] rounded-[1.2rem] border border-[var(--border)] bg-white p-3 shadow-[0_14px_34px_rgba(15,23,42,0.08)] xl:max-w-[14rem]"
                      />
                    ) : (
                      <div className="flex aspect-square w-full max-w-[12.5rem] flex-col items-center justify-center rounded-[1.2rem] border border-dashed border-[var(--brand)]/25 bg-white p-6 text-center xl:max-w-[14rem]">
                        <QrCode className="h-12 w-12 text-slate-300" />
                        <p className="mt-4 text-sm leading-6 text-slate-500">{invalidMessage}</p>
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-center text-sm leading-6 text-slate-600">
                    Scans open a branded profile page instead of a raw contact payload.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-[var(--border)] bg-[linear-gradient(180deg,#fbfcfa,#f4f7ef)] p-4">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
                  Landing Page Preview
                </p>
                <a
                  href={previewSurface.landingPath}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)]"
                >
                  Open preview
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-4 rounded-[1.4rem] border border-[var(--border)] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-[0.9rem] text-sm font-semibold text-white sm:h-12 sm:w-12 sm:rounded-[1rem] ${previewTheme.accent}`}
                  >
                    {previewSurface.avatarLabel}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">
                      {previewSurface.title}
                    </p>
                    <p className="truncate text-sm text-slate-600">{previewSurface.subtitle}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-[1rem] bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white">
                  {previewSurface.primaryActionLabel}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {previewSurface.landingChips.map((chip) => (
                    <span key={chip} className="rounded-full border border-[var(--border)] bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-[1.5rem] bg-[radial-gradient(circle_at_top,rgba(179,214,138,0.24),transparent_55%),linear-gradient(180deg,#fbfcfa,#f4f7ef)] p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
              Scan surface
            </p>
            <div className="mt-5 flex justify-center">
              {canGenerate && qrSrc ? (
                <Image
                  src={qrSrc}
                  alt={`${title} QR code`}
                  width={360}
                  height={360}
                  unoptimized
                  className="h-auto w-full max-w-[18rem] rounded-[1.4rem] border border-[var(--border)] bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                />
              ) : (
                <div className="flex aspect-square w-full max-w-[18rem] flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-[var(--brand)]/25 bg-white p-6 text-center">
                  <QrCode className="h-14 w-14 text-slate-300" />
                  <p className="mt-4 text-sm leading-7 text-slate-500">{invalidMessage}</p>
                </div>
              )}
            </div>
            <div className="mt-5 rounded-[1.4rem] border border-[var(--border)] bg-white/92 p-4">
              <p className="text-sm font-semibold leading-6 text-slate-900">{summary}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <button
          type="button"
          onClick={onDownloadPng}
          disabled={!canGenerate}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <FileImage className="h-4 w-4" />
          {downloadState === "png" ? "PNG ready" : downloadPngLabel}
        </button>
        <button
          type="button"
          onClick={onDownloadSvg}
          disabled={!canGenerate}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {downloadState === "svg" ? <Check className="h-4 w-4 text-emerald-600" /> : <FileType2 className="h-4 w-4" />}
          {downloadState === "svg" ? "SVG ready" : "Download SVG"}
        </button>
        <button
          type="button"
          onClick={onCopy}
          disabled={!canGenerate}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copyState === "done" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          {copyState === "done" ? "Payload copied" : "Copy data"}
        </button>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-white/92 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">At a glance</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {details.map((item) => (
            <div key={`${item.label}-${item.value}`} className="rounded-[1.2rem] bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <details className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-slate-950 p-4 text-slate-200 md:hidden">
        <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Encoded payload
        </summary>
        <pre className="mt-3 max-h-52 overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">
          {canGenerate ? qrValue : invalidMessage}
        </pre>
      </details>

      <div className="mt-5 hidden rounded-[1.5rem] border border-[var(--border)] bg-slate-950 p-4 text-slate-200 md:block">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Encoded payload</p>
          <Download className="h-4 w-4 text-slate-500" />
        </div>
        <pre className="mt-3 max-h-52 overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">
          {canGenerate ? qrValue : invalidMessage}
        </pre>
      </div>
    </div>
  );
}
