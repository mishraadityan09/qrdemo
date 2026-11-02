# PlainQR

PlainQR is a standalone QR code website built for general users. The product is anonymous-first and utility-first: choose a QR type, fill a short form, preview the result live, and download a clean PNG or SVG without a login wall.

## Product shape

- Mobile-first layout with a fully supported desktop split view
- Minimalist UI with large type, high contrast, and low cognitive load
- Live QR preview with payload copy support
- PNG and SVG downloads
- Ten QR types in v1:
  - Website link
  - Wi-Fi access
  - Contact card
  - WhatsApp chat
  - Email draft
  - Phone call
  - Plain text
  - SMS message
  - Map location
  - PDF / file link

## Development

Run the local dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Tech

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `qrcode` for QR generation

## Notes

- The old travel demo routes were removed during the rebrand.
- The core QR generation behavior now comes from a shared QR-type definition model in `lib/qr-types.ts`.
- The v1 product is intentionally stateless: no accounts, analytics, or saved history yet.
