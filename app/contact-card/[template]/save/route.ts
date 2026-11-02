import type { NextRequest } from "next/server";
import { buildVCard, decodeContactPayload } from "@/lib/contact-cards";

type RouteContext = {
  params: Promise<{
    template: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { template } = await context.params;
  const data = request.nextUrl.searchParams.get("data") ?? undefined;
  const payload = decodeContactPayload(data, template);

  if (!payload) {
    return new Response("Invalid contact payload", { status: 400 });
  }

  const body = buildVCard(payload);
  const filename = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename || "plainqr-contact"}.vcf"`,
    },
  });
}
