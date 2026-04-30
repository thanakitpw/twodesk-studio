import { useTranslations, useLocale } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

// Order matches About page services list
const SERVICES = [
  {
    title: "serviceArchTitle",
    desc: "serviceArchDesc",
    image: "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/44EPN6QM4HTSKZRVA2RF46KKNZ.jpg",
  },
  {
    title: "serviceInteriorTitle",
    desc: "serviceInteriorDesc",
    image: "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/18Y5H56H4XXT7N1EBAQC66BNGQ.jpg",
  },
  {
    title: "serviceEngineeringTitle",
    desc: "serviceEngineeringDesc",
    image: "/images/about-working.jpg",
  },
  {
    title: "serviceConsultTitle",
    desc: "serviceConsultDesc",
    image: "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/3XERBP1M9AKCAEAFMZN1CX4RSW.jpg",
  },
  {
    title: "serviceFurnitureTitle",
    desc: "serviceFurnitureDesc",
    image: "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5T4MG4PFG9CJQP4K88TE39231Q.jpg",
  },
] as const;

export default function Services() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isTh = locale === "th";

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-20 py-16 md:py-[100px]">
      {/* Header */}
      <ScrollAnimate>
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <p className={`mb-3 md:mb-4 text-[#999] ${isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"}`}>
              {t("servicesLabel")}
            </p>
            <h2 className={isTh ? "" : "text-[26px] md:text-[32px] font-bold tracking-tight"}>
              {t("servicesTitle")}
            </h2>
          </div>
          <p className={`max-w-[480px] md:text-right text-[#6b6b6b] ${isTh ? "th-body-lg" : "text-sm md:text-base font-light leading-[24px] md:leading-[26px]"}`}>
            {t("servicesDescription")}
          </p>
        </div>
      </ScrollAnimate>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {SERVICES.map((service, i) => (
          <ScrollAnimate key={i}>
            <div className="group overflow-hidden rounded-lg bg-[#f7f7f5] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full flex flex-col">
              <div className="overflow-hidden rounded">
                <div
                  className="h-[140px] md:h-[180px] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
              </div>
              <div className="px-4 md:px-5 py-4 md:py-5 flex-1">
                <h3 className={`mb-1.5 md:mb-2 transition-colors duration-300 group-hover:text-[#555] ${isTh ? "" : "text-sm md:text-base font-bold"}`}>
                  {t(service.title)}
                </h3>
                <p className={`text-[#666] ${isTh ? "th-body-sm" : "text-[12px] md:text-[13px] leading-[1.5]"}`}>
                  {t(service.desc)}
                </p>
              </div>
            </div>
          </ScrollAnimate>
        ))}
      </div>
    </section>
  );
}
