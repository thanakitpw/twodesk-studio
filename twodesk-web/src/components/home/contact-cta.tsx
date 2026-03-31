import { useTranslations, useLocale } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

export default function ContactCta() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isTh = locale === "th";
  const thScale = (px: number) => isTh ? `${Math.round(px * 1.35)}px` : undefined;

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
          <p
            className="mb-3 md:mb-4 text-xs font-normal uppercase tracking-[0.2em] text-white/50"
            style={isTh ? { fontSize: "18px" } : undefined}
          >
            {t("ctaLabel")}
          </p>
        </ScrollAnimate>
        <ScrollAnimate>
          <h2
            className="mb-3 md:mb-4 text-[28px] md:text-[44px] font-bold text-white"
            style={isTh ? { fontSize: thScale(44), lineHeight: 1.3 } : undefined}
          >
            {t("ctaTitle")}
          </h2>
        </ScrollAnimate>
        <ScrollAnimate>
          <p
            className="mb-6 md:mb-8 text-[13px] md:text-[15px] text-white/60"
            style={isTh ? { fontSize: thScale(15) } : undefined}
          >
            {t("ctaDescription")}
          </p>
        </ScrollAnimate>
        <ScrollAnimate>
          <a
            href="#"
            className="relative z-20 inline-block border border-white bg-transparent px-8 md:px-10 py-3 md:py-3.5 text-sm font-medium !text-white transition-all duration-300 hover:bg-white hover:!text-black"
            style={isTh ? { fontSize: "19px" } : undefined}
          >
            {t("ctaButton")}
          </a>
        </ScrollAnimate>
        </div>
      </section>
    </div>
  );
}
