import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { supabasePublic } from '@/lib/supabase/public';
import { articles as fallbackArticles } from '@/lib/data';
import { renderTiptap } from '@/lib/tiptap';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateStaticParams() {
  try {
    const { data } = await supabasePublic
      .from('articles')
      .select('slug')
      .eq('status', 'published');

    if (data && data.length > 0) {
      return data.map((a) => ({ id: a.slug }));
    }
  } catch {
    // fallback
  }
  return fallbackArticles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id, locale } = await params;

  try {
    const { data } = await supabasePublic
      .from('articles')
      .select('title_th, title_en, excerpt_th, excerpt_en')
      .eq('slug', id)
      .single();

    if (data) {
      const title = locale === 'th' ? data.title_th : data.title_en;
      const description = locale === 'th' ? data.excerpt_th : data.excerpt_en;
      return { title: `${title} — TWO DESK`, description };
    }
  } catch {
    // fallback
  }

  const article = fallbackArticles.find((a) => a.id === id);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} — TWO DESK`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations('blog');
  const isTh = locale === 'th';

  let article: {
    title: string;
    category: string;
    date: string;
    excerpt: string;
    image: string;
    contentHtml: string;
  } | null = null;

  try {
    const { data } = await supabasePublic
      .from('articles')
      .select('*')
      .eq('slug', id)
      .single();

    if (data) {
      article = {
        title: locale === 'th' ? data.title_th : data.title_en,
        category: data.category,
        date: data.published_at
          ? new Date(data.published_at).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
              month: 'short',
              year: 'numeric',
            })
          : '',
        excerpt: locale === 'th' ? data.excerpt_th : data.excerpt_en,
        image: data.cover_image,
        contentHtml: renderTiptap(
          (locale === 'th' ? data.content_th : data.content_en) ??
            data.content_en ??
            data.content_th
        ),
      };
    }
  } catch {
    // fallback below
  }

  // Fallback to static data
  if (!article) {
    const staticArticle = fallbackArticles.find((a) => a.id === id);
    if (!staticArticle) notFound();

    article = {
      title: staticArticle.title,
      category: staticArticle.category,
      date: staticArticle.date,
      excerpt: staticArticle.excerpt,
      image: staticArticle.image,
      contentHtml: '',
    };
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <section className="relative h-[30vh] w-full md:h-[60vh]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      {/* Article Content */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-20 md:py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#999] transition-colors hover:text-[#1a1a1a]"
          style={isTh ? { fontSize: '19px' } : undefined}
        >
          <span>&larr;</span>
          <span>{t('backToBlog')}</span>
        </Link>

        <article className="mx-auto max-w-3xl">
          <p
            className="mb-4 text-[11px] tracking-[0.5px] text-[#999]"
            style={isTh ? { fontSize: '16px' } : undefined}
          >
            {article.category} &middot; {article.date}
          </p>
          <h1
            className="mb-6 text-2xl font-bold tracking-tight text-[#1a1a1a] md:mb-8 md:text-4xl"
            style={isTh ? { fontSize: '44px', lineHeight: 1.3 } : undefined}
          >
            {article.title}
          </h1>

          {article.contentHtml ? (
            <div
              className="prose prose-neutral max-w-none text-sm font-light leading-relaxed text-[#4a4a4a] md:text-base"
              style={isTh ? { fontSize: '20px', lineHeight: 1.7 } : undefined}
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          ) : (
            <div
              className="space-y-5 text-sm font-light leading-relaxed text-[#4a4a4a] md:space-y-6 md:text-base"
              style={isTh ? { fontSize: '20px', lineHeight: 1.7 } : undefined}
            >
              <p>{article.excerpt}</p>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
