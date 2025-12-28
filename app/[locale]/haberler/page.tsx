// app/[locale]/haberler/page.tsx
import { getAllNews, getMediaUrl } from '@/lib/api/news';
import NewsListingClient from '@/components/NewsListingClient';

export const metadata = {
  title: 'Haberler | ASAD',
  description: 'Sualtı dünyasından en son haberler ve gelişmeler',
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  const newsData = await getAllNews(locale);

  // Custom API verisini component'e uygun formata çevir
  const formattedNews = newsData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: new Date(item.publishedTime).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    category: item.category,
    image: getMediaUrl(item.coverImage),
    readTime: calculateReadTime(item.content),
  }));

  return <NewsListingClient news={formattedNews} locale={locale} />;
}

// Okuma süresini hesapla
function calculateReadTime(content: string): string {
  if (!content) return '3 dk';

  // HTML'den text çıkar
  const text = content.replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return `${minutes} dk`;
}