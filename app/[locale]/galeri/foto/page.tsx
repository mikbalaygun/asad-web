import { Metadata } from 'next';
import PhotoGalleryClient from '@/components/PhotoGalleryClient';
import { getAllPhotos } from '@/lib/api/gallery';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    tr: 'Foto Galeri | ASAD',
    en: 'Photo Gallery | ASAD'
  };

  const descriptions = {
    tr: 'Anadolu Sualtı Araştırmaları ve Sporları Derneği foto galerisi. Sualtı dünyasından en etkileyici anlar.',
    en: 'Anatolian Underwater Research and Sports Association photo gallery. The most impressive moments from the underwater world.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.tr,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.tr,
  };
}

export default async function PhotoGalleryPage({ params }: PageProps) {
  const { locale } = await params;
  
  const photos = await getAllPhotos(locale as 'tr' | 'en');

  return <PhotoGalleryClient photos={photos} locale={locale} />;
}