import { useTranslations } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

export default function ContactCta() {
  const t = useTranslations("home");

  return (
    <div className="bg-black">
      <section className="relative mx-auto max-w-[1440px] overflow-hidden px-20 py-[100px] text-center">
        {/* Architectural overlay image */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <img
            src="https://v3b.fal.media/files/b/0a93df18/CXr74W9FVTZjq_nFUVe2z.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <ScrollAnimate>
          <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-white/50">
            {t("ctaLabel")}
          </p>
        </ScrollAnimate>
        <ScrollAnimate>
          <h2 className="mb-4 text-[44px] font-bold text-white">
            {t("ctaTitle")}
          </h2>
        </ScrollAnimate>
        <ScrollAnimate>
          <p className="mb-8 text-[15px] text-white/60">
            {t("ctaDescription")}
          </p>
        </ScrollAnimate>
        <ScrollAnimate>
          <a
            href="#"
            className="relative z-10 inline-block border border-white px-10 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            {t("ctaButton")}
          </a>
        </ScrollAnimate>
      </section>
    </div>
  );
}
