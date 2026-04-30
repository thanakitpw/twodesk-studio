import { useTranslations, useLocale } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

export default function ContactCta() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isTh = locale === "th";

  return (
    <div className="bg-black">
      <section className="relative mx-auto max-w-[1440px] overflow-hidden px-5 md:px-20 py-16 md:py-[100px] text-center">
        {/* Architectural sketch overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <img
            src="https://v3b.fal.media/files/b/0a93df18/CXr74W9FVTZjq_nFUVe2z.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
        <ScrollAnimate>
          <p className={`mb-3 md:mb-4 text-white/50 ${isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"}`}>
            {t("ctaLabel")}
          </p>
        </ScrollAnimate>
        <ScrollAnimate>
          <h2 className={`mb-3 md:mb-4 text-white ${isTh ? "" : "text-[28px] md:text-[44px] font-bold"}`}>
            {t("ctaTitle")}
          </h2>
        </ScrollAnimate>
        <ScrollAnimate>
          <p className={`mb-6 md:mb-8 text-white/60 ${isTh ? "th-body-lg" : "text-[13px] md:text-[15px]"}`}>
            {t("ctaDescription")}
          </p>
        </ScrollAnimate>
        <ScrollAnimate>
          <a
            href="#"
            className={`relative z-20 inline-block border border-white bg-transparent px-8 md:px-10 py-3 md:py-3.5 !text-white transition-all duration-300 hover:bg-white hover:!text-black ${isTh ? "th-button" : "text-sm font-medium"}`}
          >
            {t("ctaButton")}
          </a>
        </ScrollAnimate>
        </div>
      </section>
    </div>
  );
}
