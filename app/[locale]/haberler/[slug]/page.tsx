// app/[locale]/haberler/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getNewsBySlug, getLatestNews, getAllNews, getMediaUrl } from '@/lib/api/news';
import NewsDetailClient from '@/components/NewsDetailClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ slug: string; locale: 'tr' | 'en' }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, locale } = await params;

  try {
    let news = await getNewsBySlug(slug, locale);

    if (!news) {
      const allNews = await getAllNews(locale);
      news = allNews.find((item) => item.slug === slug) || null;
    }

    if (!news) return { title: 'Haber Bulunamadı | ASAD' };
    return { title: `${news.title} | ASAD`, description: news.excerpt };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Haber | ASAD' };
  }
}

export default async function NewsDetailPage({ params }: { params: Params }) {
  const { slug, locale } = await params;

  let news = await getNewsBySlug(slug, locale);

  if (!news) {
    const allNews = await getAllNews(locale);
    news = allNews.find((item) => item.slug === slug) || null;
  }

  if (!news) notFound();

  // İlgili haberler
  const allNews = await getLatestNews(10, locale);
  const relatedNews = allNews
    .filter((item) => item.slug !== slug && item.category === news.category)
    .slice(0, 3);

  // DEBUG: Log coverImage
  console.log('[NEWS DETAIL] coverImage:', news.coverImage);
  console.log('[NEWS DETAIL] getMediaUrl result:', getMediaUrl(news.coverImage));

  const newsData = {
    id: news.id,
    slug: news.slug,
    title: news.title,
    excerpt: news.excerpt,
    content: news.content, // Zaten HTML
    date: new Date(news.publishedTime).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    ),
    category: news.category,
    author: 'ASAD',
    readTime: calculateReadTime(news.content),
    image: getMediaUrl(news.coverImage),
    tags: [],
    localizations: news.localizations || [],
  };

  const formattedRelatedNews = relatedNews.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    date: new Date(item.publishedTime).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    ),
    category: item.category,
    image: getMediaUrl(item.coverImage),
  }));

  return <NewsDetailClient news={newsData} relatedNews={formattedRelatedNews} locale={locale} />;
}

function calculateReadTime(content: string): string {
  if (!content) return '3 dk';
  const text = content.replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const wordCount = (text.trim().match(/\S+/g) || []).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute) || 1;
  return `${minutes} dk`;
}