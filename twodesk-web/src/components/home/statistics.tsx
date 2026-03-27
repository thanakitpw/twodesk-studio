import { useTranslations } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

const STATS = [
  { value: "5+", key: "statYears" },
  { value: "30+", key: "statProjects" },
  { value: "4", key: "statTeam" },
  { value: "4", key: "statServices" },
] as const;

export default function Statistics() {
  const t = useTranslations("home");

  return (
    <div className="bg-black">
      <section className="relative mx-auto flex max-w-[1440px] justify-center overflow-hidden p-20">
        {/* TD Watermark */}
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[200px] font-black text-white/[0.03]">
          TD
        </span>

        {STATS.map((stat, i) => (
          <ScrollAnimate
            key={i}
            className={`flex-1 py-6 text-center ${
              i < STATS.length - 1
                ? "border-r border-white/15"
                : ""
            }`}
          >
            <div className="mb-2 text-5xl font-bold text-white">
              {stat.value}
            </div>
            <div className="text-sm text-white/60">{t(stat.key)}</div>
          </ScrollAnimate>
        ))}
      </section>
    </div>
  );
}
