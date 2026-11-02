export const siteConfig = {
  name: "PlainQR",
  url: "http://192.168.1.160:3000",
  description:
    "Create clean QR codes for links, Wi-Fi, contacts, chats, files, and everyday sharing in seconds.",
  navigation: [
    { label: "Generator", href: "#generator" },
    { label: "Uses", href: "#templates" },
    { label: "FAQ", href: "#faq" },
  ],
  secondaryRoutes: [
    "wifi",
    "contact",
    "whatsapp",
    "email",
    "phone",
    "text",
    "sms",
    "location",
    "file",
  ] as const,
} as const;
