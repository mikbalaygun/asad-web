// app/[locale]/makaleler/[slug]/page.tsx
import { getArticleBySlug, getLatestArticles } from '@/lib/api/articles';
import { notFound } from 'next/navigation';
import ArticleDetailClient from '@/components/ArticleDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: 'Makale Bulunamadı | ASAD',
    };
  }

  return {
    title: `${article.title} | ASAD`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  // İlgili makaleleri getir (aynı kategoriden)
  const allArticles = await getLatestArticles(10, locale);
  const relatedArticles = allArticles
    .filter((item) => item.slug !== slug && item.category === article.category)
    .slice(0, 3);

  // İçeriği HTML'e çevir
  let htmlContent = '';
  
  if (typeof article.content === 'string') {
    const paragraphs = article.content.split('\n\n');
    htmlContent = paragraphs
      .map(para => {
        if (para.trim().startsWith('-')) {
          const items = para
            .split('\n')
            .filter(line => line.trim().startsWith('-'))
            .map(line => `<li>${line.trim().substring(1).trim()}</li>`)
            .join('');
          return `<ul>${items}</ul>`;
        }
        return `<p>${para.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');
  } else {
    htmlContent = convertBlocksToHTML(article.content);
  }

  const articleData = {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: htmlContent,
    date: new Date(article.publishedDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    author: article.author,
    category: article.category,
    readTime: calculateReadTime(article.content),
    localizations: article.localizations || [],
  };

  const formattedRelated = relatedArticles.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    date: new Date(item.publishedDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
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

// Strapi blocks'u HTML'e çevir
function convertBlocksToHTML(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return `<p>${blocks}</p>`;
  if (!Array.isArray(blocks)) return '';
  if (blocks.length === 0) return '';

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
function calculateReadTime(content: any): string {
  if (!content) return '3 dk';
  
  let text = '';
  if (typeof content === 'string') {
    text = content;
  } else if (Array.isArray(content)) {
    text = content
      .map((block) => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join(' ');
        }
        return '';
      })
      .join(' ');
  }

  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} dk`;
}