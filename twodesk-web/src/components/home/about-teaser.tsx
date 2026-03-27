import { useTranslations } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

export default function AboutTeaser() {
  const t = useTranslations("home");

  return (
    <section className="flex bg-black">
      {/* Image */}
      <img
        src="https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5SSJHKWF80EZ17391VTRASH3RT.jpg"
        alt="Team"
        className="w-1/2 min-h-[480px] object-cover"
      />

      {/* Content */}
      <ScrollAnimate className="flex flex-1 flex-col justify-center p-20 text-white max-w-[680px]">
        <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-white/50">
          {t("aboutLabel")}
        </p>
        <h2 className="mb-5 text-[28px] font-bold leading-[1.3]">
          {t("aboutTitle")}
        </h2>
        <p className="mb-6 text-[15px] leading-[1.7] text-white/70">
          {t("aboutDescription")}
        </p>
        <a
          href="#"
          className="text-sm text-white underline underline-offset-4 hover:opacity-70"
        >
          {t("aboutLink")} →
        </a>
      </ScrollAnimate>
    </section>
  );
}
