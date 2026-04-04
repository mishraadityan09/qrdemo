const airlineSlugs = {
  "IndiGo": "indigo",
  "Air India": "air-india",
  SpiceJet: "spicejet",
  "Akasa Air": "akasa-air",
  Vistara: "vistara",
} as const;

export type SupportedAirline = keyof typeof airlineSlugs;

export function buildAirlineCheckinLink(airline: SupportedAirline, pnr: string) {
  const slug = airlineSlugs[airline];
  const cleanPnr = pnr.trim().toUpperCase();

  return `https://app.flightsmojo.com/check-in/${slug}?pnr=${encodeURIComponent(cleanPnr)}`;
}
