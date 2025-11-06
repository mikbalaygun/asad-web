// app/[locale]/page.tsx
import AboutSection from '@/components/AboutSection';
import AtaturkQuoteSection from '@/components/AtaturkQuoteSection';
import Hero from '@/components/Hero';
import NewsSectionHome from '@/components/NewsSectionHome';
import ServicesSectionServer from '@/components/ServicesSectionServer';
import { getLatestNews } from '@/lib/api/news';
import { getLatestNotices } from '@/lib/api/notices';
import { getStrapiMedia } from '@/lib/strapi';
import { News } from '@/lib/types/news';
import { Notice } from '@/lib/types/notice';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  
  // Strapi'den veri çek
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
    title: item.Title,
    excerpt: item.excerpt || '',
    date: new Date(item.publishedTime ?? item.publishedAt).toLocaleDateString(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
    category: item.category || (locale === 'tr' ? 'Genel' : 'General'),
    image: item.coverImage ? getStrapiMedia(item.coverImage.url) : undefined,
  }));

  // Format notices (announcements)
  const formattedAnnouncements = noticesData.map((item) => ({
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
  try {
    if (!content) return '';
    if (typeof content === 'string') return content.slice(0, 150);
    if (!Array.isArray(content)) return '';
    if (content.length === 0) return '';
    
    return content
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
      .slice(0, 150);
  } catch (error) {
    console.error('Error extracting text from content:', error);
    return '';
  }
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