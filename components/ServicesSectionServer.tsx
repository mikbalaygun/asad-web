// components/ServicesSectionServer.tsx
import { getFeaturedServices } from '@/lib/api/services';
import ServicesSection from '@/components/ServicesSection';

interface Props {
  locale: string;
}

export default async function ServicesSectionServer({ locale }: Props) {
  try {
    // Ana sayfada 4 hizmet göster
    const servicesData = await getFeaturedServices(4, locale as 'tr' | 'en');

    // Eğer veri gelmezse boş array dön
    if (!servicesData || !Array.isArray(servicesData) || servicesData.length === 0) {
      return <ServicesSection services={[]} locale={locale} />;
    }

    // Format data for client component
    const formattedServices = servicesData.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      shortDescription: item.shortDescription,
      icon: item.icon || 'diving',
      image: item.coverImage || undefined,
    }));

    return <ServicesSection services={formattedServices} locale={locale} />;
  } catch (error) {
    console.error('[ServicesSectionServer] Error loading services:', error);
    // Hata durumunda boş array ile render et
    return <ServicesSection services={[]} locale={locale} />;
  }
}