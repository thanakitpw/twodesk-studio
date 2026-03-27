import { useTranslations } from "next-intl";
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
  },
  {
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/5X8HXKMAD0GWBEAV630BRTGVSY.jpg",
    tagType: "commercial",
    tagKey: "tagCommercial",
    nameKey: "officeName",
    locationKey: "officeLocation",
    size: "small",
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
  },
  {
    image:
      "https://workers.paper.design/file-assets/01KKH1XNYR2JH27ZNJAM5Y6B8Q/7SKG9HWSF8DXDA2H3V0RPN1XS2.jpg",
    tagType: "residential",
    tagKey: "tagResidential",
    nameKey: "mmName",
    locationKey: "mmLocation",
    size: "large",
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
  imgHeight,
  tagLabel,
}: {
  project: Project;
  imgHeight: string;
  tagLabel: string;
}) {
  const data = PROJECT_DATA[project.nameKey];

  return (
    <ScrollAnimate
      className={`min-w-0 ${
        project.size === "large" ? "flex-[733]" : "flex-[523]"
      }`}
    >
      <div
        className={`${imgHeight} mb-4 rounded bg-cover bg-center`}
        style={{ backgroundImage: `url('${project.image}')` }}
      />
      <div className="mb-1.5 flex gap-2">
        <span
          className={`rounded-[3px] px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[1px] ${TAG_STYLES[project.tagType]}`}
        >
          {tagLabel}
        </span>
      </div>
      <h3 className="mb-1 text-xl font-semibold">{data.name}</h3>
      <p className="text-sm text-[#999]">{data.location}</p>
    </ScrollAnimate>
  );
}

export default function Works() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <section className="mx-auto max-w-[1440px] px-20 py-[100px]">
      {/* Header */}
      <ScrollAnimate>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]">
              {t("worksLabel")}
            </p>
            <h2 className="text-[32px] font-bold tracking-tight">
              {t("worksTitle")}
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm hover:opacity-60"
          >
            {t("viewAllProjects")} →
          </a>
        </div>
      </ScrollAnimate>

      {/* Row 1 */}
      <div className="mb-10 flex gap-6">
        {ROW_1.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            imgHeight="h-[480px]"
            tagLabel={tc(project.tagKey)}
          />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex gap-6">
        {ROW_2.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            imgHeight="h-[420px]"
            tagLabel={tc(project.tagKey)}
          />
        ))}
      </div>
    </section>
  );
}
