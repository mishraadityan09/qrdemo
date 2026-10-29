import Link from "next/link";
import { ArrowRight, Download, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { QrGenerator } from "@/components/qr-generator";
import { SectionBadge } from "@/components/section-badge";
import type { QrTypeSlug } from "@/lib/qr-types";
import { siteConfig } from "@/lib/site";

const trustPoints = [
  "No sign-up for the first download",
  "PNG and SVG exports ready for print",
  "Designed for phone screens and full desktops",
];

const useCases = [
  {
    title: "Small business",
    description: "Share menus, reviews, WhatsApp contact, and payment links without explaining anything at the counter.",
  },
  {
    title: "Home and hospitality",
    description: "Let guests join Wi-Fi instantly and open house rules, check-in guides, or welcome links from one scan.",
  },
  {
    title: "Freelance and creator work",
    description: "Turn a portfolio, resume, contact card, or booking link into something you can print or pin anywhere.",
  },
  {
    title: "Events and local communities",
    description: "Make registration, maps, group chats, schedules, and information pages easier to access on the spot.",
  },
];

const faqItems = [
  {
    question: "Who is this built for?",
    answer:
      "Anyone who needs a QR code quickly, from students and freelancers to cafes, pop-up sellers, event hosts, and local shops.",
  },
  {
    question: "Do users need an account?",
    answer:
      "No. The first version is anonymous-first, so people can create and download QR codes without signup friction.",
  },
  {
    question: "What makes this different from a generic QR tool?",
    answer:
      "The experience is guided around real tasks, not raw technical fields. Users get clearer choices, better defaults, and cleaner exports.",
  },
];

type LandingPageProps = {
  initialTypeSlug: QrTypeSlug;
};

export function LandingPage({ initialTypeSlug }: LandingPageProps) {
  return (
    <div className="flex flex-1 flex-col gap-12 py-6 sm:gap-16 sm:py-10 lg:gap-24 lg:py-12">
      <section className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-10">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-5">
            <SectionBadge>Minimal QR Generator</SectionBadge>
            <h1 className="max-w-4xl text-balance font-display text-[2.8rem] leading-[0.95] tracking-[-0.065em] text-slate-950 sm:text-6xl lg:text-7xl">
              Create the right QR code in seconds.
            </h1>
            <p className="max-w-2xl text-pretty text-[0.96rem] leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {siteConfig.description} Pick a type, fill a few fields, preview it instantly, and
              download a clean asset that works on paper, packaging, or screens.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#generator"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.14)] transition hover:bg-[var(--brand-strong)]"
            >
              Start Creating
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#templates"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
            >
              See Everyday Uses
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {trustPoints.map((item) => (
              <div
                key={item}
                className="soft-rise rounded-[1.5rem] border border-[var(--border)] bg-white/82 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
              >
                <p className="text-sm font-semibold leading-6 text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden soft-rise rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,247,241,0.88))] p-5 shadow-[0_28px_80px_rgba(15,23,42,0.10)] sm:p-6 lg:block">
          <div className="rounded-[1.6rem] border border-white/80 bg-[linear-gradient(180deg,#fffef9,#f5f8f1)] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">
                  Why It Works
                </p>
                <h2 className="mt-3 font-display text-3xl tracking-[-0.05em] text-slate-950">
                  One clean flow, built for any age.
                </h2>
              </div>
              <div className="hidden rounded-full border border-[var(--border)] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 sm:block">
                Utility first
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/92 p-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-[var(--brand-soft)] p-3 text-[var(--brand)]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Simple enough to understand at a glance</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Only the fields you need are shown. Everything else stays out of the way.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/92 p-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-[var(--brand-soft)] p-3 text-[var(--brand)]">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">Download-ready for print or screen</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Export PNG for quick sharing or SVG for sharper print output and branding later.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/92 p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-[var(--brand-soft)] p-3 text-[var(--brand)]">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">Mobile-first</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        The main task stays comfortable on a phone without hiding desktop polish.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/92 p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-[var(--brand-soft)] p-3 text-[var(--brand)]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">No account wall</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        People can arrive, create, download, and leave without friction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QrGenerator initialTypeSlug={initialTypeSlug} />

      <section
        id="templates"
        className="soft-rise rounded-[2rem] border border-[var(--border)] bg-white/84 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionBadge>Everyday Uses</SectionBadge>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl tracking-[-0.05em] text-slate-950">
              Useful for real people, not just tech-heavy workflows.
            </h2>
          </div>
          <p className="max-w-xl text-pretty text-sm leading-7 text-slate-600 sm:text-base">
            The first release focuses on the tasks people already do every week: sharing links,
            joining Wi-Fi, saving contacts, starting chats, and handing off information quickly.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.7rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff,#f7f9f4)] p-5"
            >
              <h3 className="font-display text-2xl tracking-[-0.04em] text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="soft-rise rounded-[2rem] border border-[var(--border)] bg-slate-950 p-7 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
          <SectionBadge className="border-white/10 bg-white/8 text-white">How It Feels</SectionBadge>
          <h2 className="mt-5 max-w-md text-balance font-display text-4xl tracking-[-0.05em] text-white">
            Minimal by default, helpful when you need it.
          </h2>
          <ol className="mt-8 grid gap-4">
            {[
              "Choose a QR type from the most-used tasks first.",
              "Fill a short form with obvious labels and clear examples.",
              "See the code update immediately as you type.",
              "Download PNG or SVG once the payload is ready.",
            ].map((step, index) => (
              <li key={step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-slate-300">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div
          id="faq"
          className="soft-rise rounded-[2rem] border border-[var(--border)] bg-white/84 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8"
        >
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl tracking-[-0.05em] text-slate-950">
            Clear enough for first-time users, solid enough to keep.
          </h2>
          <div className="mt-8 grid gap-4">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.5rem] border border-[var(--border)] bg-white/90 p-5"
              >
                <h3 className="text-base font-semibold text-slate-950">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
