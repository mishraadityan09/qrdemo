import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "FlightsMojo QR Demo",
    template: "%s | FlightsMojo QR Demo",
  },
  description:
    "Interactive FlightsMojo layout showing where QR features fit across booking, itinerary, check-in, transfer, and referral flows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(0,82,204,0.18),transparent_60%)]" />
          <div className="pointer-events-none absolute right-[-10rem] top-32 h-80 w-80 rounded-full bg-[rgba(12,106,181,0.10)] blur-3xl" />
          <div className="pointer-events-none absolute left-[-8rem] top-[28rem] h-80 w-80 rounded-full bg-[rgba(51,166,255,0.08)] blur-3xl" />
          <SiteHeader />
          <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-16 sm:px-6 lg:px-8">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
