import { useTranslations } from "next-intl";
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

  return (
    <section className="mx-auto max-w-[1440px] px-20 py-[100px]">
      {/* Header */}
      <ScrollAnimate>
        <div className="mb-12 flex items-start justify-between">
          <div>
            <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]">
              {t("servicesLabel")}
            </p>
            <h2 className="text-[32px] font-bold tracking-tight">
              {t("servicesTitle")}
            </h2>
          </div>
          <p className="max-w-[480px] text-right text-base font-light leading-[26px] text-[#6b6b6b]">
            {t("servicesDescription")}
          </p>
        </div>
      </ScrollAnimate>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-6">
        {SERVICE_KEYS.map((service, i) => (
          <ScrollAnimate key={i}>
            <div className="overflow-hidden rounded-lg bg-[#f7f7f5]">
              <div
                className="h-[220px] rounded bg-cover bg-center"
                style={{ backgroundImage: `url('${SERVICE_IMAGES[i]}')` }}
              />
              <div className="px-6 py-5">
                <h3 className="mb-2 text-base font-bold">
                  {t(service.title)}
                </h3>
                <p className="text-[13px] leading-[1.5] text-[#666]">
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
