import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ScrollAnimate from "@/components/scroll-animate";
import { supabaseAdmin } from "@/lib/supabase/admin";

const TAG_STYLES: Record<string, string> = {
  cafe: "bg-[#e8f0fe] text-[#1a73e8]",
  commercial: "bg-[#fce8e6] text-[#d93025]",
  residential: "bg-[#e6f4ea] text-[#1e8e3e]",
  others: "bg-[#fef7e0] text-[#f9ab00]",
};

const TAG_KEYS: Record<string, string> = {
  cafe: "tagCafe",
  commercial: "tagCommercial",
  residential: "tagResidential",
  others: "tagOthers",
};

interface DisplayProject {
  slug: string;
  title: string;
  location: string;
  category: string;
  image: string;
  size: "large" | "small";
}

function ProjectCard({
  project,
  desktopImgHeight,
  tagLabel,
  isTh,
}: {
  project: DisplayProject;
  desktopImgHeight: string;
  tagLabel: string;
  isTh: boolean;
}) {
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
            className={`rounded-[3px] px-2 py-[3px] font-semibold uppercase ${
              TAG_STYLES[project.category] ?? TAG_STYLES.others
            } ${isTh ? "th-eyebrow" : "text-[10px] tracking-[1px]"}`}
          >
            {tagLabel}
          </span>
        </div>
        <h3
          className={`mb-1 transition-colors duration-300 group-hover:text-[#555] ${
            isTh ? "" : "text-lg md:text-xl font-semibold"
          }`}
        >
          {project.title}
        </h3>
        <p className={`text-[#999] ${isTh ? "th-body-sm" : "text-xs md:text-sm"}`}>
          {project.location}
        </p>
      </Link>
    </ScrollAnimate>
  );
}

export default async function Works() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const isTh = locale === "th";

  const { data } = await supabaseAdmin
    .from("projects")
    .select("slug, title_th, title_en, location_th, location_en, category, cover_image")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .limit(4);

  const projects: DisplayProject[] = (data ?? []).map((p, i) => ({
    slug: p.slug,
    title: isTh ? p.title_th : p.title_en,
    location: (isTh ? p.location_th : p.location_en) ?? "",
    category: p.category,
    image: p.cover_image ?? "",
    // Layout: [large, small] | [small, large]
    size: i === 0 || i === 3 ? "large" : "small",
  }));

  if (projects.length === 0) return null;

  const row1 = projects.slice(0, 2);
  const row2 = projects.slice(2, 4);

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-20 py-16 md:py-[100px]">
      <ScrollAnimate>
        <div className="mb-8 md:mb-10 flex items-end justify-between">
          <div>
            <p
              className={`mb-3 md:mb-4 text-[#999] ${
                isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"
              }`}
            >
              {t("worksLabel")}
            </p>
            <h2 className={isTh ? "" : "text-[26px] md:text-[32px] font-bold tracking-tight"}>
              {t("worksTitle")}
            </h2>
          </div>
          <Link
            href="/projects"
            className={`flex items-center gap-1.5 hover:opacity-60 transition-opacity ${
              isTh ? "th-button" : "text-xs md:text-sm"
            }`}
          >
            {t("viewAllProjects")} →
          </Link>
        </div>
      </ScrollAnimate>

      <div className="mb-8 md:mb-10 flex flex-col md:flex-row gap-6">
        {row1.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            desktopImgHeight="md:h-[480px]"
            tagLabel={tc(TAG_KEYS[project.category] ?? "tagOthers")}
            isTh={isTh}
          />
        ))}
      </div>

      {row2.length > 0 && (
        <div className="flex flex-col md:flex-row gap-6">
          {row2.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              desktopImgHeight="md:h-[420px]"
              tagLabel={tc(TAG_KEYS[project.category] ?? "tagOthers")}
              isTh={isTh}
            />
          ))}
        </div>
      )}
    </section>
  );
}
