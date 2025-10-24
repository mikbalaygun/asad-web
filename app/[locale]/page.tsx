// app/[locale]/page.tsx
import AboutSection from '@/components/AboutSection';
import AtaturkQuoteSection from '@/components/AtaturkQuoteSection';
import Hero from '@/components/Hero';
import NewsSectionHome from '@/components/NewsSectionHome';
import ServicesSectionServer from '@/components/ServicesSectionServer';
import { getLatestNews } from '@/lib/api/news';
import { getLatestAnnouncements } from '@/lib/api/announcements';
import { getStrapiMedia } from '@/lib/strapi';
import { News } from '@/lib/types/news';
import { Announcement } from '@/lib/types/announcement';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  
  // Strapi'den veri çek
  let newsData: News[] = [];
  let announcementsData: Announcement[] = [];
  
  try {
    [newsData, announcementsData] = await Promise.all([
      getLatestNews(3, locale),
      getLatestAnnouncements(3, locale)
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Format news
  const formattedNews = newsData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.Title,
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
  }));

  // Format announcements
  const formattedAnnouncements = announcementsData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    content: extractTextFromContent(item.content),
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
    <main className="min-h-screen">
      <Hero locale={locale} />
      <AboutSection locale={locale} />
      <AtaturkQuoteSection locale={locale} />
      {/* Services Section - Strapi'den veri çeker */}
      <ServicesSectionServer locale={locale} />
      <NewsSectionHome 
        news={formattedNews} 
        announcements={formattedAnnouncements}
        locale={locale}
      />
    </main>
  );
}

// Helper function
function extractTextFromContent(content: any): string {
  if (typeof content === 'string') return content.slice(0, 150);
  if (!Array.isArray(content)) return '';
  
  return content
    .map((block) => {
      if (block.children) {
        return block.children.map((child: any) => child.text || '').join(' ');
      }
      return '';
    })
    .join(' ')
    .slice(0, 150);
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