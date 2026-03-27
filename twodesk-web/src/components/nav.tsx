"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-white/95 backdrop-blur-[10px]">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-20 py-7">
        <Link
          href="/"
          className="text-[15px] font-bold tracking-[0.2em] text-[#999]"
        >
          TWO DESK
        </Link>
        <div className="flex items-center gap-8 text-sm font-light">
          <Link href="/projects" className="hover:opacity-60 transition-opacity">
            {t("projects")}
          </Link>
          <Link href="/blog" className="hover:opacity-60 transition-opacity">
            {t("blog")}
          </Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">
            {t("about")}
          </Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">
            {t("contact")}
          </Link>
          <span className="text-[#999] font-light">
            <button
              onClick={() => switchLocale("th")}
              className={`${
                locale === "th"
                  ? "text-[#1a1a1a] font-semibold"
                  : "text-[#999]"
              } hover:opacity-60 transition-opacity cursor-pointer`}
            >
              TH
            </button>
            {" "}
            <button
              onClick={() => switchLocale("en")}
              className={`${
                locale === "en"
                  ? "text-[#1a1a1a] font-semibold"
                  : "text-[#999]"
              } hover:opacity-60 transition-opacity cursor-pointer`}
            >
              EN
            </button>
          </span>
        </div>
      </div>
    </nav>
  );
}
