// app/[locale]/haberler/page.tsx
import { getAllNews } from '@/lib/api/news';
import { getStrapiMedia } from '@/lib/strapi';
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

  // Strapi verisini component'e uygun formata çevir
  const formattedNews = newsData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.Title,
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
    image: item.coverImage ? getStrapiMedia(item.coverImage.url) : undefined,
    readTime: calculateReadTime(item.content),
  }));

  return <NewsListingClient news={formattedNews} locale={locale} />;
}

// Okuma süresini hesapla
function calculateReadTime(content: any[]): string {
  if (!content || content.length === 0) return '3 dk';
  
  const text = content
    .map((block) => {
      if (block.children) {
        return block.children.map((child: any) => child.text || '').join(' ');
      }
      return '';
    })
    .join(' ');

  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} dk`;
}