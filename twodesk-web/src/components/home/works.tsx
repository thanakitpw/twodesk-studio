import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import ScrollAnimate from "@/components/scroll-animate";

const TAG_STYLES: Record<string, string> = {
  cafe: "bg-[#e8f0fe] text-[#1a73e8]",
  commercial: "bg-[#fce8e6] text-[#d93025]",
  residential: "bg-[#e6f4ea] text-[#1e8e3e]",
};

interface Project {
  image: string;
  tagType: string;
  tagKey: string;
  nameKey: string;
  locationKey: string;
  size: "large" | "small";
  slug: string;
}

const ROW_1: Project[] = [
  {
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/6GMP96ZK01XVNNGBCTJWT2KXQK.jpg",
    tagType: "cafe",
    tagKey: "tagCafe",
    nameKey: "flowName",
    locationKey: "flowLocation",
    size: "large",
    slug: "flow-the-hub",
  },
  {
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5X8HXKMAD0GWBEAV630BRTGVSY.jpg",
    tagType: "commercial",
    tagKey: "tagCommercial",
    nameKey: "officeName",
    locationKey: "officeLocation",
    size: "small",
    slug: "office-sakaew",
  },
];

const ROW_2: Project[] = [
  {
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/0KATTQ0NYTF7T4QVKDX0QH44BC.jpg",
    tagType: "cafe",
    tagKey: "tagCafe",
    nameKey: "bbambbmName",
    locationKey: "bbambbmLocation",
    size: "small",
    slug: "bbambbm-cafe",
  },
  {
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/7SKG9HWSF8DXDA2H3V0RPN1XS2.jpg",
    tagType: "residential",
    tagKey: "tagResidential",
    nameKey: "mmName",
    locationKey: "mmLocation",
    size: "large",
    slug: "mm-bridal-house",
  },
];

// Hardcoded project data (not in translations)
const PROJECT_DATA: Record<string, { name: string; location: string }> = {
  flowName: { name: "Flow the Hub", location: "Bangkok, Thailand" },
  officeName: { name: "Office Sakaew", location: "Sakaew, Thailand" },
  bbambbmName: { name: "Bbambbm Cafe", location: "Bangkok, Thailand" },
  mmName: { name: "MM Bridal House", location: "Bangkok, Thailand" },
};

function ProjectCard({
  project,
  desktopImgHeight,
  tagLabel,
  isTh,
}: {
  project: Project;
  desktopImgHeight: string;
  tagLabel: string;
  isTh: boolean;
}) {
  const thScale = (px: number) => isTh ? `${Math.round(px * 1.35)}px` : undefined;
  const data = PROJECT_DATA[project.nameKey];

  return (
    <ScrollAnimate
      className={`min-w-0 ${
        project.size === "large" ? "md:flex-[733]" : "md:flex-[523]"
      }`}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="overflow-hidden rounded mb-3 md:mb-4">
          <div
            className={`h-[240px] ${desktopImgHeight} bg-cover bg-center transition-transform duration-500 group-hover:scale-105`}
            style={{ backgroundImage: `url('${project.image}')` }}
          />
        </div>
        <div className="mb-1.5 flex gap-2">
          <span
            className={`rounded-[3px] px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[1px] ${TAG_STYLES[project.tagType]}`}
            style={isTh ? { fontSize: thScale(10) } : undefined}
          >
            {tagLabel}
          </span>
        </div>
        <h3
          className="mb-1 text-lg md:text-xl font-semibold transition-colors duration-300 group-hover:text-[#555]"
          style={isTh ? { fontSize: "22px" } : undefined}
        >
          {data.name}
        </h3>
        <p
          className="text-xs md:text-sm text-[#999]"
          style={isTh ? { fontSize: "19px" } : undefined}
        >
          {data.location}
        </p>
      </Link>
    </ScrollAnimate>
  );
}

export default function Works() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
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
              {t("worksLabel")}
            </p>
            <h2
              className="text-[26px] md:text-[32px] font-bold tracking-tight"
              style={isTh ? { fontSize: thScale(32) } : undefined}
            >
              {t("worksTitle")}
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-xs md:text-sm hover:opacity-60 transition-opacity"
            style={isTh ? { fontSize: "19px" } : undefined}
          >
            {t("viewAllProjects")} →
          </Link>
        </div>
      </ScrollAnimate>

      {/* Row 1 */}
      <div className="mb-8 md:mb-10 flex flex-col md:flex-row gap-6">
        {ROW_1.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            desktopImgHeight="md:h-[480px]"
            tagLabel={tc(project.tagKey)}
            isTh={isTh}
          />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex flex-col md:flex-row gap-6">
        {ROW_2.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            desktopImgHeight="md:h-[420px]"
            tagLabel={tc(project.tagKey)}
            isTh={isTh}
          />
        ))}
      </div>
    </section>
  );
}
