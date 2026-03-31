import { useTranslations, useLocale } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

const SERVICE_IMAGES = [
  "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/18Y5H56H4XXT7N1EBAQC66BNGQ.jpg",
  "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/44EPN6QM4HTSKZRVA2RF46KKNZ.jpg",
  "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5T4MG4PFG9CJQP4K88TE39231Q.jpg",
  "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/3XERBP1M9AKCAEAFMZN1CX4RSW.jpg",
];

const SERVICE_KEYS = [
  { title: "serviceInteriorTitle", desc: "serviceInteriorDesc" },
  { title: "serviceArchTitle", desc: "serviceArchDesc" },
  { title: "serviceFurnitureTitle", desc: "serviceFurnitureDesc" },
  { title: "serviceCraftTitle", desc: "serviceCraftDesc" },
] as const;

export default function Services() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isTh = locale === "th";
  const thScale = (px: number) => isTh ? `${Math.round(px * 1.35)}px` : undefined;

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-20 py-16 md:py-[100px]">
      {/* Header */}
      <ScrollAnimate>
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <p className="mb-3 md:mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]" style={isTh ? { fontSize: "18px" } : undefined}>
              {t("servicesLabel")}
            </p>
            <h2
              className="text-[26px] md:text-[32px] font-bold tracking-tight"
              style={isTh ? { fontSize: thScale(32) } : undefined}
            >
              {t("servicesTitle")}
            </h2>
          </div>
          <p className="max-w-[480px] md:text-right text-sm md:text-base font-light leading-[24px] md:leading-[26px] text-[#6b6b6b]" style={isTh ? { fontSize: "20px", lineHeight: 1.6 } : undefined}>
            {t("servicesDescription")}
          </p>
        </div>
      </ScrollAnimate>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {SERVICE_KEYS.map((service, i) => (
          <ScrollAnimate key={i}>
            <div className="group overflow-hidden rounded-lg bg-[#f7f7f5] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <div className="overflow-hidden rounded">
                <div
                  className="h-[140px] md:h-[220px] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${SERVICE_IMAGES[i]}')` }}
                />
              </div>
              <div className="px-4 md:px-6 py-4 md:py-5">
                <h3 className="mb-1.5 md:mb-2 text-sm md:text-base font-bold transition-colors duration-300 group-hover:text-[#555]" style={isTh ? { fontSize: "22px" } : undefined}>
                  {t(service.title)}
                </h3>
                <p
                  className="text-[12px] md:text-[13px] leading-[1.5] text-[#666]"
                  style={isTh ? { fontSize: "17px", lineHeight: 1.5 } : undefined}
                >
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
