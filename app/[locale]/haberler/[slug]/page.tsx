// app/[locale]/haberler/[slug]/page.tsx
import { getNewsBySlug, getLatestNews } from '@/lib/api/news';
import { getStrapiMedia } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import NewsDetailClient from '@/components/NewsDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const news = await getNewsBySlug(slug, locale);

  if (!news) {
    return {
      title: 'Haber Bulunamadı | ASAD',
    };
  }

  return {
    title: `${news.Title} | ASAD`,
    description: news.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const news = await getNewsBySlug(slug, locale);

  if (!news) {
    notFound();
  }

  // İlgili haberleri getir
  const allNews = await getLatestNews(10, locale);
  const relatedNews = allNews
    .filter((item) => item.slug !== slug && item.category === news.category)
    .slice(0, 3);

  // İçeriği HTML'e çevir
  const htmlContent = convertBlocksToHTML(news.content);

  const newsData = {
    id: news.id,
    slug: news.slug,
    title: news.Title,
    excerpt: news.excerpt,
    content: htmlContent,
    date: new Date(news.publishedTime).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    category: news.category,
    author: 'ASAD',
    readTime: calculateReadTime(news.content),
    image: news.coverImage ? getStrapiMedia(news.coverImage.url) : undefined,
    tags: [],
    localizations: news.localizations || [],
  };

  const formattedRelatedNews = relatedNews.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.Title,
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
  }));

  return (
    <NewsDetailClient 
      news={newsData} 
      relatedNews={formattedRelatedNews} 
      locale={locale} 
    />
  );
}

// Strapi blocks'u HTML'e çevir
function convertBlocksToHTML(blocks: any[]): string {
  if (!blocks || blocks.length === 0) return '';

  return blocks
    .map((block) => {
      if (block.type === 'paragraph') {
        const text = block.children
          .map((child: any) => {
            let content = child.text || '';
            if (child.bold) content = `<strong>${content}</strong>`;
            if (child.italic) content = `<em>${content}</em>`;
            if (child.underline) content = `<u>${content}</u>`;
            if (child.strikethrough) content = `<s>${content}</s>`;
            if (child.code) content = `<code>${content}</code>`;
            return content;
          })
          .join('');
        return `<p>${text}</p>`;
      }

      if (block.type === 'heading') {
        const level = block.level || 2;
        const text = block.children.map((child: any) => child.text || '').join('');
        return `<h${level}>${text}</h${level}>`;
      }

      if (block.type === 'quote') {
        const text = block.children.map((child: any) => child.text || '').join('');
        return `<blockquote>${text}</blockquote>`;
      }

      if (block.type === 'list') {
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = block.children
          .map((item: any) => {
            const text = item.children.map((child: any) => child.text || '').join('');
            return `<li>${text}</li>`;
          })
          .join('');
        return `<${tag}>${items}</${tag}>`;
      }

      return '';
    })
    .join('\n');
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