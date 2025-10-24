// app/[locale]/hakkimizda/temsilci/page.tsx
import { getRepresentative } from '@/lib/api/representative';
import { Representative } from '@/lib/types/representative';
import { getStrapiMedia } from '@/lib/strapi';
import RepresentativeClient from '@/components/RepresentativeClient';

export const metadata = {
  title: 'Temsilci | ASAD',
  description: 'ASAD Temsilcisi',
};

export default async function RepresentativePage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  
  let representativeData: Representative | null = null;
  try {
    representativeData = await getRepresentative();
  } catch (error) {
    console.error('Failed to fetch representative:', error);
  }

  if (!representativeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ocean-deep">
        <p className="text-white/60 text-lg">
          {locale === 'tr' ? 'Temsilci bilgisi bulunamadı.' : 'Representative information not found.'}
        </p>
      </div>
    );
  }

  const formattedRepresentative = {
    firstName: representativeData.firstName,
    lastName: representativeData.lastName,
    photo: representativeData.photo ? getStrapiMedia(representativeData.photo.url) : undefined,
  };

  return <RepresentativeClient representative={formattedRepresentative} locale={locale} />;
}