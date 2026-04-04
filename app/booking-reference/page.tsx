"use client";

import { useState } from "react";
import { DemoField } from "@/components/demo-field";
import { DemoPageShell } from "@/components/demo-page-shell";
import { QrResultCard } from "@/components/qr-result-card";
import { encodeBookingReference, formatDateLabel } from "@/lib/qr-helpers";

export default function BookingReferencePage() {
  const [form, setForm] = useState({
    pnr: "FMQR4821",
    passengerName: "Aarav Mehta",
    flightNumber: "6E 6124",
    travelDate: "2026-04-18",
  });

  const qrValue = encodeBookingReference(form);
  const normalizedPnr = form.pnr.trim().toUpperCase();

  return (
    <DemoPageShell
      badge="Booking Confirmation Screen"
      title="Booking Reference QR"
      description="Lay out the booking confirmation experience where a traveler sees their PNR summary and the QR module directly below it."
      helperText="This version encodes the booking reference together with the passenger, flight, and travel date so all entered fields are used in the QR output."
      formSlot={
        <>
          <DemoField
            label="PNR / Booking Reference"
            value={form.pnr}
            onChange={(value) => setForm((current) => ({ ...current, pnr: value }))}
          />
          <DemoField
            label="Passenger Name"
            value={form.passengerName}
            onChange={(value) => setForm((current) => ({ ...current, passengerName: value }))}
          />
          <DemoField
            label="Flight Number"
            value={form.flightNumber}
            onChange={(value) => setForm((current) => ({ ...current, flightNumber: value }))}
          />
          <DemoField
            label="Travel Date"
            type="date"
            value={form.travelDate}
            onChange={(value) => setForm((current) => ({ ...current, travelDate: value }))}
          />
        </>
      }
      previewSlot={
        <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between rounded-3xl bg-[linear-gradient(135deg,#0052cc,#0d7de5)] p-5 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-blue-100">Booking Confirmed</p>
              <h3 className="mt-2 text-xl font-semibold">FlightsMojo booking confirmation</h3>
              <p className="mt-1 text-sm text-blue-100">{formatDateLabel(form.travelDate)} • Non-stop</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
              <p className="text-xs text-blue-100">PNR</p>
              <p className="text-lg font-semibold">{normalizedPnr || "Pending"}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Passenger</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {form.passengerName || "Passenger name"}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Flight</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {form.flightNumber || "Flight number"}
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-dashed border-[var(--brand)]/30 bg-[var(--brand-soft)]/50 p-4">
            <p className="text-sm font-medium text-slate-700">
              QR appears below the booking summary so the passenger can present it directly at airport touchpoints.
            </p>
          </div>
        </div>
      }
      qrSlot={
          <QrResultCard
            title="Booking Reference QR"
            badge="Booking"
            value={qrValue}
            filename="flightsmojo-booking-reference"
            summary="Encodes the booking reference plus the supporting passenger and flight details from the form."
          />
      }
    />
  );
}
