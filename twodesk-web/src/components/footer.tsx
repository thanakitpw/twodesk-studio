import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const isTh = locale === "th";
  const thScale = (px: number) => isTh ? `${Math.round(px * 1.35)}px` : undefined;

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
            <p
              className="text-[12px] md:text-[13px] text-[#666] leading-[1.7] whitespace-pre-line"
              style={isTh ? { fontSize: thScale(13) } : undefined}
            >
              {t("brandDescription")}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4
              className="text-[11px] font-bold tracking-[2px] uppercase text-[#999] mb-3 md:mb-4"
              style={isTh ? { fontSize: thScale(11) } : undefined}
            >
              {t("navigate")}
            </h4>
            <Link
              href="/projects"
              className="block text-sm text-[#333] mb-2 md:mb-2.5 hover:opacity-60 transition-opacity"
              style={isTh ? { fontSize: "19px" } : undefined}
            >
              {nav("projects")}
            </Link>
            <Link
              href="/blog"
              className="block text-sm text-[#333] mb-2 md:mb-2.5 hover:opacity-60 transition-opacity"
              style={isTh ? { fontSize: "19px" } : undefined}
            >
              {nav("blog")}
            </Link>
            <Link
              href="/about"
              className="block text-sm text-[#333] mb-2 md:mb-2.5 hover:opacity-60 transition-opacity"
              style={isTh ? { fontSize: "19px" } : undefined}
            >
              {nav("about")}
            </Link>
            <Link
              href="/contact"
              className="block text-sm text-[#333] mb-2 md:mb-2.5 hover:opacity-60 transition-opacity"
              style={isTh ? { fontSize: "19px" } : undefined}
            >
              {nav("contact")}
            </Link>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="text-[11px] font-bold tracking-[2px] uppercase text-[#999] mb-3 md:mb-4"
              style={isTh ? { fontSize: thScale(11) } : undefined}
            >
              {t("connect")}
            </h4>
            <a
              href="https://www.instagram.com/twodesk.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#333] mb-2 md:mb-2.5 hover:opacity-60 transition-opacity"
              style={isTh ? { fontSize: "19px" } : undefined}
            >
              {t("instagram")}
            </a>
            <a
              href="https://www.facebook.com/twodeskstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#333] mb-2 md:mb-2.5 hover:opacity-60 transition-opacity"
              style={isTh ? { fontSize: "19px" } : undefined}
            >
              {t("facebook")}
            </a>
            <a
              href="mailto:hello@twodesk.studio"
              className="block text-sm text-[#333] mb-2 md:mb-2.5 hover:opacity-60 transition-opacity"
              style={isTh ? { fontSize: "19px" } : undefined}
            >
              {t("email")}
            </a>
          </div>

          {/* Contact - hidden on mobile to avoid duplication with Connect */}
          <div className="hidden md:block">
            <h4
              className="text-[11px] font-bold tracking-[2px] uppercase text-[#999] mb-4"
              style={isTh ? { fontSize: thScale(11) } : undefined}
            >
              {t("contactTitle")}
            </h4>
            <a
              href="mailto:hello@twodesk.studio"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
              style={isTh ? { fontSize: "19px" } : undefined}
            >
              {t("emailAddress")}
            </a>
            <a
              href="https://www.instagram.com/twodesk.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
              style={isTh ? { fontSize: "19px" } : undefined}
            >
              {t("instagramHandle")}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between gap-2 pt-6 border-t border-[#e5e5e5] text-xs text-[#999]">
          <span style={isTh ? { fontSize: "16px" } : undefined}>{t("copyright")}</span>
          <span className="hidden md:inline" style={isTh ? { fontSize: "16px" } : undefined}>{t("credit")}</span>
        </div>
      </footer>
    </div>
  );
}
