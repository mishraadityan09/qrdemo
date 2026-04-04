"use client";

import { useState } from "react";
import { DemoField } from "@/components/demo-field";
import { DemoPageShell } from "@/components/demo-page-shell";
import { QrResultCard } from "@/components/qr-result-card";
import type { SupportedAirline } from "@/lib/airline-links";
import { encodeCheckinReminder } from "@/lib/qr-helpers";

export default function CheckinReminderPage() {
  const [form, setForm] = useState<{
    airline: SupportedAirline;
    pnr: string;
  }>({
    airline: "IndiGo",
    pnr: "FMQR4821",
  });

  const qrValue = encodeCheckinReminder(form);

  return (
    <DemoPageShell
      badge="Reminder Notification"
      title="Check-in Reminder QR"
      description="A countdown-style reminder layout that frames the QR as a shortcut into the airline’s check-in flow."
      helperText="This version builds a FlightsMojo airline check-in deep link with the selected carrier and PNR already attached."
      formSlot={
        <>
          <DemoField
            label="Airline"
            value={form.airline}
            onChange={(value) =>
              setForm((current) => ({ ...current, airline: value as SupportedAirline }))
            }
            options={["IndiGo", "Air India", "SpiceJet", "Akasa Air", "Vistara"]}
          />
          <DemoField
            label="PNR"
            value={form.pnr}
            onChange={(value) => setForm((current) => ({ ...current, pnr: value }))}
          />
        </>
      }
      previewSlot={
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Check-in reminder</p>
                <h3 className="mt-2 text-xl font-semibold">{form.airline} web check-in</h3>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Opens in</p>
                <p className="mt-1 text-2xl font-semibold">24h</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">PNR</p>
                <p className="mt-2 text-sm font-semibold text-white">{form.pnr || "PNR pending"}</p>
              </div>
              <div className="rounded-2xl bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Entry point</p>
                <p className="mt-2 text-sm font-semibold text-white">FlightsMojo airline redirect</p>
              </div>
            </div>
          </div>
        </div>
      }
      qrSlot={
        <QrResultCard
          title="Check-in Reminder QR"
          badge="Deep link"
          value={qrValue}
          filename="flightsmojo-checkin-reminder"
          summary="Encodes a carrier-aware check-in URL with the selected PNR pre-applied."
        />
      }
    />
  );
}
