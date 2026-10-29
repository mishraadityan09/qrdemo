import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone, Save, Share2 } from "lucide-react";
import {
  buildInstagramUrl,
  buildWhatsAppUrl,
  contactTemplateMeta,
  decodeContactPayload,
  getInitials,
  getPrimaryContactAction,
  normalizeWebsite,
} from "@/lib/contact-cards";

type ContactCardPageProps = {
  params: Promise<{
    template: string;
  }>;
  searchParams: Promise<{
    data?: string;
  }>;
};

const themeMap = {
  person: {
    glow: "from-lime-100 via-white to-white",
    badge: "bg-lime-50 text-lime-800 border-lime-200",
    accent: "bg-[linear-gradient(135deg,#54753f,#89a668)]",
    surface: "bg-white",
  },
  business: {
    glow: "from-emerald-100 via-white to-white",
    badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "bg-[linear-gradient(135deg,#28584b,#4d8d76)]",
    surface: "bg-white",
  },
  creator: {
    glow: "from-amber-100 via-white to-white",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "bg-[linear-gradient(135deg,#7a5a22,#c18c3a)]",
    surface: "bg-white",
  },
} as const;

export default async function ContactCardPage({ params, searchParams }: ContactCardPageProps) {
  const { template } = await params;
  const { data } = await searchParams;
  const payload = decodeContactPayload(data, template);

  if (!payload) {
    notFound();
  }

  const theme = themeMap[payload.template];
  const meta = contactTemplateMeta[payload.template];
  const primaryAction = getPrimaryContactAction(payload);
  const website = normalizeWebsite(payload.website);
  const instagramUrl = buildInstagramUrl(payload.instagram);
  const whatsappUrl = buildWhatsAppUrl(payload.whatsapp);
  const saveHref = `/contact-card/${payload.template}/save?data=${encodeURIComponent(
    JSON.stringify(payload),
  )}`;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-5xl flex-col justify-center py-5 sm:py-10">
      <section
        className={`rounded-[2rem] border border-[var(--border)] bg-gradient-to-b ${theme.glow} p-4 shadow-[0_28px_90px_rgba(15,23,42,0.08)] sm:p-6 lg:p-8`}
      >
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div
            className={`rounded-[1.8rem] ${theme.accent} p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.15)] sm:p-6`}
          >
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${theme.badge}`}>
                {meta.pageLabel}
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                PlainQR
              </span>
            </div>

            <div className="mt-8 flex items-center gap-4 sm:mt-10">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.35rem] bg-white/15 text-xl font-semibold text-white backdrop-blur sm:h-[4.5rem] sm:w-[4.5rem] sm:rounded-[1.7rem] sm:text-2xl">
                {getInitials(payload.name)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                  {meta.eyebrow}
                </p>
                <h1 className="mt-2 text-balance font-display text-[2rem] leading-[0.95] tracking-[-0.05em] text-white sm:text-4xl">
                  {payload.name}
                </h1>
                <p className="mt-2 text-sm text-white/80 sm:text-base">{payload.title}</p>
              </div>
            </div>

            {payload.tagline ? (
              <p className="mt-7 max-w-xl text-pretty text-sm leading-7 text-white/85 sm:mt-8 sm:text-base sm:leading-8">
                {payload.tagline}
              </p>
            ) : null}

            {payload.address ? (
              <div className="mt-8 flex items-start gap-3 rounded-[1.4rem] bg-white/10 p-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-white/85" />
                <p className="text-sm leading-7 text-white/85">{payload.address}</p>
              </div>
            ) : null}
          </div>

          <div className={`rounded-[1.8rem] border border-[var(--border)] ${theme.surface} p-5 sm:p-6`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
                  After Scan
                </p>
                <h2 className="mt-3 font-display text-[1.8rem] leading-[0.96] tracking-[-0.05em] text-slate-950 sm:text-3xl">
                  One clear action, then the rest.
                </h2>
              </div>
              <Share2 className="h-5 w-5 text-slate-400" />
            </div>

            <a
              href={primaryAction.href}
              className="mt-8 inline-flex w-full items-center justify-center rounded-[1.3rem] bg-slate-950 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800"
            >
              {primaryAction.label}
            </a>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {payload.phone ? (
                <a
                  href={`tel:${payload.phone}`}
                  className="inline-flex items-center gap-3 rounded-[1.2rem] border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 break-words"
                >
                  <Phone className="h-4 w-4" />
                  {payload.phone}
                </a>
              ) : null}
              {payload.email ? (
                <a
                  href={`mailto:${payload.email}`}
                  className="inline-flex items-center gap-3 rounded-[1.2rem] border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 break-all"
                >
                  <Mail className="h-4 w-4" />
                  {payload.email}
                </a>
              ) : null}
              {website ? (
                <a
                  href={website}
                  className="inline-flex items-center gap-3 rounded-[1.2rem] border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  <Share2 className="h-4 w-4" />
                  Open website
                </a>
              ) : null}
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  className="inline-flex items-center gap-3 rounded-[1.2rem] border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  <Share2 className="h-4 w-4" />
                  Instagram
                </a>
              ) : null}
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  className="inline-flex items-center gap-3 rounded-[1.2rem] border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  <Share2 className="h-4 w-4" />
                  WhatsApp
                </a>
              ) : null}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff,#f7f9f4)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Save contact
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Keep this profile lightweight on screen, then save the contact file if you want it in
                your phone book.
              </p>
              <a
                href={saveHref}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Save className="h-4 w-4" />
                Save Contact
              </a>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              <Link href="/" className="font-medium text-[var(--brand)] transition hover:text-[var(--brand-strong)]">
                Create your own PlainQR card
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
