import { useTranslations } from "next-intl";
import ScrollAnimate from "@/components/scroll-animate";

const ARTICLES = [
  {
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/03TSGYRBYJSNM6QFJ9AKVSMD9G.jpg",
    metaKey: "article1Meta",
    titleKey: "article1Title",
    descKey: "article1Desc",
  },
  {
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/2RWM1AZK3SASHZ0FDT0YJF33MV.jpg",
    metaKey: "article2Meta",
    titleKey: "article2Title",
    descKey: "article2Desc",
  },
  {
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

  return (
    <section className="mx-auto max-w-[1440px] px-20 py-[100px]">
      {/* Header */}
      <ScrollAnimate>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]">
              {t("blogLabel")}
            </p>
            <h2 className="text-[32px] font-bold tracking-tight">
              {t("blogTitle")}
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm hover:opacity-60"
          >
            {t("viewAllArticles")} →
          </a>
        </div>
      </ScrollAnimate>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-6">
        {ARTICLES.map((article, i) => (
          <ScrollAnimate key={i}>
            <div
              className="mb-4 h-[240px] rounded bg-cover bg-center"
              style={{ backgroundImage: `url('${article.image}')` }}
            />
            <p className="mb-2 text-[11px] tracking-[0.5px] text-[#999]">
              {tb(article.metaKey)}
            </p>
            <h3 className="mb-1.5 text-lg font-semibold leading-[1.4]">
              {tb(article.titleKey)}
            </h3>
            <p className="text-[13px] leading-[1.5] text-[#666]">
              {tb(article.descKey)}
            </p>
          </ScrollAnimate>
        ))}
      </div>
    </section>
  );
}
