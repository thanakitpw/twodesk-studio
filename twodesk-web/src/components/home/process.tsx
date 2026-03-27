import { useTranslations } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

const STEPS = [
  { num: "01", title: "step1Title", desc: "step1Desc" },
  { num: "02", title: "step2Title", desc: "step2Desc" },
  { num: "03", title: "step3Title", desc: "step3Desc" },
  { num: "04", title: "step4Title", desc: "step4Desc" },
] as const;

export default function Process() {
  const t = useTranslations("home");

  return (
    <section className="mx-auto max-w-[1440px] px-20 py-[100px]">
      <div className="flex gap-20">
        {/* Left */}
        <ScrollAnimate className="flex-none w-[480px]">
          <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]">
            {t("processLabel")}
          </p>
          <h2 className="mb-4 text-[32px] font-bold leading-[1.2] tracking-tight">
            {t("processTitle")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
          </h2>
          <p className="text-[15px] leading-[1.6] text-[#666]">
            {t("processDescription")}
          </p>
        </ScrollAnimate>

        {/* Right */}
        <div className="flex-1">
          {STEPS.map((step, i) => (
            <ScrollAnimate
              key={i}
              className={`flex items-start gap-6 border-b border-[#e5e5e5] py-6 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <div className="min-w-[48px] text-[32px] font-bold text-[#ccc]">
                {step.num}
              </div>
              <div>
                <h4 className="mb-1 text-base font-bold">{t(step.title)}</h4>
                <p className="text-[13px] leading-[1.5] text-[#666]">
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
