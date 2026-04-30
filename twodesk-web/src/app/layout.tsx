import type { Metadata } from "next";
import "./globals.css";
import { Geist, Kanit } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TWO DESK — Design Studio",
  description:
    "TWO DESK Design Studio — Interior, Architecture, Furniture & Craft Design. Based in Bangkok, Thailand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className={cn("font-sans", geist.variable, kanit.variable)}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
