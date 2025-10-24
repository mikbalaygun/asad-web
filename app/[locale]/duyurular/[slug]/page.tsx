// app/[locale]/duyurular/[slug]/page.tsx
import { getAnnouncementBySlug, getLatestAnnouncements } from '@/lib/api/announcements';
import { notFound } from 'next/navigation';
import AnnouncementDetailClient from '@/components/AnnouncementDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const announcement = await getAnnouncementBySlug(slug, locale);

  if (!announcement) {
    return {
      title: 'Duyuru Bulunamadı | ASAD',
    };
  }

  return {
    title: `${announcement.title} | ASAD`,
    description: extractTextFromBlocks(announcement.content).slice(0, 160),
  };
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const announcement = await getAnnouncementBySlug(slug, locale);

  if (!announcement) {
    notFound();
  }

  // İlgili duyuruları getir (aynı öncelik seviyesinden)
  const allAnnouncements = await getLatestAnnouncements(10, locale);
  const relatedAnnouncements = allAnnouncements
    .filter((item) => item.slug !== slug && item.priority === announcement.priority)
    .slice(0, 3);

  // İçeriği HTML'e çevir
  const htmlContent = convertBlocksToHTML(announcement.content);

  const announcementData = {
    id: announcement.id,
    slug: announcement.slug,
    title: announcement.title,
    content: htmlContent,
    priority: announcement.priority,
    startDate: new Date(announcement.startDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    endDate: new Date(announcement.endDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    isActive: announcement.isActive,
    localizations: announcement.localizations || [],
  };

  const formattedRelated = relatedAnnouncements.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    priority: item.priority,
    startDate: new Date(item.startDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
  }));

  return (
    <AnnouncementDetailClient 
      announcement={announcementData} 
      relatedAnnouncements={formattedRelated} 
      locale={locale} 
    />
  );
}

// Strapi blocks'u HTML'e çevir
function convertBlocksToHTML(blocks: any): string {
  // Eğer array değilse veya boşsa
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

// İçerikten düz metin çıkar
function extractTextFromBlocks(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';
  if (blocks.length === 0) return '';
  
  return blocks
    .map((block) => {
      if (block.children) {
        return block.children.map((child: any) => child.text || '').join(' ');
      }
      return '';
    })
    .join(' ');
}