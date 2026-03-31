import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageTransition from "@/components/PageTransition";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "TWO DESK — Design Studio",
    description:
      locale === "th"
        ? "TWO DESK สตูดิโอออกแบบครบวงจร — ออกแบบภายใน สถาปัตยกรรม เฟอร์นิเจอร์ และงานคราฟต์ กรุงเทพมหานคร"
        : "TWO DESK Design Studio — Interior, Architecture, Furniture & Craft Design. Based in Bangkok, Thailand.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Nav />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </NextIntlClientProvider>
  );
}
