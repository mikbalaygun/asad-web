// app/[locale]/hakkimizda/gep-plani/page.tsx
import { getAllGepMembers, getAllGepDocuments } from '@/lib/api/gep';
import GepPlanClient from '@/components/GepPlanClient';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: 'tr' | 'en' }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'tr' ? 'GEP Planı | ASAD' : 'GEP Plan | ASAD';
  const description =
    locale === 'tr'
      ? 'ASAD Toplumsal Cinsiyet Eşitliği Planı'
      : 'ASAD Gender Equality Plan';

  return {
    title,
    description,
  };
}

export default async function GepPlaniPage({ params }: Props) {
  const { locale } = await params;
  const members = await getAllGepMembers();
  const documents = await getAllGepDocuments();

  const title = locale === 'tr' ? 'GEP Planı' : 'GEP Plan';
  const subtitle =
    locale === 'tr'
      ? 'Toplumsal Cinsiyet Eşitliği Planı'
      : 'Gender Equality Plan';
  const breadcrumbLabel = title;

  return (
    <GepPlanClient
      members={members}
      documents={documents}
      locale={locale}
      title={title}
      subtitle={subtitle}
      breadcrumbLabel={breadcrumbLabel}
    />
  );
}