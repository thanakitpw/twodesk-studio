'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import type { Article } from '@/lib/data';

interface BlogContentProps {
  articles: Article[];
  filters: { key: string; label: string }[];
  readArticleLabel: string;
}

export default function BlogContent({
  articles,
  filters,
  readArticleLabel,
}: BlogContentProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const locale = useLocale();
  const isTh = locale === 'th';

  const filtered =
    activeFilter === 'All'
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-16 md:px-20 md:pb-24">
      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 md:mb-10">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`rounded-full border px-4 py-1.5 transition-colors ${
              isTh ? "th-button" : "text-xs font-medium"
            } ${
              activeFilter === filter.key
                ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                : 'border-[#e0e0e0] bg-white text-[#666] hover:border-[#999]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Featured Article — horizontal layout on desktop */}
      {featured && (
        <Link
          href={`/blog/${featured.id}`}
          className="group mb-8 block md:mb-10"
        >
          <div className="md:flex md:gap-8">
            {/* Image */}
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded md:mb-0 md:aspect-auto md:h-[380px] md:w-[60%] md:shrink-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center md:w-[40%]">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#e07a2f]">
                {featured.category}
                <span className="ml-2 font-normal text-[#999]">
                  {featured.date}
                </span>
              </p>
              <h2 className={`mb-3 text-[#1a1a1a] ${isTh ? "" : "text-xl font-bold leading-snug md:text-3xl"}`}>
                {featured.title}
              </h2>
              <p className={`mb-4 text-[#666] ${isTh ? "th-body-lg" : "text-sm font-light leading-relaxed"}`}>
                {featured.excerpt}
              </p>
              <span className={`inline-block text-[#1a1a1a] ${isTh ? "th-button" : "text-sm font-medium"}`}>
                {readArticleLabel} &rarr;
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Article Grid — 3 columns */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {rest.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="group"
            >
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-[#e07a2f] md:text-[11px]">
                {article.category}
                <span className="ml-2 font-normal text-[#999]">
                  {article.date}
                </span>
              </p>
              <h3 className={`mb-1.5 line-clamp-2 text-[#1a1a1a] ${isTh ? "" : "text-sm font-semibold leading-snug md:text-base"}`}>
                {article.title}
              </h3>
              <p className={`line-clamp-2 text-[#666] ${isTh ? "th-body-sm" : "text-[13px] font-light leading-relaxed"}`}>
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
