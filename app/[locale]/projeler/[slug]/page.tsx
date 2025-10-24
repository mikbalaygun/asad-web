// app/[locale]/projeler/[slug]/page.tsx
import { getProjectBySlug, getLatestProjects } from '@/lib/api/projects';
import { getStrapiMedia } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/ProjectDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return {
      title: 'Proje Bulunamadı | ASAD',
    };
  }

  return {
    title: `${project.title} | ASAD`,
    description: project.excerpt,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  // İlgili projeleri getir
  const allProjects = await getLatestProjects(10, locale);
  const relatedProjects = allProjects
    .filter((item) => item.slug !== slug && item.category === project.category)
    .slice(0, 3);

  // İçeriği HTML'e çevir
  const htmlContent = convertBlocksToHTML(project.content);

  const projectData = {
    id: project.id,
    slug: project.slug,
    title: project.title,
    excerpt: project.excerpt,
    content: htmlContent,
    date: new Date(project.publishedTime).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    category: project.category,
    author: 'ASAD',
    readTime: calculateReadTime(project.content),
    image: project.coverImage ? getStrapiMedia(project.coverImage.url) : undefined,
    tags: [],
    localizations: project.localizations || [],
  };

  const formattedRelatedProjects = relatedProjects.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
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
    <ProjectDetailClient 
      project={projectData} 
      relatedProjects={formattedRelatedProjects} 
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