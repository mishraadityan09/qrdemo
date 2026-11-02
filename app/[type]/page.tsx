import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { getQrTypeBySlug, getRouteForType } from "@/lib/qr-types";
import { siteConfig } from "@/lib/site";

type TypePageProps = {
  params: Promise<{
    type: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.secondaryRoutes.map((type) => ({ type }));
}

export async function generateMetadata({ params }: TypePageProps): Promise<Metadata> {
  const { type } = await params;
  const qrType = getQrTypeBySlug(type);

  if (!qrType) {
    return {};
  }

  const title = `${qrType.name} QR Code Generator`;
  const description = `${qrType.description} Create it instantly with ${siteConfig.name}, then download a clean PNG or SVG.`;

  return {
    title,
    description,
    alternates: {
      canonical: getRouteForType(qrType.slug),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${getRouteForType(qrType.slug)}`,
    },
  };
}

export default async function TypePage({ params }: TypePageProps) {
  const { type } = await params;
  const qrType = getQrTypeBySlug(type);

  if (!qrType) {
    notFound();
  }

  return <LandingPage initialTypeSlug={qrType.slug} />;
}
