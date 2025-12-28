// app/[locale]/projeler/[slug]/page.tsx
import { getProjectBySlug, getAllProjects, getMediaUrl } from '@/lib/api/projects';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/ProjectDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale);
  if (!project) return { title: 'Proje Bulunamadı | ASAD' };
  return { title: `${project.title} | ASAD`, description: project.excerpt };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) notFound();

  // İlgili projeleri getir
  const allProjects = await getAllProjects(locale);
  const relatedProjects = allProjects
    .filter((item) => item.slug !== slug && item.category === project.category)
    .slice(0, 3);

  const projectData = {
    id: project.id,
    slug: project.slug,
    title: project.title,
    excerpt: project.excerpt,
    content: project.content, // Zaten HTML
    date: new Date(project.publishedTime).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    ),
    category: project.category,
    author: 'ASAD',
    readTime: calculateReadTime(project.content),
    image: getMediaUrl(project.coverImage),
    tags: [],
    localizations: project.localizations || [],
  };

  const formattedRelatedProjects = relatedProjects.map((item) => ({
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

  return <ProjectDetailClient project={projectData} relatedProjects={formattedRelatedProjects} locale={locale} />;
}

function calculateReadTime(content: string): string {
  if (!content) return '3 dk';
  const text = content.replace(/<[^>]*>/g, '');
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} dk`;
}