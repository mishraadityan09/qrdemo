export const useCases = [
  {
    title: "Booking Reference",
    href: "/booking-reference",
    tagline: "Surface the PNR for airport check-in and bag drop.",
    description:
      "A booking confirmation layout with the QR module positioned directly below the passenger and flight summary.",
    badge: "Booking flow",
  },
  {
    title: "Itinerary Share",
    href: "/share-itinerary",
    tagline: "Turn a trip summary into a scan-ready share card.",
    description:
      "A companion-friendly itinerary view that shows route timing, flight details, and the scan area in one card.",
    badge: "Sharing flow",
  },
  {
    title: "Check-in Reminder",
    href: "/checkin-reminder",
    tagline: "Open airline check-in from a reminder touchpoint.",
    description:
      "A countdown-style reminder screen that frames the QR as a direct path to airline web check-in.",
    badge: "Reminder flow",
  },
  {
    title: "Cab Transfer",
    href: "/cab-transfer",
    tagline: "Let drivers verify pickup details without a phone call.",
    description:
      "A driver-facing handoff card with passenger, flight, and pickup details staged beside a large QR area.",
    badge: "Transfer flow",
  },
  {
    title: "Referral",
    href: "/referral",
    tagline: "Drive app acquisition with a referral-linked scan.",
    description:
      "A shareable referral card for friend invites, rewards messaging, and deep-link QR placement.",
    badge: "Growth flow",
  },
] as const;
