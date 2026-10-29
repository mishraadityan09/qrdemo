import { siteConfig } from "@/lib/site";

export type ContactTemplate = "person" | "business" | "creator";

export type ContactCardPayload = {
  template: ContactTemplate;
  name: string;
  title: string;
  phone?: string;
  email?: string;
  website?: string;
  tagline?: string;
  address?: string;
  instagram?: string;
  whatsapp?: string;
};

export type ContactAction = {
  label: string;
  href: string;
};

export const contactTemplateOptions = [
  { label: "Person", value: "person" },
  { label: "Business", value: "business" },
  { label: "Creator", value: "creator" },
] as const;

export const contactTemplateMeta: Record<
  ContactTemplate,
  {
    label: string;
    shortLabel: string;
    eyebrow: string;
    pageLabel: string;
    primaryFallback: string;
  }
> = {
  person: {
    label: "Person",
    shortLabel: "Personal profile",
    eyebrow: "Personal contact",
    pageLabel: "Personal card",
    primaryFallback: "Call now",
  },
  business: {
    label: "Business",
    shortLabel: "Business card",
    eyebrow: "Business contact",
    pageLabel: "Business profile",
    primaryFallback: "Contact business",
  },
  creator: {
    label: "Creator",
    shortLabel: "Creator page",
    eyebrow: "Creator profile",
    pageLabel: "Creator page",
    primaryFallback: "Open profile",
  },
};

function compactString(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function normalizePhoneNumber(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  const hasPlusPrefix = trimmed.startsWith("+");
  const numbersOnly = trimmed.replace(/[^\d]/g, "");
  if (!numbersOnly) {
    return "";
  }
  return `${hasPlusPrefix ? "+" : ""}${numbersOnly}`;
}

export function normalizeWebsite(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return "";
  }
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function normalizeInstagram(value: string | undefined) {
  const trimmed = value?.trim().replace(/^@+/, "") ?? "";
  return trimmed;
}

export function buildInstagramUrl(handle: string | undefined) {
  const normalized = normalizeInstagram(handle);
  return normalized ? `https://instagram.com/${encodeURIComponent(normalized)}` : "";
}

export function buildWhatsAppUrl(value: string | undefined) {
  const phone = normalizePhoneNumber(value).replace(/^\+/, "");
  return phone ? `https://wa.me/${phone}` : "";
}

export function buildContactPayload(input: ContactCardPayload): ContactCardPayload {
  return {
    template: input.template,
    name: input.name.trim(),
    title: input.title.trim(),
    phone: compactString(normalizePhoneNumber(input.phone)),
    email: compactString(input.email),
    website: compactString(normalizeWebsite(input.website)),
    tagline: compactString(input.tagline),
    address: compactString(input.address),
    instagram: compactString(normalizeInstagram(input.instagram)),
    whatsapp: compactString(normalizePhoneNumber(input.whatsapp)),
  };
}

export function encodeContactPayload(payload: ContactCardPayload) {
  return new URLSearchParams({
    data: JSON.stringify(buildContactPayload(payload)),
  }).toString();
}

export function decodeContactPayload(raw: string | undefined, expectedTemplate?: string) {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ContactCardPayload>;

    if (
      parsed.template !== "person" &&
      parsed.template !== "business" &&
      parsed.template !== "creator"
    ) {
      return null;
    }

    if (expectedTemplate && parsed.template !== expectedTemplate) {
      return null;
    }

    if (typeof parsed.name !== "string" || typeof parsed.title !== "string") {
      return null;
    }

    return buildContactPayload({
      template: parsed.template,
      name: parsed.name,
      title: parsed.title,
      phone: parsed.phone,
      email: parsed.email,
      website: parsed.website,
      tagline: parsed.tagline,
      address: parsed.address,
      instagram: parsed.instagram,
      whatsapp: parsed.whatsapp,
    });
  } catch {
    return null;
  }
}

export function buildContactLandingPath(payload: ContactCardPayload) {
  return `/contact-card/${payload.template}?${encodeContactPayload(payload)}`;
}

export function buildContactLandingUrl(payload: ContactCardPayload) {
  return `${siteConfig.url}${buildContactLandingPath(payload)}`;
}

export function getInitials(name: string) {
  const segments = name
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);

  if (segments.length === 0) {
    return "PQ";
  }

  return segments.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function getContactActions(payload: ContactCardPayload) {
  const actions: ContactAction[] = [];

  const phone = normalizePhoneNumber(payload.phone);
  const email = payload.email?.trim() ?? "";
  const website = normalizeWebsite(payload.website);
  const instagramUrl = buildInstagramUrl(payload.instagram);
  const whatsappUrl = buildWhatsAppUrl(payload.whatsapp);

  if (payload.template === "person") {
    if (phone) actions.push({ label: "Call", href: `tel:${phone}` });
    if (email) actions.push({ label: "Email", href: `mailto:${email}` });
    if (website) actions.push({ label: "Website", href: website });
  }

  if (payload.template === "business") {
    if (phone) actions.push({ label: "Call business", href: `tel:${phone}` });
    if (website) actions.push({ label: "Visit site", href: website });
    if (email) actions.push({ label: "Email team", href: `mailto:${email}` });
    if (whatsappUrl) actions.push({ label: "WhatsApp", href: whatsappUrl });
  }

  if (payload.template === "creator") {
    if (website) actions.push({ label: "Open profile", href: website });
    if (instagramUrl) actions.push({ label: "Instagram", href: instagramUrl });
    if (email) actions.push({ label: "Email", href: `mailto:${email}` });
    if (phone) actions.push({ label: "Call", href: `tel:${phone}` });
  }

  return actions;
}

export function getPrimaryContactAction(payload: ContactCardPayload) {
  const [primary] = getContactActions(payload);

  if (primary) {
    return primary;
  }

  return {
    label: contactTemplateMeta[payload.template].primaryFallback,
    href: "#",
  };
}

export function buildVCard(payload: ContactCardPayload) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${payload.name}`,
    payload.title ? `TITLE:${payload.title}` : "",
    payload.phone ? `TEL;TYPE=CELL:${payload.phone}` : "",
    payload.email ? `EMAIL:${payload.email}` : "",
    payload.website ? `URL:${payload.website}` : "",
    payload.address ? `ADR:;;${payload.address}` : "",
    payload.tagline ? `NOTE:${payload.tagline}` : "",
    "END:VCARD",
  ].filter(Boolean);

  return lines.join("\n");
}
