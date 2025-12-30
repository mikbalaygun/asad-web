// app/[locale]/makaleler/page.tsx
import { getAllArticles } from '@/lib/api/articles';
import { Article } from '@/lib/types/article';
import ArticlesListClient from '@/components/ArticlesListClient';

export const metadata = {
  title: 'Makaleler | ASAD',
  description: 'Sualtı dünyası, deniz bilimleri ve dalış hakkında bilimsel ve eğitici makaleler',
};

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;

  let articlesData: Article[] = [];
  try {
    articlesData = await getAllArticles(locale);
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }

  // Strapi verisini component'e uygun formata çevir
  const formattedArticles = articlesData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: new Date(item.publishedDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    author: item.author,
    category: item.category,
    readTime: calculateReadTime(item.content),
  }));

  return <ArticlesListClient articles={formattedArticles} locale={locale} />;
}

// Okuma süresini hesapla
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calculateReadTime(content: any): string {
  if (!content) return '3 dk';

  let text = '';
  if (typeof content === 'string') {
    text = content;
  } else if (Array.isArray(content)) {
    text = content
      .map((block) => {
        if (block.children) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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