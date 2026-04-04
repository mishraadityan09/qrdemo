export function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0052cc,#0d7de5)] text-sm font-bold text-white shadow-[0_16px_40px_rgba(0,82,204,0.32)]">
        FM
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-950">FlightsMojo</p>
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">QR Demo</p>
      </div>
    </div>
  );
}
