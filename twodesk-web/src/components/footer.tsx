import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const isTh = locale === "th";
  const colHeading = `text-[#999] mb-3 md:mb-4 ${isTh ? "th-eyebrow" : "text-[11px] font-bold tracking-[2px] uppercase"}`;
  const colLink = `block text-[#333] mb-2 md:mb-2.5 hover:opacity-60 transition-opacity ${isTh ? "" : "text-sm"}`;

  return (
    <div className="bg-[#fafaf8]">
      <footer className="mx-auto max-w-[1440px] px-5 md:px-20 pt-12 md:pt-20 pb-8 md:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-10 mb-8 md:mb-10">
          {/* Brand - full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/logo_twodesk_new.svg"
              alt="TWO DESKS"
              className="h-6 md:h-7 w-auto mb-3"
            />
            <h3 className="sr-only">TWO DESKS
            </h3>
            <p className={`text-[#666] leading-[1.7] whitespace-pre-line ${isTh ? "" : "text-[12px] md:text-[13px]"}`}>
              {t("brandDescription")}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className={colHeading}>
              {t("navigate")}
            </h4>
            <Link href="/projects" className={colLink}>{nav("projects")}</Link>
            <Link href="/blog" className={colLink}>{nav("blog")}</Link>
            <Link href="/about" className={colLink}>{nav("about")}</Link>
            <Link href="/contact" className={colLink}>{nav("contact")}</Link>
          </div>

          {/* Connect */}
          <div>
            <h4 className={colHeading}>
              {t("connect")}
            </h4>
            <a
              href="https://www.instagram.com/twodesk.studio"
              target="_blank"
              rel="noopener noreferrer"
              className={colLink}
            >
              {t("instagram")}
            </a>
            <a
              href="https://www.facebook.com/twodeskstudio"
              target="_blank"
              rel="noopener noreferrer"
              className={colLink}
            >
              {t("facebook")}
            </a>
            <a href="mailto:hello@twodesk.studio" className={colLink}>
              {t("email")}
            </a>
          </div>

          {/* Contact - hidden on mobile to avoid duplication with Connect */}
          <div className="hidden md:block">
            <h4 className={colHeading}>
              {t("contactTitle")}
            </h4>
            <a href="mailto:hello@twodesk.studio" className={colLink}>
              {t("emailAddress")}
            </a>
            <a
              href="https://www.instagram.com/twodesk.studio"
              target="_blank"
              rel="noopener noreferrer"
              className={colLink}
            >
              {t("instagramHandle")}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`flex flex-col md:flex-row justify-between gap-2 pt-6 border-t border-[#e5e5e5] text-[#999] ${isTh ? "" : "text-xs"}`}>
          <span>{t("copyright")}</span>
          <span className="hidden md:inline">{t("credit")}</span>
        </div>
      </footer>
    </div>
  );
}
