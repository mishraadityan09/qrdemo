"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Check, Copy, Download, QrCode } from "lucide-react";
import QRCode from "qrcode";

type QrResultCardProps = {
  title: string;
  badge: string;
  value: string;
  filename: string;
  summary: string;
  emptyMessage?: string;
};

export function QrResultCard({
  title,
  badge,
  value,
  filename,
  summary,
  emptyMessage = "Fill in the form to generate the QR code for this use case.",
}: QrResultCardProps) {
  const [qrSrc, setQrSrc] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const resetCopyRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function generateCode() {
      if (!value.trim()) {
        setQrSrc("");
        return;
      }

      const dataUrl = await QRCode.toDataURL(value, {
        width: 320,
        margin: 2,
        color: {
          dark: "#12356d",
          light: "#ffffff",
        },
      });

      if (!cancelled) {
        setQrSrc(dataUrl);
      }
    }

    generateCode().catch(() => {
      if (!cancelled) {
        setQrSrc("");
      }
    });

    return () => {
      cancelled = true;
      if (resetCopyRef.current) {
        window.clearTimeout(resetCopyRef.current);
      }
    };
  }, [value]);

  async function handleCopy() {
    if (!value.trim()) {
      return;
    }

    await navigator.clipboard.writeText(value);
    setCopied(true);

    if (resetCopyRef.current) {
      window.clearTimeout(resetCopyRef.current);
    }

    resetCopyRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  async function handleDownload() {
    if (!captureRef.current || !value.trim()) {
      return;
    }

    setIsDownloading(true);

    try {
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
            QR Preview Area
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h2>
        </div>
        <div className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {badge}
        </div>
      </div>

      <div
        ref={captureRef}
        className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
      >
        <div className="rounded-3xl bg-[linear-gradient(180deg,#f8fbff,#eef4ff)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">
            FlightsMojo QR
          </p>
          <div className="mt-4 flex justify-center">
            {qrSrc ? (
              <img
                src={qrSrc}
                alt={title}
                className="h-auto w-full max-w-[18rem] rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm"
              />
            ) : (
              <div className="flex aspect-square w-full max-w-[18rem] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-6 text-center">
                <QrCode className="h-14 w-14 text-slate-300" />
                <p className="mt-4 text-sm leading-6 text-slate-500">{emptyMessage}</p>
              </div>
            )}
          </div>
          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">{summary}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={!qrSrc || isDownloading}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? "Preparing..." : "Download PNG"}
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!value.trim()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy QR Data"}
        </button>
      </div>

      <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Encoded payload
        </p>
        <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-600">
          {value || emptyMessage}
        </pre>
      </div>
    </div>
  );
}
