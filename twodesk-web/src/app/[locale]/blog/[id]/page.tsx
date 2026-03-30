import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { articles as fallbackArticles } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateStaticParams() {
  try {
    const { data } = await supabaseAdmin
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
    const { data } = await supabaseAdmin
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

  let article: {
    title: string;
    category: string;
    date: string;
    excerpt: string;
    image: string;
  } | null = null;

  try {
    const { data } = await supabaseAdmin
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
        >
          <span>&larr;</span>
          <span>{t('backToBlog')}</span>
        </Link>

        <article className="mx-auto max-w-3xl">
          <p className="mb-4 text-[11px] tracking-[0.5px] text-[#999]">
            {article.category} &middot; {article.date}
          </p>
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-[#1a1a1a] md:mb-8 md:text-4xl">
            {article.title}
          </h1>

          <div className="space-y-5 text-sm font-light leading-relaxed text-[#4a4a4a] md:space-y-6 md:text-base">
            <p>
              {article.excerpt} In this article, we explore the ideas and
              inspirations that shaped this topic — from early observations to
              the broader trends transforming the design landscape in Southeast
              Asia.
            </p>

            <p>
              Good design begins long before the first sketch. It starts with
              listening — to the client, the site, and the culture that
              surrounds it. At Two Desk Studio, we believe every space has a
              story waiting to be told. Our role is to uncover that story and
              give it form through thoughtful material choices, spatial planning,
              and attention to the smallest details.
            </p>

            <p>
              Whether we are working on a cafe in the heart of Bangkok or a
              residential project in the suburbs, the principles remain the
              same: clarity of purpose, honesty of materials, and respect for
              the people who will inhabit the space. These values guide every
              decision we make, from the initial concept to the final handover.
            </p>

            <p>
              As the design industry continues to evolve, we remain committed to
              learning, experimenting, and pushing the boundaries of what is
              possible. We hope this article offers a glimpse into our thinking
              and inspires you to look at the spaces around you with fresh eyes.
              If you have a project in mind or simply want to talk design, we
              would love to hear from you.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
