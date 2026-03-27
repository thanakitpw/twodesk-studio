import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ContactCTA() {
  const t = useTranslations("cta");

  return (
    <div className="bg-black">
      <section className="relative mx-auto max-w-[1440px] overflow-hidden px-20 py-[100px] text-center">
        {/* Background overlay image */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://v3b.fal.media/files/b/0a93df18/CXr74W9FVTZjq_nFUVe2z.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-white/50">
          {t("label")}
        </p>
        <h2 className="mb-4 text-[44px] font-bold text-white">
          {t("heading")}
        </h2>
        <p className="mb-8 text-[15px] text-white/60">
          {t("description")}
        </p>
        <Link
          href="/contact"
          className="relative z-10 inline-block border border-white px-10 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
        >
          {t("button")}
        </Link>
      </section>
    </div>
  );
}
