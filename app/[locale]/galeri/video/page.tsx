import { Metadata } from 'next';
import VideoGalleryClient from '@/components/VideoGalleryClient';
import { getAllVideos } from '@/lib/api/gallery';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    tr: 'Video Galeri | ASAD',
    en: 'Video Gallery | ASAD'
  };

  const descriptions = {
    tr: 'Anadolu Sualtı Araştırmaları ve Sporları Derneği video galerisi. Sualtı maceralarından videolar ve belgeseller.',
    en: 'Anatolian Underwater Research and Sports Association video gallery. Videos and documentaries from underwater adventures.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.tr,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.tr,
  };
}

export default async function VideoGalleryPage({ params }: PageProps) {
  const { locale } = await params;
  
  const videos = await getAllVideos(locale as 'tr' | 'en');

  return <VideoGalleryClient videos={videos} locale={locale} />;
}