// app/[locale]/hizmetler/[slug]/page.tsx
import { getServiceBySlug, getAllServices } from '@/lib/api/services';
import { getMediaUrl } from '@/lib/api';
import { notFound } from 'next/navigation';
import ServiceDetailClient from '@/components/ServiceDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const service = await getServiceBySlug(slug, locale);
  if (!service) return { title: 'Hizmet Bulunamadı | ASAD' };
  return { title: `${service.title} | ASAD`, description: service.shortDescription };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: 'tr' | 'en' }>;
}) {
  const { slug, locale } = await params;
  const service = await getServiceBySlug(slug, locale);

  if (!service) notFound();

  // Diğer hizmetleri getir (max 3)
  const allServices = await getAllServices(locale);
  const relatedServices = allServices
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const serviceData = {
    id: service.id,
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    description: service.description, // Zaten HTML
    icon: service.icon || 'diving',
    image: getMediaUrl(service.coverImage),
    localizations: [],
  };

  const formattedRelated = relatedServices.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    shortDescription: item.shortDescription,
    icon: item.icon || 'diving',
    image: getMediaUrl(item.coverImage),
  }));

  return <ServiceDetailClient service={serviceData} relatedServices={formattedRelated} locale={locale} />;
}