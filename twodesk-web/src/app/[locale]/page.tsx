import Hero from "@/components/home/hero";
import Services from "@/components/home/services";
import Statistics from "@/components/home/statistics";
import Works from "@/components/home/works";
import Process from "@/components/home/process";
import AboutTeaser from "@/components/home/about-teaser";
import BlogPreview from "@/components/home/blog-preview";
import ContactCta from "@/components/home/contact-cta";
import { getSiteSettings } from "@/lib/site-settings";
import { SETTINGS_KEYS } from "@/lib/site-settings-keys";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const s = await getSiteSettings();
  const isTh = locale === "th";
  const heroTitle = isTh
    ? s[SETTINGS_KEYS.heroTitleTh]
    : s[SETTINGS_KEYS.heroTitleEn];
  const heroSubtitle = isTh
    ? s[SETTINGS_KEYS.heroSubtitleTh]
    : s[SETTINGS_KEYS.heroSubtitleEn];

  return (
    <>
      <Hero title={heroTitle} subtitle={heroSubtitle} />
      <Services />
      <Statistics />
      <Works />
      <Process />
      <AboutTeaser />
      <BlogPreview />
      <ContactCta />
    </>
  );
}
