// app/[locale]/projeler/page.tsx
import { getAllProjects } from '@/lib/api/projects';
import { getStrapiMedia } from '@/lib/strapi';
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

  console.log('[ProjectsPage] Projects count:', projectsData.length);
  console.log('[ProjectsPage] First project:', projectsData[0]);

  // Strapi verisini component'e uygun formata çevir
  const formattedProjects = projectsData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,        // ✅ Küçük 't' - Strapi'deki gibi
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

  console.log('[ProjectsPage] Formatted projects:', formattedProjects.length);

  return <ProjectListingClient projects={formattedProjects} locale={locale} />;
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