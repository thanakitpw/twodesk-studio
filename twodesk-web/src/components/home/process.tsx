import { useTranslations, useLocale } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

const STEPS = [
  { num: "01", title: "step1Title", desc: "step1Desc" },
  { num: "02", title: "step2Title", desc: "step2Desc" },
  { num: "03", title: "step3Title", desc: "step3Desc" },
  { num: "04", title: "step4Title", desc: "step4Desc" },
] as const;

export default function Process() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isTh = locale === "th";

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-20 py-16 md:py-[100px]">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20">
        {/* Left */}
        <ScrollAnimate className="md:flex-none md:w-[480px]">
          <p className={`mb-3 md:mb-4 text-[#999] ${isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"}`}>
            {t("processLabel")}
          </p>
          <h2 className={`mb-3 md:mb-4 ${isTh ? "" : "text-[26px] md:text-[32px] font-bold leading-[1.2] tracking-tight"}`}>
            {t("processTitle")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
          </h2>
          <p className={`text-[#666] ${isTh ? "th-body-lg" : "text-[14px] md:text-[15px] leading-[1.6]"}`}>
            {t("processDescription")}
          </p>
        </ScrollAnimate>

        {/* Right */}
        <div className="flex-1">
          {STEPS.map((step, i) => (
            <ScrollAnimate
              key={i}
              className={`group flex items-start gap-4 md:gap-6 border-b border-[#e5e5e5] py-5 md:py-6 cursor-default transition-all duration-300 hover:pl-3 hover:bg-[#fafaf8] ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <div className="min-w-[40px] md:min-w-[48px] text-[26px] md:text-[32px] font-bold text-[#ccc] transition-colors duration-300 group-hover:text-[#1a1a1a]">
                {step.num}
              </div>
              <div>
                <h4 className={`mb-1 transition-colors duration-300 group-hover:text-[#333] ${isTh ? "" : "text-sm md:text-base font-bold"}`}>
                  {t(step.title)}
                </h4>
                <p className={`text-[#666] transition-colors duration-300 group-hover:text-[#444] ${isTh ? "th-body-sm" : "text-[12px] md:text-[13px] leading-[1.5]"}`}>
                  {t(step.desc)}
                </p>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}
