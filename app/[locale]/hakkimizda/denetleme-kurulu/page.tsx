// app/[locale]/hakkimizda/denetim-kurulu/page.tsx
import { getAllAuditBoardMembers } from '@/lib/api/audit-boards'; // dosya adın tekilse
import { AuditBoardMember } from '@/lib/types/audit-board';
import { getStrapiMedia } from '@/lib/strapi';
import BoardMembersClient from '@/components/BoardMembersClient';

export const metadata = {
  title: 'Denetim Kurulu | ASAD',
  description: 'ASAD denetim kurulu üyeleri',
};

export default async function DenetimKuruluPage({
  params: { locale },
}: {
  params: { locale: 'tr' | 'en' };
}) {
  let membersData: AuditBoardMember[] = [];
  try {
    membersData = await getAllAuditBoardMembers();
  } catch (error) {
    console.error('Failed to fetch audit board members:', error);
  }

  const formattedMembers = membersData.map((m) => ({
    id: m.id,
    firstName: m.firstName,
    lastName: m.lastName,
    role: m.role,
    photo: m.photo ? getStrapiMedia(m.photo.url) : undefined,
  }));

  const title = locale === 'tr' ? 'Denetim Kurulu' : 'Audit Board';
  const subtitle =
    locale === 'tr'
      ? 'ASAD denetim kurulu üyeleri'
      : 'ASAD audit board members';

  return (
    <BoardMembersClient
      members={formattedMembers}
      locale={locale}
      title={title}
      subtitle={subtitle}
      breadcrumbLabel={title}
    />
  );
}
