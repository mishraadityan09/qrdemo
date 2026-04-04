import { buildAirlineCheckinLink, type SupportedAirline } from "@/lib/airline-links";

export type BookingReferenceForm = {
  pnr: string;
  passengerName: string;
  flightNumber: string;
  travelDate: string;
};

export type ItineraryShareForm = {
  fromCity: string;
  toCity: string;
  departureDate: string;
  departureTime: string;
  airline: string;
  flightNumber: string;
  passengerCount: string;
};

export type CheckinReminderForm = {
  airline: SupportedAirline;
  pnr: string;
};

export type CabTransferForm = {
  passengerName: string;
  pickupLocation: string;
  flightNumber: string;
  pickupTime: string;
};

export type ReferralForm = {
  userName: string;
  referralCode: string;
};

export function encodeBookingReference(data: BookingReferenceForm) {
  return [
    "FlightsMojo Booking Reference",
    `PNR: ${data.pnr.trim().toUpperCase()}`,
    `Passenger: ${data.passengerName.trim()}`,
    `Flight: ${data.flightNumber.trim().toUpperCase()}`,
    `Travel Date: ${formatDateLabel(data.travelDate)}`,
  ].join("\n");
}

export function encodeItineraryShare(data: ItineraryShareForm) {
  return [
    "FlightsMojo Itinerary",
    `${data.fromCity.trim()} -> ${data.toCity.trim()}`,
    `Departure: ${formatDateLabel(data.departureDate)} at ${data.departureTime}`,
    `Airline: ${data.airline.trim()}`,
    `Flight: ${data.flightNumber.trim().toUpperCase()}`,
    `Passengers: ${data.passengerCount}`,
  ].join("\n");
}

export function encodeCheckinReminder(data: CheckinReminderForm) {
  return buildAirlineCheckinLink(data.airline, data.pnr);
}

export function encodeCabTransfer(data: CabTransferForm) {
  return JSON.stringify({
    name: data.passengerName.trim(),
    pickup: data.pickupLocation.trim(),
    flight: data.flightNumber.trim().toUpperCase(),
    time: data.pickupTime,
  });
}

export function encodeReferral(data: ReferralForm) {
  const name = data.userName.trim().toLowerCase().replace(/\s+/g, "-");
  const code = data.referralCode.trim().toUpperCase();

  return `https://app.flightsmojo.com/download?ref=${encodeURIComponent(code)}&user=${encodeURIComponent(name)}`;
}

export function formatDateLabel(dateString: string) {
  if (!dateString) {
    return "Select a date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00`));
}

export function shortLocationCode(city: string) {
  const sanitized = city.replace(/[^a-zA-Z]/g, "").toUpperCase();
  return sanitized.slice(0, 3) || "FMO";
}
