import type { HTMLAttributes } from "react";
import {
  buildContactLandingPath,
  buildContactLandingUrl,
  buildContactPayload,
  buildInstagramUrl,
  buildVCard,
  buildWhatsAppUrl,
  contactTemplateMeta,
  contactTemplateOptions,
  getInitials,
  getPrimaryContactAction,
  normalizePhoneNumber,
  normalizeWebsite,
  type ContactTemplate,
} from "@/lib/contact-cards";

export type QrTypeSlug =
  | "url"
  | "wifi"
  | "contact"
  | "whatsapp"
  | "email"
  | "phone"
  | "text"
  | "sms"
  | "location"
  | "file";

export const DEFAULT_QR_TYPE: QrTypeSlug = "url";

export type QrFieldDefinition = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "email" | "tel" | "password" | "select" | "switch";
  placeholder?: string;
  helper?: string;
  required?: boolean;
  rows?: number;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  defaultValue: string | boolean;
  options?: ReadonlyArray<{
    label: string;
    value: string;
    description?: string;
  }>;
  showWhen?: (state: QrFormState) => boolean;
};

export type QrFormValue = string | boolean;
export type QrFormState = Record<string, QrFormValue>;
export type QrFormErrors = Record<string, string>;

export type QrPreviewDetail = {
  label: string;
  value: string;
};

export type ContactPreviewSurface = {
  kind: "contact";
  template: ContactTemplate;
  eyebrow: string;
  title: string;
  subtitle: string;
  description?: string;
  avatarLabel: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  footerLabel: string;
  landingPath: string;
  landingChips: string[];
};

export type QrBuildResult = {
  value: string;
  summary: string;
  details: QrPreviewDetail[];
  downloadStem: string;
  outputMode?: "raw" | "landing-page";
  pngExportMode?: "qr" | "capture";
  pngLabel?: string;
  previewSurface?: ContactPreviewSurface;
};

export type QrTypeDefinition = {
  slug: QrTypeSlug;
  name: string;
  shortDescription: string;
  description: string;
  previewBadge: string;
  emptyState: string;
  featured: boolean;
  examples: readonly string[];
  fields: readonly QrFieldDefinition[];
  outputMode: "raw" | "landing-page";
  validate?: (state: QrFormState) => QrFormErrors;
  build: (state: QrFormState) => QrBuildResult;
};

function getString(state: QrFormState, key: string) {
  const value = state[key];
  return typeof value === "string" ? value.trim() : "";
}

function getBoolean(state: QrFormState, key: string) {
  return Boolean(state[key]);
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function safeUrlHost(value: string) {
  try {
    return new URL(normalizeUrl(value)).hostname.replace(/^www\./, "");
  } catch {
    return "Waiting for a valid link";
  }
}

function sanitizePhoneNumber(value: string) {
  return normalizePhoneNumber(value);
}

function makeDownloadStem(prefix: string, value: string) {
  const fragment = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);

  return fragment ? `plainqr-${prefix}-${fragment}` : `plainqr-${prefix}`;
}

