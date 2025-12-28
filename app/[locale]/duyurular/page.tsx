// app/[locale]/duyurular/page.tsx
import { getAllNotices } from '@/lib/api/notices';
import AnnouncementsListClient from '@/components/AnnouncementsListClient';

export const metadata = {
  title: 'Duyurular | ASAD',
  description: 'Güncel duyurular ve önemli bildirimler',
};

export default async function AnnouncementsPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  const noticesData = await getAllNotices(locale);

  // API verisini component'e uygun formata çevir
  const formattedAnnouncements = noticesData
    .filter((item) => item.isActive)
    .map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      content: item.excerpt || extractTextFromContent(item.content),
      priority: item.priority,
      date: formatDate(item.publishedDate, locale),
      isActive: item.isActive,
    }));

  return <AnnouncementsListClient announcements={formattedAnnouncements} locale={locale} />;
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

// İçerikten düz metin çıkar
function extractTextFromContent(content: unknown): string {
  if (!content) return '';
  if (typeof content === 'string') {
    // HTML taglarını temizle
    return content.replace(/<[^>]*>/g, '').slice(0, 200);
  }
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (block.children) {
          return block.children.map((child: { text?: string }) => child.text || '').join(' ');
        }
        return '';
      })
      .join(' ')
      .slice(0, 200);
  }
  return '';
}