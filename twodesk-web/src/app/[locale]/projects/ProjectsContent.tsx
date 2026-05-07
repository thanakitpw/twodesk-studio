'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { motion, type Variants } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  area?: string;
  description: string;
  image: string;
  images?: string[];
  imageGroups?: { label: string; images: string[] }[];
}

const categories = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'commercial', labelKey: 'filterCommercial' },
  { key: 'cafe', labelKey: 'filterCafe' },
  { key: 'residential', labelKey: 'filterResidential' },
  { key: 'others', labelKey: 'filterOthers' },
] as const;

const categoryColors: Record<string, { bg: string; text: string }> = {
  cafe: { bg: 'bg-[#e8f0fe]', text: 'text-[#1a73e8]' },
  commercial: { bg: 'bg-[#fce8e6]', text: 'text-[#d93025]' },
  residential: { bg: 'bg-[#e6f4ea]', text: 'text-[#1e8e3e]' },
  others: { bg: 'bg-[#fef7e0]', text: 'text-[#f9ab00]' },
};

const tabPalette: Record<string, { solid: string; tint: string }> = {
  all: { solid: '#1a1a1a', tint: '#f1f1f1' },
  commercial: { solid: '#d93025', tint: '#fce8e6' },
  cafe: { solid: '#1a73e8', tint: '#e8f0fe' },
  residential: { solid: '#1e8e3e', tint: '#e6f4ea' },
  others: { solid: '#f9ab00', tint: '#fef7e0' },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

export default function ProjectsContent({ projects }: { projects: ProjectItem[] }) {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isTh = locale === 'th';
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 9;

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter, projects],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [activeFilter]);

  const goTo = (p: number) => {
    setPage(p);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-8 md:px-20 md:pt-32 md:pb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-4 text-[#999] ${isTh ? "th-eyebrow" : "text-xs font-normal uppercase tracking-[0.2em]"}`}
        >
          {t('label')}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mb-4 text-[#1a1a1a] ${isTh ? "" : "text-4xl font-bold tracking-tight md:text-5xl"}`}
        >
          {t('heading')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`max-w-lg text-[#6b6b6b] ${isTh ? "th-body-lg" : "text-base font-light leading-relaxed"}`}
        >
          {t('description')}
        </motion.p>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-[1440px] px-5 pb-8 md:px-20 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 md:gap-3"
        >
          {categories.map((cat) => {
            const palette = tabPalette[cat.key];
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`rounded-full border px-4 py-1.5 md:px-5 md:py-2 transition-all ${isTh ? "th-button" : "text-xs md:text-sm font-light"}`}
                style={{
                  backgroundColor: isActive ? palette.solid : palette.tint,
                  borderColor: palette.solid,
                  color: isActive ? '#fff' : palette.solid,
                }}
              >
                {t(cat.labelKey)}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 md:px-20 md:pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {paged.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group block"
              >
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="mb-1.5 flex gap-2">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      categoryColors[project.category]?.bg ?? 'bg-gray-100'
                    } ${categoryColors[project.category]?.text ?? 'text-gray-600'}`}
                  >
                    {project.category}
                  </span>
                </div>
                <h3 className={`mb-1 text-[#1a1a1a] ${isTh ? "" : "text-base font-semibold md:text-xl"}`}>
                  {project.title}
                </h3>
                <p className={`text-[#999] ${isTh ? "th-body-sm" : "text-sm"}`}>
                  {project.location}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-[#999]">
            {t('noProjects')}
          </p>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 md:mt-16">
            <button
              onClick={() => goTo(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 w-9 rounded-full border border-[#e5e5e5] text-sm text-[#1a1a1a] transition-colors hover:border-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#e5e5e5]"
              aria-label="Previous page"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const isActive = p === currentPage;
              return (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  className={`h-9 w-9 rounded-full border text-sm transition-colors ${
                    isActive
                      ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                      : 'border-[#e5e5e5] text-[#1a1a1a] hover:border-[#1a1a1a]'
                  }`}
                  aria-label={`Page ${p}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => goTo(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 rounded-full border border-[#e5e5e5] text-sm text-[#1a1a1a] transition-colors hover:border-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#e5e5e5]"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
