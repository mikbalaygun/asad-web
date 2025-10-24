import { Metadata } from 'next';
import AboutPageClient from '@/components/AboutPageClient';
import { getContactInfo } from '@/lib/api/contact';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    tr: 'Hakkımızda - ASAD',
    en: 'About Us - ASAD'
  };

  const descriptions = {
    tr: 'Anadolu Sualtı Araştırmaları ve Sporları Derneği hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz.',
    en: 'Learn about the Anatolian Underwater Research and Sports Association. Our mission, vision and values.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.tr,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.tr,
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  
  let contactInfo = null;
  try {
    contactInfo = await getContactInfo();
  } catch (error) {
    console.error('Failed to fetch contact info:', error);
    // contactInfo null kalacak, sayfa yine de render olacak
  }

  return <AboutPageClient locale={locale} contactInfo={contactInfo} />;
}