function isValidUrl(value: string) {
  try {
    const url = new URL(normalizeUrl(value));
    return Boolean(url.hostname);
  } catch {
    return false;
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function escapeWifiValue(value: string) {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

function buildMailtoLink(email: string, subject: string, body: string) {
  const params = new URLSearchParams();

  if (subject.trim()) {
    params.set("subject", subject.trim());
  }

  if (body.trim()) {
    params.set("body", body.trim());
  }

  const query = params.toString();
  return `mailto:${email.trim()}${query ? `?${query}` : ""}`;
}

function isContactTemplate(state: QrFormState, template: ContactTemplate) {
  return getString(state, "template") === template;
}

function buildContactResult(state: QrFormState) {
  const template = (getString(state, "template") || "person") as ContactTemplate;
  const payload = buildContactPayload({
    template,
    name: getString(state, "name"),
    title: getString(state, "title"),
    phone: getString(state, "phone"),
    email: getString(state, "email"),
    website: getString(state, "website"),
    tagline: getString(state, "tagline"),
    address: getString(state, "address"),
    instagram: getString(state, "instagram"),
    whatsapp: getString(state, "whatsapp"),
  });
  const primaryAction = getPrimaryContactAction(payload);
  const meta = contactTemplateMeta[template];
  const landingPath = buildContactLandingPath(payload);
  const contactUrl = buildContactLandingUrl(payload);

  return {
    value: contactUrl,
    summary: `Open a branded ${meta.shortLabel.toLowerCase()} with quick actions and a save-contact button.`,
    details: [
      { label: "Template", value: meta.label },
      { label: "Primary action", value: primaryAction.label },
      { label: "Scan target", value: "Branded contact page" },
      { label: "Save contact", value: "Available on landing page" },
    ],
    downloadStem: makeDownloadStem(`contact-${template}`, payload.name),
    outputMode: "landing-page" as const,
    pngExportMode: "capture" as const,
    pngLabel: "Download card PNG",
    previewSurface: {
      kind: "contact" as const,
      template,
      eyebrow: meta.eyebrow,
      title: payload.name || "Your name",
      subtitle: payload.title || "Add a role or category",
      description: payload.tagline || payload.address || payload.email || payload.website || "",
      avatarLabel: getInitials(payload.name || "Plain QR"),
      primaryActionLabel: primaryAction.label,
      secondaryActionLabel: "Save contact",
      footerLabel: meta.pageLabel,
      landingPath,
      landingChips: [
        payload.phone ? "Call" : "",
        payload.email ? "Email" : "",
        payload.website ? "Website" : "",
        payload.instagram ? "Instagram" : "",
        payload.whatsapp ? "WhatsApp" : "",
      ].filter(Boolean),
    },
  };
}

export const qrTypes = [
  {
    slug: "url",
    name: "Website Link",
    shortDescription: "Send people to any page, form, or product instantly.",
    description: "Perfect for websites, portfolios, forms, landing pages, menus, and quick campaigns.",
    previewBadge: "Universal",
    emptyState: "Add a valid URL to create a scannable website QR code.",
    featured: true,
    outputMode: "raw",
    examples: ["Portfolios", "Google Forms", "Shop links"],
    fields: [
      {
        key: "url",
        label: "Destination URL",
        type: "url",
        placeholder: "plainqr.app/welcome",
        helper: "Required",
        required: true,
        autoComplete: "url",
        defaultValue: "plainqr.app/welcome",
      },
      {
        key: "label",
        label: "Label",
        type: "text",
        placeholder: "Campaign page",
        helper: "Optional",
        defaultValue: "Welcome page",
      },
    ],
    validate: (state) => {
      const errors: QrFormErrors = {};
      const url = getString(state, "url");

      if (url && !isValidUrl(url)) {
        errors.url = "Enter a valid URL, like example.com or https://example.com.";
      }

      return errors;
    },
    build: (state) => {
      const url = normalizeUrl(getString(state, "url"));
      const label = getString(state, "label") || "Shared link";

      return {
        value: url,
        summary: `Open ${label.toLowerCase()} without typing the full address.`,
        details: [
          { label: "Label", value: label },
          { label: "Domain", value: safeUrlHost(url) },
        ],
        downloadStem: makeDownloadStem("url", label || safeUrlHost(url)),
      };
    },
  },
  {
    slug: "wifi",
    name: "Wi-Fi Access",
    shortDescription: "Let guests join a network without spelling the password.",
    description: "Useful for homes, cafes, offices, guest houses, studios, and event spaces.",
    previewBadge: "Tap to join",
    emptyState: "Add the network name and password to generate the Wi-Fi QR code.",
    featured: true,
    outputMode: "raw",
    examples: ["Guest Wi-Fi", "Cafe counter", "Airbnb welcome card"],
    fields: [
      {
        key: "ssid",
        label: "Network name",
        type: "text",
        placeholder: "Studio Guest Wi-Fi",
        helper: "Required",
        required: true,
        autoComplete: "off",
        defaultValue: "Studio Guest Wi-Fi",
      },
      {
        key: "password",
        label: "Password",
        type: "password",
        placeholder: "summercoffeebar",
        helper: "Required unless open",
        autoComplete: "off",
        defaultValue: "summercoffeebar",
      },
      {
        key: "encryption",
        label: "Security",
        type: "select",
        defaultValue: "WPA",
        options: [
          { label: "WPA / WPA2", value: "WPA" },
          { label: "WEP", value: "WEP" },
          { label: "Open network", value: "nopass" },
        ],
      },
      {
        key: "hidden",
        label: "Hidden network",
        type: "switch",
        placeholder: "Mark this if the network is hidden",
        defaultValue: false,
        options: [
          {
            label: "Hidden",
            value: "true",
            description: "Use this only if the Wi-Fi name is hidden from normal lists.",
          },
        ],
      },
    ],
    validate: (state) => {
      const errors: QrFormErrors = {};

      if (getString(state, "encryption") !== "nopass" && !getString(state, "password")) {
        errors.password = "Add the Wi-Fi password or change security to Open network.";
      }

      return errors;
    },
    build: (state) => {
      const ssid = getString(state, "ssid");
      const password = getString(state, "password");
      const encryption = getString(state, "encryption") || "WPA";
      const hidden = getBoolean(state, "hidden");

      return {
        value: `WIFI:T:${encryption};S:${escapeWifiValue(ssid)};P:${escapeWifiValue(password)};H:${hidden ? "true" : "false"};;`,
        summary: `Join ${ssid || "this network"} instantly from a single scan.`,
        details: [
          { label: "Network", value: ssid || "Pending network" },
          { label: "Security", value: encryption === "nopass" ? "Open" : encryption },
          { label: "Hidden", value: hidden ? "Yes" : "No" },
        ],
        downloadStem: makeDownloadStem("wifi", ssid),
      };
    },
  },
  {
    slug: "contact",
    name: "Contact Card",
    shortDescription: "Build a polished contact card for person, business, or creator sharing.",
    description: "Create a branded contact page with quick actions and a save-contact flow while keeping privacy under your control.",
    previewBadge: "Profile link",
    emptyState: "Add a name, title, and one usable contact method to generate the contact card.",
    featured: true,
    outputMode: "landing-page",
    examples: ["Person", "Business", "Creator"],
    fields: [
      {
        key: "template",
        label: "Contact template",
        type: "select",
        helper: "Required",
        required: true,
        defaultValue: "person",
        options: contactTemplateOptions,
      },
      {
        key: "name",
        label: "Name or brand",
        type: "text",
        placeholder: "Anika Shah",
        helper: "Required",
        required: true,
        autoComplete: "name",
        defaultValue: "Anika Shah",
      },
      {
        key: "title",
        label: "Role, category, or creator title",
        type: "text",
        placeholder: "Studio founder",
        helper: "Required",
        required: true,
        defaultValue: "Studio founder",
      },
      {
        key: "phone",
        label: "Phone number",
        type: "tel",
        placeholder: "+91 98765 43210",
        helper: "Optional",
        inputMode: "tel",
        autoComplete: "tel",
        defaultValue: "+91 98765 43210",
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        placeholder: "hello@plainqr.app",
        helper: "Optional",
        autoComplete: "email",
        defaultValue: "hello@plainqr.app",
      },
      {
        key: "website",
        label: "Website or primary link",
        type: "url",
        placeholder: "plainqr.app/contact",
        helper: "Optional",
        autoComplete: "url",
        defaultValue: "plainqr.app/contact",
      },
      {
        key: "tagline",
        label: "Short descriptor",
        type: "text",
        placeholder: "Open to collaborations and new projects",
        helper: "Optional",
        defaultValue: "Open to collaborations and new projects",
        showWhen: (state) => isContactTemplate(state, "person") || isContactTemplate(state, "creator"),
      },
      {
        key: "address",
        label: "Address",
        type: "textarea",
        placeholder: "21 Park Street, Bengaluru",
        helper: "Optional",
        rows: 4,
        defaultValue: "21 Park Street, Bengaluru",
        showWhen: (state) => isContactTemplate(state, "business"),
      },
      {
        key: "instagram",
        label: "Instagram handle",
        type: "text",
        placeholder: "@plainqr",
        helper: "Optional",
        defaultValue: "@plainqr",
        showWhen: (state) => isContactTemplate(state, "creator"),
      },
      {
        key: "whatsapp",
        label: "WhatsApp number",
        type: "tel",
        placeholder: "+91 91234 56789",
        helper: "Optional",
        inputMode: "tel",
        autoComplete: "tel",
        defaultValue: "+91 91234 56789",
        showWhen: (state) => isContactTemplate(state, "business") || isContactTemplate(state, "creator"),
      },
    ],
    validate: (state) => {
      const errors: QrFormErrors = {};
      const template = (getString(state, "template") || "person") as ContactTemplate;
      const email = getString(state, "email");
      const website = getString(state, "website");
      const phone = getString(state, "phone");
      const instagram = getString(state, "instagram");
      const whatsapp = getString(state, "whatsapp");

      if (!phone && !email && !website && !instagram && !whatsapp) {
        errors.phone = "Add at least one call, email, website, Instagram, or WhatsApp action.";
      }

      if (email && !isValidEmail(email)) {
        errors.email = "Enter a valid email address.";
      }

      if (website && !isValidUrl(website)) {
        errors.website = "Enter a valid website address.";
      }

      if (template === "creator" && !website && !instagram && !email && !phone) {
        errors.website = "Creator cards should include a profile link, Instagram, email, or phone.";
      }

      return errors;
    },
    build: (state) => buildContactResult(state),
  },
  {
    slug: "whatsapp",
    name: "WhatsApp Chat",
    shortDescription: "Start a message thread without saving a number first.",
    description: "Useful for support counters, local services, posters, packaging, and direct contact prompts.",
    previewBadge: "Chat start",
    emptyState: "Add a phone number to create the WhatsApp QR code.",
    featured: true,
    outputMode: "raw",
    examples: ["Customer support", "Service bookings", "Poster call-to-action"],
    fields: [
      {
        key: "phone",
        label: "WhatsApp number",
        type: "tel",
        placeholder: "+91 91234 56789",
        helper: "Required",
        required: true,
        inputMode: "tel",
        autoComplete: "tel",
        defaultValue: "+91 91234 56789",
      },
      {
        key: "message",
        label: "Prefilled message",
        type: "textarea",
        placeholder: "Hi, I found your QR code and want to know more.",
        rows: 4,
        defaultValue: "Hi, I found your QR code and want to know more.",
      },
    ],
    build: (state) => {
      const phone = sanitizePhoneNumber(getString(state, "phone")).replace(/^\+/, "");
      const message = getString(state, "message");
      const search = message ? `?text=${encodeURIComponent(message)}` : "";

      return {
        value: `https://wa.me/${phone}${search}`,
        summary: "Open a WhatsApp chat with the number and message already filled in.",
        details: [
          { label: "Number", value: phone ? `+${phone}` : "Pending number" },
          { label: "Message", value: message || "No prefilled message" },
        ],
        downloadStem: makeDownloadStem("whatsapp", phone),
      };
    },
  },
  {
    slug: "email",
    name: "Email Draft",
    shortDescription: "Open a pre-addressed email with subject and body ready.",
    description: "Great for support desks, sales inquiries, RSVPs, feedback requests, and follow-up campaigns.",
    previewBadge: "Mailto",
    emptyState: "Add a valid email address to create the email QR code.",
    featured: true,
    outputMode: "raw",
    examples: ["Feedback requests", "Sales inquiries", "Event RSVPs"],
    fields: [
      {
        key: "email",
        label: "Recipient email",
        type: "email",
        placeholder: "hello@example.com",
        helper: "Required",
        required: true,
        autoComplete: "email",
        defaultValue: "hello@example.com",
      },
      {
        key: "subject",
        label: "Subject",
        type: "text",
        placeholder: "Project enquiry",
        defaultValue: "Project enquiry",
      },
      {
        key: "body",
        label: "Message",
        type: "textarea",
        placeholder: "Hi, I am reaching out after scanning your QR code.",
        rows: 5,
        defaultValue: "Hi, I am reaching out after scanning your QR code.",
      },
    ],
    validate: (state) => {
      const errors: QrFormErrors = {};
      const email = getString(state, "email");

      if (email && !isValidEmail(email)) {
        errors.email = "Enter a valid email address.";
      }

      return errors;
    },
    build: (state) => {
      const email = getString(state, "email");
      const subject = getString(state, "subject");
      const body = getString(state, "body");

      return {
        value: buildMailtoLink(email, subject, body),
        summary: "Open an email draft with the recipient and message already prepared.",
        details: [
          { label: "Recipient", value: email || "Pending recipient" },
          { label: "Subject", value: subject || "No subject" },
        ],
        downloadStem: makeDownloadStem("email", email),
      };
    },
  },
  {
    slug: "phone",
    name: "Phone Call",
    shortDescription: "Start a call immediately after scanning.",
    description: "Useful for helplines, service numbers, reception desks, and quick contact points.",
    previewBadge: "Tap to call",
    emptyState: "Add a phone number to create the call QR code.",
    featured: false,
    outputMode: "raw",
    examples: ["Help lines", "Bookings", "Front desk"],
    fields: [
      {
        key: "phone",
        label: "Phone number",
        type: "tel",
        placeholder: "+91 99887 77665",
        helper: "Required",
        required: true,
        inputMode: "tel",
        autoComplete: "tel",
        defaultValue: "+91 99887 77665",
      },
      {
        key: "label",
        label: "Call label",
        type: "text",
        placeholder: "Studio help desk",
        defaultValue: "Studio help desk",
      },
    ],
    build: (state) => {
      const phone = sanitizePhoneNumber(getString(state, "phone"));
      const label = getString(state, "label") || "Direct call";

      return {
        value: `tel:${phone}`,
        summary: `Start a phone call to ${label.toLowerCase()} from a single scan.`,
        details: [
          { label: "Number", value: phone || "Pending number" },
          { label: "Label", value: label },
        ],
        downloadStem: makeDownloadStem("phone", label),
      };
    },
  },
  {
    slug: "text",
    name: "Plain Text",
    shortDescription: "Share a note, instruction, or short message as-is.",
    description: "Useful for short directions, welcome notes, product setup steps, table numbers, or printed instructions.",
    previewBadge: "Text",
    emptyState: "Add some text to create the QR code.",
    featured: false,
    outputMode: "raw",
    examples: ["Printed notes", "Instructions", "Short announcements"],
    fields: [
      {
        key: "text",
        label: "Text content",
        type: "textarea",
        placeholder: "Welcome. Please pick up your order at counter three.",
        helper: "Required",
        required: true,
        rows: 6,
        defaultValue: "Welcome. Please pick up your order at counter three.",
      },
    ],
    build: (state) => {
      const text = getString(state, "text");

      return {
        value: text,
        summary: "Show a plain text message when the QR code is scanned.",
        details: [
          { label: "Length", value: text ? `${text.length} characters` : "No text yet" },
          { label: "Preview", value: text.slice(0, 42) || "Nothing added yet" },
        ],
        downloadStem: makeDownloadStem("text", text.slice(0, 20)),
      };
    },
  },
  {
    slug: "sms",
    name: "SMS Message",
    shortDescription: "Open a text message draft with the number and note filled in.",
    description: "Useful for local businesses, community groups, quick support requests, and old-school direct response flows.",
    previewBadge: "SMS",
    emptyState: "Add a phone number to create the SMS QR code.",
    featured: false,
    outputMode: "raw",
    examples: ["Quick enquiries", "Text RSVP", "Support prompts"],
    fields: [
      {
        key: "phone",
        label: "Phone number",
        type: "tel",
        placeholder: "+91 93456 78210",
        helper: "Required",
        required: true,
        inputMode: "tel",
        autoComplete: "tel",
        defaultValue: "+91 93456 78210",
      },
      {
        key: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Hi, I want to reserve two seats for tonight.",
        rows: 4,
        defaultValue: "Hi, I want to reserve two seats for tonight.",
      },
    ],
    build: (state) => {
      const phone = sanitizePhoneNumber(getString(state, "phone"));
      const message = getString(state, "message");

      return {
        value: `SMSTO:${phone}:${message}`,
        summary: "Open a text message draft with the number already in place.",
        details: [
          { label: "Number", value: phone || "Pending number" },
          { label: "Message", value: message || "No prefilled message" },
        ],
        downloadStem: makeDownloadStem("sms", phone),
      };
    },
  },
  {
    slug: "location",
    name: "Map Location",
    shortDescription: "Send someone straight to a location in maps.",
    description: "Great for shops, events, studios, co-working spaces, pop-ups, and pickup points.",
    previewBadge: "Maps",
    emptyState: "Add an address to create the location QR code.",
    featured: false,
    outputMode: "raw",
    examples: ["Storefronts", "Pickup points", "Event venues"],
    fields: [
      {
        key: "place",
        label: "Place name",
        type: "text",
        placeholder: "PlainQR Studio",
        defaultValue: "PlainQR Studio",
      },
      {
        key: "address",
        label: "Address",
        type: "textarea",
        placeholder: "21 Park Street, Bengaluru",
        helper: "Required",
        required: true,
        rows: 4,
        defaultValue: "21 Park Street, Bengaluru",
      },
    ],
    build: (state) => {
      const place = getString(state, "place");
      const address = getString(state, "address");
      const query = encodeURIComponent([place, address].filter(Boolean).join(", "));

      return {
        value: `https://www.google.com/maps/search/?api=1&query=${query}`,
        summary: `Open directions to ${place || "this location"} without typing the address manually.`,
        details: [
          { label: "Place", value: place || "Unnamed location" },
          { label: "Address", value: address || "Pending address" },
        ],
        downloadStem: makeDownloadStem("location", place || address),
      };
    },
  },
  {
    slug: "file",
    name: "PDF / File Link",
    shortDescription: "Share a hosted PDF, brochure, or downloadable file.",
    description: "Useful for resumes, brochures, menus, onboarding guides, workshop notes, and simple downloadable assets.",
    previewBadge: "Hosted file",
    emptyState: "Add a valid file URL to create the QR code.",
    featured: false,
    outputMode: "raw",
    examples: ["Resumes", "Menus", "Brochures"],
    fields: [
      {
        key: "fileUrl",
        label: "File URL",
        type: "url",
        placeholder: "cdn.example.com/menu.pdf",
        helper: "Required",
        required: true,
        autoComplete: "url",
        defaultValue: "cdn.example.com/menu.pdf",
      },
      {
        key: "title",
        label: "File title",
        type: "text",
        placeholder: "Spring menu",
        defaultValue: "Spring menu",
      },
    ],
    validate: (state) => {
      const errors: QrFormErrors = {};
      const fileUrl = getString(state, "fileUrl");

      if (fileUrl && !isValidUrl(fileUrl)) {
        errors.fileUrl = "Enter a valid hosted file URL.";
      }

      return errors;
    },
    build: (state) => {
      const fileUrl = normalizeUrl(getString(state, "fileUrl"));
      const title = getString(state, "title") || "File download";

      return {
        value: fileUrl,
        summary: `Open ${title.toLowerCase()} immediately from a printed or shared QR code.`,
        details: [
          { label: "Title", value: title },
          { label: "Domain", value: safeUrlHost(fileUrl) },
        ],
        downloadStem: makeDownloadStem("file", title),
      };
    },
  },
] as const satisfies readonly QrTypeDefinition[];

export function getQrTypeBySlug(slug: string) {
  return qrTypes.find((item) => item.slug === slug);
}

export function getDefaultFormState(typeSlug: QrTypeSlug) {
  const qrType = getQrTypeBySlug(typeSlug) ?? getQrTypeBySlug(DEFAULT_QR_TYPE)!;
  return Object.fromEntries(qrType.fields.map((field) => [field.key, field.defaultValue]));
}

export function getRouteForType(typeSlug: QrTypeSlug) {
  return typeSlug === DEFAULT_QR_TYPE ? "/" : `/${typeSlug}`;
}

export function validateFormState(type: QrTypeDefinition, state: QrFormState) {
  const errors: QrFormErrors = {};

  type.fields.forEach((field) => {
    const value = state[field.key];
    const isVisible = field.showWhen ? field.showWhen(state) : true;

    if (!field.required || !isVisible) {
      return;
    }

    if (typeof value === "boolean") {
      if (!value) {
        errors[field.key] = `${field.label} is required.`;
      }

      return;
    }

    if (!String(value).trim()) {
      errors[field.key] = `${field.label} is required.`;
    }
  });

  return {
    ...errors,
    ...(type.validate ? type.validate(state) : {}),
  };
}

export { buildVCard, buildContactPayload, contactTemplateMeta, normalizeWebsite, buildInstagramUrl, buildWhatsAppUrl };
