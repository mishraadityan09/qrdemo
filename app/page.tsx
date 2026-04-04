import Link from "next/link";
import { UseCaseBadge } from "@/components/use-case-badge";
import { useCases } from "@/lib/use-cases";

const ceoFlow = [
  "Landing page for the overview and business framing",
  "Booking Reference for the fastest product-to-airport story",
  "Itinerary Share for passenger-to-passenger utility",
  "Check-in Reminder for airline ecosystem depth",
  "Referral for growth and acquisition potential",
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-16 py-8 sm:py-10 lg:gap-24 lg:py-12">
      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <UseCaseBadge>CEO Demo Ready</UseCaseBadge>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              QR Code Integration Demo for FlightsMojo
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              A polished front-end walkthrough showing how QR codes can slot into
              booking, itinerary, check-in, transfer, and referral experiences
              across the product.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/booking-reference"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,82,204,0.22)] transition hover:bg-[var(--brand-dark)]"
            >
              Explore Each Use Case
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <a
              href="#use-cases"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Review Demo Layout
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/60 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-sm font-semibold text-[var(--brand)]">
                QR
              </div>
              <p className="text-sm font-semibold text-slate-900">Five live-ready demo flows</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Each route already has the screen layout and placeholder QR stage.
              </p>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-sm font-semibold text-[var(--brand)]">
                FM
              </div>
              <p className="text-sm font-semibold text-slate-900">Maps to product surfaces</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Booking confirmation, reminders, transfers, and referral share cards.
              </p>
            </div>
            <div className="rounded-3xl border border-white/60 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-sm font-semibold text-[var(--brand)]">
                DL
              </div>
              <p className="text-sm font-semibold text-slate-900">Ready for QR code wiring</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                You can drop the generate and download logic into stable UI slots.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
                FlightsMojo App Surface
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                QR touchpoints across the journey
              </h2>
            </div>
            <div className="rounded-full bg-[rgba(0,82,204,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
              Demo
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {useCases.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-3xl border border-slate-200 bg-slate-50/80 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
              >
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.tagline}</p>
                <div className="mt-4 flex items-center justify-between text-sm font-medium text-[var(--brand)]">
                  <span>{item.badge}</span>
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">
                    -&gt;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="use-cases"
        className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <UseCaseBadge>Use Cases</UseCaseBadge>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Every demo page is laid out and linked
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            The structure is in place now. The next step is to connect your QR
            rendering code and any export behavior into the reserved preview areas.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.href}
              className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {item.badge}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"
              >
                Open route
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_24px_80px_rgba(2,8,23,0.28)]">
          <UseCaseBadge className="border-white/15 bg-white/10 text-white">
            Suggested Walkthrough
          </UseCaseBadge>
          <ol className="mt-6 space-y-4">
            {ceoFlow.map((step, index) => (
              <li key={step} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-slate-300">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[rgba(0,82,204,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
              Build
            </div>
            <h2 className="text-2xl font-semibold text-slate-950">What this layout already covers</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900">Navigation and route structure</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Home plus dedicated pages for booking, itinerary, check-in, cab transfer, and referral.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900">Form-first demo composition</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Inputs are already staged with sensible defaults so each route reads like a product demo.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900">App-style preview mockups</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Each page includes a branded HTML mock showing where the QR lives inside the user journey.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900">Reserved QR slot</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A placeholder panel is waiting for your QR component and future PNG export hook.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
