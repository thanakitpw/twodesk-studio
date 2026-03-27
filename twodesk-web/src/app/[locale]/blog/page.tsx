import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { articles } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — TWO DESK',
  description:
    'Insights, trends, and behind-the-scenes stories from Two Desk Studio.',
};

export default async function BlogPage() {
  const t = await getTranslations('blog');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-[1440px] px-6 pt-32 pb-12 md:px-20">
        <p className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]">
          {t('label')}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t('heading')}
        </h1>
        <p className="max-w-lg text-base font-light leading-relaxed text-[#6b6b6b]">
          {t('description')}
        </p>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="group block"
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
              <p className="mb-2 text-[11px] tracking-[0.5px] text-[#999]">
                {article.category} &middot; {article.date}
              </p>
              <h3 className="mb-1.5 text-lg font-semibold leading-snug text-[#1a1a1a]">
                {article.title}
              </h3>
              <p className="text-[13px] font-light leading-relaxed text-[#666]">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
