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

  // Strapi verisini component'e uygun formata çevir
  const formattedAnnouncements = noticesData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    content: extractTextFromBlocks(item.content),
    priority: item.priority,
    startDate: new Date(item.startDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    endDate: new Date(item.endDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    isActive: item.isActive,
  }));

  return <AnnouncementsListClient announcements={formattedAnnouncements} locale={locale} />;
}

// İçerikten düz metin çıkar
function extractTextFromBlocks(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return blocks.slice(0, 200);
  if (!Array.isArray(blocks)) return '';
  if (blocks.length === 0) return '';
  
  return blocks
    .map((block) => {
      if (block.children) {
        return block.children.map((child: any) => child.text || '').join(' ');
      }
      return '';
    })
    .join(' ')
    .slice(0, 200);
}