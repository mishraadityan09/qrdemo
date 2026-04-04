const filledCells = new Set([
  0, 1, 2, 4, 6, 7, 10, 12, 13, 14, 16, 18, 19, 20, 21, 24, 26, 28, 30, 31, 32,
  34, 36, 38, 41, 42, 43, 45, 47, 48,
]);

export function QrPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
            QR Preview Area
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{label}</h2>
        </div>
        <div className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Placeholder
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="relative w-full max-w-[22rem] rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-inner">
          <div className="grid aspect-square grid-cols-7 gap-2 rounded-[1.5rem] bg-white p-5">
            {Array.from({ length: 49 }, (_, index) => (
              <div
                key={index}
                className={`rounded-[0.35rem] ${
                  filledCells.has(index) ? "bg-[var(--brand)]" : "bg-slate-100"
                }`}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-[var(--brand)]/20 bg-white/95 px-4 py-2 text-sm font-semibold text-[var(--brand)] shadow-sm">
              QR component plugs in here
            </div>
          </div>
        </div>
      </div>
      <p className="mt-5 text-center text-sm leading-7 text-slate-600">
        Keep this panel as the render target for your actual QR component and future export flow.
      </p>
    </div>
  );
}
