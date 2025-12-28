// app/[locale]/projeler/page.tsx
import { getAllProjects, getMediaUrl } from '@/lib/api/projects';
import ProjectListingClient from '@/components/ProjectListingClient';

export const metadata = {
  title: 'Projeler | ASAD',
  description: 'Sualtı araştırmaları ve projelerimiz',
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  const projectsData = await getAllProjects(locale);

  // Custom API verisini component'e uygun formata çevir
  const formattedProjects = projectsData.map((item) => ({
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

  return <ProjectListingClient projects={formattedProjects} locale={locale} />;
}

// Okuma süresini hesapla
function calculateReadTime(content: string): string {
  if (!content) return '3 dk';
  const text = content.replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} dk`;
}