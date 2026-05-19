import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import ScrollAnimate from "@/components/scroll-animate";

export default function AboutTeaser() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isTh = locale === "th";

  return (
    <section className="relative flex flex-col md:flex-row bg-black overflow-hidden">
      {/* Scattered logo overlay - hidden on mobile */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] hidden md:block">
        <img src="/logo-black.svg" alt="" className="absolute brightness-0 invert" style={{ width: '200px', top: '5%', right: '8%', transform: 'rotate(-12deg)' }} />
        <img src="/logo-black.svg" alt="" className="absolute brightness-0 invert" style={{ width: '80px', top: '15%', right: '45%', transform: 'rotate(8deg)' }} />
        <img src="/logo-black.svg" alt="" className="absolute brightness-0 invert" style={{ width: '140px', bottom: '10%', right: '20%', transform: 'rotate(-5deg)' }} />
        <img src="/logo-black.svg" alt="" className="absolute brightness-0 invert" style={{ width: '60px', top: '40%', right: '65%', transform: 'rotate(15deg)' }} />
        <img src="/logo-black.svg" alt="" className="absolute brightness-0 invert" style={{ width: '100px', bottom: '25%', right: '50%', transform: 'rotate(-8deg)' }} />
        <img src="/logo-black.svg" alt="" className="absolute brightness-0 invert" style={{ width: '160px', top: '60%', right: '5%', transform: 'rotate(3deg)' }} />
        <img src="/logo-black.svg" alt="" className="absolute brightness-0 invert" style={{ width: '50px', top: '8%', right: '30%', transform: 'rotate(-20deg)' }} />
      </div>

      {/* Image */}
      <img
        src="/images/about-working.jpg"
        alt="Design process"
        className="relative z-10 w-full md:w-[45%] h-[280px] md:h-auto md:min-h-[400px] object-cover"
      />

      {/* Content */}
      <ScrollAnimate className="relative z-10 flex flex-1 flex-col justify-center px-5 py-10 md:p-20 text-white max-w-full md:max-w-[680px]">
        <p className={`mb-3 md:mb-4 text-white/50 ${isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"}`}>
          {t("aboutLabel")}
        </p>
        <h2
          className={`mb-4 md:mb-5 ${isTh ? "" : "text-[24px] md:text-[28px] font-bold leading-[1.3]"}`}
          style={isTh ? { fontWeight: 500 } : undefined}
        >
          {t("aboutTitle")}
        </h2>
        <p className={`mb-5 md:mb-6 text-white/70 ${isTh ? "th-body-lg" : "text-[14px] md:text-[15px] leading-[1.7]"}`}>
          {t("aboutDescription")}
        </p>
        <Link
          href="/about"
          className={`text-white underline underline-offset-4 hover:opacity-70 transition-opacity ${isTh ? "th-button" : "text-sm"}`}
        >
          {t("aboutLink")} →
        </Link>
      </ScrollAnimate>
    </section>
  );
}
