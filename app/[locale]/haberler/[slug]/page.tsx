// app/[locale]/haberler/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getNewsBySlug, getLatestNews } from '@/lib/api/news';
import { getStrapiMedia } from '@/lib/strapi';
import NewsDetailClient from '@/components/NewsDetailClient';
import type { News } from '@/lib/types/news';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ slug: string; locale: 'tr' | 'en' }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, locale } = await params;
  
  try {
    const news = await getNewsBySlug(slug, locale);

    if (!news) return { title: 'Haber Bulunamadı | ASAD' };

    return {
      title: `${news.Title} | ASAD`,
      description: news.excerpt,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Haber | ASAD' };
  }
}

export default async function NewsDetailPage({ params }: { params: Params }) {
  const { slug, locale } = await params;

  const news = await getNewsBySlug(slug, locale);
  if (!news) {
    console.error('News not found for', { slug, locale });
    notFound();
  }

  // İlgili haberler (aynı kategori, farklı slug)
  const allNews: News[] = await getLatestNews(10, locale);
  const relatedNews: News[] = allNews
    .filter((item: News) => item.slug !== slug && item.category === news.category)
    .slice(0, 3);

  // İçeriği HTML'e çevir
  const htmlContent = convertBlocksToHTML(news.content);

  const newsData = {
    id: news.id,
    slug: news.slug,
    title: news.Title,
    excerpt: news.excerpt,
    content: htmlContent,
    date: new Date(news.publishedTime ?? news.publishedAt).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    ),
    category: news.category,
    author: 'ASAD',
    readTime: calculateReadTime(news.content),
    image: news.coverImage ? getStrapiMedia(news.coverImage.url) : undefined,
    tags: [],
    localizations: news.localizations || [],
  };

  const formattedRelatedNews = relatedNews.map((item: News) => ({
    id: item.id,
    slug: item.slug,
    title: item.Title,
    date: new Date(item.publishedTime ?? item.publishedAt).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
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

/* ---------- helpers ---------- */

// Strapi rich-text blocks (any[]) ya da string'i HTML'e çevir
function convertBlocksToHTML(blocks: unknown): string {
  try {
    if (!blocks) return '';

    if (typeof blocks === 'string') {
      const paragraphs = blocks.split('\n\n');
      return paragraphs
        .map((para) => {
          if (para.trim().startsWith('-')) {
            const items = para
              .split('\n')
              .filter((l) => l.trim().startsWith('-'))
              .map((l) => `<li>${l.trim().substring(1).trim()}</li>`)
              .join('');
            return `<ul>${items}</ul>`;
          }
          return `<p>${para.replace(/\n/g, '<br>')}</p>`;
        })
        .join('');
    }

    if (!Array.isArray(blocks) || (blocks as any[]).length === 0) return '';

    return (blocks as any[])
      .map((block: any) => {
        try {
          if (!block || !block.type) return '';

          if (block.type === 'paragraph') {
            const text = (block.children ?? [])
              .map((child: any) => {
                if (!child) return '';
                let content = child.text ?? '';
                if (child.bold) content = `<strong>${content}</strong>`;
                if (child.italic) content = `<em>${content}</em>`;
                if (child.underline) content = `<u>${content}</u>`;
                if (child.strikethrough) content = `<s>${content}</s>`;
                if (child.code) content = `<code>${content}</code>`;
                return content;
              })
              .join('');
            return text ? `<p>${text}</p>` : '';
          }

          if (block.type === 'heading') {
            const level = block.level || 2;
            const text = (block.children ?? []).map((c: any) => c?.text ?? '').join('');
            return text ? `<h${level}>${text}</h${level}>` : '';
          }

          if (block.type === 'quote') {
            const text = (block.children ?? []).map((c: any) => c?.text ?? '').join('');
            return text ? `<blockquote>${text}</blockquote>` : '';
          }

          if (block.type === 'list') {
            const tag = block.format === 'ordered' ? 'ol' : 'ul';
            const items = (block.children ?? [])
              .map((it: any) => {
                if (!it) return '';
                const t = (it.children ?? []).map((c: any) => c?.text ?? '').join('');
                return t ? `<li>${t}</li>` : '';
              })
              .filter((item: string) => item !== '')
              .join('');
            return items ? `<${tag}>${items}</${tag}>` : '';
          }

          return '';
        } catch (blockError) {
          console.error('Error processing block:', blockError);
          return '';
        }
      })
      .filter((html) => html !== '')
      .join('\n');
  } catch (error) {
    console.error('Error converting blocks to HTML:', error);
    return '<p>İçerik yüklenirken bir hata oluştu.</p>';
  }
}

function calculateReadTime(content: unknown): string {
  try {
    if (!content) return '3 dk';

    let text = '';
    if (typeof content === 'string') {
      text = content;
    } else if (Array.isArray(content)) {
      text = (content as any[])
        .map((b) => (b?.children ? b.children.map((c: any) => c?.text ?? '').join(' ') : ''))
        .join(' ');
    }

    const wordsPerMinute = 200;
    const wordCount = (text.trim().match(/\S+/g) || []).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute) || 1;
    return `${minutes} dk`;
  } catch (error) {
    return '3 dk';
  }
}