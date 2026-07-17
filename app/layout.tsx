import type { Metadata } from "next";
import "./globals.css";

const title = "PAL — Evidence-safe P&L landing page draft";
const description = "A source-controlled working draft for evaluating PAL against one confirmed corporate P&L workflow.";

export const metadata: Metadata = {
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  robots: { index: false, follow: false },
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
