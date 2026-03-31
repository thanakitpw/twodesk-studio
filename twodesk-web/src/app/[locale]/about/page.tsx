import { useTranslations, useLocale } from "next-intl";
import ContactCTA from "@/components/ContactCTA";

const TEAM_PHOTO =
  "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5SSJHKWF80EZ17391VTRASH3RT.jpg";

const TEAM_MEMBERS = [
  {
    key: "nut" as const,
    photo:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/6GMP96ZK01XVNNGBCTJWT2KXQK.jpg",
  },
  {
    key: "gun" as const,
    photo:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5X8HXKMAD0GWBEAV630BRTGVSY.jpg",
  },
  {
    key: "ping" as const,
    photo:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/2RWM1AZK3SASHZ0FDT0YJF33MV.jpg",
  },
  {
    key: "yo" as const,
    photo:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/0KATTQ0NYTF7T4QVKDX0QH44BC.jpg",
  },
];

const SERVICES = ["interior", "architecture", "furniture", "craft"] as const;

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
            <p
              className="mb-5 text-xs font-normal uppercase tracking-[0.2em] text-white/50"
              style={isTh ? { fontSize: "18px" } : undefined}
            >
              {t("hero.label")}
            </p>
            <h1
              className="mb-6 text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-white md:text-[40px] lg:text-[52px]"
              style={isTh ? { fontSize: "52px", lineHeight: 1.3 } : undefined}
            >
              {t("hero.heading")}
            </h1>
            <p
              className="max-w-xl text-[15px] leading-[1.8] text-white/70 md:text-base"
              style={isTh ? { fontSize: "20px", lineHeight: 1.6 } : undefined}
            >
              {t("hero.description")}
            </p>
          </div>

          {/* Team photo — right ~45% (on top for mobile) */}
          <div className="w-full lg:w-[45%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TEAM_PHOTO}
              alt="Two Desk Studio Team"
              className="h-full min-h-[300px] w-full object-cover md:min-h-[400px] lg:min-h-full"
            />
          </div>
        </div>
      </section>

      {/* ─── Our Philosophy ─── */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-[120px] lg:px-20 lg:py-[140px]">
        <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-20">
          {/* Heading — left */}
          <div className="lg:w-[40%]">
            <p
              className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]"
              style={isTh ? { fontSize: "18px" } : undefined}
            >
              Our Philosophy
            </p>
            <h2
              className="text-[26px] font-bold leading-[1.2] tracking-[-0.01em] text-[#1a1a1a] md:text-[32px]"
              style={isTh ? { fontSize: "36px", lineHeight: 1.3 } : undefined}
            >
              {t("philosophy.heading")}
            </h2>
          </div>

          {/* Paragraphs — right */}
          <div className="flex flex-col gap-6 lg:w-[60%]">
            <p
              className="text-[15px] leading-[1.7] text-[#666]"
              style={isTh ? { fontSize: "20px", lineHeight: 1.6 } : undefined}
            >
              {t("philosophy.paragraph1")}
            </p>
            <p
              className="text-[15px] leading-[1.7] text-[#666]"
              style={isTh ? { fontSize: "20px", lineHeight: 1.6 } : undefined}
            >
              {t("philosophy.paragraph2")}
            </p>
          </div>
        </div>
      </section>

      {/* ─── The Team ─── */}
      <section className="mx-auto max-w-[1440px] px-5 pb-20 md:px-10 md:pb-[120px] lg:px-20 lg:pb-[140px]">
        <p
          className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]"
          style={isTh ? { fontSize: "18px" } : undefined}
        >
          The Team
        </p>
        <h2
          className="mb-8 text-[26px] font-bold tracking-[-0.01em] text-[#1a1a1a] md:mb-12 md:text-[32px]"
          style={isTh ? { fontSize: "36px", lineHeight: 1.3 } : undefined}
        >
          {t("team.heading")}
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {TEAM_MEMBERS.map(({ key, photo }) => (
            <div key={key} className="group">
              {/* Avatar */}
              <div className="mb-4 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl bg-[#f0f0ee]">
                <span className="text-5xl font-bold uppercase text-[#c0c0c0] md:text-6xl">
                  {t(`team.members.${key}.nickname`).charAt(0)}
                </span>
              </div>
              <h3
                className="mt-1 text-center text-lg font-bold uppercase tracking-wide text-[#1a1a1a] md:text-xl"
                style={isTh ? { fontSize: "22px" } : undefined}
              >
                {t(`team.members.${key}.nickname`)}
              </h3>
              <p
                className="mt-1 text-center text-sm font-semibold text-[#1a1a1a]"
                style={isTh ? { fontSize: "19px" } : undefined}
              >
                {t(`team.members.${key}.name`)}
              </p>
              <p
                className="mt-1 text-center text-[13px] leading-snug text-[#666]"
                style={isTh ? { fontSize: "18px", lineHeight: 1.5 } : undefined}
              >
                {t(`team.members.${key}.role`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Our Services ─── */}
      <section className="bg-[#fafaf8]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-[120px] lg:px-20 lg:py-[140px]">
          <p
            className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]"
            style={isTh ? { fontSize: "18px" } : undefined}
          >
            {t("services.label")}
          </p>
          <h2
            className="mb-8 text-[26px] font-bold tracking-[-0.01em] text-[#1a1a1a] md:mb-12 md:text-[32px]"
            style={isTh ? { fontSize: "36px", lineHeight: 1.3 } : undefined}
          >
            {t("services.heading")}
          </h2>

          <div className="flex flex-col">
            {SERVICES.map((key) => (
              <div
                key={key}
                className="group border-b border-[#e5e5e5] first:border-t"
              >
                <div className="flex flex-col gap-2 py-7 transition-all duration-300 sm:flex-row sm:items-baseline sm:justify-between sm:gap-16 md:py-8 lg:group-hover:px-4">
                  <h3
                    className="text-lg font-bold text-[#1a1a1a] transition-colors duration-300 sm:w-[280px] sm:shrink-0 lg:group-hover:text-[#6b6b6b]"
                    style={isTh ? { fontSize: "22px" } : undefined}
                  >
                    {t(`services.${key}.title`)}
                  </h3>
                  <p
                    className="max-w-xl text-[15px] leading-[1.6] text-[#666]"
                    style={isTh ? { fontSize: "20px", lineHeight: 1.6 } : undefined}
                  >
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
