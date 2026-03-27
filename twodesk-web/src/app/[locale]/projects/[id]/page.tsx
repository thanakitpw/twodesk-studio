import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { projects } from '@/lib/data';

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
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
  const { id } = await params;
  const t = await getTranslations('projects');
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <section className="relative h-[50vh] w-full md:h-[70vh]">
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
      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-20">
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

          <div className="shrink-0 space-y-4 border-t border-[#e5e5e5] pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#999]">
                {t('location')}
              </p>
              <p className="text-sm font-medium text-[#1a1a1a]">
                {project.location}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#999]">
                {t('year')}
              </p>
              <p className="text-sm font-medium text-[#1a1a1a]">
                {project.year}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#999]">
                {t('category')}
              </p>
              <p className="text-sm font-medium capitalize text-[#1a1a1a]">
                {project.category}
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery (placeholder using same image) */}
        <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src={project.image}
              alt={`${project.title} — Detail 1`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded">
            <Image
              src={project.image}
              alt={`${project.title} — Detail 2`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded md:col-span-2">
            <Image
              src={project.image}
              alt={`${project.title} — Detail 3`}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Next Project */}
        <div className="border-t border-[#e5e5e5] pt-12">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#999]">
            {t('nextProject')}
          </p>
          <Link
            href={`/projects/${nextProject.id}`}
            className="group inline-flex items-center gap-3"
          >
            <h2 className="text-2xl font-bold text-[#1a1a1a] transition-colors group-hover:text-[#999] md:text-3xl">
              {nextProject.title}
            </h2>
            <span className="text-2xl text-[#999] transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
