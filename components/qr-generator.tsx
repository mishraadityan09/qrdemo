"use client";

import Image from "next/image";
import { toPng } from "html-to-image";
import { useRouter } from "next/navigation";
import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { QrField } from "@/components/qr-field";
import { QrPreviewCard } from "@/components/qr-preview-card";
import { QrTypePicker } from "@/components/qr-type-picker";
import { SectionBadge } from "@/components/section-badge";
import {
  DEFAULT_QR_TYPE,
  getDefaultFormState,
  getRouteForType,
  getQrTypeBySlug,
  type QrBuildResult,
  type QrFieldDefinition,
  type QrFormState,
  type QrFormErrors,
  type QrTypeSlug,
  validateFormState,
} from "@/lib/qr-types";

type QrGeneratorProps = {
  initialTypeSlug: QrTypeSlug;
};

export function QrGenerator({ initialTypeSlug }: QrGeneratorProps) {
  const router = useRouter();
  const [selectedTypeSlug, setSelectedTypeSlug] = useState(initialTypeSlug);
  const [formState, setFormState] = useState<QrFormState>(() => getDefaultFormState(initialTypeSlug));
  const [qrSrc, setQrSrc] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "done">("idle");
  const [downloadState, setDownloadState] = useState<"idle" | "png" | "svg">("idle");
  const resetFeedbackRef = useRef<number | null>(null);
  const previewCaptureRef = useRef<HTMLDivElement>(null);

  const selectedType = getQrTypeBySlug(selectedTypeSlug) ?? getQrTypeBySlug(DEFAULT_QR_TYPE)!;
  const selectedFields = selectedType.fields as readonly QrFieldDefinition[];
  const deferredFormState = useDeferredValue(formState);

  useEffect(() => {
    setSelectedTypeSlug(initialTypeSlug);
    setFormState(getDefaultFormState(initialTypeSlug));
    setCopyState("idle");
    setDownloadState("idle");
  }, [initialTypeSlug]);

  const validationErrors = useMemo<QrFormErrors>(
    () => validateFormState(selectedType, deferredFormState),
    [deferredFormState, selectedType],
  );

  const buildResult = useMemo<QrBuildResult>(
    () => selectedType.build(deferredFormState),
    [deferredFormState, selectedType],
  );

  const missingCount = Object.keys(validationErrors).length;
  const canGenerate = missingCount === 0;
  const qrValue = canGenerate ? buildResult.value : "";

  function scheduleFeedbackReset() {
    if (resetFeedbackRef.current) {
      window.clearTimeout(resetFeedbackRef.current);
    }

    resetFeedbackRef.current = window.setTimeout(() => {
      setCopyState("idle");
      setDownloadState("idle");
    }, 1800);
  }

  useEffect(() => {
    return () => {
      if (resetFeedbackRef.current) {
        window.clearTimeout(resetFeedbackRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function generatePreview() {
      if (!canGenerate) {
        setQrSrc("");
        return;
      }

      const QRCode = (await import("qrcode")).default;
      const preview = await QRCode.toDataURL(qrValue, {
        width: 420,
        margin: 2,
        errorCorrectionLevel: "M",
        color: {
          dark: "#14213b",
          light: "#ffffff",
        },
      });

      if (active) {
        setQrSrc(preview);
      }
    }

    generatePreview().catch(() => {
      if (active) {
        setQrSrc("");
      }
    });

    return () => {
      active = false;
    };
  }, [canGenerate, qrValue]);

  async function handleCopy() {
    if (!canGenerate) {
      return;
    }

    await navigator.clipboard.writeText(qrValue);
    setCopyState("done");
    scheduleFeedbackReset();
  }

  async function handleDownloadPng() {
    if (!canGenerate) {
      return;
    }

    if (buildResult.pngExportMode === "capture" && previewCaptureRef.current) {
      const dataUrl = await toPng(previewCaptureRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${buildResult.downloadStem}.png`;
      link.click();
    } else if (qrSrc) {
      const link = document.createElement("a");
      link.href = qrSrc;
      link.download = `${buildResult.downloadStem}.png`;
      link.click();
    } else {
      return;
    }

    setDownloadState("png");
    scheduleFeedbackReset();
  }

  async function handleDownloadSvg() {
    if (!canGenerate) {
      return;
    }

    const QRCode = (await import("qrcode")).default;
    const svgMarkup = await QRCode.toString(qrValue, {
      type: "svg",
      margin: 1,
      color: {
        dark: "#14213b",
        light: "#ffffff",
      },
    });

    const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${buildResult.downloadStem}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadState("svg");
    scheduleFeedbackReset();
  }

  function handleTypeChange(nextTypeSlug: QrTypeSlug) {
    if (nextTypeSlug === selectedType.slug) {
      return;
    }

    startTransition(() => {
      setSelectedTypeSlug(nextTypeSlug);
      setFormState(getDefaultFormState(nextTypeSlug));
      setCopyState("idle");
      setDownloadState("idle");
      router.push(getRouteForType(nextTypeSlug), { scroll: false });
    });
  }

  return (
    <section
      id="generator"
      className="soft-rise rounded-[2.2rem] border border-[var(--border)] bg-white/82 p-4 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6 lg:p-8"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionBadge>QR Generator</SectionBadge>
          <h2 className="mt-4 max-w-3xl text-balance font-display text-[2.35rem] leading-[0.96] tracking-[-0.055em] text-slate-950 sm:text-[3rem]">
            Start with the task, not the technical format.
          </h2>
        </div>
        <p className="max-w-xl text-pretty text-sm leading-7 text-slate-600 sm:text-base">
          Pick one of the everyday QR types below. The form stays intentionally short, and the
          preview updates live while you type.
        </p>
      </div>

      <QrTypePicker selectedTypeSlug={selectedType.slug} onSelect={handleTypeChange} />

      <div className="mt-6 grid gap-5 xl:mt-8 xl:grid-cols-[minmax(0,0.97fr)_minmax(0,1.03fr)] xl:gap-6">
        <div className="min-w-0 rounded-[1.8rem] border border-[var(--border)] bg-[linear-gradient(180deg,#fbfcfa,#f6f8f3)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--brand)]">
                Selected Type
              </p>
              <h3 className="mt-3 font-display text-[1.9rem] tracking-[-0.05em] text-slate-950 sm:text-3xl">
                {selectedType.name}
              </h3>
            </div>
            <div className="rounded-full border border-[var(--border)] bg-white/90 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:px-4 sm:text-xs">
              {selectedType.featured ? "Most used" : "More ways to share"}
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {selectedType.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {selectedType.examples.map((example) => (
              <span
                key={example}
                className="rounded-full border border-[var(--border)] bg-white/90 px-3 py-2 text-xs font-medium text-slate-600"
              >
                {example}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4">
            {selectedFields
              .filter((field) => (field.showWhen ? field.showWhen(formState) : true))
              .map((field) => (
              <QrField
                key={field.key}
                field={field}
                value={formState[field.key]}
                error={validationErrors[field.key]}
                onChange={(nextValue) =>
                  setFormState((current) => ({
                    ...current,
                    [field.key]: nextValue,
                  }))
                }
              />
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-dashed border-[var(--brand)]/25 bg-[var(--brand-soft)]/55 p-4">
            <p className="text-sm leading-7 text-slate-700">
              {missingCount === 0
                ? "The payload is valid and ready to scan. You can download it now or keep refining the details."
                : `Complete ${missingCount} required ${missingCount === 1 ? "field" : "fields"} to unlock the QR export.`}
            </p>
          </div>
        </div>

        <div className="min-w-0 xl:sticky xl:top-24">
          <QrPreviewCard
            title={selectedType.name}
            badge={selectedType.previewBadge}
            summary={buildResult.summary}
            details={buildResult.details}
            qrSrc={qrSrc}
            qrValue={qrValue}
            downloadPngLabel={buildResult.pngLabel}
            captureRef={previewCaptureRef}
            invalidMessage={selectedType.emptyState}
            canGenerate={canGenerate}
            copyState={copyState}
            downloadState={downloadState}
            previewSurface={buildResult.previewSurface}
            onCopy={handleCopy}
            onDownloadPng={handleDownloadPng}
            onDownloadSvg={handleDownloadSvg}
          />
        </div>
      </div>

      <div className="mt-8 hidden rounded-[1.8rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff,#f5f7f2)] p-5 sm:p-6 lg:block">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
              Device Experience
            </p>
            <h3 className="mt-3 font-display text-3xl tracking-[-0.05em] text-slate-950">
              Comfortable on mobile, sharper on desktop.
            </h3>
          </div>
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/90 px-4 py-3 text-sm leading-7 text-slate-600">
            On large screens the preview stays visible beside the form. On phones the flow stacks in
            a single column, so users never lose the next action.
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Phone preview</p>
            <div className="mt-4 flex justify-center rounded-[1.8rem] border border-[var(--border)] bg-[linear-gradient(180deg,#f6f8f3,#ffffff)] p-4">
              <div className="w-full max-w-[15rem] rounded-[1.8rem] border border-slate-200 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                <div className="rounded-[1.2rem] bg-[var(--brand-soft)]/65 p-3">
                  <div className="h-2.5 w-20 rounded-full bg-slate-200" />
                  <div className="mt-2 h-2.5 w-28 rounded-full bg-slate-100" />
                </div>
                <div className="mt-4 rounded-[1.2rem] border border-dashed border-[var(--brand)]/25 p-3">
                  {qrSrc ? (
                    <Image
                      src={qrSrc}
                      alt={`${selectedType.name} QR phone preview`}
                      width={180}
                      height={180}
                      unoptimized
                      className="mx-auto h-auto w-full max-w-[11rem] rounded-[1rem]"
                    />
                  ) : (
                    <div className="mx-auto aspect-square w-full max-w-[11rem] rounded-[1rem] bg-slate-100" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Desktop preview</p>
            <div className="mt-4 rounded-[1.8rem] border border-[var(--border)] bg-[linear-gradient(180deg,#f7f9f4,#ffffff)] p-5">
              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[1.3rem] border border-slate-200 bg-white p-4">
                  <div className="h-3 w-20 rounded-full bg-slate-200" />
                  <div className="mt-3 h-11 rounded-[0.9rem] bg-slate-100" />
                  <div className="mt-3 h-11 rounded-[0.9rem] bg-slate-100" />
                  <div className="mt-3 h-24 rounded-[1rem] bg-slate-50" />
                </div>
                <div className="rounded-[1.3rem] border border-slate-200 bg-white p-4">
                  <div className="flex justify-center rounded-[1.1rem] bg-[var(--brand-soft)]/40 p-4">
                    {qrSrc ? (
                      <Image
                        src={qrSrc}
                        alt={`${selectedType.name} QR desktop preview`}
                        width={210}
                        height={210}
                        unoptimized
                        className="h-auto w-full max-w-[13rem] rounded-[1rem]"
                      />
                    ) : (
                      <div className="aspect-square w-full max-w-[13rem] rounded-[1rem] bg-slate-100" />
                    )}
                  </div>
                  <div className="mt-4 grid gap-2">
                    <div className="h-10 rounded-[0.9rem] bg-slate-100" />
                    <div className="h-10 rounded-[0.9rem] bg-slate-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
