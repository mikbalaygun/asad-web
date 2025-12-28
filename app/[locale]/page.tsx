import AboutSection from '@/components/AboutSection';
import AtaturkQuoteSection from '@/components/AtaturkQuoteSection';
import Hero from '@/components/Hero';
import NewsSectionHome from '@/components/NewsSectionHome';
import ServicesSectionServer from '@/components/ServicesSectionServer';
import { getLatestNews, getMediaUrl } from '@/lib/api/news'; // getMediaUrl imported from news api which re-exports it
import { getLatestNotices } from '@/lib/api/notices';
import { News } from '@/lib/api/news'; // Use type from API file
import { Notice } from '@/lib/api/notices'; // Use type from API file

export const dynamic = 'force-dynamic';
export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function Home({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;

  // Custom API'den veri çek
  let newsData: News[] = [];
  let noticesData: Notice[] = [];

  try {
    [newsData, noticesData] = await Promise.all([
      getLatestNews(3, locale),
      getLatestNotices(3, locale)
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Format news
  const formattedNews = newsData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || extractTextFromContent(item.content),
    date: new Date(item.publishedTime).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    category: item.category || (locale === 'tr' ? 'Genel' : 'General'),
    image: getMediaUrl(item.coverImage),
  }));

  // Format notices (announcements)
  const formattedAnnouncements = noticesData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    content: item.excerpt || extractTextFromContent(item.content),
    priority: item.priority,
    startDate: new Date(item.publishedDate).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
  }));

  return (
    <main className="min-h-screen">
      <Hero locale={locale} />
      <AboutSection locale={locale} />
      <AtaturkQuoteSection locale={locale} />
      <ServicesSectionServer locale={locale} />
      <NewsSectionHome
        news={formattedNews}
        announcements={formattedAnnouncements}
        locale={locale}
      />
    </main>
  );
}

// Helper function to strip HTML tags
function extractTextFromContent(content: string): string {
  if (!content) return '';
  // Remove HTML tags
  const text = content.replace(/<[^>]*>?/gm, '');
  return text.slice(0, 150) + (text.length > 150 ? '...' : '');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title: locale === 'tr' ? 'Ana Sayfa | ASAD' : 'Home | ASAD',
    description:
      locale === 'tr'
        ? 'Anadolu Sualtı Araştırmaları ve Sporları Derneği - Sualtı sporları, dalış eğitimleri ve deniz bilimleri araştırmaları'
        : 'Anatolian Underwater Research and Sports Association - Underwater sports, diving training and marine sciences research',
  };
}