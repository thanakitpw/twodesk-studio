import { useTranslations, useLocale } from "next-intl";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isTh = locale === "th";

  return (
    <main>
      {/* ─── Contact Header ─── */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 pb-16 pt-28 md:gap-12 md:px-10 md:pb-20 md:pt-36 lg:flex-row lg:gap-20 lg:px-20 lg:pb-24 lg:pt-40">
          {/* Left — heading + description */}
          <div className="lg:w-[55%]">
            <p
              className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]"
              style={isTh ? { fontSize: "18px" } : undefined}
            >
              {t("header.label")}
            </p>
            <h1
              className="mb-6 whitespace-pre-line text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-[#1a1a1a] md:text-[36px] lg:text-[44px]"
              style={isTh ? { fontSize: "44px", lineHeight: 1.3 } : undefined}
            >
              {t("header.heading")}
            </h1>
            <p
              className="max-w-md text-[15px] leading-[1.7] text-[#666]"
              style={isTh ? { fontSize: "20px", lineHeight: 1.6 } : undefined}
            >
              {t("header.description")}
            </p>
          </div>

          {/* Right — contact info */}
          <div className="flex flex-col gap-8 lg:w-[45%] lg:pt-4">
            {/* Email */}
            <div>
              <h3
                className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#999]"
                style={isTh ? { fontSize: "18px" } : undefined}
              >
                {t("info.emailLabel")}
              </h3>
              <a
                href={`mailto:${t("info.email")}`}
                className="text-base text-[#1a1a1a] transition-opacity hover:opacity-60"
                style={isTh ? { fontSize: "20px" } : undefined}
              >
                {t("info.email")}
              </a>
            </div>

            {/* Phone */}
            <div>
              <h3
                className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#999]"
                style={isTh ? { fontSize: "18px" } : undefined}
              >
                {t("info.phoneLabel")}
              </h3>
              <a
                href={`tel:${t("info.phone")}`}
                className="text-base text-[#1a1a1a] transition-opacity hover:opacity-60"
                style={isTh ? { fontSize: "20px" } : undefined}
              >
                {t("info.phone")}
              </a>
            </div>

            {/* Social */}
            <div>
              <h3
                className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#999]"
                style={isTh ? { fontSize: "18px" } : undefined}
              >
                {t("info.socialLabel")}
              </h3>
              <div className="flex flex-col gap-1">
                <a
                  href="https://www.instagram.com/twodesk.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#1a1a1a] transition-opacity hover:opacity-60"
                  style={isTh ? { fontSize: "20px" } : undefined}
                >
                  Instagram {t("info.instagram")}
                </a>
                <a
                  href="https://www.facebook.com/twodeskstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#1a1a1a] transition-opacity hover:opacity-60"
                  style={isTh ? { fontSize: "20px" } : undefined}
                >
                  Facebook {t("info.facebook")}
                </a>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3
                className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#999]"
                style={isTh ? { fontSize: "18px" } : undefined}
              >
                {t("info.locationLabel")}
              </h3>
              <p
                className="text-base text-[#1a1a1a]"
                style={isTh ? { fontSize: "20px" } : undefined}
              >
                {t("info.location")}
              </p>
            </div>

            {/* Hours */}
            <div>
              <h3
                className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#999]"
                style={isTh ? { fontSize: "18px" } : undefined}
              >
                {t("info.hoursLabel")}
              </h3>
              <p
                className="text-base text-[#1a1a1a]"
                style={isTh ? { fontSize: "20px" } : undefined}
              >
                {t("info.hours")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-20">
        <hr className="border-[#e5e4e2]" />
      </div>

      {/* ─── Contact Form ─── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20 lg:px-20 lg:py-24">
          <ContactForm />
        </div>
      </section>

      {/* ─── Google Map ─── */}
      <section>
        <iframe
          src="https://maps.google.com/maps?q=Place+and+Park+Na+Klua+Phra+Samut+Chedi+Samut+Prakan+10290&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[300px] w-full md:h-[450px]"
          title="Twodesk Studio Location"
        />
      </section>
    </main>
  );
}
