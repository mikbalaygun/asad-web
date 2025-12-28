// app/[locale]/makaleler/[slug]/page.tsx
import { getArticleBySlug, getLatestArticles } from '@/lib/api/articles';
import { notFound } from 'next/navigation';
import ArticleDetailClient from '@/components/ArticleDetailClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ slug: string; locale: 'tr' | 'en' }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return { title: 'Makale Bulunamadı | ASAD' };
  }

  return {
    title: `${article.title} | ASAD`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: { params: Params }) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  // İlgili makaleleri getir
  const allArticles = await getLatestArticles(10, locale);
  const relatedArticles = allArticles
    .filter((item) => item.slug !== slug && item.category === article.category)
    .slice(0, 3);

  // İçeriği HTML'e çevir
  const htmlContent = convertContent(article.content);

  const articleData = {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: htmlContent,
    date: formatDate(article.publishedDate, locale),
    author: article.author,
    category: article.category,
    readTime: calculateReadTime(article.content),
    pdfUrl: article.pdfUrl || null,
    localizations: article.localizations || [],
  };

  const formattedRelated = relatedArticles.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    date: formatDate(item.publishedDate, locale),
    category: item.category,
  }));

  return (
    <ArticleDetailClient
      article={articleData}
      relatedArticles={formattedRelated}
      locale={locale}
    />
  );
}

function formatDate(dateStr: string, locale: 'tr' | 'en'): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  } catch {
    return '';
  }
}

function convertContent(content: unknown): string {
  if (!content) return '<p>İçerik yükleniyor...</p>';
  if (typeof content === 'string') return content; // Zaten HTML
  if (!Array.isArray(content)) return '<p>İçerik formatı geçersiz.</p>';

  return content
    .map((block) => {
      if (!block?.type) return '';

      if (block.type === 'paragraph') {
        const text = (block.children || [])
          .map((child: { text?: string; bold?: boolean; italic?: boolean }) => {
            let c = child.text || '';
            if (child.bold) c = `<strong>${c}</strong>`;
            if (child.italic) c = `<em>${c}</em>`;
            return c;
          })
          .join('');
        return text ? `<p>${text}</p>` : '';
      }

      if (block.type === 'heading') {
        const level = block.level || 2;
        const text = (block.children || []).map((c: { text?: string }) => c?.text || '').join('');
        return text ? `<h${level}>${text}</h${level}>` : '';
      }

      if (block.type === 'list') {
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = (block.children || [])
          .map((item: { children?: Array<{ text?: string }> }) => {
            const text = (item.children || []).map((c) => c?.text || '').join('');
            return text ? `<li>${text}</li>` : '';
          })
          .join('');
        return items ? `<${tag}>${items}</${tag}>` : '';
      }

      return '';
    })
    .filter(Boolean)
    .join('\n');
}

function calculateReadTime(content: unknown): string {
  if (!content) return '3 dk';

  let text = '';
  if (typeof content === 'string') {
    text = content.replace(/<[^>]*>/g, '');
  } else if (Array.isArray(content)) {
    text = content
      .map((block) => (block.children || []).map((c: { text?: string }) => c?.text || '').join(' '))
      .join(' ');
  }

  const wordsPerMinute = 200;
  const wordCount = (text.trim().match(/\S+/g) || []).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute) || 1;

  return `${minutes} dk`;
}