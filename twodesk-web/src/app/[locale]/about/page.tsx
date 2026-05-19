import { useTranslations, useLocale } from "next-intl";
import ContactCTA from "@/components/ContactCTA";

const TEAM_PHOTO =
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/team/team-image.webp";

const TEAM_BUCKET =
  "https://ivslfjtahzkpdgoqjobh.supabase.co/storage/v1/object/public/projects/team";

const TEAM_MEMBERS = [
  { key: "nut" as const, photo: `${TEAM_BUCKET}/nut.webp` },
  { key: "gun" as const, photo: `${TEAM_BUCKET}/gun.webp` },
  { key: "ping" as const, photo: `${TEAM_BUCKET}/ping.webp` },
  { key: "yo" as const, photo: `${TEAM_BUCKET}/yo.webp` },
];

const SERVICES = ["architecture", "interior", "engineering", "consult", "furniture"] as const;

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isTh = locale === "th";

  return (
    <main>
      {/* ─── About Hero ─── */}
      <section className="bg-black">
        <div className="flex min-h-[50vh] flex-col-reverse lg:min-h-[70vh] lg:flex-row">
          {/* Text — left ~55% */}
          <div className="flex flex-col justify-center px-5 py-12 md:px-12 md:py-20 lg:w-[55%] lg:px-20 lg:py-28 xl:px-28">
            <p className={`mb-5 text-white/50 ${isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"}`}>
              {t("hero.label")}
            </p>
            <h1 className={`mb-6 text-white ${isTh ? "" : "text-[28px] font-bold leading-[1.15] tracking-[-0.02em] md:text-[40px] lg:text-[52px]"}`}>
              {t("hero.heading")}
            </h1>
            <p className={`max-w-xl text-white/70 ${isTh ? "th-body-lg" : "text-[15px] leading-[1.8] md:text-base"}`}>
              {t("hero.description")}
            </p>
          </div>

          {/* Team photo — right ~45% (on top for mobile) */}
          <div className="w-full bg-[#f2f2f2] lg:w-[45%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TEAM_PHOTO}
              alt="Two Desk Studio Team"
              className="h-full min-h-[300px] w-full object-contain md:min-h-[400px] lg:min-h-full"
            />
          </div>
        </div>
      </section>

      {/* ─── Our Philosophy ─── */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-[120px] lg:px-20 lg:py-[140px]">
        <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-20">
          {/* Heading — left */}
          <div className="lg:w-[40%]">
            <p className={`mb-4 text-[#999] ${isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"}`}>
              Our Philosophy
            </p>
            <h2 className={`text-[#1a1a1a] ${isTh ? "" : "text-[26px] font-bold leading-[1.2] tracking-[-0.01em] md:text-[32px]"}`}>
              {t("philosophy.heading")}
            </h2>
          </div>

          {/* Paragraphs — right */}
          <div className="flex flex-col gap-6 lg:w-[60%]">
            <p className={`text-[#666] ${isTh ? "th-body-lg" : "text-[15px] leading-[1.7]"}`}>
              {t("philosophy.paragraph1")}
            </p>
            <p className={`text-[#666] ${isTh ? "th-body-lg" : "text-[15px] leading-[1.7]"}`}>
              {t("philosophy.paragraph2")}
            </p>
          </div>
        </div>
      </section>

      {/* ─── The Team ─── */}
      <section className="mx-auto max-w-[1440px] px-5 pb-20 md:px-10 md:pb-[120px] lg:px-20 lg:pb-[140px]">
        <p className={`mb-4 text-[#999] ${isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"}`}>
          The Team
        </p>
        <h2 className={`mb-8 text-[#1a1a1a] md:mb-12 ${isTh ? "" : "text-[26px] font-bold tracking-[-0.01em] md:text-[32px]"}`}>
          {t("team.heading")}
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {TEAM_MEMBERS.map(({ key, photo }) => (
            <div key={key} className="group">
              {/* Avatar */}
              <div className="mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-[#f0f0ee]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={t(`team.members.${key}.name`)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className={`mt-1 text-center uppercase text-[#1a1a1a] ${isTh ? "" : "text-lg font-bold tracking-wide md:text-xl"}`}>
                {t(`team.members.${key}.nickname`)}
              </h3>
              <p className={`mt-1 text-center text-[#1a1a1a] ${isTh ? "th-body-sm" : "text-sm font-semibold"}`}>
                {t(`team.members.${key}.name`)}
              </p>
              <p className={`mt-1 text-center text-[#666] ${isTh ? "th-body-sm" : "text-[13px] leading-snug"}`}>
                {t(`team.members.${key}.role`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Our Services ─── */}
      <section className="bg-[#fafaf8]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-[120px] lg:px-20 lg:py-[140px]">
          <p className={`mb-4 text-[#999] ${isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"}`}>
            {t("services.label")}
          </p>
          <h2 className={`mb-8 text-[#1a1a1a] md:mb-12 ${isTh ? "" : "text-[26px] font-bold tracking-[-0.01em] md:text-[32px]"}`}>
            {t("services.heading")}
          </h2>

          <div className="flex flex-col">
            {SERVICES.map((key) => (
              <div
                key={key}
                className="group border-b border-[#e5e5e5] first:border-t"
              >
                <div className="flex flex-col gap-2 py-7 transition-all duration-300 sm:flex-row sm:items-baseline sm:justify-between sm:gap-16 md:py-8 lg:group-hover:px-4">
                  <h3 className={`text-[#1a1a1a] transition-colors duration-300 sm:w-[280px] sm:shrink-0 lg:group-hover:text-[#6b6b6b] ${isTh ? "" : "text-lg font-bold"}`}>
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className={`max-w-xl text-[#666] ${isTh ? "th-body-lg" : "text-[15px] leading-[1.6]"}`}>
                    {t(`services.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <ContactCTA />
    </main>
  );
}
