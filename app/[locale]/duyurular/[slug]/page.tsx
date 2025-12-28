// app/[locale]/duyurular/[slug]/page.tsx
import { getNoticeBySlug, getAllNotices } from '@/lib/api/notices';
import { notFound } from 'next/navigation';
import AnnouncementDetailClient from '@/components/AnnouncementDetailClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = Promise<{ slug: string; locale: 'tr' | 'en' }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, locale } = await params;

  try {
    const notice = await getNoticeBySlug(slug, locale);
    if (!notice) {
      return { title: 'Duyuru Bulunamadı | ASAD' };
    }
    return {
      title: `${notice.title} | ASAD`,
      description: notice.excerpt || extractText(notice.content).slice(0, 160),
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Duyuru | ASAD' };
  }
}

export default async function AnnouncementDetailPage({ params }: { params: Params }) {
  const { slug, locale } = await params;
  const notice = await getNoticeBySlug(slug, locale);

  if (!notice) {
    notFound();
  }

  // İlgili duyuruları getir
  const allNotices = await getAllNotices(locale);
  const relatedAnnouncements = allNotices
    .filter((item) => item.slug !== slug && item.isActive)
    .slice(0, 3);

  const announcementData = {
    id: notice.id,
    slug: notice.slug,
    title: notice.title,
    content: convertContent(notice.content),
    excerpt: notice.excerpt,
    priority: notice.priority,
    date: formatDate(notice.publishedDate, locale),
    isActive: notice.isActive,
    localizations: notice.localizations || [],
  };

  const formattedRelated = relatedAnnouncements.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    priority: item.priority,
    date: formatDate(item.publishedDate, locale),
  }));

  return (
    <AnnouncementDetailClient
      announcement={announcementData}
      relatedAnnouncements={formattedRelated}
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

// İçeriği HTML'e çevir
function convertContent(content: unknown): string {
  if (!content) return '<p>İçerik yükleniyor...</p>';
  if (typeof content === 'string') return content; // Zaten HTML
  if (!Array.isArray(content)) return '<p>İçerik formatı geçersiz.</p>';
  if (content.length === 0) return '<p>İçerik bulunamadı.</p>';

  return content
    .map((block) => {
      if (!block || !block.type) return '';

      if (block.type === 'paragraph') {
        if (!block.children) return '';
        const text = block.children
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
        const text = block.children?.map((c: { text?: string }) => c?.text || '').join('') || '';
        return text ? `<h${level}>${text}</h${level}>` : '';
      }

      if (block.type === 'list') {
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = (block.children || [])
          .map((item: { children?: Array<{ text?: string }> }) => {
            const text = item.children?.map((c) => c?.text || '').join('') || '';
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

function extractText(content: unknown): string {
  if (!content) return 'Duyuru içeriği';
  if (typeof content === 'string') return content.replace(/<[^>]*>/g, '').slice(0, 160);
  if (!Array.isArray(content)) return 'Duyuru içeriği';

  return content
    .map((block) => {
      if (!block?.children) return '';
      return block.children.map((c: { text?: string }) => c?.text || '').join(' ');
    })
    .join(' ')
    .slice(0, 160);
}