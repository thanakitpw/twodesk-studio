'use client';

import { useState } from 'react';
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

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-8 md:px-20 md:pt-32 md:pb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]"
          style={isTh ? { fontSize: '18px' } : undefined}
        >
          {t('label')}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl"
          style={isTh ? { fontSize: '52px', lineHeight: 1.3 } : undefined}
        >
          {t('heading')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg text-base font-light leading-relaxed text-[#6b6b6b]"
          style={isTh ? { fontSize: '20px', lineHeight: 1.6 } : undefined}
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
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`rounded-full border px-4 py-1.5 text-xs md:px-5 md:py-2 md:text-sm font-light transition-all ${
                activeFilter === cat.key
                  ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                  : 'border-[#e5e5e5] bg-white text-[#1a1a1a] hover:border-[#999]'
              }`}
              style={isTh ? { fontSize: '18px' } : undefined}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 md:px-20 md:pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {filtered.map((project, i) => (
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
                <h3
                  className="mb-1 text-base font-semibold text-[#1a1a1a] md:text-xl"
                  style={isTh ? { fontSize: '22px' } : undefined}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm text-[#999]"
                  style={isTh ? { fontSize: '19px' } : undefined}
                >
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
      </section>
    </div>
  );
}
