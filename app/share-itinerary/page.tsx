"use client";

import { useState } from "react";
import { DemoField } from "@/components/demo-field";
import { DemoPageShell } from "@/components/demo-page-shell";
import { QrResultCard } from "@/components/qr-result-card";
import { encodeItineraryShare, formatDateLabel, shortLocationCode } from "@/lib/qr-helpers";

export default function ShareItineraryPage() {
  const [form, setForm] = useState({
    fromCity: "Mumbai",
    toCity: "Goa",
    departureDate: "2026-05-02",
    departureTime: "07:45",
    airline: "IndiGo",
    flightNumber: "6E 448",
    passengerCount: "2",
  });

  const qrValue = encodeItineraryShare(form);

  return (
    <DemoPageShell
      badge="Trip Share Screen"
      title="Itinerary Share QR"
      description="This page shows the itinerary card a traveler can open or forward, with the QR sitting under the route summary."
      helperText="This demo encodes a formatted trip summary, so the QR already behaves like a shareable itinerary payload."
      formSlot={
        <>
          <DemoField
            label="From City"
            value={form.fromCity}
            onChange={(value) => setForm((current) => ({ ...current, fromCity: value }))}
          />
          <DemoField
            label="To City"
            value={form.toCity}
            onChange={(value) => setForm((current) => ({ ...current, toCity: value }))}
          />
          <DemoField
            label="Departure Date"
            type="date"
            value={form.departureDate}
            onChange={(value) => setForm((current) => ({ ...current, departureDate: value }))}
          />
          <DemoField
            label="Departure Time"
            type="time"
            value={form.departureTime}
            onChange={(value) => setForm((current) => ({ ...current, departureTime: value }))}
          />
          <DemoField
            label="Airline"
            value={form.airline}
            onChange={(value) => setForm((current) => ({ ...current, airline: value }))}
          />
          <DemoField
            label="Flight Number"
            value={form.flightNumber}
            onChange={(value) => setForm((current) => ({ ...current, flightNumber: value }))}
          />
          <DemoField
            label="Passenger Count"
            type="number"
            value={form.passengerCount}
            onChange={(value) => setForm((current) => ({ ...current, passengerCount: value }))}
          />
        </>
      }
      previewSlot={
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Shared itinerary</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">
                  {form.fromCity || "Origin"} to {form.toCity || "Destination"}
                </h3>
              </div>
              <div className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                {form.passengerCount || "0"} travelers
              </div>
            </div>
            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div>
                <p className="text-3xl font-semibold text-slate-950">{form.departureTime || "--:--"}</p>
                <p className="mt-1 text-sm text-slate-600">{shortLocationCode(form.fromCity)}</p>
              </div>
              <div className="text-sm font-medium text-slate-400">→</div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-slate-950">Open on scan</p>
                <p className="mt-1 text-sm text-slate-600">{shortLocationCode(form.toCity)}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Flight</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {form.airline || "Airline"} • {form.flightNumber || "Flight"}
                </p>
              </div>
              <p className="text-sm font-medium text-slate-600">
                {formatDateLabel(form.departureDate)}
              </p>
            </div>
          </div>
        </div>
      }
      qrSlot={
        <QrResultCard
          title="Itinerary Share QR"
          badge="Share"
          value={qrValue}
          filename="flightsmojo-itinerary-share"
          summary="Encodes a formatted itinerary block that can be scanned by a travel companion."
        />
      }
    />
  );
}
