"use client";

import { useState } from "react";
import { DemoField } from "@/components/demo-field";
import { DemoPageShell } from "@/components/demo-page-shell";
import { QrResultCard } from "@/components/qr-result-card";
import { encodeReferral } from "@/lib/qr-helpers";

export default function ReferralPage() {
  const [form, setForm] = useState({
    userName: "Aarav Mehta",
    referralCode: "AARAV250",
  });

  const qrValue = encodeReferral(form);

  return (
    <DemoPageShell
      badge="Referral Share Card"
      title="Loyalty / Referral QR"
      description="A referral share layout designed for social forwarding, with the QR positioned as the conversion trigger into the app install flow."
      helperText="This demo now encodes a referral deep link that carries the invite code into the app download flow."
      formSlot={
        <>
          <DemoField
            label="User Name"
            value={form.userName}
            onChange={(value) => setForm((current) => ({ ...current, userName: value }))}
          />
          <DemoField
            label="Referral Code"
            value={form.referralCode}
            onChange={(value) => setForm((current) => ({ ...current, referralCode: value }))}
          />
        </>
      }
      previewSlot={
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="rounded-3xl bg-[linear-gradient(135deg,#eff6ff,#dbeafe)] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand)]">Invite a friend</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-950">Share FlightsMojo and earn rewards</h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
              Friends who scan this card can land on the app download page with the referral already attached.
            </p>
            <div className="mt-6 rounded-3xl bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {form.userName || "User name"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Referral code: {form.referralCode || "Pending"}
                  </p>
                </div>
                <div className="rounded-full bg-[var(--brand)] px-4 py-2 text-xs font-semibold text-white">
                  Reward unlocked
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      qrSlot={
        <QrResultCard
          title="Referral QR"
          badge="Growth"
          value={qrValue}
          filename="flightsmojo-referral"
          summary="Encodes a referral install link with the invite code already applied."
        />
      }
    />
  );
}
