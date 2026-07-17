import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serkidoko.github.io/pal-pnl-pitch";
const title = "PAL for the P&L | Vin Smart Future";
const description = "A source-led proposal to evaluate one P&L-owned workflow with PAL—MindPal agents, multi-agent workflows and measurable business evidence.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: `${siteUrl}/og.png`, width: 1761, height: 909, alt: "PAL for the P&L — presented by Vin Smart Future" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
