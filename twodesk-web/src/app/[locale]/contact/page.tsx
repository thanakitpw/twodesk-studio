import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <main>
      {/* ─── Contact Header ─── */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-10 pb-16 pt-32 lg:flex-row lg:gap-20 lg:px-20">
          {/* Left — heading + description */}
          <div className="lg:w-[55%]">
            <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]">
              {t("header.label")}
            </p>
            <h1 className="mb-6 whitespace-pre-line text-[44px] font-bold leading-[1.15] tracking-[-0.02em] text-[#1a1a1a]">
              {t("header.heading")}
            </h1>
            <p className="max-w-md text-[15px] leading-[1.7] text-[#666]">
              {t("header.description")}
            </p>
          </div>

          {/* Right — contact info */}
          <div className="flex flex-col gap-8 lg:w-[45%] lg:pt-8">
            {/* Email */}
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#999]">
                {t("info.emailLabel")}
              </h3>
              <a
                href={`mailto:${t("info.email")}`}
                className="text-base text-[#1a1a1a] transition-opacity hover:opacity-60"
              >
                {t("info.email")}
              </a>
            </div>

            {/* Social */}
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#999]">
                {t("info.socialLabel")}
              </h3>
              <div className="flex flex-col gap-1">
                <a
                  href="https://www.instagram.com/twodesk.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#1a1a1a] transition-opacity hover:opacity-60"
                >
                  Instagram {t("info.instagram")}
                </a>
                <a
                  href="https://www.facebook.com/twodeskstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#1a1a1a] transition-opacity hover:opacity-60"
                >
                  Facebook {t("info.facebook")}
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#999]">
                {t("info.locationLabel")}
              </h3>
              <p className="text-base text-[#1a1a1a]">{t("info.location")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact Form ─── */}
      <section className="bg-[#fafaf8]">
        <div className="mx-auto max-w-[1440px] px-10 py-[80px] lg:px-20">
          <div className="mx-auto max-w-[800px]">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Map Placeholder ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-10 pb-20 lg:px-20">
          <div className="flex h-[400px] items-center justify-center rounded bg-[#e5e5e5]">
            <p className="text-base text-[#999]">{t("map.text")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
