// app/[locale]/hizmetler/page.tsx
import { getAllServices } from '@/lib/api/services';
import { getMediaUrl } from '@/lib/api';
import ServicesListClient from '@/components/ServicesListClient';

export const metadata = {
  title: 'Hizmetler | ASAD',
  description: 'Sualtı sporları ve deniz bilimleri alanında sunduğumuz profesyonel hizmetler',
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  const servicesData = await getAllServices(locale);

  // Custom API verisini component'e uygun formata çevir
  const formattedServices = servicesData.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    shortDescription: item.shortDescription,
    icon: item.icon || 'diving',
    image: getMediaUrl(item.coverImage),
  }));

  return <ServicesListClient services={formattedServices} locale={locale} />;
}