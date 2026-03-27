import { useTranslations } from "next-intl";
import ContactCTA from "@/components/ContactCTA";

const TEAM_PHOTO =
  "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5SSJHKWF80EZ17391VTRASH3RT.jpg";

const TEAM_MEMBERS = ["nut", "gun", "ping", "yo"] as const;

const SERVICES = ["interior", "architecture", "furniture", "craft"] as const;

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main>
      {/* ─── About Hero ─── */}
      <section className="bg-black">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row">
          {/* Text — left 60% */}
          <div className="flex flex-col justify-center px-10 py-16 lg:w-[60%] lg:px-20 lg:py-24">
            <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-white/50">
              {t("hero.label")}
            </p>
            <h1 className="mb-6 text-[36px] font-bold leading-[1.15] tracking-[-0.02em] text-white lg:text-[48px]">
              {t("hero.heading")}
            </h1>
            <p className="max-w-xl text-[15px] leading-[1.7] text-white/70">
              {t("hero.description")}
            </p>
          </div>

          {/* Team photo — right 40% */}
          <div className="lg:w-[40%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TEAM_PHOTO}
              alt="Two Desk Studio Team"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── Our Philosophy ─── */}
      <section className="mx-auto max-w-[1440px] px-10 py-[100px] lg:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Heading — left */}
          <div className="lg:w-[40%]">
            <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#1a1a1a]">
              {t("philosophy.heading")}
            </h2>
          </div>

          {/* Paragraphs — right */}
          <div className="flex flex-col gap-6 lg:w-[60%]">
            <p className="text-[15px] leading-[1.7] text-[#666]">
              {t("philosophy.paragraph1")}
            </p>
            <p className="text-[15px] leading-[1.7] text-[#666]">
              {t("philosophy.paragraph2")}
            </p>
          </div>
        </div>
      </section>

      {/* ─── The Team ─── */}
      <section className="mx-auto max-w-[1440px] px-10 pb-[100px] lg:px-20">
        <h2 className="mb-12 text-[32px] font-bold tracking-[-0.01em] text-[#1a1a1a]">
          {t("team.heading")}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((key) => (
            <div key={key} className="group">
              {/* Photo placeholder */}
              <div className="mb-4 aspect-[3/4] overflow-hidden rounded bg-[#f7f7f5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={TEAM_PHOTO}
                  alt={t(`team.members.${key}.name`)}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#999]">
                {t(`team.members.${key}.nickname`)}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-[#1a1a1a]">
                {t(`team.members.${key}.name`)}
              </h3>
              <p className="mt-0.5 text-sm text-[#666]">
                {t(`team.members.${key}.role`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Our Services ─── */}
      <section className="bg-[#fafaf8]">
        <div className="mx-auto max-w-[1440px] px-10 py-[100px] lg:px-20">
          <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]">
            {t("services.label")}
          </p>
          <h2 className="mb-12 text-[32px] font-bold tracking-[-0.01em] text-[#1a1a1a]">
            {t("services.heading")}
          </h2>

          <div className="flex flex-col divide-y divide-[#e5e5e5]">
            {SERVICES.map((key) => (
              <div
                key={key}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:gap-16"
              >
                <h3 className="text-lg font-bold text-[#1a1a1a] sm:w-[280px] sm:shrink-0">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-[15px] leading-[1.6] text-[#666]">
                  {t(`services.${key}.description`)}
                </p>
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
