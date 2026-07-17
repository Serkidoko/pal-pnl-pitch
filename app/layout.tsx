import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pal-pnl-pitch-2026.hieusieunhan24.chatgpt.site";
const title = "PAL — Professional Services P&L Pitch";
const description = "A 14-slide decision deck for turning expert delivery into a scalable margin engine.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title, description, type: "website", images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
