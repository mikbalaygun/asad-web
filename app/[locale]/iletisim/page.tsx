import { Metadata } from 'next';
import ContactPageClient from '@/components/ContactPageClient';
import { getContactInfo } from '@/lib/api/contact';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    tr: 'İletişim - ASAD',
    en: 'Contact - ASAD'
  };

  const descriptions = {
    tr: 'Anadolu Sualtı Araştırmaları ve Sporları Derneği ile iletişime geçin. Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.',
    en: 'Contact the Anatolian Underwater Research and Sports Association. Reach us for your questions, suggestions or collaboration offers.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.tr,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.tr,
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  
  let contactInfo = null;
  try {
    contactInfo = await getContactInfo();
  } catch (error) {
    console.error('Failed to fetch contact info:', error);
  }

  return <ContactPageClient locale={locale} contactInfo={contactInfo} />;
}