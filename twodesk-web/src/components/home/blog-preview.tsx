import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import ScrollAnimate from "@/components/scroll-animate";

const ARTICLES = [
  {
    slug: "5-interior-trends",
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/03TSGYRBYJSNM6QFJ9AKVSMD9G.jpg",
    metaKey: "article1Meta",
    titleKey: "article1Title",
    descKey: "article1Desc",
  },
  {
    slug: "flow-the-hub-bts",
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/2RWM1AZK3SASHZ0FDT0YJF33MV.jpg",
    metaKey: "article2Meta",
    titleKey: "article2Title",
    descKey: "article2Desc",
  },
  {
    slug: "hiring-design-studio",
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/2R9N3369092A7S0HFYXFY63TN7.jpg",
    metaKey: "article3Meta",
    titleKey: "article3Title",
    descKey: "article3Desc",
  },
] as const;

export default function BlogPreview() {
  const t = useTranslations("home");
  const tb = useTranslations("blog");
  const locale = useLocale();
  const isTh = locale === "th";
  const thScale = (px: number) => isTh ? `${Math.round(px * 1.35)}px` : undefined;

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-20 py-16 md:py-[100px]">
      {/* Header */}
      <ScrollAnimate>
        <div className="mb-8 md:mb-10 flex items-end justify-between">
          <div>
            <p
              className="mb-3 md:mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]"
              style={isTh ? { fontSize: "18px" } : undefined}
            >
              {t("blogLabel")}
            </p>
            <h2
              className="text-[26px] md:text-[32px] font-bold tracking-tight"
              style={isTh ? { fontSize: thScale(32) } : undefined}
            >
              {t("blogTitle")}
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-xs md:text-sm hover:opacity-60 transition-opacity"
            style={isTh ? { fontSize: "19px" } : undefined}
          >
            {t("viewAllArticles")} →
          </Link>
        </div>
      </ScrollAnimate>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {ARTICLES.map((article, i) => (
          <ScrollAnimate key={i}>
            <Link href={`/blog/${article.slug}`} className="group block">
              <div className="overflow-hidden rounded mb-4">
                <div
                  className="h-[240px] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${article.image}')` }}
                />
              </div>
              <p
                className="mb-2 text-[11px] tracking-[0.5px] text-[#999]"
                style={isTh ? { fontSize: thScale(11) } : undefined}
              >
                {tb(article.metaKey)}
              </p>
              <h3
                className="mb-1.5 text-lg font-semibold leading-[1.4] transition-colors duration-300 group-hover:text-[#555]"
                style={isTh ? { fontSize: "22px" } : undefined}
              >
                {tb(article.titleKey)}
              </h3>
              <p
                className="text-[13px] leading-[1.5] text-[#666]"
                style={isTh ? { fontSize: thScale(13) } : undefined}
              >
                {tb(article.descKey)}
              </p>
            </Link>
          </ScrollAnimate>
        ))}
      </div>

      {/* Mobile layout: featured + horizontal cards */}
      <div className="md:hidden flex flex-col gap-6">
        {/* Featured article */}
        <ScrollAnimate>
          <Link href={`/blog/${ARTICLES[0].slug}`} className="group block">
            <div className="overflow-hidden rounded mb-3">
              <div
                className="h-[200px] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${ARTICLES[0].image}')` }}
              />
            </div>
            <p
              className="mb-1.5 text-[11px] tracking-[0.5px] text-[#999]"
              style={isTh ? { fontSize: thScale(11) } : undefined}
            >
              {tb(ARTICLES[0].metaKey)}
            </p>
            <h3
              className="mb-1 text-base font-semibold leading-[1.4]"
              style={isTh ? { fontSize: "20px" } : undefined}
            >
              {tb(ARTICLES[0].titleKey)}
            </h3>
            <p
              className="text-[12px] leading-[1.5] text-[#666]"
              style={isTh ? { fontSize: thScale(12) } : undefined}
            >
              {tb(ARTICLES[0].descKey)}
            </p>
          </Link>
        </ScrollAnimate>

        {/* Remaining articles as horizontal cards */}
        {ARTICLES.slice(1, 3).map((article, i) => (
          <ScrollAnimate key={i}>
            <Link href={`/blog/${article.slug}`} className="group flex gap-4">
              <div className="overflow-hidden rounded w-[120px] h-[90px] flex-shrink-0">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${article.image}')` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="mb-1 text-[10px] tracking-[0.5px] text-[#999]"
                  style={isTh ? { fontSize: thScale(10) } : undefined}
                >
                  {tb(article.metaKey)}
                </p>
                <h3
                  className="mb-1 text-sm font-semibold leading-[1.3] transition-colors duration-300 group-hover:text-[#555]"
                  style={isTh ? { fontSize: "19px" } : undefined}
                >
                  {tb(article.titleKey)}
                </h3>
                <p
                  className="text-[11px] leading-[1.4] text-[#666] line-clamp-2"
                  style={isTh ? { fontSize: thScale(11) } : undefined}
                >
                  {tb(article.descKey)}
                </p>
              </div>
            </Link>
          </ScrollAnimate>
        ))}
      </div>
    </section>
  );
}
