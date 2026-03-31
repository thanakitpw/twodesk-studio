import { getTranslations } from 'next-intl/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { articles as fallbackArticles } from '@/lib/data';
import type { Article } from '@/lib/data';
import type { Metadata } from 'next';
import BlogContent from './BlogContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog — TWO DESK',
  description:
    'Insights, trends, and behind-the-scenes stories from Two Desk Studio.',
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const isTh = locale === 'th';

  let articleItems: Article[];

  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      articleItems = fallbackArticles;
    } else {
      articleItems = data.map((a) => ({
        id: a.slug,
        title: locale === 'th' ? a.title_th : a.title_en,
        category: a.category,
        date: a.published_at
          ? new Date(a.published_at).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
              month: 'short',
              year: 'numeric',
            })
          : '',
        excerpt: locale === 'th' ? a.excerpt_th : a.excerpt_en,
        image: a.cover_image,
      }));
    }
  } catch {
    articleItems = fallbackArticles;
  }

  const filters = [
    { key: 'All', label: t('filterAll') },
    { key: 'Design Trends', label: t('filterDesignTrends') },
    { key: 'Behind the Scenes', label: t('filterBehindTheScenes') },
    { key: 'Tips', label: t('filterTips') },
    { key: 'Studio Life', label: t('filterStudioLife') },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-[1440px] px-5 pt-28 pb-8 md:px-20 md:pt-32 md:pb-10">
        <p
          className="mb-4 text-xs font-normal uppercase tracking-[0.2em] text-[#999]"
          style={isTh ? { fontSize: '18px' } : undefined}
        >
          {t('label')}
        </p>
        <h1
          className="mb-4 text-3xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl"
          style={isTh ? { fontSize: '52px', lineHeight: 1.3 } : undefined}
        >
          {t('heading')}
        </h1>
        <p
          className="max-w-xl text-sm font-light leading-relaxed text-[#6b6b6b] md:text-base"
          style={isTh ? { fontSize: '20px', lineHeight: 1.6 } : undefined}
        >
          {t('description')}
        </p>
      </section>

      {/* Filter Tabs + Articles (Client Component for interactivity) */}
      <BlogContent
        articles={articleItems}
        filters={filters}
        readArticleLabel={t('readArticle')}
      />
    </div>
  );
}
