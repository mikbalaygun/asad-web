// app/[locale]/hakkimizda/sponsorlarimiz/page.tsx
import { getAllSponsors, getMediaUrl } from '@/lib/api/sponsors';
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
    logo: getMediaUrl(sponsor.logo),
  }));

  return <SponsorsPageClient sponsors={sponsors} locale={locale} />;
}