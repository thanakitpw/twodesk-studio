import type { Metadata } from "next";
import "./globals.css";

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
    <html suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
