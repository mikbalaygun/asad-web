// app/[locale]/duyurular/[slug]/page.tsx
import { getNoticeBySlug, getAllNotices } from '@/lib/api/notices';
import { notFound } from 'next/navigation';
import AnnouncementDetailClient from '@/components/AnnouncementDetailClient';

// Dynamic rendering - static generation'ı devre dışı bırak
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  
  try {
    const notice = await getNoticeBySlug(slug, locale);

    if (!notice) {
      return {
        title: 'Duyuru Bulunamadı | ASAD',
      };
    }

    return {
      title: `${notice.title} | ASAD`,
      description: extractTextFromBlocks(notice.content).slice(0, 160),
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Duyuru | ASAD',
    };
  }
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const notice = await getNoticeBySlug(slug, locale);

  if (!notice) {
    notFound();
  }

  // İlgili duyuruları getir (aynı öncelik seviyesinden)
  const allNotices = await getAllNotices(locale);
  const relatedAnnouncements = allNotices
    .filter((item) => item.slug !== slug && item.priority === notice.priority)
    .slice(0, 3);

  // İçeriği HTML'e çevir
  const htmlContent = convertBlocksToHTML(notice.content);

  const announcementData = {
    id: notice.id,
    slug: notice.slug,
    title: notice.title,
    content: htmlContent,
    priority: notice.priority,
    startDate: new Date(notice.startDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    endDate: new Date(notice.endDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    isActive: notice.isActive,
    localizations: notice.localizations || [],
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
  try {
    if (!blocks) return '<p>İçerik yükleniyor...</p>';
    if (typeof blocks === 'string') return `<p>${blocks}</p>`;
    if (!Array.isArray(blocks)) return '<p>İçerik formatı geçersiz.</p>';
    if (blocks.length === 0) return '<p>İçerik bulunamadı.</p>';

    return blocks
      .map((block) => {
        try {
          if (!block || !block.type) return '';

          if (block.type === 'paragraph') {
            if (!block.children || !Array.isArray(block.children)) return '';
            const text = block.children
              .map((child: any) => {
                if (!child) return '';
                let content = child.text || '';
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
            if (!block.children || !Array.isArray(block.children)) return '';
            const level = block.level || 2;
            const text = block.children.map((child: any) => child?.text || '').join('');
            return text ? `<h${level}>${text}</h${level}>` : '';
          }

          if (block.type === 'quote') {
            if (!block.children || !Array.isArray(block.children)) return '';
            const text = block.children.map((child: any) => child?.text || '').join('');
            return text ? `<blockquote>${text}</blockquote>` : '';
          }

          if (block.type === 'list') {
            if (!block.children || !Array.isArray(block.children)) return '';
            const tag = block.format === 'ordered' ? 'ol' : 'ul';
            const items = block.children
              .map((item: any) => {
                if (!item || !item.children) return '';
                const text = item.children.map((child: any) => child?.text || '').join('');
                return text ? `<li>${text}</li>` : '';
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

// İçerikten düz metin çıkar
function extractTextFromBlocks(blocks: any): string {
  try {
    if (!blocks) return 'Duyuru içeriği';
    if (typeof blocks === 'string') return blocks.slice(0, 160);
    if (!Array.isArray(blocks)) return 'Duyuru içeriği';
    if (blocks.length === 0) return 'Duyuru içeriği';
    
    return blocks
      .map((block) => {
        try {
          if (!block || !block.children || !Array.isArray(block.children)) return '';
          return block.children.map((child: any) => child?.text || '').join(' ');
        } catch (error) {
          return '';
        }
      })
      .filter((text) => text !== '')
      .join(' ')
      .slice(0, 160);
  } catch (error) {
    console.error('Error extracting text from blocks:', error);
    return 'Duyuru içeriği';
  }
}