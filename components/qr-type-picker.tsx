"use client";

import {
  FileText,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  ScanQrCode,
  Type,
  UserRound,
  Wifi,
} from "lucide-react";
import { type QrTypeSlug, qrTypes } from "@/lib/qr-types";

const iconMap = {
  url: Link2,
  wifi: Wifi,
  contact: UserRound,
  whatsapp: MessageCircle,
  email: Mail,
  phone: Phone,
  text: Type,
  sms: MessageSquare,
  location: MapPin,
  file: FileText,
} as const;

type QrTypePickerProps = {
  selectedTypeSlug: QrTypeSlug;
  onSelect: (slug: QrTypeSlug) => void;
};

export function QrTypePicker({ selectedTypeSlug, onSelect }: QrTypePickerProps) {
  const featuredTypes = qrTypes.filter((item) => item.featured);
  const secondaryTypes = qrTypes.filter((item) => !item.featured);

  return (
    <div className="mt-8 space-y-6">
      <div>
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          <ScanQrCode className="h-4 w-4 text-[var(--brand)]" />
          Most used
        </div>
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-5">
          {featuredTypes.map((item) => {
            const Icon = iconMap[item.slug];
            const isActive = item.slug === selectedTypeSlug;

            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => onSelect(item.slug)}
                className={`group min-w-[15rem] snap-start rounded-[1.6rem] border p-4 text-left transition md:min-w-0 ${
                  isActive
                    ? "border-[var(--brand)] bg-[var(--brand-soft)] shadow-[0_18px_40px_rgba(15,23,42,0.07)]"
                    : "border-[var(--border)] bg-white/88 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    isActive ? "bg-white text-[var(--brand)]" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">{item.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.shortDescription}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          More ways to share
        </p>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {secondaryTypes.map((item) => {
            const Icon = iconMap[item.slug];
            const isActive = item.slug === selectedTypeSlug;

            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => onSelect(item.slug)}
                className={`inline-flex min-w-max items-center gap-3 rounded-full border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-[var(--brand)] bg-[var(--brand-soft)] text-slate-900"
                    : "border-[var(--border)] bg-white/88 text-slate-700 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
