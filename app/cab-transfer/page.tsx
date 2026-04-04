"use client";

import { useState } from "react";
import { DemoField } from "@/components/demo-field";
import { DemoPageShell } from "@/components/demo-page-shell";
import { QrResultCard } from "@/components/qr-result-card";
import { encodeCabTransfer } from "@/lib/qr-helpers";

export default function CabTransferPage() {
  const [form, setForm] = useState({
    passengerName: "Aarav Mehta",
    pickupLocation: "T3 Arrivals Gate B, Delhi Airport",
    flightNumber: "AI 504",
    pickupTime: "22:20",
  });

  const qrValue = encodeCabTransfer(form);

  return (
    <DemoPageShell
      badge="Driver Pickup Flow"
      title="Cab / Transfer QR"
      description="This route frames the transfer handoff as a driver-facing confirmation card with a large scan target and key trip details."
      helperText="This demo now encodes the driver handoff as a JSON payload with rider, pickup point, flight, and pickup time."
      formSlot={
        <>
          <DemoField
            label="Passenger Name"
            value={form.passengerName}
            onChange={(value) => setForm((current) => ({ ...current, passengerName: value }))}
          />
          <DemoField
            label="Pickup Location"
            value={form.pickupLocation}
            onChange={(value) => setForm((current) => ({ ...current, pickupLocation: value }))}
          />
          <DemoField
            label="Flight Number"
            value={form.flightNumber}
            onChange={(value) => setForm((current) => ({ ...current, flightNumber: value }))}
          />
          <DemoField
            label="Pickup Time"
            type="time"
            value={form.pickupTime}
            onChange={(value) => setForm((current) => ({ ...current, pickupTime: value }))}
          />
        </>
      }
      previewSlot={
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="rounded-3xl bg-[linear-gradient(135deg,#0f172a,#1e293b)] p-5 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Driver pickup card</p>
            <h3 className="mt-2 text-xl font-semibold">Verify passenger at pickup</h3>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Passenger</p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {form.passengerName || "Passenger name"}
                </p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pickup point</p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {form.pickupLocation || "Pickup location"}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Flight</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {form.flightNumber || "Flight number"}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pickup time</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {form.pickupTime || "--:--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      qrSlot={
        <QrResultCard
          title="Cab Transfer QR"
          badge="JSON"
          value={qrValue}
          filename="flightsmojo-cab-transfer"
          summary="Encodes a driver-facing JSON payload for pickup verification without a phone call."
        />
      }
    />
  );
}
