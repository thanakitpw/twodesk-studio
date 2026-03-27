import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <div className="bg-[#fafaf8]">
      <footer className="mx-auto max-w-[1440px] px-20 pt-20 pb-10">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-[15px] font-bold tracking-[0.2em] text-[#999] mb-3">
              TWO DESK
            </h3>
            <p className="text-[13px] text-[#666] leading-[1.7] whitespace-pre-line">
              {t("brandDescription")}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-[#999] mb-4">
              {t("navigate")}
            </h4>
            <Link
              href="/projects"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
            >
              {nav("projects")}
            </Link>
            <Link
              href="/blog"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
            >
              {nav("blog")}
            </Link>
            <Link
              href="/about"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
            >
              {nav("about")}
            </Link>
            <Link
              href="/contact"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
            >
              {nav("contact")}
            </Link>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-[#999] mb-4">
              {t("connect")}
            </h4>
            <a
              href="https://www.instagram.com/twodesk.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
            >
              {t("instagram")}
            </a>
            <a
              href="https://www.facebook.com/twodeskstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
            >
              {t("facebook")}
            </a>
            <a
              href="mailto:hello@twodesk.studio"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
            >
              {t("email")}
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-[#999] mb-4">
              {t("contactTitle")}
            </h4>
            <a
              href="mailto:hello@twodesk.studio"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
            >
              {t("emailAddress")}
            </a>
            <a
              href="https://www.instagram.com/twodesk.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-[#333] mb-2.5 hover:opacity-60 transition-opacity"
            >
              {t("instagramHandle")}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between pt-6 border-t border-[#e5e5e5] text-xs text-[#999]">
          <span>{t("copyright")}</span>
          <span>{t("credit")}</span>
        </div>
      </footer>
    </div>
  );
}
