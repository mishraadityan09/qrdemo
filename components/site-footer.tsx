export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>FlightsMojo QR demo layout built for internal product walkthroughs.</p>
        <p className="font-medium text-slate-500">Next step: wire in QR rendering and download actions.</p>
      </div>
    </footer>
  );
}
