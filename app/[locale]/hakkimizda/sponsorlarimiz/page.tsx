// app/[locale]/hakkimizda/sponsorlarimiz/page.tsx
import { getAllSponsors } from '@/lib/api/sponsors';
import { getStrapiMedia } from '@/lib/strapi';
import SponsorsPageClient from '@/components/SponsorsPageClient';

export const metadata = {
  title: 'Sponsorlarımız | ASAD',
  description: 'ASAD\'ın çalışmalarını destekleyen değerli kurumlar ve iş ortaklarımız',
};

export default async function SponsorsPage({
  params,
}: {
  params: Promise<{ locale: 'tr' | 'en' }>;
}) {
  const { locale } = await params;
  const sponsorsData = await getAllSponsors(locale);

  // Transform data for client component
  const sponsors = sponsorsData.map((sponsor) => ({
    id: sponsor.id,
    name: sponsor.name,
    logo: sponsor.logo ? getStrapiMedia(sponsor.logo.url) : null,
  }));

  return <SponsorsPageClient sponsors={sponsors} locale={locale} />;
}