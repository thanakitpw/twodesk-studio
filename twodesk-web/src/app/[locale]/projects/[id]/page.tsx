import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { projects as fallbackProjects } from '@/lib/data';
import ProjectGallery from '@/components/ProjectGallery';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateStaticParams() {
  try {
    const { data } = await supabaseAdmin
      .from('projects')
      .select('slug')
      .eq('status', 'published');

    if (data && data.length > 0) {
      return data.map((p) => ({ id: p.slug }));
    }
  } catch {
    // fallback
  }
  return fallbackProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id, locale } = await params;

  try {
    const { data } = await supabaseAdmin
      .from('projects')
      .select('title_th, title_en, description_th, description_en')
      .eq('slug', id)
      .single();

    if (data) {
      const title = locale === 'th' ? data.title_th : data.title_en;
      const description = locale === 'th' ? data.description_th : data.description_en;
      return { title: `${title} — TWO DESK`, description };
    }
  } catch {
    // fallback
  }

  const project = fallbackProjects.find((p) => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — TWO DESK`,
    description: project.description,
  };
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  cafe: { bg: 'bg-[#e8f0fe]', text: 'text-[#1a73e8]' },
  commercial: { bg: 'bg-[#fce8e6]', text: 'text-[#d93025]' },
  residential: { bg: 'bg-[#e6f4ea]', text: 'text-[#1e8e3e]' },
  others: { bg: 'bg-[#fef7e0]', text: 'text-[#f9ab00]' },
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations('projects');

  // Try fetching from Supabase
  let project: {
    title: string;
    category: string;
    location: string;
    year: string;
    area?: string;
    description: string;
    image: string;
    images: string[];
    imageGroups?: { label: string; images: string[] }[];
  } | null = null;

  let allProjectSlugs: string[] = [];

  try {
    const { data } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('slug', id)
      .single();

    if (data) {
      project = {
        title: locale === 'th' ? data.title_th : data.title_en,
        category: data.category,
        location: locale === 'th' ? data.location_th : data.location_en,
        year: String(data.year),
        area: data.area_sqm ? `${data.area_sqm} sq.m.` : undefined,
        description: locale === 'th' ? data.description_th : data.description_en,
        image: data.cover_image,
        images: data.images ?? [],
        imageGroups: data.image_groups ?? [],
      };

      // Get all slugs for next project navigation
      const { data: allProjects } = await supabaseAdmin
        .from('projects')
        .select('slug')
        .eq('status', 'published')
        .order('sort_order');

      if (allProjects) {
        allProjectSlugs = allProjects.map((p) => p.slug);
      }
    }
  } catch {
    // fallback below
  }

  // Fallback to static data
  if (!project) {
    const staticProject = fallbackProjects.find((p) => p.id === id);
    if (!staticProject) notFound();

    project = {
      title: staticProject.title,
      category: staticProject.category,
      location: staticProject.location,
      year: staticProject.year,
      area: staticProject.area,
      description: staticProject.description,
      image: staticProject.image,
      images: staticProject.images ?? [staticProject.image],
      imageGroups: staticProject.imageGroups,
    };
    allProjectSlugs = fallbackProjects.map((p) => p.id);
  }

  // Find next project
  const currentIndex = allProjectSlugs.indexOf(id);
  const nextSlug = allProjectSlugs[(currentIndex + 1) % allProjectSlugs.length];

  // Get next project title
  let nextTitle = '';
  try {
    const { data: nextData } = await supabaseAdmin
      .from('projects')
      .select('title_th, title_en')
      .eq('slug', nextSlug)
      .single();

    if (nextData) {
      nextTitle = locale === 'th' ? nextData.title_th : nextData.title_en;
    }
  } catch {
    // fallback
  }

  if (!nextTitle) {
    const nextStatic = fallbackProjects.find((p) => p.id === nextSlug);
    nextTitle = nextStatic?.title ?? '';
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <section className="relative h-[35vh] w-full md:h-[70vh]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      {/* Project Info */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-20 md:py-16">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#999] transition-colors hover:text-[#1a1a1a]"
        >
          <span>&larr;</span>
          <span>{t('backToProjects')}</span>
        </Link>

        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex gap-2">
              <span
                className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  categoryColors[project.category]?.bg ?? 'bg-gray-100'
                } ${categoryColors[project.category]?.text ?? 'text-gray-600'}`}
              >
                {project.category}
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
              {project.title}
            </h1>
            <p className="text-base font-light leading-relaxed text-[#6b6b6b]">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-[#e5e5e5] pt-4 md:grid-cols-1 md:shrink-0 md:gap-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#999] md:text-xs">
                {t('location')}
              </p>
              <p className="text-xs font-medium text-[#1a1a1a] md:text-sm">
                {project.location}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#999] md:text-xs">
                {t('year')}
              </p>
              <p className="text-xs font-medium text-[#1a1a1a] md:text-sm">
                {project.year}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#999] md:text-xs">
                {t('category')}
              </p>
              <p className="text-xs font-medium capitalize text-[#1a1a1a] md:text-sm">
                {project.category}
              </p>
            </div>
            {project.area && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#999] md:text-xs">
                  Area
                </p>
                <p className="text-xs font-medium text-[#1a1a1a] md:text-sm">
                  {project.area}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Image Gallery with Tabs + Lightbox */}
        <div className="mb-10 md:mb-16">
          <ProjectGallery
            images={project.images.length > 0 ? project.images : [project.image]}
            imageGroups={project.imageGroups}
            title={project.title}
          />
        </div>

        {/* Next Project */}
        {nextSlug && nextTitle && (
          <div className="border-t border-[#e5e5e5] pt-8 md:pt-12">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#999]">
              {t('nextProject')}
            </p>
            <Link
              href={`/projects/${nextSlug}`}
              className="group inline-flex items-center gap-3"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] transition-colors group-hover:text-[#999] md:text-3xl">
                {nextTitle}
              </h2>
              <span className="text-2xl text-[#999] transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
