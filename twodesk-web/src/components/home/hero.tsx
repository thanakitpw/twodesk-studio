import { useTranslations, useLocale } from "next-intl";

export default function Hero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isTh = locale === "th";
  const thScale = (px: number) => isTh ? `${Math.round(px * 1.35)}px` : undefined;

  return (
    <section className="relative h-[420px] md:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5ZBHYX54W047K1FN4NSANHGY8Y.jpg"
        alt="Hero"
        className="h-full w-full object-cover"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px] md:h-[360px]"
        style={{
          background:
            "linear-gradient(to top, rgba(250,250,248,0.95) 0%, rgba(250,250,248,0.7) 50%, transparent 100%)",
        }}
      />

      {/* Text */}
      <div className="absolute bottom-10 md:bottom-16 left-5 md:left-20 right-5 md:right-auto">
        <h1
          className={`mb-3 md:mb-4 font-bold tracking-tight text-[#1a1a1a] ${
            isTh
              ? "text-[36px] md:text-[56px] leading-[1.2] md:leading-[1.15]"
              : "text-[32px] md:text-[56px] leading-[38px] md:leading-[64px]"
          }`}
          style={isTh ? { fontSize: undefined } : undefined}
        >
          {t("heroTitle")
            .split("\n")
            .map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
        </h1>
        <p
          className={`font-light text-[#4a4a4a] ${
            isTh
              ? "text-[15px] md:text-[17px]"
              : "text-[14px] md:text-[17px]"
          }`}
          style={isTh ? { fontSize: undefined } : undefined}
        >
          {t("heroSubtitle")}
        </p>
      </div>
    </section>
  );
}
